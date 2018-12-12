import React from "react";
import _ from "lodash";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import './styles.css';
import classNames from 'classnames';
import { connect } from "react-redux";

//Router
import { withRouter } from "react-router-dom";

//Redux
import { mostrarCargando } from '@Redux/Actions/mainContent'
import { replace, push } from "connected-react-router";

//Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//Custom Components
import MiCard from "@Componentes/MiCard";
import MisPagos from "@Componentes/MisPagos";
import MiTooltip from "@Componentes/MiTooltip";

import servicesTributarioOnline from '@Rules/Rules_TributarioOnline';

//Funciones Útiles
import { formatNumber, stringToDate, diffDays, getIdTipoTributo, dateToString } from "@Utils/functions"

const mapStateToProps = state => {
    return {
        loggedUser: state.Usuario.loggedUser,
        tipoCedulones: state.MainContent.tipoCedulones,
        tributosBienesPorCUIT: state.AfipController.tributosBienesPorCUIT,
    };
};

const mapDispatchToProps = dispatch => ({
    mostrarCargando: (cargar) => {
        dispatch(mostrarCargando(cargar));
    },
    redireccionar: url => {
        dispatch(replace(url));
    },
});

class DetalleJuicio extends React.PureComponent {
    constructor(props) {
        super(props);

        this.initialState = {
            menuItemSeleccionado: 'juicios',
            infoDatosCuenta: '', 
            juicios: {
                infoSeccion: undefined,
                tieneSubMenu: true,
                tipoCedulon: this.props.tipoCedulones.byKey[3],
                order: 'asc',
                orderBy: 'concepto',
                labels: {
                    detalleTitulo: 'Deuda Judicial',
                    totalesDeuda: 'del Juicio',
                    vencida: 'Capital',
                    aVencer: 'Gastos',
                    columnas: ['Concepto', 'Vencimiento', 'Importe ($)']
                },
                menuItemSeleccionado: '',
                registrosSeleccionados: [],
            }
        };

        this.state = _.clone(this.initialState);
    }

    componentDidMount() {
        //Servicios que setean los datos en las props del store de redux
        const token = this.props.loggedUser.token;
        const identificador = decodeURIComponent(this.props.match.params.identificador);
        this.init(token, identificador);
    }

    init = (token, identificador) => {
        this.props.mostrarCargando(true);
        
        const tipoTributo = getIdTipoTributo(this.props.match.params.tributo);

        servicesTributarioOnline.getInfoJuiciosContribucion(token, tipoTributo, identificador)
            .then((datos) => {
                if (!datos.ok) { return false; } //mostrarAlerta('Juicios: ' + datos.error); return false; }

                let data = datos.return;
                if (data && data.length > 0) {
                    data['lista'] = data.map((juicio) => {

                        let rowList = juicio.periodos && juicio.periodos.map((concepto) => {

                            return {
                                concepto: concepto.concepto,
                                vencimiento: dateToString(new Date(concepto.fecha), 'DD/MM/YYYY'),
                                importe: formatNumber(concepto.importe.total),
                                detalle: <MiTooltip
                                    contenidoDetalle={<div>
                                        <Typography>Base: <b>$ {concepto.importe.base}</b></Typography>
                                        <Typography>Recargo: <b>$ {concepto.importe.recargo}</b></Typography>
                                        <Typography>Deducción: <b>$ {concepto.importe.deduccion}</b></Typography>
                                        <Typography>Referencia: <b>{concepto.referencia}</b></Typography>
                                    </div>}>
                                    <i class="material-icons" style={{ color: '#149257', cursor: 'help' }}>add_circle_outline</i>
                                </MiTooltip>,
                                data: concepto //atributo "data" no se muestra en MiTabla
                            }
                        });

                        return {
                            ...juicio,
                            idJuicio: juicio.identificador,
                            rowList: rowList
                        }
                    });
                } else {
                    data = {
                        ...data,
                        lista: []
                    }
                }

                let juicios = Object.assign({}, this.state.juicios);
                const menuItem = (this.props.match.params.seccionMenu == 'juicios' ?
                    decodeURIComponent(this.props.match.params.subIdentificador)
                    :
                    ((data.lista > 0 && data.lista[0].idJuicio) || ''));
                juicios.menuItemSeleccionado = menuItem;

                var listaInfoJuiciosContribucion = _.each(data.lista, (x) => { return x.tipoCedulon = this.props.tipoCedulones.byKey[3]; });
                //Rellenamos "infoSeccion" ya que se comparte con juiciosMulta
                if (juicios.infoSeccion && juicios.infoSeccion.lista)
                    juicios.infoSeccion.lista = listaInfoJuiciosContribucion.concat(juicios.infoSeccion.lista);
                else
                    juicios.infoSeccion = {
                        lista: listaInfoJuiciosContribucion
                    };

                this.setState({ juicios });

            }).catch(err => {
                console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
            });
    }

    //Función para registrar en el state las filas seleccionadas de la grilla 
    //de la seccion actual para generar cedulon
    setRegistrosSeleccionados = (menuItemSeleccionado, registrosSeleccionados) => {

        let itemSeleccionado = Object.assign({}, this.state[menuItemSeleccionado]);
        itemSeleccionado.registrosSeleccionados = registrosSeleccionados;

        this.setState({ [menuItemSeleccionado]: itemSeleccionado });
    };

    render() {
        const { classes } = this.props;

        const {
            menuItemSeleccionado
        } = this.state;

        const tributo = this.props.match.params.tributo;

        return (
            <div className={classNames(classes.mainContainer, "contentDetalleTributo")}>
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={12} className={"container"}>
                        <MiCard>
                            {/* Titulo y selección de identificador */}
                            <Typography className={classes.title} variant="title">Identificador: </Typography>

                            <Typography className={classes.infoTexto}>
                                {`En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`}
                            </Typography>
                            <MisPagos
                                pagoRedirect={'/DetalleTributario/' + tributo + '/' + decodeURIComponent(this.props.match.params.identificador) + '/' + menuItemSeleccionado}
                                tipoCedulon={this.state['juicio'].tipoCedulon}
                                check={false}
                                info={juicio || null}
                                menuItemSeleccionado={'juicio'}
                                data={this.state['juicio']}
                                registrosSeleccionados={this.state['juicio'].registrosSeleccionados}
                                setRegistrosSeleccionados={this.setRegistrosSeleccionados}
                                identificadorActual={decodeURIComponent(this.props.match.params.identificador)}
                                tributoActual={tributo}
                            />
                        </MiCard>
                    </Grid>
                </Grid>
            </div >
        );
    }
}

let componente = DetalleJuicio;
componente = withStyles(styles)(componente);
componente = connect(
    mapStateToProps,
    mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

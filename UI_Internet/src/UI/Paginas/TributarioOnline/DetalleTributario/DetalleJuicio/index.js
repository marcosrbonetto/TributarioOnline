import React from "react";
import _ from "lodash";
import { mostrarAlerta } from "@Utils/functions";

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
import Button from "@material-ui/core/Button";

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

        this.token = this.props.loggedUser.token;
        this.tributo = 'Juicio';
        this.idTipoTributo = getIdTipoTributo(this.tributo);
        this.identificador = decodeURIComponent(this.props.match.params.identificador);
        this.tributoPadre = {
            tipoTributo: new URLSearchParams(this.props.location.search).get('tipoTributo'),
            identificador: new URLSearchParams(this.props.location.search).get('identificador'),
        };

        this.initialState = {
            registrosSeleccionados: [],
            deudaTotales: {},
            rowList: []
        };

        this.state = _.clone(this.initialState);
    }

    componentDidMount() {
        this.init(this.token, this.identificador);
    }

    init = (token, identificador) => {
        this.props.mostrarCargando(true);

        servicesTributarioOnline.getInfoDetalleJuicio(token, identificador)
            .then((datos) => {
                if (!datos.ok) { mostrarAlerta('Error: ' + datos.error); return false; } //mostrarAlerta('Períodos: ' + datos.error); return false; }

                const deudaTotales = datos.return.deudaJuicio;
                const rowList = datos.return.periodos.map((concepto) => {
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

                this.setState({
                    deudaTotales: deudaTotales,
                    rowList: rowList
                });

                this.props.mostrarCargando(false);
            }).catch(err => {
                console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
                this.props.mostrarCargando(false);
            });
    }

    setRegistrosSeleccionados = (registrosSeleccionados, misPagosProps) => {
        this.setState({
            registrosSeleccionados: registrosSeleccionados
        });
    };

    handleCuentaOrigen = () => {
        this.props.redireccionar('/DetalleTributario/' + this.tributoPadre.tipoTributo + '/' + this.tributoPadre.identificador + '/juicios/' + encodeURIComponent(this.identificador));
    };

    render() {
        const { classes } = this.props;

        const {
            registrosSeleccionados,
            deudaTotales,
            rowList
        } = this.state;

        return (
            <div className={classNames(classes.mainContainer, "contentDetalleTributo")}>
                <Grid container className={classes.root} spacing={16} justify="center">
                    <Grid item xs={8} className={"container"}>
                        <MiCard>
                            {/* Titulo y selección de identificador */}
                            <Typography className={classes.title} variant="title">
                                Juicio: <b>{this.identificador}</b>
                                {this.tributoPadre.identificador &&
                                    <Button
                                        onClick={this.handleCuentaOrigen}
                                        className={classes.btnCuentaOrigen}
                                        variant="outlined"
                                        color="secondary">
                                        Ver Cuenta Origen</Button>
                                }
                            </Typography>

                            <Typography className={classes.infoTexto}>
                                {`En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`}
                            </Typography>
                            <MisPagos
                                setRegistrosSeleccionados={this.setRegistrosSeleccionados}
                                deudaTotales={deudaTotales}
                                rowList={rowList}
                                registrosSeleccionados={registrosSeleccionados}
                                tablaConfig={
                                    {
                                        columnas: ['Concepto', 'Vencimiento', 'Importe ($)'],
                                        order: 'asc',
                                        orderBy: 'concepto',
                                        check: false,
                                    }
                                }
                                cedulonConfig={
                                    {
                                        subItem: this.identificador,
                                        tipoCedulon: this.props.tipoCedulones.byKey[3],
                                        idTipoTributo: getIdTipoTributo(this.tributo),
                                        identificador: this.identificador,
                                    }
                                }
                                mercadoPagoConfig={
                                    {
                                        pagoRedirect: '/DetalleTributario/' + this.tributo + '/' + this.identificador,
                                        idBtnMercadoPago: 'btnPago' + this.identificador,
                                        seccionDetalleTributo: undefined,
                                    }
                                }
                                labelsTotales={
                                    {
                                        totalesDeuda: 'del Juicio',
                                        vencida: 'Capital',
                                        aVencer: 'Gastos',
                                    }
                                }
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

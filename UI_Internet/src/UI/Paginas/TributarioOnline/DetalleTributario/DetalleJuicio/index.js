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
import Button from "@material-ui/core/Button";

//Custom Components
import MiCard from "@Componentes/MiCard";
import MisPagos from "@Componentes/MisPagos";
import MiTooltip from "@Componentes/MiTooltip";

import servicesTributarioOnline from '@Rules/Rules_TributarioOnline';

//Funciones Útiles
import { formatNumber, stringToDate, diffDays, getIdTipoTributo, dateToString } from "@Utils/functions"

const datosJson = { "return": { "identificador": "AUT02032/2016", "titular": { "cuit": "20164095054", "titular": "DE UGARTE MANUEL ELOY" }, "datosCuenta": ["IUT DE ORIGEN:         CHT211  -3", "", "CARATULA: DE UGARTE MANUEL ELOY", "PROCURADOR: 020093-6 CPTA.: 342  CISNEROS NATALIA LORENA", "", "", "", "", "", ""], "deudaJuicio": { "total": 4290.59, "capital": 2515.0, "gastos": 1775.59 }, "periodos": [{ "concepto": "2012/004", "fecha": "2018-12-13T00:00:00", "referencia": "CAPITAL", "importe": { "total": 296.3, "base": 137.5, "recargo": 158.8, "deduccion": 0.0, "citacion": 0.0 } }, { "concepto": "2012/005", "fecha": "2018-12-13T00:00:00", "referencia": "CAPITAL", "importe": { "total": 292.0, "base": 137.5, "recargo": 154.5, "deduccion": 0.0, "citacion": 0.0 } }, { "concepto": "2012/006", "fecha": "2018-12-13T00:00:00", "referencia": "CAPITAL", "importe": { "total": 287.9, "base": 137.5, "recargo": 150.4, "deduccion": 0.0, "citacion": 0.0 } }, { "concepto": "2013/001", "fecha": "2018-12-13T00:00:00", "referencia": "CAPITAL", "importe": { "total": 283.3, "base": 137.5, "recargo": 145.8, "deduccion": 0.0, "citacion": 0.0 } }, { "concepto": "2013/002", "fecha": "2018-12-13T00:00:00", "referencia": "CAPITAL", "importe": { "total": 279.5, "base": 137.5, "recargo": 142.0, "deduccion": 0.0, "citacion": 0.0 } }, { "concepto": "2013/003", "fecha": "2018-12-13T00:00:00", "referencia": "CAPITAL", "importe": { "total": 275.4, "base": 137.5, "recargo": 137.9, "deduccion": 0.0, "citacion": 0.0 } }, { "concepto": "2013/004", "fecha": "2018-12-13T00:00:00", "referencia": "CAPITAL", "importe": { "total": 271.2, "base": 137.5, "recargo": 133.7, "deduccion": 0.0, "citacion": 0.0 } }, { "concepto": "2013/005", "fecha": "2018-12-13T00:00:00", "referencia": "CAPITAL", "importe": { "total": 267.0, "base": 137.5, "recargo": 129.5, "deduccion": 0.0, "citacion": 0.0 } }, { "concepto": "2013/006", "fecha": "2018-12-13T00:00:00", "referencia": "CAPITAL", "importe": { "total": 262.4, "base": 137.5, "recargo": 124.9, "deduccion": 0.0, "citacion": 0.0 } }, { "concepto": "HONORAR.", "fecha": "2018-12-13T00:00:00", "referencia": "HONORARIOS", "importe": { "total": 820.3, "base": 820.3, "recargo": 0.0, "deduccion": 0.0, "citacion": 0.0 } }, { "concepto": "GASTOS", "fecha": "2018-12-13T00:00:00", "referencia": "GASTOS", "importe": { "total": 955.29, "base": 955.29, "recargo": 0.0, "deduccion": 0.0, "citacion": 0.0 } }] }, "error": null, "ok": true };

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

        const deudaTotales = datosJson.return.deudaJuicio;
        const rowList = datosJson.return.periodos.map((concepto) => {
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

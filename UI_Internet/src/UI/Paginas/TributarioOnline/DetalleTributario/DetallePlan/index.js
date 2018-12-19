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

const datosJson = { "return": { "identificador": "16788805", "titular": { "cuit": "NO INFORMA", "titular": "PREVEER S.A.         (*)" }, "datosCuenta": ["IUT DE ORIGEN: 121305601700000 /0 01   INM39593/2014  < PLAN ACTIVO  >", "PROCURACION FISCAL P.P.C.    ", "ITEM : 1.01.01.01              I N M U E B L E S", "TOTAL PLAN :      4.855,80 TOT.A FIN.:      4.667,00 C.CTAS : 006 %ENT.: 00", "INT.: 01,50 TASA: 27,00   ANT.:     870,10 CTA.:     878,10 FEC.OT.: 09/11/2015", "VIENE DE   JUICIO N* INM39593/2014 CARP.: 096 F.PROC.: **< NO >**", "OBSERVACIONES:                                         PLAN CON CBU NO", " << TELEFONO  >>  0351499999     ***", "                      ", "IUT DE ORIGEN: "], "deudaAdministrativa": { "total": 4476.5, "vencida": 4476.5, "aVencer": 0.0, "ultimoPago": "23/11/2018" }, "periodos": [{ "concepto": "004/006", "fecha": "2016-02-15T00:00:00", "referencia": "", "importe": { "total": 1784.3, "base": 878.1, "recargo": 906.2, "deduccion": 0.0, "citacion": 0.0 } }, { "concepto": "005/006", "fecha": "2016-03-15T00:00:00", "referencia": "", "importe": { "total": 1758.8, "base": 878.1, "recargo": 880.7, "deduccion": 0.0, "citacion": 0.0 } }, { "concepto": "006/006", "fecha": "2016-04-15T00:00:00", "referencia": "", "importe": { "total": 933.4, "base": 473.3, "recargo": 460.1, "deduccion": 0.0, "citacion": 0.0 } }] }, "error": null, "ok": true };

const mapStateToProps = state => {
    return {
        loggedUser: state.Usuario.loggedUser,
        tipoCedulones: state.MainContent.tipoCedulones,
        paraMobile: state.MainContent.paraMobile,
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

class DetallePlan extends React.PureComponent {
    constructor(props) {
        super(props);

        this.token = this.props.loggedUser.token;
        this.tributo = 'Plan';
        this.idTipoTributo = getIdTipoTributo(this.tributo);
        this.identificador = decodeURIComponent(this.props.match.params.identificador);
        this.tributoPadre = {
            tipoTributo: new URLSearchParams(this.props.location.search).get('tipoTributo'),
            identificador: new URLSearchParams(this.props.location.search).get('identificador'),
        };

        this.initialState = {
            registrosSeleccionados: [],
            deudaTotales: {},
            rowList: [],
            esCbuSI: false,
            textoInfo: false
        };

        this.state = _.clone(this.initialState);
    }

    componentDidMount() {
        this.init(this.token, this.identificador);
    }

    init = (token, identificador) => {
        this.props.mostrarCargando(true);

        servicesTributarioOnline.getInfoDetallePlan(token, identificador)
            .then((datos) => {
                if (!datos.ok) { mostrarAlerta('Error: ' + datos.error); return false; } //mostrarAlerta('Períodos: ' + datos.error); return false; }

                //Corroboramos el CBU, de ser SI, no se permite seleccionar filas en la grilla
                const esCbuSI = _.filter(datos.return.datosCuenta, function(o){ return o.indexOf('CBU SI') != -1; }).length > 0;

                const deudaTotales = datos.return.deudaAdministrativa;
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
                    rowList: rowList,
                    esCbuSI: esCbuSI,
                    textoInfo: esCbuSI && 'A partir de la segunda cuota del plan, se debitarán automáticamente en la cuenta del CBU declarado'
                });

                this.props.mostrarCargando(false);
            }).catch(err => {
                console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
                this.props.mostrarCargando(false);
            });
    }

    setRegistrosSeleccionados = (registrosSeleccionados, misPagosProps) => {
        this.setState({
            registrosSeleccionados: registrosSeleccionados
        });
    };

    handleCuentaOrigen = () => {
        this.props.redireccionar('/DetalleTributario/' + this.tributoPadre.tipoTributo + '/' + this.tributoPadre.identificador + '/planes/' + encodeURIComponent(this.identificador));
    };

    render() {
        const { classes } = this.props;

        const {
            registrosSeleccionados,
            deudaTotales,
            rowList,
            esCbuSI,
            textoInfo
        } = this.state;

        return (
            <div className={classNames(classes.mainContainer, "contentDetalleTributo", "mainContainer")}>
                <Grid container className={classes.root} spacing={16} justify="center">
                    <Grid item xs={8} className={"container"}>
                        <MiCard>
                            {/* Titulo y selección de identificador */}
                            <Typography className={classes.title} variant="title">
                                Plan: <b>{this.identificador}</b>
                                {this.tributoPadre.identificador &&
                                    <Button
                                        onClick={this.handleCuentaOrigen}
                                        className={this.props.paraMobile ? classes.btnCuentaOrigenParaMobile : classes.btnCuentaOrigen}
                                        variant="outlined"
                                        color="secondary">
                                        Ver Cuenta Origen</Button>
                                }
                            </Typography>

                            <Typography className={classes.infoTexto}>
                                {textoInfo || `En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`}
                            </Typography>
                            <MisPagos
                                setRegistrosSeleccionados={this.setRegistrosSeleccionados}
                                deudaTotales={deudaTotales}
                                rowList={rowList}
                                registrosSeleccionados={registrosSeleccionados}
                                tablaConfig={
                                    {
                                        columnas: ['Concepto', 'Fecha', 'Total ($)'],
                                        order: 'asc',
                                        orderBy: 'concepto',
                                        check: true,
                                        disabled: esCbuSI || false
                                    }
                                }
                                cedulonConfig={
                                    {
                                        subItem: this.identificador,
                                        tipoCedulon: this.props.tipoCedulones.byKey[4],
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
                                        totalesDeuda: 'del Plan',
                                        vencida: 'Vencida',
                                        aVencer: 'A vencer',
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

let componente = DetallePlan;
componente = withStyles(styles)(componente);
componente = connect(
    mapStateToProps,
    mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

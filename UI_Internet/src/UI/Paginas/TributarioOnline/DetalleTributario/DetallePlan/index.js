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
import Divider from '@material-ui/core/Divider';

//Custom Components
import MiCard from "@Componentes/MiCard";
import MisPagos from "@Componentes/MisPagos";
import MiTooltip from "@Componentes/MiTooltip";
import MiLinkDialog from "@Componentes/MiLinkDialog";
import MiControledDialog from "@Componentes/MiControledDialog"
import MiTabla from "@Componentes/MiTabla";
import MiPDFPrinter from "@Componentes/MiPDFPrinter";

import servicesTributarioOnline from '@Rules/Rules_TributarioOnline';

//Funciones Útiles
import { formatNumber, stringToDate, diffDays, getIdTipoTributo, dateToString } from "@Utils/functions"

const datosJson = { "return": { "identificador": "16788805", "titular": { "cuit": "NO INFORMA", "titular": "PREVEER S.A.         (*)" }, "datosCuenta": ["IUT DE ORIGEN: 121305601700000 /0 01   INM39593/2014  < PLAN ACTIVO  >", "PROCURACION FISCAL P.P.C.    ", "ITEM : 1.01.01.01              I N M U E B L E S", "TOTAL PLAN :      4.855,80 TOT.A FIN.:      4.667,00 C.CTAS : 006 %ENT.: 00", "INT.: 01,50 TASA: 27,00   ANT.:     870,10 CTA.:     878,10 FEC.OT.: 09/11/2015", "VIENE DE   JUICIO N* INM39593/2014 CARP.: 096 F.PROC.: **< NO >**", "OBSERVACIONES:                                         PLAN CON CBU NO", " << TELEFONO  >>  0351499999     ***", "                      ", "IUT DE ORIGEN: "], "deudaAdministrativa": { "total": 4476.5, "vencida": 4476.5, "aVencer": 0.0, "ultimoPago": "23/11/2018" }, "periodos": [{ "concepto": "004/006", "fecha": "2016-02-15T00:00:00", "referencia": "", "importe": { "total": 1784.3, "base": 878.1, "recargo": 906.2, "deduccion": 0.0, "citacion": 0.0 } }, { "concepto": "005/006", "fecha": "2016-03-15T00:00:00", "referencia": "", "importe": { "total": 1758.8, "base": 878.1, "recargo": 880.7, "deduccion": 0.0, "citacion": 0.0 } }, { "concepto": "006/006", "fecha": "2016-04-15T00:00:00", "referencia": "", "importe": { "total": 933.4, "base": 473.3, "recargo": 460.1, "deduccion": 0.0, "citacion": 0.0 } }] }, "error": null, "ok": true };

const mapStateToProps = state => {
    return {
        loggedUser: state.Usuario.loggedUser,
        tipoTributos: state.MainContent.tipoTributos,
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

        this.token = 'INVITADO'; //this.props.loggedUser.token; -- Permitimos que INVITADOS Y VV Vean Planes
        this.tributo = 'Plan';
        this.idTipoTributo = getIdTipoTributo(this.tributo);
        this.identificador = decodeURIComponent(this.props.match.params.identificador);
        this.tributoPadre = {
            tipoTributo: new URLSearchParams(this.props.location.search).get('tipoTributo'),
            identificador: new URLSearchParams(this.props.location.search).get('identificador'),
        };

        this.initialState = {
            tablaExpandida: false,
            registrosSeleccionados: [],
            infoPlan: {},
            deudaTotales: {},
            rowList: [],
            esCbuSI: false,
            textoInfo: false,
            informeCuenta: { //Información utilizada para mostrar informe de cuenta
                info: {},
                modal: {
                    open: false,
                    showReporte: false
                },
                reporteBase64: ''
            },
            periodosAdeudados: {
                modal: {
                    open: false
                },
                infoGrilla: []
            },
            infoDatosCuenta: '',
            descuentoBeneficio: undefined
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
                const esCbuSI = _.filter(datos.return.datosCuenta, function (o) { return o.indexOf('CBU SI') != -1; }).length > 0;

                const infoPlan = datos.return.titular || {};
                const infoDatosCuenta = datos.return.datosCuenta || 'No se encontraron registros';

                let descuentoBeneficio;
                if (infoDatosCuenta && infoDatosCuenta[6] && infoDatosCuenta[6].indexOf('DESCUENTO') != 1)
                    descuentoBeneficio = infoDatosCuenta[6]; //El descuento siempre viene en la linea 7 (index 6)

                const deudaTotales = datos.return.deudaAdministrativa;
                const rowList = datos.return.periodos.map((concepto) => {
                    return {
                        concepto: concepto.concepto,
                        vencimiento: dateToString(new Date(concepto.fecha), 'DD/MM/YYYY'),
                        base: formatNumber(concepto.importe.base),
                        recargo: formatNumber(concepto.importe.recargo),
                        deduccion: formatNumber(concepto.importe.deduccion),
                        importe: formatNumber(concepto.importe.total),
                        referencia: concepto.referencia,
                        detalle: <MiTooltip
                            contenidoDetalle={<div>
                                <Typography>Base: <b>$ {concepto.importe.base}</b></Typography>
                                <Typography>Recargo: <b>$ {concepto.importe.recargo}</b></Typography>
                                <Typography>Deducción: <b>$ {concepto.importe.deduccion}</b></Typography>
                                <Typography>Referencia: <b>{concepto.referencia}</b></Typography>
                            </div>}>
                            <i class="material-icons iconosDetalle" style={{ color: '#149257', cursor: 'pointer' }}>add_circle_outline</i>
                        </MiTooltip>,
                        data: concepto //atributo "data" no se muestra en MiTabla
                    }
                });

                this.setState({
                    deudaTotales: deudaTotales,
                    infoPlan: infoPlan,
                    rowList: rowList,
                    esCbuSI: esCbuSI,
                    textoInfo: esCbuSI && 'A partir de la segunda cuota del plan, se debitarán automáticamente en la cuenta del CBU declarado',
                    infoDatosCuenta: infoDatosCuenta,
                    descuentoBeneficio: descuentoBeneficio
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



    //Traemos datos de informe cuenta trayendo datos del WS
    onInformeCuentaDialogoOpen = () => {
        this.props.mostrarCargando(true);
        const token = this.token;
        const tipoTributo = this.props.tipoTributos.byValue['Plan'];
        const identificador = this.identificador;

        let arrayService = [];
        const service1 = servicesTributarioOnline.getInformeCuenta(token, {
            tipoTributo: tipoTributo,
            identificador: identificador
        })
            .then((datos) => {
                if (!datos.ok) { this.props.mostrarCargando(false); return false; } //mostrarAlerta('Informe Cuenta: ' + datos.error);

                this.setState({
                    informeCuenta: {
                        ...this.state.informeCuenta,
                        info: datos.return,
                        modal: {
                            ...this.state.informeCuenta.modal,
                            open: false
                        }
                    }
                });

            }).catch(err => {
                console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
            });

        arrayService.push(service1);

        const service2 = servicesTributarioOnline.getReporteInformeCuenta(token, {
            tipoTributo: tipoTributo,
            identificador: identificador
        })
            .then((datos) => {
                if (!datos.ok) { return false; } //mostrarAlerta('Informe Cuenta: ' + datos.error);

                this.setState({
                    informeCuenta: {
                        ...this.state.informeCuenta,
                        reporteBase64: datos.return
                    }
                });
            }).catch(err => {
                console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
            });

        arrayService.push(service2);

        Promise.all(arrayService).then(() => {
            this.handleInformeCuentaOpenDialog();
            this.props.mostrarCargando(false);
        });
    }

    //Abrimos modal informe cuenta
    handleInformeCuentaOpenDialog = () => {
        this.setState({
            informeCuenta: {
                ...this.state.informeCuenta,
                modal: {
                    ...this.state.informeCuenta.modal,
                    open: true
                }
            }
        }, () => {
            this.props.mostrarCargando(false);
        });
    }

    //Cerramos modal informe cuenta seteando los valores iniciales del state
    onInformeCuentaDialogoClose = () => {
        this.setState({
            informeCuenta: {
                ...this.state.informeCuenta,
                modal: {
                    open: false
                }
            }
        });
    }

    //Mostramos el reporte en el modal de informe de cuentas
    onInformeCuentaShowReporte = () => {
        this.setState({
            informeCuenta: {
                ...this.state.informeCuenta,
                modal: {
                    ...this.state.informeCuenta.modal,
                    showReporte: true
                }
            }
        });
    }

    //Ocultamos el reporte en el modal de informe de cuentas
    onInformeCuentaHideReporte = () => {
        this.setState({
            informeCuenta: {
                ...this.state.informeCuenta,
                modal: {
                    ...this.state.informeCuenta.modal,
                    showReporte: false
                }
            }
        });
    }




    //Traemos datos de periodos adeudados trayendo datos del WS
    onPeriodosAdeudadosDialogoOpen = () => {
        this.props.mostrarCargando(true);
        const token = this.token;
        const tipoTributo = this.props.tipoTributos.byValue['Plan'];
        const identificador = this.identificador;

        servicesTributarioOnline.getPeriodosAdeudados(token, tipoTributo, identificador)
            .then((datos) => {
                if (!datos.ok) { this.props.mostrarCargando(false); mostrarAlerta('Períodos adeudados: ' + datos.error); return false; }

                let rowList = [];
                let data = datos.return;
                //Corroboramos que existan registros
                if (data && data.periodos.length > 0) {
                    rowList = data.periodos.map((concepto) => {

                        return {
                            concepto: concepto.concepto,
                            vencimiento: dateToString(new Date(concepto.fecha), 'DD/MM/YYYY'),
                            base: formatNumber(concepto.importe.base),
                            recargo: formatNumber(concepto.importe.recargo),
                            deduccion: formatNumber(concepto.importe.deduccion),
                            importe: formatNumber(concepto.importe.total),
                            observacion: concepto.referencia,
                            data: concepto //atributo "data" no se muestra en MiTabla
                        }
                    });
                }

                this.setState({
                    periodosAdeudados: {
                        ...this.state.periodosAdeudados,
                        infoGrilla: rowList
                    }
                });

                this.handlePeriodosAdeudadosOpenDialog();
            }).catch(err => {
                console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
            });
    }

    //Abrimos modal periodos adeudados
    handlePeriodosAdeudadosOpenDialog = () => {
        this.setState({
            periodosAdeudados: {
                ...this.state.periodosAdeudados,
                modal: {
                    ...this.state.periodosAdeudados.modal,
                    open: true
                }
            }
        }, () => {
            this.props.mostrarCargando(false);
        });
    }

    //Cerramos modal periodos adeudados seteando los valores iniciales del state
    onPeriodosAdeudadosDialogoClose = () => {
        this.setState({
            periodosAdeudados: {
                ...this.state.periodosAdeudados,
                modal: {
                    open: false
                }
            }
        });
    }


    hableRedirectLocation = () => {
        if(!this.idTipoTributo == this.props.tipoTributos.byValue['Inmueble']) return false;

        const identificador = this.identificador;
        const identificadorLocation = identificador.substr(0,2) + '-' + identificador.substr(2,2) + '-' + identificador.substr(4,3) + '-' + identificador.substr(7,3);

        window.open('http://srv-lincatastro04/emap/?nomenclatura='+identificadorLocation,'_blank');
    }

    handleExpandirTabla = () => {
        this.setState({
            tablaExpandida: !this.state.tablaExpandida
        });
    }

    render() {
        const { classes } = this.props;

        const {
            registrosSeleccionados,
            deudaTotales,
            rowList,
            esCbuSI,
            textoInfo,
            infoPlan,
            informeCuenta,
            periodosAdeudados,
            infoDatosCuenta,
            descuentoBeneficio
        } = this.state;

        return (
            <div className={classNames(classes.mainContainer, "contentDetalleTributo", "mainContainer")}>
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={8} className={this.state.tablaExpandida ? classNames("container", classes.transExtencionCol1) : classNames("container", classes.transDesExtencionCol1)}>
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
                                tablaExpandida={this.state.tablaExpandida}
                                handleExpandirTabla={this.handleExpandirTabla}
                                textoBeneficioAplicado={descuentoBeneficio}
                                setRegistrosSeleccionados={this.setRegistrosSeleccionados}
                                deudaTotales={deudaTotales}
                                rowList={rowList}
                                registrosSeleccionados={registrosSeleccionados}
                                tablaConfig={
                                    {
                                        columnas: {
                                            concepto: 'Concepto',
                                            vencimiento: 'Fecha',
                                            base: 'Base ($)',
                                            recargo: 'Recargo ($)',
                                            deduccion: 'Deducción ($)',
                                            importe: 'Total ($)',
                                            referencia: 'Referencia',
                                        },
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
                                        tipoTributo: this.tributo,
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

                    <Grid item xs={4} className={this.state.tablaExpandida ? classNames("container", classes.transExtencionCol2) : "container"}>
                        {/* Bloque Datos Generales */}
                        <MiCard>
                            <Typography className={classes.title} variant="title">Datos Generales</Typography>
                            <Divider className={classes.divider} />
                            <Grid container spacing={16}>
                                <Grid item sm={4}>
                                    <Typography variant="subheading" gutterBottom>Titular: </Typography>
                                </Grid>
                                <Grid item sm={8}>
                                    <Typography variant="subheading" gutterBottom>
                                        <b>{infoPlan && infoPlan.titular}</b>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={16}>
                                <Grid item sm={4}>
                                    <Typography variant="subheading" gutterBottom>CUIT: </Typography>
                                </Grid>
                                <Grid item sm={8}>
                                    <Typography variant="subheading" gutterBottom>
                                        <b>{infoPlan && infoPlan.cuit}</b>
                                    </Typography>
                                </Grid>
                            </Grid>

                            {this.idTipoTributo ==  this.props.tipoTributos.byValue['Inmueble'] &&
                            <Grid container spacing={16}>
                                <Grid item sm={4}>
                                    <Typography variant="subheading" gutterBottom>Ubicación: </Typography>
                                </Grid>
                                <Grid item sm={8}>
                                <i className={classNames(classes.locationIcon,'material-icons')} onClick={this.hableRedirectLocation}>
                                        location_on
                                    </i>
                                </Grid>
                            </Grid>}

                        </MiCard>



                        <MiCard rootClassName={classNames("otrasOperaciones", classes.contentMargin)}>
                            {/* Bloque Otras Operaciones */}
                            <Typography className={classes.title} variant="title">Otras operaciones</Typography>
                            <Divider className={classes.divider} />

                            <Grid container spacing={16}>
                                <Grid item sm={2}>
                                    <svg className={classes.icon} viewBox="0 0 24 24">
                                        <path fill="#149257" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z" />
                                    </svg>
                                </Grid>
                                <Grid item sm={10}>
                                    <MiControledDialog
                                        paraMobile={this.props.paraMobile}
                                        open={informeCuenta.modal.open}
                                        onDialogoOpen={this.onInformeCuentaDialogoOpen}
                                        onDialogoClose={this.onInformeCuentaDialogoClose}
                                        textoLink={'Informe de Cuenta'}
                                        titulo={'Informe de Cuenta al día ' + dateToString(new Date(), 'DD/MM/YYYY')}
                                        classMaxWidth={!informeCuenta.modal.showReporte ? classes.maxWidthInformeCuenta : classes.maxWidthPDF}
                                        footerFixed={true}
                                    >
                                        <div key="headerContent"></div>
                                        <div key="mainContent">
                                            {!informeCuenta.modal.showReporte && <div>
                                                <Typography className={classes.title} variant="title">Deuda Total: <b>$ {formatNumber(informeCuenta.info.total)} </b></Typography>
                                                <Divider className={classes.divider} />
                                                <Grid container spacing={16}>
                                                    <Grid item sm={4}>
                                                        <Typography variant="subheading" gutterBottom>Total vencida: </Typography>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <Typography variant="subheading" gutterBottom>
                                                            <b>$ {formatNumber(informeCuenta.info.totalVencida)} </b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={16}>
                                                    <Grid item sm={4}>
                                                        <Typography variant="subheading" gutterBottom>Total a vencer: </Typography>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <Typography variant="subheading" gutterBottom>
                                                            <b>$ {formatNumber(informeCuenta.info.totalAVencer)} </b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <br />
                                                <Typography className={classes.title} variant="title">Administrativa</Typography>
                                                <Divider className={classes.divider} />
                                                <Grid container spacing={16}>
                                                    <Grid item sm={4}>
                                                        <Typography variant="subheading" gutterBottom>Vencida: </Typography>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <Typography variant="subheading" gutterBottom>
                                                            <b>$ {formatNumber(informeCuenta.info.administrativaVencida)} </b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={16}>
                                                    <Grid item sm={4}>
                                                        <Typography variant="subheading" gutterBottom>A vencer: </Typography>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <Typography variant="subheading" gutterBottom>
                                                            <b>$ {formatNumber(informeCuenta.info.administrativaAVencer)} </b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={16}>
                                                    <Grid item sm={4}>
                                                        <Typography variant="subheading" gutterBottom>Fiscalizacion: </Typography>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <Typography variant="subheading" gutterBottom>
                                                            <b>$ {formatNumber(informeCuenta.info.fiscalizacion)} </b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={16}>
                                                    <Grid item sm={4}>
                                                        <Typography variant="subheading" gutterBottom>Quiebra: </Typography>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <Typography variant="subheading" gutterBottom>
                                                            <b>$ {formatNumber(informeCuenta.info.quiebra)} </b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <br />
                                                <Typography className={classes.title} variant="title">Plan</Typography>
                                                <Divider className={classes.divider} />
                                                <Grid container spacing={16}>
                                                    <Grid item sm={4}>
                                                        <Typography variant="subheading" gutterBottom>Vencida: </Typography>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <Typography variant="subheading" gutterBottom>
                                                            <b>$ {formatNumber(informeCuenta.info.planesVencida)} </b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={16}>
                                                    <Grid item sm={4}>
                                                        <Typography variant="subheading" gutterBottom>A vencer: </Typography>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <Typography variant="subheading" gutterBottom>
                                                            <b>$ {formatNumber(informeCuenta.info.planAVencer)} </b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <br />
                                                <Typography className={classes.title} variant="title">Capital - Gastos</Typography>
                                                <Divider className={classes.divider} />
                                                <Grid container spacing={16}>
                                                    <Grid item sm={4}>
                                                        <Typography variant="subheading" gutterBottom>Juicios Capital: </Typography>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <Typography variant="subheading" gutterBottom>
                                                            <b>$ {formatNumber(informeCuenta.info.capitalVencida)} </b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={16}>
                                                    <Grid item sm={4}>
                                                        <Typography variant="subheading" gutterBottom>Honorarios-Gastos: </Typography>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <Typography variant="subheading" gutterBottom>
                                                            <b>$ {formatNumber(informeCuenta.info.gastosVencida)} </b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </div>}

                                            {informeCuenta.modal.showReporte && <div>
                                                {informeCuenta.reporteBase64 && informeCuenta.reporteBase64 != '' &&
                                                    <MiPDFPrinter
                                                        base64File={'data:application/pdf;base64,' + informeCuenta.reporteBase64}
                                                        textoLink={'Descargar Informe de Cuenta'}
                                                        textoFile={'Informe de Cuenta'} />}
                                                {!informeCuenta.reporteBase64 && 'En este momento no se puede generar el detalle para imprimir, estamos trabajando en ello.'}
                                            </div>}
                                        </div>
                                        <div key="footerContent" className={classes.buttonFotterDialog}>
                                            {!informeCuenta.modal.showReporte && <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.buttonActions}
                                                onClick={this.onInformeCuentaShowReporte}
                                            >
                                                Imprimir Detalle
                                        </Button>}

                                            {informeCuenta.modal.showReporte && <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.buttonActions}
                                                onClick={this.onInformeCuentaHideReporte}
                                            >
                                                Volver
                                        </Button>}
                                        </div>
                                    </MiControledDialog>
                                </Grid>
                            </Grid>

                            <Grid container spacing={16}>
                                <Grid item sm={2}>
                                    <svg className={classes.icon} viewBox="0 0 24 24">
                                        <path fill="#149257" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z" />
                                    </svg>
                                </Grid>
                                <Grid item sm={10}>
                                    <MiLinkDialog
                                        paraMobile={this.props.paraMobile}
                                        textoLink={'Datos de Cuenta'}
                                        titulo={'Datos de Cuenta'}
                                    >
                                        <div className={classes.textDatosCuenta}>
                                            {(Array.isArray(infoDatosCuenta) && infoDatosCuenta.map((item, index) => {
                                                return <div key={index}>{item}</div>;
                                            })) || (!Array.isArray(infoDatosCuenta) && infoDatosCuenta)}
                                        </div>
                                    </MiLinkDialog>
                                </Grid>
                            </Grid>

                            <Grid container spacing={16}>
                                <Grid item sm={2}>
                                    <svg className={classes.icon} viewBox="0 0 24 24">
                                        <path fill="#149257" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z" />
                                    </svg>
                                </Grid>
                                <Grid item sm={10}>
                                    <MiControledDialog
                                        paraMobile={this.props.paraMobile}
                                        open={periodosAdeudados.modal.open}
                                        onDialogoOpen={this.onPeriodosAdeudadosDialogoOpen}
                                        onDialogoClose={this.onPeriodosAdeudadosDialogoClose}
                                        textoLink={'Períodos Adeudados'}
                                        titulo={'Períodos Adeudados'}
                                        classMaxWidth={classes.maxWidthPeriodosAdeudados}
                                    >
                                        <MiTabla
                                            pagination={!this.props.paraMobile}
                                            columns={[
                                                { id: 'concepto', type: 'string', numeric: false, disablePadding: false, label: 'Concepto' },
                                                { id: 'vencimiento', type: 'date', numeric: false, disablePadding: false, label: 'Vencimiento' },
                                                { id: 'base', type: 'string', numeric: true, disablePadding: false, label: 'Base($)' },
                                                { id: 'recargo', type: 'string', numeric: true, disablePadding: false, label: 'Recargo($)' },
                                                { id: 'deduccion', type: 'string', numeric: true, disablePadding: false, label: 'Deducción($)' },
                                                { id: 'importe', type: 'string', numeric: true, disablePadding: false, label: 'Importe($)' },
                                                { id: 'observacion', type: 'string', numeric: false, disablePadding: true, label: 'Observaciones' },
                                            ]}
                                            rows={periodosAdeudados.infoGrilla || []}
                                            order='asc'
                                            orderBy='vencimiento'
                                            check={false}
                                            rowsPerPage={5}
                                            classes={{
                                                root: classes.miTabla
                                            }}
                                        />
                                    </MiControledDialog>
                                </Grid>
                            </Grid>

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

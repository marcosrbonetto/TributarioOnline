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
import servicesRepresentantes from '@Rules/Rules_Representantes';

//Información
import { vencimientosTributo } from '../vencimientosTributos';
import { infoExplicativaTributos } from '../infoExplicativaTributos.js';

//Funciones Útiles
import { formatNumber, stringToDate, diffDays, getIdTipoTributo, dateToString } from "@Utils/functions"

const mapStateToProps = state => {
    return {
        loggedUser: state.Usuario.loggedUser,
        tipoTributos: state.MainContent.tipoTributos,
        tipoCedulones: state.MainContent.tipoCedulones,
        paraMobile: state.MainContent.paraMobile,
        tributosBienesPorCUIT: state.AfipController.tributosBienesPorCUIT
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

class DetalleMulta extends React.PureComponent {
    constructor(props) {
        super(props);

        this.token = 'INVITADO'; //this.props.loggedUser.token; -- Permitimos que INVITADOS Y VV Vean Multas

        this.idTipoTributo = getIdTipoTributo(decodeURIComponent(this.props.match.params.tributo));
        this.tipoTributo = decodeURIComponent(this.props.match.params.tributo);
        this.identificador = decodeURIComponent(this.props.match.params.identificador);

        this.initialState = {
            tablaExpandida: false,
            registrosSeleccionados: [],
            infoMulta: {},
            deudaTotales: {},
            rowList: undefined,
            descuentoBeneficio: undefined,
            nombreTitular: undefined,
            cuitTitular: undefined,
            tieneMultas: undefined
        };

        this.state = _.clone(this.initialState);
    }

    componentDidMount() {
        this.init(this.token, this.idTipoTributo, this.identificador);
    }

    init = (token, idTipoTributo, identificador) => {
        this.props.mostrarCargando(true);

        const service1 = servicesRepresentantes.getTitularTributo(token, {
            tipoTributo: idTipoTributo,
            identificador: identificador,
        }).then((datos) => {
            if (!datos.ok) { console.log('Error: ' + datos.error); return false; } //mostrarAlerta('Períodos: ' + datos.error); return false; }

            this.setState({
                nombreTitular: datos.return.titular,
                cuitTitular: datos.return.cuit
            });
        }).catch(err => {
            console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
            this.props.mostrarCargando(false);
        });

        const service2 = servicesTributarioOnline.getSiTieneMultas(token, idTipoTributo, identificador)
            .then((datos) => {
                if (!datos.ok) { console.log('Error: ' + datos.error); return false; } //mostrarAlerta('Períodos: ' + datos.error); return false; }

                this.setState({
                    tieneMultas: datos.return
                });
                
            }).catch(err => {
                console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
                this.props.mostrarCargando(false);
            });

        const service3 = servicesTributarioOnline.getInfoMultas(token, idTipoTributo, identificador)
            .then((datos) => {
                if (!datos.ok) {
                    this.setState({
                        rowList: []
                    });
                    console.log('Error: ' + datos.error);
                } else {
                    const infoMultas = datos.return.titular || {};
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
                                <i class="material-icons  iconosDetalle" style={{ color: '#149257', cursor: 'pointer' }}>add_circle_outline</i>
                            </MiTooltip>,
                            data: concepto //atributo "data" no se muestra en MiTabla
                        }
                    });

                    this.setState({
                        deudaTotales: deudaTotales,
                        rowList: rowList,
                        infoMultas: infoMultas,
                        descuentoBeneficio: descuentoBeneficio
                    });
                }
            }).catch(err => {
                console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
                this.props.mostrarCargando(false);
            });

        Promise.all([service1, service2, service3]).then(() => {
            this.props.mostrarCargando(false);
        });
    }

    setRegistrosSeleccionados = (registrosSeleccionados, misPagosProps) => {
        this.setState({
            registrosSeleccionados: registrosSeleccionados
        });
    };

    handleCuentaOrigen = () => {
        this.props.redireccionar('/DetalleTributario/' + this.tipoTributo + '/' + this.identificador + '/multas/' + encodeURIComponent(this.identificador));
    };

    hableRedirectLocation = () => {
        if (!this.idTipoTributo == this.props.tipoTributos.byValue['Inmueble']) return false;

        const identificador = this.identificador;
        const identificadorLocation = identificador.substr(0, 2) + '-' + identificador.substr(2, 2) + '-' + identificador.substr(4, 3) + '-' + identificador.substr(7, 3);

        window.open('http://srv-lincatastro04/emap/?nomenclatura=' + identificadorLocation, '_blank');
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
            infoMultas,
            descuentoBeneficio,
            nombreTitular,
            cuitTitular,
            tieneMultas
        } = this.state;

        //En esta condición si viene en multas "Si tiene" pero la consulta trae 0, procedemos a mostrar un cartel de información
        const condicionMulta = tieneMultas && rowList && rowList.length == 0;

        return (
            <div className={classNames(classes.mainContainer, "contentDetalleTributo", "mainContainer")}>
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={8} className={this.state.tablaExpandida ? classNames("container", classes.transExtencionCol1) : classNames("container", classes.transDesExtencionCol1)}>
                        <MiCard>
                            {/* Titulo y selección de identificador */}
                            <Typography className={classes.title} variant="title">
                                Multa: <b>{this.identificador}</b>
                                {cuitTitular && //Si no viene el CUIT es porq el tributo no está radicado en CBA y por ende no se puede motrar el detalle de la cuenta padre
                                    <Button
                                        onClick={this.handleCuentaOrigen}
                                        className={this.props.paraMobile ? classes.btnCuentaOrigenParaMobile : classes.btnCuentaOrigen}
                                        variant="outlined"
                                        color="secondary">
                                        Ver Cuenta Origen</Button>
                                }
                            </Typography>

                            {rowList && rowList.length > 0 && <React.Fragment>
                                <Typography className={classes.infoTexto}>
                                    {`En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`}
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
                                                concepto: 'Causa',
                                                vencimiento: 'Fecha',
                                                base: 'Base ($)',
                                                recargo: 'Recargo ($)',
                                                deduccion: 'Deducción ($)',
                                                importe: 'Importe ($)',
                                                referencia: 'Descripción',
                                            },
                                            order: 'asc',
                                            orderBy: 'concepto',
                                            check: true,
                                        }
                                    }
                                    cedulonConfig={
                                        {
                                            subItem: this.identificador,
                                            tipoCedulon: this.props.tipoCedulones.byKey[2],
                                            tipoTributo: this.tipoTributo,
                                            idTipoTributo: getIdTipoTributo(this.tipoTributo),
                                            identificador: this.identificador,
                                        }
                                    }
                                    mercadoPagoConfig={
                                        {
                                            pagoRedirect: '/DetalleTributario/Multas/' + this.tipoTributo + '/' + this.identificador,
                                            idBtnMercadoPago: 'btnPago' + this.identificador,
                                            seccionDetalleTributo: undefined,
                                        }
                                    }
                                    labelsTotales={
                                        {
                                            totalesDeuda: 'Administrativa de Multas',
                                            vencida: 'Deuda vencida',
                                            aVencer: 'A Vencer',
                                        }
                                    }
                                />
                            </React.Fragment>
                                ||
                                <Typography className={classes.infoTexto}>
                                    {condicionMulta ? `Dirígase a Tribunales Administrativos Municipales de Faltas (Nicolás Avellaneda 439)` : (rowList ? `Le informamos que no posee multas` : `Cargando...`)}
                                </Typography>}
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
                                        <b>{nombreTitular || '-'}</b>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={16}>
                                <Grid item sm={4}>
                                    <Typography variant="subheading" gutterBottom>CUIT: </Typography>
                                </Grid>
                                <Grid item sm={8}>
                                    <Typography variant="subheading" gutterBottom>
                                        <b>{cuitTitular || '-'}</b>
                                    </Typography>
                                </Grid>
                            </Grid>

                            {this.idTipoTributo == this.props.tipoTributos.byValue['Inmueble'] &&
                                <Grid container spacing={16}>
                                    <Grid item sm={4}>
                                        <Typography variant="subheading" gutterBottom>Ubicación: </Typography>
                                    </Grid>
                                    <Grid item sm={8}>
                                        <i className={classNames(classes.locationIcon, 'material-icons')} onClick={this.hableRedirectLocation}>
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
                                    <MiLinkDialog
                                        paraMobile={this.props.paraMobile}
                                        textoLink={'Información del tributo'}
                                        titulo={'Información del tributo'}
                                    >
                                        {infoExplicativaTributos(this.idTipoTributo)}
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
                                    <MiLinkDialog
                                        paraMobile={this.props.paraMobile}
                                        textoLink={'Agenda de Vencimientos'}
                                        titulo={'Agenda de Vencimientos'}
                                    >
                                        {vencimientosTributo(this.idTipoTributo)}
                                    </MiLinkDialog>
                                </Grid>
                            </Grid>

                        </MiCard>
                    </Grid>
                </Grid>
            </div >
        );
    }
}

let componente = DetalleMulta;
componente = withStyles(styles)(componente);
componente = connect(
    mapStateToProps,
    mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

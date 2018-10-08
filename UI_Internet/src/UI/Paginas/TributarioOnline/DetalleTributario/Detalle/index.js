import React from "react";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
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
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import Modal from '@material-ui/core/Modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Menu from '@material-ui/core/Menu';

//Custom Components
import MiCard from "@Componentes/MiCard";
import MiTabla from "@Componentes/MiTabla";
import MiLinkDialog from "@Componentes/MiLinkDialog";

import cedulonFoto from './img/cedulon.png';
import cedulonFoto2 from './img/MP4.png';

import { getInfoContribucion, getInfoMultas, getDatosCuenta } from "@ReduxSrc/TributarioOnline/DetalleTributario/actions";

import services from '@Rules/Rules_TributarioOnline';

import { stringToFloat, stringToDate, diffDays } from "@Utils/functions"

const mapStateToProps = state => {
    return {
        infoContribucion: state.DetalleTributario.infoContribucion,
        infoMultas: state.DetalleTributario.infoMultas,
        datosCuenta: state.DetalleTributario.datosCuenta,
    };
};

const mapDispatchToProps = dispatch => ({
    mostrarCargando: (cargar) => {
        dispatch(mostrarCargando(cargar));
    },
    setPropsInfoContribucion: (datos) => {
        dispatch(getInfoContribucion(datos));
    },
    setPropsInfoMultas: (datos) => {
        dispatch(getInfoMultas(datos));
    },
    setPropsDatosCuenta: (datos) => {
        dispatch(getDatosCuenta(datos));
    },
    redireccionar: url => {
        dispatch(replace(url));
    }
});

class DetalleTributo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            identificadorActual: this.props.match.params.identificador,
            menuItemSeleccionado: 'contribucion',
            mostrarAlternativaPlan: false,
            contribucion: {
                paramDatos: 'infoContribucion',
                order: 'asc',
                orderBy: 'concepto',
                labels: {
                    detalleTitulo: 'Contribución por Período',
                    totalesDeuda: 'Administrativa',
                    vencida: 'Deuda vencida',
                    aVencer: 'A vencer',
                    columnas: ['Concepto', 'Vencimiento', 'Importe ($)']
                }
            },
            multas: {
                paramDatos: 'infoMultas',
                order: 'asc',
                orderBy: 'vencimiento',
                labels: {
                    detalleTitulo: 'Multas',
                    totalesDeuda: 'Administrativa',
                    vencida: 'Deuda vencida',
                    aVencer: 'A vencer',
                    columnas: ['Causa', 'Fecha', 'Total ($)']
                }
            },
            juicioContribucion: {
                paramDatos: 'infoJuicioContribucion',
                order: 'asc',
                orderBy: 'concepto',
                labels: {
                    detalleTitulo: 'Juicio por Contribucion',
                    totalesDeuda: 'del Juicio',
                    vencida: 'Capital',
                    aVencer: 'Gastos',
                    columnas: ['Concepto', 'Vencimiento', 'Importe ($)']
                }
            },
            juicioMultas: {
                paramDatos: 'infoJuicioMultas',
                order: 'asc',
                orderBy: 'concepto',
                labels: {
                    detalleTitulo: 'Juicio por Multas',
                    totalesDeuda: 'del Juicio',
                    vencida: 'Capital',
                    aVencer: 'Gastos',
                    columnas: ['Concepto', 'Vencimiento', 'Importe ($)']
                }
            },
            planesPago: {
                paramDatos: 'infoPlanesPago',
                order: 'asc',
                orderBy: 'concepto',
                labels: {
                    detalleTitulo: 'Planes de Pago',
                    totalesDeuda: 'Administrativa',
                    vencida: 'Vencida',
                    aVencer: 'A vencer',
                    columnas: ['Concepto', 'Fecha', 'Total ($)']
                }
            }
        };
    }

    componentWillMount() {
        this.props.mostrarCargando(true);

        const service1 = services.getInfoContribucion(this.props.match.params.identificador)
            .then((datos) => {
                this.props.setPropsInfoContribucion(datos);
            });

        const service2 = services.getInfoMultas(this.props.match.params.identificador)
            .then((datos) => {
                this.props.setPropsInfoMultas(datos);
            });

        Promise.all([service1, service2]).then(() => {
            this.props.mostrarCargando(false);
        });
    }

    componentDidUpdate() {
        //Solo se muetra "Alternativa de plan" cuando existe una fecha mayor a 60 días
        const seccion = this.state.menuItemSeleccionado;
        const datosSeccion = this.state[seccion].paramDatos;
        let mostrarAlternativaPlan = false;
        
        this.props[datosSeccion].rowList && this.props[datosSeccion].rowList.some((item) => {
            
            if(diffDays(stringToDate(item.vencimiento),new Date()) >= 60) {
                mostrarAlternativaPlan = true;
                return true;
            }

        });

        this.setState({
            mostrarAlternativaPlan: mostrarAlternativaPlan
        });
    }

    selectIdentificador = event => {
        if (event.target.value == '0')
            return false;


        this.setState({
            identificadorActual: event.target.value
        });

        this.props.mostrarCargando(true);
        this.props.redireccionar('/DetalleTributario/' + this.props.match.params.tributo + '/' + event.target.value);
        window.location.reload();//Recargamos la pagina con la nueva url
    };

    handleMenuChange = (event, value) => {

        this.setState({
            menuItemSeleccionado: value
        });
    };

    dialogGetDatosCuenta = event => {
        return new Promise((resolve, reject) => {
            if (!this.props.datosCuenta) {
                this.props.mostrarCargando(true);
                return services.getDatosCuenta(this.props.match.params.identificador)
                    .then((datos) => {

                        this.props.setPropsDatosCuenta(datos);
                        this.props.mostrarCargando(false);

                        resolve(this.props.datosCuenta);
                    })
                    .catch(function (e) {
                        reject(e);
                    });
            } else {
                resolve(this.props.datosCuenta);
            }
        });
    };

    render() {
        const { classes } = this.props;

        const infoContribucion = this.props.infoContribucion ? this.props.infoContribucion.rowList : [];
        const infoMultas = this.props.infoMultas ? this.props.infoMultas.rowList : [];
        const infoJuiciosContribucion = this.props.infoJuiciosContribucion ? this.props.infoJuiciosContribucion.rowList : [];
        const infoJuiciosMultas = this.props.infoJuiciosMultas ? this.props.infoJuiciosMultas.rowList : [];
        const infoPlanesPago = this.props.infoPlanesPago ? this.props.infoPlanesPago.rowList : [];

        return (
            <div className={classes.mainContainer}>
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={8}>
                        <MiCard>
                            <Typography className={classes.title} variant="title">Dominio:
                            <Select
                                    className={classes.selectIdentificador}
                                    inputProps={{
                                        name: 'identificador',
                                        id: 'identificador',
                                    }}
                                    value={this.state.identificadorActual}
                                    disableUnderline
                                    onChange={this.selectIdentificador}
                                >
                                    <MenuItem value="HCJ675">HCJ675</MenuItem>
                                    <MenuItem value="FGH454">FGH454</MenuItem>
                                </Select>
                                - {this.state[this.state.menuItemSeleccionado].labels.detalleTitulo}
                            </Typography>

                            <Typography className={classes.infoTexto}>
                                {`En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`}
                            </Typography>

                            <Grid container spacing={16}>
                                <Grid item sm={12} className={classes.tabMenu}>

                                    <Tabs
                                        value={this.state.menuItemSeleccionado}
                                        onChange={this.handleMenuChange}
                                        indicatorColor="secondary"
                                        textColor="secondary"
                                        scrollable
                                        scrollButtons="on"
                                    >

                                        <Tab className={classes.itemMenu} value="contribucion" label={<Badge className={classes.badgeTab} classes={{ badge: classes.badgeMenu }} color="secondary" badgeContent={infoContribucion ? infoContribucion.length : 0}><div>Contribución por período</div></Badge>} />

                                        <Tab className={classes.itemMenu} value="multas" label={<Badge className={classes.badgeTab} classes={{ badge: classes.badgeMenu }} color="secondary" badgeContent={infoMultas ? infoMultas.length : 0}><div>Multas</div></Badge>} />

                                        <Tab className={classes.itemMenu} value="juicioContribucion" label={<Badge className={classes.badgeTab} classes={{ badge: classes.badgeMenu }} color="secondary" badgeContent={infoJuiciosContribucion ? infoJuiciosContribucion.length : 0}><div>Juicios por contribución</div></Badge>} />

                                        <Tab className={classes.itemMenu} value="juicioMultas" label={<Badge className={classes.badgeTab} classes={{ badge: classes.badgeMenu }} color="secondary" badgeContent={infoJuiciosMultas ? infoJuiciosMultas.length : 0}><div>Juicios por multas</div></Badge>} />

                                        <Tab className={classes.itemMenu} value="planesPago" label={<Badge className={classes.badgeTab} classes={{ badge: classes.badgeMenu }} color="secondary" badgeContent={infoPlanesPago ? infoPlanesPago.length : 0}><div>Planes de pago</div></Badge>} />

                                    </Tabs>

                                </Grid>
                            </Grid>

                            {/* Contribución por período */}
                            {this.state.menuItemSeleccionado == 'contribucion' && <div>
                                <MisPagos
                                    classes={classes}
                                    info={this.props.infoContribucion || null}
                                    menuItemSeleccionado={this.state.menuItemSeleccionado}
                                    data={this.state[this.state.menuItemSeleccionado]}
                                />
                            </div>}

                            {/* Multas */}
                            {this.state.menuItemSeleccionado == 'multas' && <div>
                                <MisPagos
                                    classes={classes}
                                    info={this.props.infoMultas || null}
                                    menuItemSeleccionado={this.state.menuItemSeleccionado}
                                    data={this.state[this.state.menuItemSeleccionado]}
                                />
                            </div>}

                            {/* Juicio por Contribucion */}
                            {this.state.menuItemSeleccionado == 'juicioContribucion' && <div>
                                <MisPagos
                                    classes={classes}
                                    info={this.props.infoJuiciosContribucion || null}
                                    menuItemSeleccionado={this.state.menuItemSeleccionado}
                                    data={this.state[this.state.menuItemSeleccionado]}
                                    noCheck={true}
                                />
                            </div>}

                            {/* Juicio por Multas */}
                            {this.state.menuItemSeleccionado == 'juicioMultas' && <div>
                                <MisPagos
                                    classes={classes}
                                    info={this.props.infoJuiciosMultas || null}
                                    menuItemSeleccionado={this.state.menuItemSeleccionado}
                                    data={this.state[this.state.menuItemSeleccionado]}
                                    noCheck={true}
                                />
                            </div>}

                            {/* Planes de Pago */}
                            {this.state.menuItemSeleccionado == 'planesPago' && <div>
                                <MisPagos
                                    classes={classes}
                                    info={this.props.infoPlanesPago || null}
                                    menuItemSeleccionado={this.state.menuItemSeleccionado}
                                    data={this.state[this.state.menuItemSeleccionado]}
                                />
                            </div>}

                        </MiCard>
                    </Grid>
                    <Grid item xs={4}>
                        <MiCard>
                            <Typography className={classes.title} variant="title">Datos Generales</Typography>
                            <Divider className={classes.divider} />
                            <Grid container spacing={16}>
                                <Grid item sm={4}>
                                    <Typography variant="subheading" gutterBottom>Titular: </Typography>
                                </Grid>
                                <Grid item sm={8}>
                                    <Typography variant="subheading" gutterBottom>
                                        <b>{this.props.infoContribucion.titular && this.props.infoContribucion.titular.titular}</b>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={16}>
                                <Grid item sm={4}>
                                    <Typography variant="subheading" gutterBottom>CUIT: </Typography>
                                </Grid>
                                <Grid item sm={8}>
                                    <Typography variant="subheading" gutterBottom>
                                        <b>{this.props.infoContribucion.titular && this.props.infoContribucion.titular.cuit}</b>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={16}>
                                <Grid item sm={4}>
                                    <Typography variant="subheading" gutterBottom>Identificador: </Typography>
                                </Grid>
                                <Grid item sm={8}>
                                    <Typography variant="subheading" gutterBottom>
                                        <b>{this.props.match.params.identificador}</b>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={16}>
                                <Grid item sm={4}>
                                    <Typography variant="subheading" gutterBottom>Juicios: </Typography>
                                </Grid>
                                <Grid item sm={8}>
                                    <Typography variant="subheading" gutterBottom>
                                        <b>{this.props.infoContribucion.tieneJuicios ? 'Si tiene' : 'No tiene'}</b>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={16}>
                                <Grid item sm={4}>
                                    <Typography variant="subheading" gutterBottom>Planes: </Typography>
                                </Grid>
                                <Grid item sm={8}>
                                    <Typography variant="subheading" gutterBottom>
                                        <b>{this.props.infoContribucion.tienePlanes ? 'Si tiene' : 'No tiene'}</b>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={16}>
                                <Grid item sm={4}>
                                    <Typography variant="subheading" gutterBottom>Multas: </Typography>
                                </Grid>
                                <Grid item sm={8}>
                                    <Typography variant="subheading" gutterBottom>
                                        <b>{this.props.infoContribucion.tieneMultas ? 'Si tiene' : 'No tiene'}</b>
                                    </Typography>
                                </Grid>
                            </Grid>

                        </MiCard>
                        <br />
                        <MiCard>
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
                                        textoLink={'Informe de Cuenta'}
                                        titulo={'Informe de Cuenta'}
                                    >
                                        Contenido Informe de Cuenta!
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
                                        textoLink={'Datos de Cuenta'}
                                        titulo={'Datos de Cuenta'}
                                        promiseBeforeOpen={this.dialogGetDatosCuenta}
                                    >
                                        {this.props.datosCuenta && this.props.datosCuenta.datosCuenta.map((item) => {
                                            return <div>{item}</div>;
                                        })}
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
                                        textoLink={'Últimos pagos'}
                                        titulo={'Últimos pagos'}
                                    >
                                        Contenido Últimos pagos!
                                        </MiLinkDialog>
                                </Grid>
                            </Grid>

                            {/* NO Planes de Pago */}
                            {this.state.menuItemSeleccionado != 'planesPago' && <div>

                                {this.state.mostrarAlternativaPlan && <div>
                                    <Grid container spacing={16}>
                                        <Grid item sm={2}>
                                            <svg className={classes.icon} viewBox="0 0 24 24">
                                                <path fill="#149257" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z" />
                                            </svg>
                                        </Grid>
                                        <Grid item sm={10}>
                                            <MiLinkDialog
                                                textoLink={'Alternativa de plan'}
                                                titulo={'Alternativa de plan'}
                                            >
                                                Contenido Alternativa de plan!
                                            </MiLinkDialog>
                                        </Grid>
                                    </Grid>
                                </div>}

                                <Grid container spacing={16}>
                                    <Grid item sm={2}>
                                        <svg className={classes.icon} viewBox="0 0 24 24">
                                            <path fill="#ED1C24" d="M14,9H19.5L14,3.5V9M7,2H15L21,8V20A2,2 0 0,1 19,22H7C5.89,22 5,21.1 5,20V4A2,2 0 0,1 7,2M11.93,12.44C12.34,13.34 12.86,14.08 13.46,14.59L13.87,14.91C13,15.07 11.8,15.35 10.53,15.84V15.84L10.42,15.88L10.92,14.84C11.37,13.97 11.7,13.18 11.93,12.44M18.41,16.25C18.59,16.07 18.68,15.84 18.69,15.59C18.72,15.39 18.67,15.2 18.57,15.04C18.28,14.57 17.53,14.35 16.29,14.35L15,14.42L14.13,13.84C13.5,13.32 12.93,12.41 12.53,11.28L12.57,11.14C12.9,9.81 13.21,8.2 12.55,7.54C12.39,7.38 12.17,7.3 11.94,7.3H11.7C11.33,7.3 11,7.69 10.91,8.07C10.54,9.4 10.76,10.13 11.13,11.34V11.35C10.88,12.23 10.56,13.25 10.05,14.28L9.09,16.08L8.2,16.57C7,17.32 6.43,18.16 6.32,18.69C6.28,18.88 6.3,19.05 6.37,19.23L6.4,19.28L6.88,19.59L7.32,19.7C8.13,19.7 9.05,18.75 10.29,16.63L10.47,16.56C11.5,16.23 12.78,16 14.5,15.81C15.53,16.32 16.74,16.55 17.5,16.55C17.94,16.55 18.24,16.44 18.41,16.25M18,15.54L18.09,15.65C18.08,15.75 18.05,15.76 18,15.78H17.96L17.77,15.8C17.31,15.8 16.6,15.61 15.87,15.29C15.96,15.19 16,15.19 16.1,15.19C17.5,15.19 17.9,15.44 18,15.54M8.83,17C8.18,18.19 7.59,18.85 7.14,19C7.19,18.62 7.64,17.96 8.35,17.31L8.83,17M11.85,10.09C11.62,9.19 11.61,8.46 11.78,8.04L11.85,7.92L12,7.97C12.17,8.21 12.19,8.53 12.09,9.07L12.06,9.23L11.9,10.05L11.85,10.09Z" />
                                        </svg>

                                    </Grid>
                                    <Grid item sm={10}>
                                        <MiLinkDialog
                                            textoLink={'Imprimir Informe Antecedentes'}
                                            titulo={'Imprimir Informe Antecedentes'}
                                        >
                                            Contenido Imprimir Informe Antecedentes!
                                        </MiLinkDialog>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={16}>
                                    <Grid item sm={2}>
                                        <svg className={classes.icon} viewBox="0 0 24 24">
                                            <path fill="#ED1C24" d="M14,9H19.5L14,3.5V9M7,2H15L21,8V20A2,2 0 0,1 19,22H7C5.89,22 5,21.1 5,20V4A2,2 0 0,1 7,2M11.93,12.44C12.34,13.34 12.86,14.08 13.46,14.59L13.87,14.91C13,15.07 11.8,15.35 10.53,15.84V15.84L10.42,15.88L10.92,14.84C11.37,13.97 11.7,13.18 11.93,12.44M18.41,16.25C18.59,16.07 18.68,15.84 18.69,15.59C18.72,15.39 18.67,15.2 18.57,15.04C18.28,14.57 17.53,14.35 16.29,14.35L15,14.42L14.13,13.84C13.5,13.32 12.93,12.41 12.53,11.28L12.57,11.14C12.9,9.81 13.21,8.2 12.55,7.54C12.39,7.38 12.17,7.3 11.94,7.3H11.7C11.33,7.3 11,7.69 10.91,8.07C10.54,9.4 10.76,10.13 11.13,11.34V11.35C10.88,12.23 10.56,13.25 10.05,14.28L9.09,16.08L8.2,16.57C7,17.32 6.43,18.16 6.32,18.69C6.28,18.88 6.3,19.05 6.37,19.23L6.4,19.28L6.88,19.59L7.32,19.7C8.13,19.7 9.05,18.75 10.29,16.63L10.47,16.56C11.5,16.23 12.78,16 14.5,15.81C15.53,16.32 16.74,16.55 17.5,16.55C17.94,16.55 18.24,16.44 18.41,16.25M18,15.54L18.09,15.65C18.08,15.75 18.05,15.76 18,15.78H17.96L17.77,15.8C17.31,15.8 16.6,15.61 15.87,15.29C15.96,15.19 16,15.19 16.1,15.19C17.5,15.19 17.9,15.44 18,15.54M8.83,17C8.18,18.19 7.59,18.85 7.14,19C7.19,18.62 7.64,17.96 8.35,17.31L8.83,17M11.85,10.09C11.62,9.19 11.61,8.46 11.78,8.04L11.85,7.92L12,7.97C12.17,8.21 12.19,8.53 12.09,9.07L12.06,9.23L11.9,10.05L11.85,10.09Z" />
                                        </svg>

                                    </Grid>
                                    <Grid item sm={10}>
                                        <MiLinkDialog
                                            textoLink={'Imprimir Informe REMAT'}
                                            titulo={'Imprimir Informe REMAT'}
                                        >
                                            Contenido Imprimir Informe REMAT!
                                        </MiLinkDialog>
                                    </Grid>
                                </Grid>
                            </div>}

                            {/* NO Planes de Pago */}
                            {this.state.menuItemSeleccionado == 'planesPago' && <div>
                                <Grid container spacing={16}>
                                    <Grid item sm={2}>
                                        <svg className={classes.icon} viewBox="0 0 24 24">
                                            <path fill="#149257" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z" />
                                        </svg>
                                    </Grid>
                                    <Grid item sm={10}>
                                        <MiLinkDialog
                                            textoLink={'Perìodos Adeudados'}
                                            titulo={'Perìodos Adeudados'}
                                        >
                                            Contenido Perìodos Adeudados!
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
                                            textoLink={'Perìodos Bloqueados'}
                                            titulo={'Perìodos Bloqueados'}
                                        >
                                            Contenido Perìodos Bloqueados!
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
                                            textoLink={'Simulación de Caducidad'}
                                            titulo={'Simulación de Caducidad'}
                                        >
                                            Contenido Simulación de Caducidad!
                                        </MiLinkDialog>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={16}>
                                    <Grid item sm={2}>
                                        <svg className={classes.icon} viewBox="0 0 24 24">
                                            <path fill="#ED1C24" d="M14,9H19.5L14,3.5V9M7,2H15L21,8V20A2,2 0 0,1 19,22H7C5.89,22 5,21.1 5,20V4A2,2 0 0,1 7,2M11.93,12.44C12.34,13.34 12.86,14.08 13.46,14.59L13.87,14.91C13,15.07 11.8,15.35 10.53,15.84V15.84L10.42,15.88L10.92,14.84C11.37,13.97 11.7,13.18 11.93,12.44M18.41,16.25C18.59,16.07 18.68,15.84 18.69,15.59C18.72,15.39 18.67,15.2 18.57,15.04C18.28,14.57 17.53,14.35 16.29,14.35L15,14.42L14.13,13.84C13.5,13.32 12.93,12.41 12.53,11.28L12.57,11.14C12.9,9.81 13.21,8.2 12.55,7.54C12.39,7.38 12.17,7.3 11.94,7.3H11.7C11.33,7.3 11,7.69 10.91,8.07C10.54,9.4 10.76,10.13 11.13,11.34V11.35C10.88,12.23 10.56,13.25 10.05,14.28L9.09,16.08L8.2,16.57C7,17.32 6.43,18.16 6.32,18.69C6.28,18.88 6.3,19.05 6.37,19.23L6.4,19.28L6.88,19.59L7.32,19.7C8.13,19.7 9.05,18.75 10.29,16.63L10.47,16.56C11.5,16.23 12.78,16 14.5,15.81C15.53,16.32 16.74,16.55 17.5,16.55C17.94,16.55 18.24,16.44 18.41,16.25M18,15.54L18.09,15.65C18.08,15.75 18.05,15.76 18,15.78H17.96L17.77,15.8C17.31,15.8 16.6,15.61 15.87,15.29C15.96,15.19 16,15.19 16.1,15.19C17.5,15.19 17.9,15.44 18,15.54M8.83,17C8.18,18.19 7.59,18.85 7.14,19C7.19,18.62 7.64,17.96 8.35,17.31L8.83,17M11.85,10.09C11.62,9.19 11.61,8.46 11.78,8.04L11.85,7.92L12,7.97C12.17,8.21 12.19,8.53 12.09,9.07L12.06,9.23L11.9,10.05L11.85,10.09Z" />
                                        </svg>
                                    </Grid>
                                    <Grid item sm={10}>
                                        <MiLinkDialog
                                            textoLink={'Imprimir Solicitud'}
                                            titulo={'Imprimir Solicitud'}
                                        >
                                            Contenido Imprimir Solicitud!
                                        </MiLinkDialog>
                                    </Grid>
                                </Grid>
                            </div>}
                        </MiCard>

                    </Grid>
                </Grid>
            </div>
        );
    }
}


class MisPagos extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            importeAPagar: '0,00',
            anchorEl: null,
            anchorElCedulon: null,
            modals: {
                Cedulon: false,
                MercadoPago: false
            },
        };
    }

    handleOpenModal = (event) => {
        let modal = event.currentTarget.attributes.modal.value;

        this.setState({
            modals: {
                [modal]: true
            }
        });
    };

    handleCloseModal = (event) => {
        let modal = event.currentTarget.attributes.modal.value;

        this.setState({
            modals: {
                [modal]: false
            }
        });
    };

    getFilasSeleccionadas = (filas, idFilasSeleccionadas) => {
        let importeTotal = 0;
        filas.map((item) => {
            importeTotal += parseFloat(idFilasSeleccionadas.indexOf(item.id) != -1 ? stringToFloat(item['importe']) : 0);
        });

        this.setState({ importeAPagar: importeTotal.toFixed(2).replace('.', ',') });
    };

    handlePopoverOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handlePopoverClose = () => {
        this.setState({ anchorEl: null });
    };

    handleClickCedulon = event => {
        this.setState({ anchorElCedulon: event.currentTarget });
    };

    handleCloseCedulon = () => {
        this.setState({ anchorElCedulon: null });
    };

    getCustomCell = (datosExtra) => {
        const { classes } = this.props;

        return <div>
            <Typography
                onClick={this.handlePopoverOpen}
                className={classes.link}
            >Detalle</Typography>
            <Popover
                id="simple-popper"
                open={Boolean(this.state.anchorEl)}
                anchorEl={this.state.anchorEl}
                onClose={this.handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Paper className={classes.contaninerDetalle}>
                    <div class="closePopover" onClick={this.handlePopoverClose}>x</div>
                    <Typography className={classes.typography}>Base: <b>$ {datosExtra.data.importe.base}</b></Typography>
                    <Typography className={classes.typography}>Recargo: <b>$ {datosExtra.data.importe.recargo}</b></Typography>
                    <Typography className={classes.typography}>Deducción: <b>$ {datosExtra.data.importe.deduccion}</b></Typography>
                    <Typography className={classes.typography}>Referencia: <b>{datosExtra.data.referencia}</b></Typography>
                </Paper>
            </Popover>
        </div>;
    }

    render() {
        const classes = this.props.classes;

        const deudaAdministrativa = this.props.info ? this.props.info.deudaAdministrativa : null;
        const rowList = this.props.info ? this.props.info.rowList : [];
        const columnas = this.props.data.labels.columnas || null;
        const order = this.props.data.order || 'asc';
        const orderBy = this.props.data.orderBy || 'concepto';
        const noCheck = this.props.noCheck;

        return <div>
            <Grid container className={classes.containerDeudaAdm}>
                <Typography className={classes.tituloDeudaAdm} variant="title" gutterBottom>Deuda {this.props.data.labels.totalesDeuda}</Typography>
                <Grid item sm={4}>
                    <Grid container>
                        <Grid item sm={6}>
                            <Typography variant="subheading" gutterBottom>Total: </Typography>
                        </Grid>
                        <Grid item sm={6}>
                            <Typography variant="subheading" gutterBottom><b>$ {deudaAdministrativa && deudaAdministrativa.total}</b></Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4}>
                    <Grid container>
                        <Grid item sm={6}>
                            <Typography variant="subheading" gutterBottom>{this.props.data.labels.vencida}: </Typography>
                        </Grid>
                        <Grid item sm={6}>
                            <Typography variant="subheading" gutterBottom><b>$ {deudaAdministrativa && deudaAdministrativa.vencida}</b></Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4}>
                    <Grid container>
                        <Grid item sm={6}>
                            <Typography variant="subheading" gutterBottom>{this.props.data.labels.aVencer}: </Typography>
                        </Grid>
                        <Grid item sm={6}>
                            <Typography variant="subheading" gutterBottom><b>$ {deudaAdministrativa && deudaAdministrativa.aVencer}</b></Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={16}>
                <Grid item sm={7}>
                    <TextField
                        id="standard-full-width"
                        label="Total a pagar"
                        style={{ margin: 8 }}
                        placeholder="0,00"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.importeAPagar}
                    />
                </Grid>
                <Grid item sm={5} className={classes.buttonActionsContent}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.buttonActions}
                        onClick={this.handleClickCedulon}
                    >
                        CEDULÓN
                    <Typography className={classes.buttonActionsCaption} variant="caption" gutterBottom align="center">
                            Pago Efectivo
                    </Typography>
                    </Button>
                    <Menu
                        anchorEl={this.state.anchorElCedulon}
                        open={Boolean(this.state.anchorElCedulon)}
                        onClose={this.handleCloseCedulon}
                    >
                        <MenuItem onClick={this.handleOpenModal} modal={'Cedulon'}>Hoy</MenuItem>
                        <MenuItem onClick={this.handleOpenModal} modal={'Cedulon'}>A Días</MenuItem>
                    </Menu>

                    <Button
                        variant="contained"
                        color="secondary"
                        className={classNames(classes.buttonActions, classes.buttonMercadoLibre)}
                        onClick={this.handleOpenModal}
                        modal={'MercadoPago'}
                    >
                        <Typography className={classes.buttonActionsCaption} variant="caption" gutterBottom align="center">
                            Pago Online
                    </Typography>
                    </Button>
                </Grid>
            </Grid>

            <MiTabla
                columns={[
                    { id: 'concepto', type: 'string', numeric: false, disablePadding: true, label: (columnas ? columnas[0] : 'Concepto') },
                    { id: 'vencimiento', type: 'date', numeric: false, disablePadding: true, label: (columnas ? columnas[1] : 'Vencimiento') },
                    { id: 'importe', type: 'string', numeric: false, disablePadding: true, label: (columnas ? columnas[2] : 'Importe ($)') },
                    { id: 'detalle', type: 'customCell', numeric: false, disablePadding: true, label: 'Detalle' },
                ]}
                rows={rowList || []}
                order={order}
                orderBy={orderBy}
                getFilasSeleccionadas={this.getFilasSeleccionadas}
                customCell={this.getCustomCell}
                noCheck={noCheck} />

            <Grid container spacing={16}>
                <Grid item sm={7}>
                    <TextField
                        id="standard-full-width"
                        label="Total a pagar"
                        style={{ margin: 8 }}
                        placeholder="0,00"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.importeAPagar}
                    />
                </Grid>
                <Grid item sm={5} className={classes.buttonActionsContent}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.buttonActions}
                        onClick={this.handleClickCedulon}
                    >
                        CEDULÓN
                    <Typography className={classes.buttonActionsCaption} variant="caption" gutterBottom align="center">
                            Pago Efectivo
                    </Typography>
                    </Button>
                    <Menu
                        anchorEl={this.state.anchorElCedulon}
                        open={Boolean(this.state.anchorElCedulon)}
                        onClose={this.handleCloseCedulon}
                    >
                        <MenuItem onClick={this.handleOpenModal} modal={'Cedulon'}>Hoy</MenuItem>
                        <MenuItem onClick={this.handleOpenModal} modal={'Cedulon'}>A Días</MenuItem>
                    </Menu>

                    <Button
                        variant="contained"
                        color="secondary"
                        className={classNames(classes.buttonActions, classes.buttonMercadoLibre)}
                        onClick={this.handleOpenModal}
                        modal={'MercadoPago'}
                    >
                        <Typography className={classes.buttonActionsCaption} variant="caption" gutterBottom align="center">
                            Pago Online
                    </Typography>
                    </Button>
                </Grid>
            </Grid>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.modals['Cedulon'] || false}
                onClose={this.handleCloseModal}
                modal={'Cedulon'}
            >
                <img modal={'Cedulon'} src={cedulonFoto} className={classes.imgPago} onClick={this.handleCloseModal} />
            </Modal>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.modals['MercadoPago'] || false}
                onClose={this.handleCloseModal}
                modal={'MercadoPago'}
            >
                <img modal={'MercadoPago'} src={cedulonFoto2} className={classes.imgPago2} onClick={this.handleCloseModal} />
            </Modal>
        </div>
    }

}

let componente = DetalleTributo;
componente = withStyles(styles)(componente);
componente = connect(
    mapStateToProps,
    mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

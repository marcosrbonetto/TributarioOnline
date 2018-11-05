import React from "react";
import _ from "lodash";

//Alert
import { mostrarAlerta, mostrarMensaje } from "@Utils/functions";

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
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

//Custom Components
import MiCard from "@Componentes/MiCard";
import MiTabla from "@Componentes/MiTabla";
import MiLinkDialog from "@Componentes/MiLinkDialog";
import MiControledDialog from "@Componentes/MiControledDialog"
import MiCedulon from "@Componentes/MiCedulon";
import MiMercadoPago from "@Componentes/MiMercadoPago";

//Funciones
import { getAllUrlParams } from "@Utils/functions"

//Actions - Redux
import {
    getIdTributos
} from "@ReduxSrc/TributarioOnline/actions";

import {
    getInfoContribucion,
    getInfoMultas,
    getInfoJuiciosContribucion,
    getInfoJuiciosMulta,
    getInfoPlanesPago,
    getInfoUltimosPagos,
    getInfoInformeAntecedentes,
    getInfoInformeREMAT,
    getInfoInformeCuenta,
    getInfoReporteInformeCuenta,
    setPagosMercadoPago
} from "@ReduxSrc/TributarioOnline/DetalleTributario/actions";

import servicesTributarioOnline from '@Rules/Rules_TributarioOnline';

//Funciones Útiles
import { stringToFloat, stringToDate, diffDays, getIdTipoTributo, dateToString } from "@Utils/functions"

const mapStateToProps = state => {
    return {
        loggedUser: state.MainContent.loggedUser,
        idsTributos: state.TributarioOnline.idsTributos,
        infoContribucion: state.DetalleTributario.infoContribucion,
        infoMultas: state.DetalleTributario.infoMultas,
        infoJuiciosContribucion: state.DetalleTributario.infoJuiciosContribucion,
        infoJuiciosMulta: state.DetalleTributario.infoJuiciosMulta,
        infoPlanesPago: state.DetalleTributario.infoPlanesPago,
        infoUltimosPagos: state.DetalleTributario.infoUltimosPagos,
        infoInformeAntecedentes: state.DetalleTributario.infoInformeAntecedentes,
        infoInformeREMAT: state.DetalleTributario.infoInformeREMAT,
        infoInformeCuenta: state.DetalleTributario.infoInformeCuenta,
        infoReporteInformeCuenta: state.DetalleTributario.infoReporteInformeCuenta,
        datosMisRepresentados: state.Representantes.datosMisRepresentados,
        infoPagosMercadoPago: state.DetalleTributario.infoPagosMercadoPago,
    };
};

const mapDispatchToProps = dispatch => ({
    mostrarCargando: (cargar) => {
        dispatch(mostrarCargando(cargar));
    },
    setPropsIdTributos: (datos) => {
        dispatch(getIdTributos(datos));
    },
    setPropsInfoContribucion: (datos) => {
        dispatch(getInfoContribucion(datos));
    },
    setPropsInfoMultas: (datos) => {
        dispatch(getInfoMultas(datos));
    },
    setPropsInfoJuiciosContribucion: (datos) => {
        dispatch(getInfoJuiciosContribucion(datos));
    },
    setPropsInfoJuiciosMulta: (datos) => {
        dispatch(getInfoJuiciosMulta(datos));
    },
    setPropsInfoPlanesPago: (datos) => {
        dispatch(getInfoPlanesPago(datos));
    },
    setPropsInfoUltimosPagos: (datos) => {
        dispatch(getInfoUltimosPagos(datos));
    },
    setPropsInfoInformeAntecedentes: (datos) => {
        dispatch(getInfoInformeAntecedentes(datos));
    },
    setPropsInfoInformeREMAT: (datos) => {
        dispatch(getInfoInformeREMAT(datos));
    },
    setPropsInfoInformeCuenta: (datos) => {
        dispatch(getInfoInformeCuenta(datos));
    },
    setPropsInfoReporteInformeCuenta: (datos) => {
        dispatch(getInfoReporteInformeCuenta(datos));
    },
    redireccionar: url => {
        dispatch(replace(url));
    },
    setPropsUpdatePagosMercadoPago: (arrayNexos) => {
        dispatch(setPagosMercadoPago(arrayNexos));
    }
});

class DetalleTributo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            identificadorActual: this.props.match.params.identificador, //El elejido en el combo del header
            menuItemSeleccionado: 'contribucion', //Menu seleccionado que muestra contenido MisPagos
            mostrarAlternativaPlan: false, //Se tiene que encontrar algun registro con 60 o más dias para mostrar la alternativa de plan
            infoDatosCuenta: '', //Info de cuenta que se muestra, depende de la seccion del menu en la que se encuentre menuItemSeleccionado
            informeCuenta: { //Información utilizada para mostrar informe de cuenta
                deudaTotal: 0,
                deudaVencida: {
                    total: 0,
                    administrativa: 0
                },
                deudaAVencer: {
                    total: 0,
                    administrativa: 0
                },
                modal: {
                    open: false,
                    showReporte: false
                },
                reporteBase64: ''
            },
            ultimosPagos: {
                modal: {
                    open: false
                },
                infoGrilla: undefined
            },
            informeAntecedentes: {
                modal: {
                    open: false
                },
                infoGrilla: undefined
            },
            informeREMAT: {
                modal: {
                    open: false
                },
                infoGrilla: undefined
            },
            contribucion: { //Item Menu e información
                paramDatos: 'infoContribucion',
                arrayResult: false,
                order: 'asc',
                orderBy: 'concepto',
                labels: {
                    detalleTitulo: 'Períodos',
                    totalesDeuda: 'Administrativa',
                    vencida: 'Deuda vencida',
                    aVencer: 'A vencer',
                    columnas: ['Concepto', 'Vencimiento', 'Importe ($)']
                },
                registrosSeleccionados: [],
                datosNexos: [] //Este dato se utiliza para traer los datos para los pagos de nexos siguientes al pago del primero
            },
            multas: { //Item Menu e información
                paramDatos: 'infoMultas',
                arrayResult: false,
                order: 'asc',
                orderBy: 'vencimiento',
                labels: {
                    detalleTitulo: 'Multas',
                    totalesDeuda: 'Administrativa',
                    vencida: 'Deuda vencida',
                    aVencer: 'A vencer',
                    columnas: ['Causa', 'Fecha', 'Total ($)']
                },
                registrosSeleccionados: [],
                datosNexos: [] //Este dato se utiliza para traer los datos para los pagos de nexos siguientes al pago del primero
            },
            juicios: { //Item Menu e información
                paramDatos: 'infoJuicios',
                arrayResult: true,
                order: 'asc',
                orderBy: 'concepto',
                labels: {
                    detalleTitulo: 'Juicios',
                    totalesDeuda: 'del Juicio',
                    vencida: 'Capital',
                    aVencer: 'Gastos',
                    columnas: ['Concepto', 'Vencimiento', 'Importe ($)']
                },
                menuItemSeleccionado: '',
                registrosSeleccionados: [],
                datosNexos: [] //Este dato se utiliza para traer los datos para los pagos de nexos siguientes al pago del primero
            },
            planesPago: { //Item Menu e información
                paramDatos: 'infoPlanesPago',
                arrayResult: true,
                order: 'asc',
                orderBy: 'concepto',
                labels: {
                    detalleTitulo: 'Planes',
                    totalesDeuda: 'Administrativa',
                    vencida: 'Vencida',
                    aVencer: 'A vencer',
                    columnas: ['Concepto', 'Fecha', 'Total ($)']
                },
                menuItemSeleccionado: '',
                registrosSeleccionados: [],
                datosNexos: [] //Este dato se utiliza para traer los datos para los pagos de nexos siguientes al pago del primero
            }
        };
    }

    componentDidMount() {
        /* -------- Obtenemos datos y realizamos pago del Nexo. Mostramos modal en caso que haya mas para pagar -------- */
        /* -------- Obtenemos datos y realizamos pago del Nexo. Mostramos modal en caso que haya mas para pagar -------- */

        /* NOTA: 'this.props.infoPagosMercadoPago' tiene los nexos a pagar a partir de ellos se lo actualizará para realizar los pagos */
        const token = this.props.loggedUser.token;

        const mercadoPago = getAllUrlParams(window.location.href).mercadoPago; //Ej.: true
        const seccionDetalleTributo = getAllUrlParams(window.location.href).seccionDetalleTributo; //Ej.: contribucion
        const nexo = getAllUrlParams(window.location.href).nexo; //Ej.: 183060018127
        const tipoTributo = getAllUrlParams(window.location.href).tipoTributo; //Ej.: 1
        const identificador = getAllUrlParams(window.location.href).identificador; //Ej.: HCJ675
        const tokenNexo = getAllUrlParams(window.location.href).token; //Ej.: c643dcdeae55ee341509701473ae202d
        const emisor = getAllUrlParams(window.location.href).issuer_id; //Ej.: 310
        const cuotas = getAllUrlParams(window.location.href).installments; //Ej.: 1
        const metodoPago = getAllUrlParams(window.location.href).payment_method_id; //Ej.: visa

        //Se realiza el pago del nexo y se procede a mostrar los siguientes para pagarlos
        if (mercadoPago) {
            if (this.props.infoPagosMercadoPago) {

                const result = _.filter(this.props.infoPagosMercadoPago.arrayNexos, {
                    nexo: nexo,
                    tipoTributo: parseInt(tipoTributo),
                    identificador: identificador
                });

                if (result.length == 0) return false;

                let nexoActual = result[0];

                servicesTributarioOnline.pagoMercadoPago(token, {
                    nexo: nexoActual.nexo,
                    tipoTributo: parseInt(tipoTributo),
                    identificador: identificador,
                    token: tokenNexo,
                    metodoPago: metodoPago,
                    emisor: emisor,
                    cuotas: parseInt(cuotas)
                })
                    .then((datos) => {
                        
                        if (!datos.ok) { mostrarAlerta('Pago MercadoPago: ' + datos.error); return false; }
                        
                        //Luego del pago, seteamos al nexo como pagado para luego pasarlo al componente MiMercadoPago
                        //Y muestre los nexos actualizados
                        nexoActual.token = token;
                        nexoActual.metodoPago = metodoPago;
                        nexoActual.emisor = emisor;
                        nexoActual.cuotas = cuotas;
                        nexoActual.pagado = true;
                        
                        //Al setear el "datosNexos"
                        this.setState({
                            [seccionDetalleTributo]: {
                                ...this.state[seccionDetalleTributo],
                                datosNexos: this.props.infoPagosMercadoPago
                            }
                        });

                        mostrarMensaje('Pago MercadoPago: Pago realizado exitosamente');

                    }).catch(err => {
                        
                        this.setState({
                            [seccionDetalleTributo]: {
                                ...this.state[seccionDetalleTributo],
                                datosNexos: this.props.infoPagosMercadoPago
                            }
                        });
                        console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
                    });
            }
        }

        /* -------- Obtenemos datos y realizamos pago del Nexo. Mostramos modal en caso que haya mas para pagar -------- */
        /* -------- Obtenemos datos y realizamos pago del Nexo. Mostramos modal en caso que haya mas para pagar -------- */
    }

    componentWillMount() {
        //Servicios que setean los datos en las props del store de redux
        this.props.mostrarCargando(true);
        const token = this.props.loggedUser.token;
        const tributo = getIdTipoTributo(this.props.match.params.tributo);
        const identificador = this.props.match.params.identificador;

        //Traemos los tributos asociados al Token
        const service = servicesTributarioOnline.getIdTributos(token)
            .then((datos) => {
                if (!datos.ok) { mostrarAlerta('Tributos: ' + datos.error); return false; }

                if (_.filter(datos.return, { identificador: identificador }).length == 0)
                    this.props.redireccionar('/Inicio');
                else {
                    this.props.setPropsIdTributos(datos);
                    this.iniciarServicios(token, tributo, identificador);
                }

            }).catch(err => {
                console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
            });
    }

    iniciarServicios = (token, tributo, identificador) => {
        const service1 = servicesTributarioOnline.getInfoContribucion(token, identificador)
            .then((datos) => {
                if (!datos.ok) { mostrarAlerta('Períodos: ' + datos.error); return false; }
                this.props.setPropsInfoContribucion(datos);
            }).catch(err => {
                console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
            });

        const service2 = servicesTributarioOnline.getInfoMultas(token, identificador)
            .then((datos) => {
                if (!datos.ok) { mostrarAlerta('Multas: ' + datos.error); return false; }
                this.props.setPropsInfoMultas(datos);
            }).catch(err => {
                console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
            });

        const service3 = servicesTributarioOnline.getInfoJuiciosContribucion(token, identificador)
            .then((datos) => {
                if (!datos.ok) { mostrarAlerta('Juicios: ' + datos.error); return false; }
                this.props.setPropsInfoJuiciosContribucion(datos);
            }).catch(err => {
                console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
            });

        const service4 = servicesTributarioOnline.getInfoJuiciosMulta(token, identificador)
            .then((datos) => {
                if (!datos.ok) { mostrarAlerta('Juicios: ' + datos.error); return false; }
                this.props.setPropsInfoJuiciosMulta(datos);
            }).catch(err => {
                console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
            });

        const service5 = servicesTributarioOnline.getInfoPlanesPago(token, identificador)
            .then((datos) => {
                if (!datos.ok) { mostrarAlerta('Planes Pago: ' + datos.error); return false; }
                this.props.setPropsInfoPlanesPago(datos);
            }).catch(err => {
                console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
            });

        Promise.all([service1,
            service2,
            service3,
            service4,
            service5]).then(() => {
                this.props.mostrarCargando(false);
            });
    }

    componentWillReceiveProps(nextProps) {

        //Al setearse las props de redux llevamos a cabo estas acciones
        if (JSON.stringify(this.props.idsTributos) != JSON.stringify(nextProps.idsTributos)) {
            //Si se carga por primera vez o si vienen nuevos registros del WS
            this.setState({
                identificadores: nextProps.idsTributos[this.props.match.params.tributo.toLowerCase()]
            });
        } else if (this.props.idsTributos) {
            //Si ya se encuentran cargados los registros en esta página o en otra
            this.setState({
                identificadores: this.props.idsTributos[this.props.match.params.tributo.toLowerCase()]
            });
        }

        //Refresh de la pagina apenas carga la seccion contribucion que es la primera en mostrarse
        if (JSON.stringify(this.props.infoContribucion) != JSON.stringify(nextProps.infoContribucion)) {
            this.refreshValoresPantalla({
                listaDatos: nextProps.infoContribucion
            });
        }

        //Refresh de la pagina apenas carga la seccion contribucion que es la primera en mostrarse
        if (JSON.stringify(this.props.infoMultas) != JSON.stringify(nextProps.infoMultas)) {
            this.refreshValoresPantalla({
                listaDatos: nextProps.infoMultas
            });
        }

        //Seteo de el primer item de los juicios de contribucion el cual es el primero que se mostrará
        if (JSON.stringify(this.props.infoJuiciosContribucion) != JSON.stringify(nextProps.infoJuiciosContribucion)) {
            let juicios = Object.assign({}, this.state.juicios);
            juicios.menuItemSeleccionado = (nextProps.infoJuiciosContribucion.lista > 0 && nextProps.infoJuiciosContribucion.lista[0].idJuicio) || '';
            this.setState({ juicios });
        }

        //Seteo de el primer item de los juicios de multas el cual es el primero que se mostrará
        if (JSON.stringify(this.props.infoJuiciosMulta) != JSON.stringify(nextProps.infoJuiciosMulta)) {
            let juicios = Object.assign({}, this.state.juicios);
            juicios.menuItemSeleccionado = (nextProps.infoJuiciosMulta.lista > 0 && nextProps.infoJuiciosMulta.lista[0].idJuicio) || '';
            this.setState({ juicios });
        }

        //Seteo de el primer item de los planes de pago el cual es el primero que se mostrará
        if (JSON.stringify(this.props.infoPlanesPago) != JSON.stringify(nextProps.infoPlanesPago)) {
            let planesPago = Object.assign({}, this.state.planesPago);
            planesPago.menuItemSeleccionado = (nextProps.infoPlanesPago.lista > 0 && nextProps.infoPlanesPago.lista[0].idPlan) || '';
            this.setState({ planesPago });
        }

        if (JSON.stringify(this.props.infoUltimosPagos) != JSON.stringify(nextProps.infoUltimosPagos)) {
            this.setState({
                ultimosPagos: {
                    ...this.state.ultimosPagos,
                    infoGrilla: nextProps.infoUltimosPagos
                }
            });
        } else if (this.props.infoUltimosPagos) {
            this.setState({
                ultimosPagos: {
                    ...this.state.ultimosPagos,
                    infoGrilla: this.props.infoUltimosPagos
                }
            });
        }

        if (JSON.stringify(this.props.infoInformeAntecedentes) != JSON.stringify(nextProps.infoInformeAntecedentes)) {
            this.setState({
                informeAntecedentes: {
                    ...this.state.informeAntecedentes,
                    infoGrilla: nextProps.infoInformeAntecedentes
                }
            });
        } else if (this.props.infoInformeAntecedentes) {
            this.setState({
                informeAntecedentes: {
                    ...this.state.informeAntecedentes,
                    infoGrilla: this.props.infoInformeAntecedentes
                }
            });
        }

        if (JSON.stringify(this.props.infoInformeREMAT) != JSON.stringify(nextProps.infoInformeREMAT)) {
            this.setState({
                informeREMAT: {
                    ...this.state.informeREMAT,
                    infoGrilla: nextProps.infoInformeREMAT
                }
            });
        } else if (this.props.infoInformeREMAT) {
            this.setState({
                informeREMAT: {
                    ...this.state.informeREMAT,
                    infoGrilla: this.props.infoInformeREMAT
                }
            });
        }

        //Seteo de el primer item de los planes de pago el cual es el primero que se mostrará
        if (JSON.stringify(this.props.infoInformeCuenta) != JSON.stringify(nextProps.infoInformeCuenta)) {

            this.setState({
                informeCuenta: {
                    ...this.state.informeCuenta,
                    deudaTotal: nextProps.infoInformeCuenta.total,
                    deudaVencida: {
                        total: nextProps.infoInformeCuenta.totalVencida,
                        administrativa: nextProps.infoInformeCuenta.administrativaVencida
                    },
                    deudaAVencer: {
                        total: nextProps.infoInformeCuenta.totalAVencer,
                        administrativa: nextProps.infoInformeCuenta.administrativaAVencer
                    },
                    modal: {
                        ...this.state.informeCuenta.modal,
                        open: false
                    }
                }
            });
        }

        //Seteo de el primer item de los planes de pago el cual es el primero que se mostrará
        if (JSON.stringify(this.props.infoReporteInformeCuenta) != JSON.stringify(nextProps.infoReporteInformeCuenta)) {

            this.setState({
                informeCuenta: {
                    ...this.state.informeCuenta,
                    reporteBase64: nextProps.infoReporteInformeCuenta
                }
            });
        }
    }

    //Cada vez que se cambia de sección se checkean y actualizan datos
    //Solo se muetra "Alternativa de plan" cuando existe una fecha mayor a 60 días ( mostrarAlternativaPlan )
    //La información de "Datos de Cuenta" varia respecto a cada seccion ( infoDatosCuenta )
    refreshValoresPantalla(parametros) {
        const listaDatos = parametros.listaDatos || null;

        if (listaDatos == null)
            return false;

        let mostrarAlternativaPlan = false;
        let infoDatosCuenta = [];

        infoDatosCuenta = listaDatos.datosCuenta ? listaDatos.datosCuenta : 'No se encontraron registros';

        listaDatos.rowList && listaDatos.rowList.some((item) => {

            if (diffDays(stringToDate(item.vencimiento), new Date()) >= 60) {
                mostrarAlternativaPlan = true;
                return true;
            }
        });

        this.setState({
            infoDatosCuenta: infoDatosCuenta,
            mostrarAlternativaPlan: mostrarAlternativaPlan
        });
    }

    //Evento cuando se cambia de identificador
    selectIdentificador = event => {
        if (event.target.value == '0')
            return false;

        this.props.mostrarCargando(true);
        this.props.redireccionar('/DetalleTributario/' + this.props.match.params.tributo + '/' + event.target.value);
        window.location.reload();//Recargamos la pagina con la nueva url
    };

    //Evento cuando se cambia de sección
    handleMenuChange = (event, value) => {

        this.setState({
            menuItemSeleccionado: value
        });

        //Seteamos valores que varias de acuerdo a la sección seleccionada
        const infoSeccion = this.state[value].paramDatos;
        const listaDatos = this.state[value].arrayResult ? this.getListaDatosLista(this.props[infoSeccion]) : this.props[infoSeccion];
        this.refreshValoresPantalla({
            listaDatos: listaDatos
        });
    };

    /*
        Retorna listaDatos para el uso de funcion refreshValoresPantalla
        Este es el caso de juicios y planes de pago ya que se tiene que buscar
        los datos de alguno de los subitems (submenu) para realizar los calculos al
        refrescar la pantalla
    */
    getListaDatosLista = (infoDatos, identificador) => {

        let listaDatosJuicio = {};
        if (!identificador) {
            listaDatosJuicio = (infoDatos && infoDatos.lista[0]) || {};
        } else {
            infoDatos && infoDatos.lista.some((item) => {

                if (!identificador || item.identificador == identificador) {
                    listaDatosJuicio = item;
                    return false
                }
            });
        }

        return listaDatosJuicio;
    }

    //Evento cuando se cambia de subsección
    handleSubMenuChange = (event, identificador) => {

        const seccionActual = this.state.menuItemSeleccionado;

        let seccionState = Object.assign({}, this.state[seccionActual]);
        seccionState.menuItemSeleccionado = identificador;
        this.setState({
            [seccionActual]: seccionState
        });

        //Seteamos valores que varias de acuerdo a la sección seleccionada
        const infoSeccion = this.state[seccionActual].paramDatos;
        const listaDatos = this.getListaDatosLista(this.props[infoSeccion], identificador);
        this.refreshValoresPantalla({
            listaDatos: listaDatos
        });
    };

    //Función para setear en el state las filas seleccionadas de la seccion actual para generar cedulon
    setRegistrosSeleccionados = (menuItemSeleccionado, registrosSeleccionados) => {

        let itemSeleccionado = Object.assign({}, this.state[menuItemSeleccionado]);
        itemSeleccionado.registrosSeleccionados = registrosSeleccionados;

        this.setState({ [menuItemSeleccionado]: itemSeleccionado });
    };

    //Abrimos modal informe de cuentas trayendo datos del WS
    onUltimosPagosDialogoOpen = () => {
        this.props.mostrarCargando(true);
        const token = this.props.loggedUser.token;
        const tributo = getIdTipoTributo(this.props.match.params.tributo);
        const identificador = this.props.match.params.identificador;

        if (!Array.isArray(this.state.ultimosPagos.infoGrilla)) {
            servicesTributarioOnline.getUltimosPagos(token, {
                tipoTributo: tributo,
                identificador: identificador
            })
                .then((datos) => {
                    if (!datos.ok) { mostrarAlerta('Últimos Pagos: ' + datos.error); return false; }
                    this.props.setPropsInfoUltimosPagos(datos);

                    this.handleUltimosPagosCloseDialog();
                }).catch(err => {
                    console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
                });
        } else {
            this.handleUltimosPagosCloseDialog();
        }
    }

    handleUltimosPagosCloseDialog = () => {
        let newState = { ...this.state };
        newState.ultimosPagos.modal.open = true;
        this.setState(newState);

        this.props.mostrarCargando(false);
    }

    //Cerramos modal informe de cuentas seteando los valores iniciales del state
    onUltimosPagosDialogoClose = () => {
        this.setState({
            ultimosPagos: {
                ...this.state.ultimosPagos,
                modal: {
                    open: false
                }
            }
        });
    }

    //Abrimos modal informe de cuentas trayendo datos del WS
    onInformeAntecedentesDialogoOpen = () => {
        this.props.mostrarCargando(true);
        const token = this.props.loggedUser.token;
        const tributo = getIdTipoTributo(this.props.match.params.tributo);
        const identificador = this.props.match.params.identificador;

        if (!Array.isArray(this.state.informeAntecedentes.infoGrilla)) {
            servicesTributarioOnline.getInformeAntecedentes(token, {
                tipoTributo: tributo,
                identificador: identificador
            })
                .then((datos) => {
                    if (!datos.ok) { mostrarAlerta('Informe Antecedentes: ' + datos.error); return false; }
                    this.props.setPropsInfoInformeAntecedentes(datos);

                    this.handleInformeAntecedentesCloseDialog();
                }).catch(err => {
                    console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
                });
        } else {
            this.handleInformeAntecedentesCloseDialog();
        }
    }

    handleInformeAntecedentesCloseDialog = () => {
        let newState = { ...this.state };
        newState.informeAntecedentes.modal.open = true;
        this.setState(newState);

        this.props.mostrarCargando(false);
    }

    //Cerramos modal informe de cuentas seteando los valores iniciales del state
    onInformeAntecedentesDialogoClose = () => {
        this.setState({
            informeAntecedentes: {
                ...this.state.informeAntecedentes,
                modal: {
                    open: false
                }
            }
        });
    }


    //Abrimos modal informe de cuentas trayendo datos del WS
    onInformeREMATDialogoOpen = () => {
        this.props.mostrarCargando(true);
        const token = this.props.loggedUser.token;
        const tributo = getIdTipoTributo(this.props.match.params.tributo);
        const identificador = this.props.match.params.identificador;

        if (!Array.isArray(this.state.informeREMAT.infoGrilla)) {
            servicesTributarioOnline.getInformeREMAT(token, {
                tipoTributo: tributo,
                identificador: identificador
            })
                .then((datos) => {
                    if (!datos.ok) { mostrarAlerta('Informe REMAT: ' + datos.error); return false; }
                    this.props.setPropsInfoInformeREMAT(datos);

                    this.handleInformeREMATCloseDialog();
                }).catch(err => {
                    console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
                });
        } else {
            this.handleInformeREMATCloseDialog();
        }
    }

    handleInformeREMATCloseDialog = () => {
        let newState = { ...this.state };
        newState.informeREMAT.modal.open = true;
        this.setState(newState);

        this.props.mostrarCargando(false);
    }

    //Cerramos modal informe de cuentas seteando los valores iniciales del state
    onInformeREMATDialogoClose = () => {
        this.setState({
            informeREMAT: {
                ...this.state.informeREMAT,
                modal: {
                    open: false
                }
            }
        });
    }


    //Abrimos modal informe de cuentas trayendo datos del WS
    onInformeCuentaDialogoOpen = () => {
        this.props.mostrarCargando(true);
        const token = this.props.loggedUser.token;
        const tributo = getIdTipoTributo(this.props.match.params.tributo);
        const identificador = this.props.match.params.identificador;

        let arrayService = [];
        if (!this.state.informeCuenta.reporteBase64) {
            const service1 = servicesTributarioOnline.getInformeCuenta(token, {
                tipoTributo: tributo,
                identificador: identificador
            })
                .then((datos) => {
                    if (!datos.ok) { mostrarAlerta('Informe REMAT: ' + datos.error); return false; }
                    this.props.setPropsInfoInformeCuenta(datos);
                }).catch(err => {
                    console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
                });

            arrayService.push(service1);

            const service2 = servicesTributarioOnline.getReporteInformeCuenta(token, {
                tipoTributo: tributo,
                identificador: identificador
            })
                .then((datos) => {
                    if (!datos.ok) { mostrarAlerta('Informe REMAT: ' + datos.error); return false; }
                    this.props.setPropsInfoReporteInformeCuenta(datos);
                }).catch(err => {
                    console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
                });

            arrayService.push(service2);
        }

        Promise.all(arrayService).then(() => {
            this.handleInformeCuentaCloseDialog();
            this.props.mostrarCargando(false);
        });
    }

    handleInformeCuentaCloseDialog = () => {
        let newState = { ...this.state };
        newState.informeCuenta.modal.open = true;
        this.setState(newState);

        this.props.mostrarCargando(false);
    }

    //Cerramos modal informe de cuentas seteando los valores iniciales del state
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

    handleDeleteDataNexos = (seccionDetalleTributo) => {
        this.setState({
            [seccionDetalleTributo]: {
                ...this.state[seccionDetalleTributo],
                datosNexos: []
            }
        });
    }

    render() {
        const { classes } = this.props;

        //rowList - Filas de grilla
        //lista - lista de tributos que contienen rowLists para mostrar en la grilla
        const infoContribucion = this.props.infoContribucion ? this.props.infoContribucion.rowList : [];
        const infoMultas = this.props.infoMultas ? this.props.infoMultas.rowList : [];
        let infoJuicios = [];
        infoJuicios = this.props.infoJuiciosContribucion && this.props.infoJuiciosContribucion.lista ? infoJuicios.concat(this.props.infoJuiciosContribucion.lista) : infoJuicios;
        infoJuicios = this.props.infoJuiciosMulta && this.props.infoJuiciosMulta.lista ? infoJuicios.concat(this.props.infoJuiciosMulta.lista) : infoJuicios;
        const infoPlanesPago = this.props.infoPlanesPago ? this.props.infoPlanesPago.lista : [];

        return (
            <div className={classNames(classes.mainContainer, "contentDetalleTributo")}>
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={8} className={"container"}>
                        <MiCard>
                            {/* Titulo y selección de identificador */}
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

                                    {this.state.identificadores && this.state.identificadores.map((tributo, index) => {
                                        return <MenuItem key={index} value={tributo.identificador}>{tributo.identificador}{tributo.representado && ' - ' + tributo.representado}</MenuItem>
                                    })}
                                </Select>
                                - <b>{this.state[this.state.menuItemSeleccionado].labels.detalleTitulo}</b>
                            </Typography>

                            {/* Menu de secciones */}
                            <Grid container spacing={16}>
                                <Grid item sm={12} className={classes.tabMenu}>

                                    <Tabs
                                        value={this.state.menuItemSeleccionado}
                                        onChange={this.handleMenuChange}
                                        indicatorColor="secondary"
                                        textColor="secondary"
                                        centered
                                        scrollButtons="auto"
                                        classes={{ flexContainer: classes.flexContainersMenu, scrollButtons: classes.scrollButtonsMenu }}
                                    >

                                        <Tab classes={{ root: classes.itemMenu, labelContainer: classes.labelItemMenu }} value="contribucion" label={<Badge className={classes.badgeTab} classes={{ badge: classes.badgeGreen }} color="secondary" badgeContent={infoContribucion ? infoContribucion.length : 0}><div>Períodos</div></Badge>} />

                                        <Tab classes={{ root: classes.itemMenu, labelContainer: classes.labelItemMenu }} value="multas" label={<Badge className={classes.badgeTab} classes={{ badge: classes.badgeGreen }} color="secondary" badgeContent={infoMultas ? infoMultas.length : 0}><div>Multas</div></Badge>} />

                                        <Tab classes={{ root: classes.itemMenu, labelContainer: classes.labelItemMenu }} value="juicios" label={<Badge className={classes.badgeTab} classes={{ badge: classes.badgeRed }} color="secondary" badgeContent={infoJuicios ? infoJuicios.length : 0}><div>Juicios</div></Badge>} />

                                        <Tab classes={{ root: classes.itemMenu, labelContainer: classes.labelItemMenu }} value="planesPago" label={<Badge className={classes.badgeTab} classes={{ badge: classes.badgeGreen }} color="secondary" badgeContent={infoPlanesPago ? infoPlanesPago.length : 0}><div>Planes</div></Badge>} />

                                    </Tabs>

                                </Grid>
                            </Grid>

                            {/* Sub Menus */}

                            {/* Juicio */}
                            {this.state.menuItemSeleccionado == 'juicios' &&
                                ((this.props.infoJuiciosContribucion && this.props.infoJuiciosContribucion.lista && this.props.infoJuiciosContribucion.lista.length > 0) || (this.props.infoJuiciosMulta && this.props.infoJuiciosMulta.lista && this.props.infoJuiciosMulta.lista.length > 0)) &&
                                <div>

                                    <Grid container spacing={16}>
                                        <Grid item sm={12} className={classes.tabMenu}>
                                            {/* SubMenu */}
                                            <Tabs
                                                value={this.state.juicios.menuItemSeleccionado}
                                                onChange={this.handleSubMenuChange}
                                                classes={{ scrollButtons: classes.scrollButtonsSubMenu, root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                                                scrollable
                                                scrollButtons="auto"
                                            >

                                                {/* Juicio por Contribución */}
                                                {this.props.infoJuiciosContribucion && this.props.infoJuiciosContribucion.lista && this.props.infoJuiciosContribucion.lista.map((juicio) => {
                                                    return <Tab classes={{ root: classes.itemSubMenu, labelContainer: classes.labelItemMenu }} value={juicio.idJuicio} label={<Badge className={classes.badgeSubTab} classes={{ badge: classes.badgeRed }} badgeContent={juicio.rowList ? juicio.rowList.length : 0}><div>{juicio.idJuicio}</div></Badge>} />
                                                })}

                                                {/* Juicio por Multa */}
                                                {this.props.infoJuiciosMulta && this.props.infoJuiciosMulta.lista && this.props.infoJuiciosMulta.lista.map((juicio) => {
                                                    return <Tab classes={{ root: classes.itemSubMenu, labelContainer: classes.labelItemMenu }} value={juicio.idJuicio} label={<Badge className={classes.badgeSubTab} classes={{ badge: classes.badgeRed }} badgeContent={juicio.rowList ? juicio.rowList.length : 0}><div>{juicio.idJuicio}</div></Badge>} />
                                                })}

                                            </Tabs>

                                        </Grid>
                                    </Grid>
                                </div>}

                            {/* Planes de Pago */}
                            {this.state.menuItemSeleccionado == 'planesPago' && this.props.infoPlanesPago.lista.length > 0 && <div>

                                <Grid container spacing={16}>
                                    <Grid item sm={12} className={classes.tabMenu}>
                                        {/* SubMenu */}
                                        <Tabs
                                            value={this.state.planesPago.menuItemSeleccionado}
                                            onChange={this.handleSubMenuChange}
                                            scrollable
                                            scrollButtons="auto"
                                            classes={{ scrollButtons: classes.scrollButtonsSubMenu }}
                                        >

                                            {this.props.infoPlanesPago && this.props.infoPlanesPago.lista.map((plan) => {
                                                return <Tab classes={{ root: classes.itemSubMenu, labelContainer: classes.labelItemMenu }} value={plan.idPlan} label={<Badge className={classes.badgeSubTab} classes={{ badge: classes.badgeGreen }} color="secondary" badgeContent={plan.rowList ? plan.rowList.length : 0}><div>{plan.idPlan}</div></Badge>} />
                                            })}

                                        </Tabs>

                                    </Grid>
                                </Grid>
                            </div>}

                            {/* Secciones */}

                            {/* Contribución por período */}
                            {this.state.menuItemSeleccionado == 'contribucion' &&
                                this.props.infoContribucion.rowList &&
                                this.props.infoContribucion.rowList.length > 0 && <div>
                                    <div>
                                        <Typography className={classes.infoTexto}>
                                            {`En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`}
                                        </Typography>
                                        <MisPagos
                                            deleteDataNexos={() => { this.handleDeleteDataNexos(this.state.menuItemSeleccionado) }}
                                            datosNexos={this.state[this.state.menuItemSeleccionado].datosNexos}
                                            check={true}
                                            classes={classes}
                                            info={this.props.infoContribucion || null}
                                            menuItemSeleccionado={this.state.menuItemSeleccionado}
                                            data={this.state[this.state.menuItemSeleccionado]}
                                            registrosSeleccionados={this.state[this.state.menuItemSeleccionado].registrosSeleccionados}
                                            setRegistrosSeleccionados={this.setRegistrosSeleccionados}
                                            identificadorActual={this.props.match.params.identificador}
                                            tributoActual={this.props.match.params.tributo}
                                        />
                                    </div>
                                </div>}

                            {/* Multas */}
                            {this.state.menuItemSeleccionado == 'multas' &&
                                this.props.infoMultas.rowList &&
                                this.props.infoMultas.rowList.length > 0 && <div>
                                    <div>
                                        <Typography className={classes.infoTexto}>
                                            {`En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`}
                                        </Typography>
                                        <MisPagos
                                            deleteDataNexos={() => { this.handleDeleteDataNexos(this.state.menuItemSeleccionado) }}
                                            datosNexos={this.state[this.state.menuItemSeleccionado].datosNexos}
                                            check={true}
                                            classes={classes}
                                            info={this.props.infoMultas || null}
                                            menuItemSeleccionado={this.state.menuItemSeleccionado}
                                            data={this.state[this.state.menuItemSeleccionado]}
                                            registrosSeleccionados={this.state[this.state.menuItemSeleccionado].registrosSeleccionados}
                                            setRegistrosSeleccionados={this.setRegistrosSeleccionados}
                                            identificadorActual={this.props.match.params.identificador}
                                            tributoActual={this.props.match.params.tributo}
                                        />
                                    </div>
                                </div>}

                            {/* Sub Secciones */}

                            {/* Juicio por Contribucion */}
                            {this.state.menuItemSeleccionado == 'juicios' &&
                                this.props.infoJuiciosContribucion.lista &&
                                this.props.infoJuiciosContribucion.lista.length > 0 &&
                                this.props.infoJuiciosContribucion && this.props.infoJuiciosContribucion.lista.map((juicio) => {
                                    return <div>
                                        {this.state.juicios.menuItemSeleccionado == juicio.idJuicio &&
                                            <div>
                                                <Typography className={classes.infoTexto}>
                                                    {`En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`}
                                                </Typography>
                                                <MisPagos
                                                    deleteDataNexos={() => { this.handleDeleteDataNexos(this.state.menuItemSeleccionado) }}
                                                    datosNexos={this.state[this.state.menuItemSeleccionado].datosNexos}
                                                    check={true}
                                                    classes={classes}
                                                    info={juicio || null}
                                                    menuItemSeleccionado={this.state.menuItemSeleccionado}
                                                    data={this.state[this.state.menuItemSeleccionado]}
                                                    registrosSeleccionados={this.state[this.state.menuItemSeleccionado].registrosSeleccionados}
                                                    setRegistrosSeleccionados={this.setRegistrosSeleccionados}
                                                    identificadorActual={this.props.match.params.identificador}
                                                    tributoActual={this.props.match.params.tributo}
                                                />
                                            </div>
                                        }
                                    </div>
                                })}

                            {/* Juicio por Multas */}
                            {this.state.menuItemSeleccionado == 'juicios' &&
                                this.props.infoJuiciosMulta.lista &&
                                this.props.infoJuiciosMulta.lista.length > 0 &&
                                this.props.infoJuiciosMulta && this.props.infoJuiciosMulta.lista.map((juicio) => {
                                    return <div>
                                        {this.state.juicios.menuItemSeleccionado == juicio.idJuicio &&
                                            <div>
                                                <Typography className={classes.infoTexto}>
                                                    {`En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`}
                                                </Typography>
                                                <MisPagos
                                                    deleteDataNexos={() => { this.handleDeleteDataNexos(this.state.menuItemSeleccionado) }}
                                                    datosNexos={this.state[this.state.menuItemSeleccionado].datosNexos}
                                                    check={true}
                                                    classes={classes}
                                                    info={juicio || null}
                                                    menuItemSeleccionado={this.state.menuItemSeleccionado}
                                                    data={this.state[this.state.menuItemSeleccionado]}
                                                    registrosSeleccionados={this.state[this.state.menuItemSeleccionado].registrosSeleccionados}
                                                    setRegistrosSeleccionados={this.setRegistrosSeleccionados}
                                                    identificadorActual={this.props.match.params.identificador}
                                                    tributoActual={this.props.match.params.tributo}
                                                />
                                            </div>
                                        }
                                    </div>
                                })}

                            {/* Planes de Pago */}
                            {this.state.menuItemSeleccionado == 'planesPago' &&
                                this.props.infoPlanesPago.lista &&
                                this.props.infoPlanesPago.lista.length > 0 &&
                                this.props.infoPlanesPago && this.props.infoPlanesPago.lista.map((plan) => {
                                    return <div>
                                        {this.state.planesPago.menuItemSeleccionado == plan.idPlan &&
                                            <div>
                                                <Typography className={classes.infoTexto}>
                                                    {`En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`}
                                                </Typography>
                                                <MisPagos
                                                    deleteDataNexos={() => { this.handleDeleteDataNexos(this.state.menuItemSeleccionado) }}
                                                    datosNexos={this.state[this.state.menuItemSeleccionado].datosNexos}
                                                    classes={classes}
                                                    info={plan || null}
                                                    menuItemSeleccionado={this.state.menuItemSeleccionado}
                                                    data={this.state[this.state.menuItemSeleccionado]}
                                                    registrosSeleccionados={this.state[this.state.menuItemSeleccionado].registrosSeleccionados}
                                                    setRegistrosSeleccionados={this.setRegistrosSeleccionados}
                                                    identificadorActual={this.props.match.params.identificador}
                                                    tributoActual={this.props.match.params.tributo}
                                                />
                                            </div>
                                        }
                                    </div>
                                })}

                        </MiCard>
                    </Grid>
                    <Grid item xs={4} className={"container"}>
                        {/* Bloque Datos Generales */}
                        <MiCard rootClassName={"leftBox"}>
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

                        <MiCard rootClassName={"otrasOperaciones rightBox"}>
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
                                        open={this.state.informeCuenta.modal.open}
                                        onDialogoOpen={this.onInformeCuentaDialogoOpen}
                                        onDialogoClose={this.onInformeCuentaDialogoClose}
                                        textoLink={'Informe de Cuenta'}
                                        titulo={'Informe de Cuenta al día ' + dateToString(new Date(), 'DD/MM/YYYY')}
                                    >
                                        <div key="headerContent"></div>
                                        <div key="mainContent">
                                            {!this.state.informeCuenta.modal.showReporte && <div>
                                                <Typography className={classes.title} variant="title">Deuda Total: <b>$ {stringToFloat(this.state.informeCuenta.deudaTotal, 2).toFixed(2)} </b></Typography>
                                                <Divider className={classes.divider} />

                                                <Typography className={classes.title} variant="title">Deuda vencida</Typography>
                                                <Divider className={classes.divider} />

                                                <Grid container spacing={16}>
                                                    <Grid item sm={4}>
                                                        <Typography variant="subheading" gutterBottom>Total: </Typography>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <Typography variant="subheading" gutterBottom>
                                                            <b>$ {stringToFloat(this.state.informeCuenta.deudaVencida.total, 2).toFixed(2)} </b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={16}>
                                                    <Grid item sm={4}>
                                                        <Typography variant="subheading" gutterBottom>Administrativa: </Typography>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <Typography variant="subheading" gutterBottom>
                                                            <b>$ {stringToFloat(this.state.informeCuenta.deudaVencida.administrativa, 2).toFixed(2)} </b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <br />
                                                <Typography className={classes.title} variant="title">Deuda a vencer</Typography>
                                                <Divider className={classes.divider} />
                                                <Grid container spacing={16}>
                                                    <Grid item sm={4}>
                                                        <Typography variant="subheading" gutterBottom>Total: </Typography>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <Typography variant="subheading" gutterBottom>
                                                            <b>$ {stringToFloat(this.state.informeCuenta.deudaAVencer.total, 2).toFixed(2)} </b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={16}>
                                                    <Grid item sm={4}>
                                                        <Typography variant="subheading" gutterBottom>Administrativa: </Typography>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <Typography variant="subheading" gutterBottom>
                                                            <b>$ {stringToFloat(this.state.informeCuenta.deudaAVencer.administrativa, 2).toFixed(2)} </b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </div>}

                                            {this.state.informeCuenta.modal.showReporte && <div>
                                                {this.state.informeCuenta.reporteBase64 != '' && <iframe src={'data:application/pdf;base64,' + this.state.informeCuenta.reporteBase64} height="342px" width="856px"></iframe>}
                                                {!this.state.informeCuenta.reporteBase64 && 'Ocurrió un error al cargar el reporte'}
                                            </div>}
                                        </div>
                                        <div key="footerContent" className={classes.buttonFotterDialog}>
                                            {!this.state.informeCuenta.modal.showReporte && <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.buttonActions}
                                                onClick={this.onInformeCuentaShowReporte}
                                            >
                                                Imprimir Detalle
                                        </Button>}

                                            {this.state.informeCuenta.modal.showReporte && <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.buttonActions}
                                                onClick={this.onInformeCuentaHideReporte}
                                            >
                                                Mostrar Deudas
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
                                        textoLink={'Datos de Cuenta'}
                                        titulo={'Datos de Cuenta'}
                                    >
                                        <div className={classes.textJustify}>
                                            {(Array.isArray(this.state.infoDatosCuenta) && this.state.infoDatosCuenta.map((item, index) => {
                                                return <div key={index}>{item}</div>;
                                            })) || (!Array.isArray(this.state.infoDatosCuenta) && this.state.infoDatosCuenta)}
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
                                        open={this.state.ultimosPagos.modal.open}
                                        onDialogoOpen={this.onUltimosPagosDialogoOpen}
                                        onDialogoClose={this.onUltimosPagosDialogoClose}
                                        textoLink={'Últimos pagos'}
                                        titulo={'Últimos pagos'}
                                        classes={{
                                            root: classes.miLinkDialog
                                        }}
                                    >
                                        <MiTabla
                                            columns={[
                                                { id: 'concepto', type: 'string', numeric: false, disablePadding: false, label: 'Concepto' },
                                                { id: 'vencimiento', type: 'date', numeric: false, disablePadding: false, label: 'Vencimiento' },
                                                { id: 'importe', type: 'string', numeric: false, disablePadding: false, label: 'Importe ($)' },
                                                { id: 'detalle', type: 'custom', numeric: false, disablePadding: true, label: 'Detalle' },
                                            ]}
                                            rows={this.state.ultimosPagos.infoGrilla || []}
                                            order='desc'
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

                            {/* Cuando no este seleccionado Planes de Pago */}
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
                                                textoLink={'Simular Plan de Pagos'}
                                                titulo={'Simular Plan de Pagos'}
                                            >
                                                Contenido Simular Plan de Pagos!
                                            </MiLinkDialog>
                                        </Grid>
                                    </Grid>
                                </div>}

                                <Grid container spacing={16}>
                                    <Grid item sm={2}>
                                        {/*<svg className={classes.icon} viewBox="0 0 24 24">
                                            <path fill="#ED1C24" d="M14,9H19.5L14,3.5V9M7,2H15L21,8V20A2,2 0 0,1 19,22H7C5.89,22 5,21.1 5,20V4A2,2 0 0,1 7,2M11.93,12.44C12.34,13.34 12.86,14.08 13.46,14.59L13.87,14.91C13,15.07 11.8,15.35 10.53,15.84V15.84L10.42,15.88L10.92,14.84C11.37,13.97 11.7,13.18 11.93,12.44M18.41,16.25C18.59,16.07 18.68,15.84 18.69,15.59C18.72,15.39 18.67,15.2 18.57,15.04C18.28,14.57 17.53,14.35 16.29,14.35L15,14.42L14.13,13.84C13.5,13.32 12.93,12.41 12.53,11.28L12.57,11.14C12.9,9.81 13.21,8.2 12.55,7.54C12.39,7.38 12.17,7.3 11.94,7.3H11.7C11.33,7.3 11,7.69 10.91,8.07C10.54,9.4 10.76,10.13 11.13,11.34V11.35C10.88,12.23 10.56,13.25 10.05,14.28L9.09,16.08L8.2,16.57C7,17.32 6.43,18.16 6.32,18.69C6.28,18.88 6.3,19.05 6.37,19.23L6.4,19.28L6.88,19.59L7.32,19.7C8.13,19.7 9.05,18.75 10.29,16.63L10.47,16.56C11.5,16.23 12.78,16 14.5,15.81C15.53,16.32 16.74,16.55 17.5,16.55C17.94,16.55 18.24,16.44 18.41,16.25M18,15.54L18.09,15.65C18.08,15.75 18.05,15.76 18,15.78H17.96L17.77,15.8C17.31,15.8 16.6,15.61 15.87,15.29C15.96,15.19 16,15.19 16.1,15.19C17.5,15.19 17.9,15.44 18,15.54M8.83,17C8.18,18.19 7.59,18.85 7.14,19C7.19,18.62 7.64,17.96 8.35,17.31L8.83,17M11.85,10.09C11.62,9.19 11.61,8.46 11.78,8.04L11.85,7.92L12,7.97C12.17,8.21 12.19,8.53 12.09,9.07L12.06,9.23L11.9,10.05L11.85,10.09Z" />
                                        </svg>*/}
                                        <svg className={classes.icon} viewBox="0 0 24 24">
                                            <path fill="#149257" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z" />
                                        </svg>
                                    </Grid>
                                    <Grid item sm={10}>
                                        <MiControledDialog
                                            open={this.state.informeAntecedentes.modal.open}
                                            onDialogoOpen={this.onInformeAntecedentesDialogoOpen}
                                            onDialogoClose={this.onInformeAntecedentesDialogoClose}
                                            textoLink={'Informe Antecedentes'}
                                            titulo={'Informe Antecedentes'}
                                            classes={{
                                                root: classes.miLinkDialog
                                            }}
                                        >
                                            <MiTabla
                                                columns={[
                                                    { id: 'causa', type: 'string', numeric: false, disablePadding: false, label: 'Causa' },
                                                    { id: 'fecha', type: 'date', numeric: false, disablePadding: false, label: 'Fecha' },
                                                    { id: 'infracciones', type: 'string', numeric: false, disablePadding: false, label: 'Infracciones' },
                                                    { id: 'detalle', type: 'custom', numeric: false, disablePadding: true, label: 'Detalle' },
                                                ]}
                                                rows={this.props.infoInformeAntecedentes || []}
                                                order='desc'
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

                                <Grid container spacing={16}>
                                    <Grid item sm={2}>
                                        {/*<svg className={classes.icon} viewBox="0 0 24 24">
                                            <path fill="#ED1C24" d="M14,9H19.5L14,3.5V9M7,2H15L21,8V20A2,2 0 0,1 19,22H7C5.89,22 5,21.1 5,20V4A2,2 0 0,1 7,2M11.93,12.44C12.34,13.34 12.86,14.08 13.46,14.59L13.87,14.91C13,15.07 11.8,15.35 10.53,15.84V15.84L10.42,15.88L10.92,14.84C11.37,13.97 11.7,13.18 11.93,12.44M18.41,16.25C18.59,16.07 18.68,15.84 18.69,15.59C18.72,15.39 18.67,15.2 18.57,15.04C18.28,14.57 17.53,14.35 16.29,14.35L15,14.42L14.13,13.84C13.5,13.32 12.93,12.41 12.53,11.28L12.57,11.14C12.9,9.81 13.21,8.2 12.55,7.54C12.39,7.38 12.17,7.3 11.94,7.3H11.7C11.33,7.3 11,7.69 10.91,8.07C10.54,9.4 10.76,10.13 11.13,11.34V11.35C10.88,12.23 10.56,13.25 10.05,14.28L9.09,16.08L8.2,16.57C7,17.32 6.43,18.16 6.32,18.69C6.28,18.88 6.3,19.05 6.37,19.23L6.4,19.28L6.88,19.59L7.32,19.7C8.13,19.7 9.05,18.75 10.29,16.63L10.47,16.56C11.5,16.23 12.78,16 14.5,15.81C15.53,16.32 16.74,16.55 17.5,16.55C17.94,16.55 18.24,16.44 18.41,16.25M18,15.54L18.09,15.65C18.08,15.75 18.05,15.76 18,15.78H17.96L17.77,15.8C17.31,15.8 16.6,15.61 15.87,15.29C15.96,15.19 16,15.19 16.1,15.19C17.5,15.19 17.9,15.44 18,15.54M8.83,17C8.18,18.19 7.59,18.85 7.14,19C7.19,18.62 7.64,17.96 8.35,17.31L8.83,17M11.85,10.09C11.62,9.19 11.61,8.46 11.78,8.04L11.85,7.92L12,7.97C12.17,8.21 12.19,8.53 12.09,9.07L12.06,9.23L11.9,10.05L11.85,10.09Z" />
                                        </svg>*/}
                                        <svg className={classes.icon} viewBox="0 0 24 24">
                                            <path fill="#149257" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z" />
                                        </svg>
                                    </Grid>
                                    <Grid item sm={10}>
                                        <MiControledDialog
                                            open={this.state.informeREMAT.modal.open}
                                            onDialogoOpen={this.onInformeREMATDialogoOpen}
                                            onDialogoClose={this.onInformeREMATDialogoClose}
                                            textoLink={'Informe REMAT'}
                                            titulo={'Informe REMAT'}
                                            classes={{
                                                root: classes.miLinkDialog
                                            }}
                                        >
                                            <MiTabla
                                                columns={[
                                                    { id: 'causa', type: 'string', numeric: false, disablePadding: false, label: 'Causa' },
                                                    { id: 'fecha', type: 'date', numeric: false, disablePadding: false, label: 'Fecha' },
                                                    { id: 'infracciones', type: 'string', numeric: false, disablePadding: false, label: 'Infracciones' },
                                                    { id: 'detalle', type: 'custom', numeric: false, disablePadding: true, label: 'Detalle' },
                                                ]}
                                                rows={this.props.infoInformeREMAT || []}
                                                order='desc'
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
                            </div>}

                            {/* Cuando no este seleccionado Planes de Pago */}
                            {this.state.menuItemSeleccionado == 'planesPago' && <div>
                                <Grid container spacing={16}>
                                    <Grid item sm={2}>
                                        {/*<svg className={classes.icon} viewBox="0 0 24 24">
                                            <path fill="#ED1C24" d="M14,9H19.5L14,3.5V9M7,2H15L21,8V20A2,2 0 0,1 19,22H7C5.89,22 5,21.1 5,20V4A2,2 0 0,1 7,2M11.93,12.44C12.34,13.34 12.86,14.08 13.46,14.59L13.87,14.91C13,15.07 11.8,15.35 10.53,15.84V15.84L10.42,15.88L10.92,14.84C11.37,13.97 11.7,13.18 11.93,12.44M18.41,16.25C18.59,16.07 18.68,15.84 18.69,15.59C18.72,15.39 18.67,15.2 18.57,15.04C18.28,14.57 17.53,14.35 16.29,14.35L15,14.42L14.13,13.84C13.5,13.32 12.93,12.41 12.53,11.28L12.57,11.14C12.9,9.81 13.21,8.2 12.55,7.54C12.39,7.38 12.17,7.3 11.94,7.3H11.7C11.33,7.3 11,7.69 10.91,8.07C10.54,9.4 10.76,10.13 11.13,11.34V11.35C10.88,12.23 10.56,13.25 10.05,14.28L9.09,16.08L8.2,16.57C7,17.32 6.43,18.16 6.32,18.69C6.28,18.88 6.3,19.05 6.37,19.23L6.4,19.28L6.88,19.59L7.32,19.7C8.13,19.7 9.05,18.75 10.29,16.63L10.47,16.56C11.5,16.23 12.78,16 14.5,15.81C15.53,16.32 16.74,16.55 17.5,16.55C17.94,16.55 18.24,16.44 18.41,16.25M18,15.54L18.09,15.65C18.08,15.75 18.05,15.76 18,15.78H17.96L17.77,15.8C17.31,15.8 16.6,15.61 15.87,15.29C15.96,15.19 16,15.19 16.1,15.19C17.5,15.19 17.9,15.44 18,15.54M8.83,17C8.18,18.19 7.59,18.85 7.14,19C7.19,18.62 7.64,17.96 8.35,17.31L8.83,17M11.85,10.09C11.62,9.19 11.61,8.46 11.78,8.04L11.85,7.92L12,7.97C12.17,8.21 12.19,8.53 12.09,9.07L12.06,9.23L11.9,10.05L11.85,10.09Z" />
                                        </svg>*/}
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

/* Componente que contiene lista de deudas con pago en efectivo (Cedulón) y online (MercadoPago) */
class MisPagos extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            importeAPagar: '0,00'
        };
    }

    //Totalizador de importe de filas seleccionadas
    getFilasSeleccionadas = (filas, idFilasSeleccionadas) => {
        let registrosSeleccionados = []

        let importeTotal = 0;
        filas.map((item) => {
            importeTotal += parseFloat(idFilasSeleccionadas.indexOf(item.id) != -1 ? stringToFloat(item['importe']) : 0);

            if (idFilasSeleccionadas.indexOf(item.id) != -1)
                registrosSeleccionados.push(item['concepto']);
        });

        this.props.setRegistrosSeleccionados(this.props.menuItemSeleccionado, registrosSeleccionados);
        this.setState({ importeAPagar: importeTotal.toFixed(2).replace('.', ',') });
    };

    render() {
        const classes = this.props.classes;

        //deudaAdministrativa ó deudaJuicio contienen los mismos valores pero vienen en diferentes atributos
        //Puede venir una u otra, no las dos juntas
        const deudaTotales = this.props.info ? this.props.info.deudaAdministrativa || this.props.info.deudaJuicio : null;

        let valoresDeuda = {
            valor1: deudaTotales && deudaTotales.total ? deudaTotales.total : 0,
            valor2: (deudaTotales && (deudaTotales.vencida ? deudaTotales.vencida : deudaTotales.capital)) || 0,
            valor3: (deudaTotales && (deudaTotales.aVencer ? deudaTotales.aVencer : deudaTotales.gastos)) || 0,
        }

        //Datos para generar la grilla
        const rowList = this.props.info ? this.props.info.rowList : [];
        const rowsPerPage = (rowList.length <= 5 && 5) || (rowList.length > 5 && rowList.length <= 10 && 10) || (rowList.length > 10 && 25);
        const columnas = this.props.data.labels.columnas || null;
        const order = this.props.data.order || 'asc';
        const orderBy = this.props.data.orderBy || 'concepto';
        const check = this.props.check;

        //Tributo y tipo de tributo para generar el cedulon
        const tributo = this.props.tributoActual;
        let tipoTributo = getIdTipoTributo(tributo);

        return <div>
            <Grid container className={classes.containerDeudaAdm}>
                {/* Totalizadores */}
                <Typography className={classes.tituloDeudaAdm} variant="title" gutterBottom>Deuda {this.props.data.labels.totalesDeuda}</Typography>
                <Grid item sm={4}>
                    <Grid container>
                        <Grid item sm={6}>
                            <Typography variant="subheading" gutterBottom>Total: </Typography>
                        </Grid>
                        <Grid item sm={6}>
                            <Typography variant="subheading" gutterBottom><b>$ {stringToFloat(valoresDeuda.valor1, 2).toFixed(2)}</b></Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4}>
                    <Grid container>
                        <Grid item sm={6}>
                            <Typography variant="subheading" gutterBottom>{this.props.data.labels.vencida}: </Typography>
                        </Grid>
                        <Grid item sm={6}>
                            <Typography variant="subheading" gutterBottom><b>$ {stringToFloat(valoresDeuda.valor2, 2).toFixed(2)}</b></Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4}>
                    <Grid container>
                        <Grid item sm={6}>
                            <Typography variant="subheading" gutterBottom>{this.props.data.labels.aVencer}: </Typography>
                        </Grid>
                        <Grid item sm={6}>
                            <Typography variant="subheading" gutterBottom><b>$ {stringToFloat(valoresDeuda.valor3, 2).toFixed(2)}</b></Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={16}>
                {/* Totalizador de deudas seleccionadas y botones de pago */}
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
                    <MiCedulon
                        registrosSeleccionados={this.props.registrosSeleccionados}
                        tipoTributo={tipoTributo}
                        identificador={this.props.identificadorActual}
                        disabled={!(stringToFloat(this.state.importeAPagar) > 0)}
                    />

                    {/* 'datosNexos' y 'deleteDataNexos' se pasa solo en este boton para levantar solo una vez el modal 
                    para hacer el N+1 Pago de Nexo, de lo contrario se levanta dos veces */}
                    <MiMercadoPago
                        deleteDataNexos={this.props.deleteDataNexos}
                        seccionDetalleTributo={this.props.menuItemSeleccionado}
                        registrosSeleccionados={this.props.registrosSeleccionados}
                        tipoTributo={tipoTributo}
                        identificador={this.props.identificadorActual}
                        disabled={!(stringToFloat(this.state.importeAPagar) > 0)}
                        datosNexos={this.props.datosNexos}
                    />
                </Grid>
            </Grid>

            {/* Tabla de detalle del tributo */}
            <MiTabla
                columns={[
                    { id: 'concepto', type: 'string', numeric: false, disablePadding: false, label: (columnas ? columnas[0] : 'Concepto') },
                    { id: 'vencimiento', type: 'date', numeric: false, disablePadding: false, label: (columnas ? columnas[1] : 'Vencimiento') },
                    { id: 'importe', type: 'string', numeric: false, disablePadding: false, label: (columnas ? columnas[2] : 'Importe ($)') },
                    { id: 'detalle', type: 'custom', numeric: false, disablePadding: true, label: 'Detalle' },
                ]}
                rows={rowList || []}
                order={order}
                orderBy={orderBy}
                getFilasSeleccionadas={this.getFilasSeleccionadas}
                check={check}
                rowsPerPage={rowsPerPage}
            />

            <Grid container spacing={16}>
                {/* Totalizador de deudas seleccionadas y botones de pago */}
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
                    <MiCedulon
                        registrosSeleccionados={this.props.registrosSeleccionados}
                        tipoTributo={tipoTributo}
                        identificador={this.props.identificadorActual}
                        disabled={!(stringToFloat(this.state.importeAPagar) > 0)}
                    />

                    <MiMercadoPago
                        seccionDetalleTributo={this.props.menuItemSeleccionado}
                        registrosSeleccionados={this.props.registrosSeleccionados}
                        tipoTributo={tipoTributo}
                        identificador={this.props.identificadorActual}
                        disabled={!(stringToFloat(this.state.importeAPagar) > 0)}
                    />
                </Grid>
            </Grid>

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

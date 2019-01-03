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
import Button from "@material-ui/core/Button";
import Menu from '@material-ui/core/Menu';
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
import MisPagosDetalle from "@Componentes/MisPagosDetalle";
import MiTooltip from "@Componentes/MiTooltip";

import servicesTributarioOnline from '@Rules/Rules_TributarioOnline';
import servicesRepresentantes from '@Rules/Rules_Representantes';

//Funciones Útiles
import { getAllUrlParams, formatNumber, stringToDate, diffDays, getIdTipoTributo, dateToString } from "@Utils/functions"

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

class DetalleTributo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.modoInvitado = this.props.loggedUser.token == window.Config.TOKEN_INVITADO;
        this.initialState = {
            anchorElMenu: null,
            menuItemSeleccionado: this.props.match.params.seccionMenu || 'contribucion', //Menu seleccionado que muestra contenido MisPagosDetalle
            mostrarAlternativaPlan: false, //Se tiene que encontrar algun registro con 60 o más dias para mostrar la alternativa de plan
            infoDatosCuenta: '', //Info de cuenta que se muestra, depende de la seccion del menu en la que se encuentre menuItemSeleccionado
            informeCuenta: { //Información utilizada para mostrar informe de cuenta
                info: {},
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
                infoGrilla: []
            },
            periodosAdeudados: {
                modal: {
                    open: false
                },
                infoGrilla: []
            },
            informeAntecedentes: {
                modal: {
                    open: false,
                    showReporte: false
                },
                reporteBase64: undefined,
                infoGrilla: []
            },
            informeREMAT: {
                modal: {
                    open: false,
                    showReporte: false
                },
                reporteBase64: undefined,
                infoGrilla: []
            },
            declaracionJurada: {
                modal: {
                    open: false,
                    showReporte: false
                },
                reporteBase64: undefined,
                infoGrilla: [],
                registrosSeleccionados: [],
            },
            contribucion: { //Item Menu e información
                infoSeccion: undefined,
                tieneSubMenu: false,
                tipoCedulon: this.props.tipoCedulones.byKey[1],
                order: 'asc',
                orderBy: 'concepto',
                labels: {
                    detalleTitulo: 'Deuda Administrativa',
                    totalesDeuda: 'Administrativa',
                    vencida: 'Deuda vencida',
                    aVencer: 'A vencer',
                    columnas: ['Concepto', 'Vencimiento', 'Importe ($)']
                },
                registrosSeleccionados: [],
            },
            multas: { //Item Menu e información
                infoSeccion: undefined,
                tieneSubMenu: false,
                tipoCedulon: this.props.tipoCedulones.byKey[2],
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
            },
            juicios: { //Item Menu e información
                infoSeccion: undefined,
                tieneSubMenu: true,
                subItemTipoTributos: this.props.tipoTributos.byKey[11],
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
            },
            planes: { //Item Menu e información
                infoSeccion: undefined,
                tieneSubMenu: true,
                subItemTipoTributos: this.props.tipoTributos.byKey[12],
                tipoCedulon: this.props.tipoCedulones.byKey[4],
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


    componentWillReceiveProps(nextProps) {
        let idAnterior = decodeURIComponent(this.props.match.params.identificador);
        let idNuevo = decodeURIComponent(nextProps.match.params.identificador);
        if (idAnterior != idNuevo) {

            //window.location.reload();//Recargamos la pagina con la nueva url
            this.setState(_.clone(this.initialState), () => {
                const token = this.props.loggedUser.token;
                this.init(token, idNuevo);
            });
        }
    }

    init = (token, identificador) => {

        this.props.mostrarCargando(true);

        if (this.modoInvitado) {
            this.setIdTributosUserInvitado();
        } else {
            this.setIdTributosUserLog(token, identificador);
        }
    }

    setIdTributosUserInvitado = () => {
        const token = this.props.loggedUser.token;
        const idTipoTributo = getIdTipoTributo(this.props.match.params.tributo);
        const identificador = decodeURIComponent(this.props.match.params.identificador);

        const representante = localStorage.getItem('representante') || undefined;
        //localStorage.removeItem('representante');

        //Corroboramos que el identificador sea correcto y exista
        servicesRepresentantes.getTitularTributo(token, {
            "tipoTributo": idTipoTributo,
            "identificador": identificador
        })
            .then((datos) => {

                if (datos.ok) {

                    let identificadorActual = {
                        "tipoTributo": idTipoTributo,
                        "identificador": identificador,
                        "representado": representante
                    };

                    const tributosBienesPorCUIT = _.filter(this.props.tributosBienesPorCUIT, (o) => {
                        return o.tipoTributo == parseInt(getIdTipoTributo(this.props.match.params.tributo)) //&& !(o.tipoTributo == idTipoTributo &&  o.identificador == identificador)
                    });

                    //Si el seleccionado ya esta entre los importados no lo lo mete de nuevo en el array
                    let arrayIdentificadores = [identificadorActual, ...tributosBienesPorCUIT];
                    if (_.findIndex(tributosBienesPorCUIT, { "tipoTributo": identificadorActual.tipoTributo, "identificador": identificadorActual.identificador }) != -1)
                        arrayIdentificadores = tributosBienesPorCUIT;

                    //Cargamos el tributo seleccionado
                    this.setState({
                        identificadores: arrayIdentificadores
                    });

                    this.iniciarServicios(token, identificador);
                } else {
                    this.props.mostrarCargando(false);
                    this.props.redireccionar('/');
                }

            }).catch(err => {
                console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
            });
    }

    setIdTributosUserLog = (token, identificador) => {
        //Traemos los tributos asociados al Token
        servicesTributarioOnline.getIdTributos(token)
            .then((datos) => {

                if (!datos.ok) { return false; } //mostrarAlerta('Tributos: ' + datos.error); return false; }

                if (_.filter(datos.return, { identificador: identificador }).length == 0)
                    this.props.redireccionar('/Inicio');
                else {

                    this.setIdentificadores(datos.return);
                    this.iniciarServicios(token, identificador);
                }

            }).catch(err => {
                console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
            });
    }

    setIdentificadores = (datos) => {
        const tipoTributo = getIdTipoTributo(this.props.match.params.tributo);
        let IdsTributos = [];

        var arrayTributos = _.filter(datos, { tipoTributo: tipoTributo });

        arrayTributos = _.sortBy(arrayTributos, function (o) { return o.titular.titular; });

        IdsTributos = (arrayTributos && arrayTributos.map((tributo) => {
            return {
                representado: tributo.titular.titular,
                identificador: tributo.identificador
            }
        })) || [];

        this.setState({
            identificadores: IdsTributos
        });
    }

    iniciarServicios = (token, identificador) => {
        const tipoTributo = getIdTipoTributo(this.props.match.params.tributo);

        const service1 = servicesTributarioOnline.getInfoContribucion(token, tipoTributo, identificador)
            .then((datos) => {
                if (!datos.ok) { return false; } //mostrarAlerta('Períodos: ' + datos.error); return false; }

                let data = datos.return;
                //Corroboramos que existan registros
                if (data && data.periodos.length > 0) {
                    data['rowList'] = data.periodos.map((concepto) => {

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
                } else {
                    data = {
                        ...data,
                        rowList: []
                    }
                }

                this.setState({
                    contribucion: {
                        ...this.state.contribucion,
                        infoSeccion: data
                    }
                });

                //Se carga grilla ya que es la primera que aparece apenas se carga la pantalla
                this.refreshValoresPantalla({
                    datosItemSeleccionado: data
                });
            }).catch(err => {
                console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
            });

        const service2 = servicesTributarioOnline.getInfoMultas(token, tipoTributo, identificador)
            .then((datos) => {
                if (!datos.ok) { return false; } //mostrarAlerta('Multas: ' + datos.error); return false; }

                let data = datos.return;
                //Corroboramos que existan registros
                if (data && data.periodos.length > 0) {
                    data['rowList'] = data.periodos.map((concepto) => {

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
                } else {
                    data = {
                        ...data,
                        rowList: []
                    }
                }

                this.setState({
                    multas: {
                        ...this.state.multas,
                        infoSeccion: data
                    }
                });
            }).catch(err => {
                console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
            });

        const service3 = servicesTributarioOnline.getInfoJuicios(token, tipoTributo, identificador)
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

                juicios.infoSeccion = data;

                this.setState({ juicios });

            }).catch(err => {
                console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
            });

        const service4 = servicesTributarioOnline.getInfoPlanes(token, tipoTributo, identificador)
            .then((datos) => {
                if (!datos.ok) { return false; } //mostrarAlerta('Planes Pago: ' + datos.error); return false; }

                let data = datos.return;
                if (data && data.length > 0) {
                    data['lista'] = data.map((plan) => {

                        //Corroboramos el CBU, de ser SI, no se permite seleccionar filas en la grilla
                        const esCbuSI = _.filter(plan.datosCuenta, function (o) { return o.indexOf('CBU SI') != -1; }).length > 0;

                        let rowList = plan.periodos.map((concepto) => {

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
                        })

                        return {
                            ...plan,
                            idPlan: plan.identificador,
                            rowList: rowList,
                            esCbuSI: esCbuSI,
                            textoInfo: (esCbuSI && 'A partir de la segunda cuota del plan, se debitarán automáticamente en la cuenta del CBU declarado') || false,
                        }
                    });
                } else {
                    data = {
                        ...data,
                        lista: []
                    }
                }

                let planes = Object.assign({}, this.state.planes);
                const menuItem = (this.props.match.params.seccionMenu == 'planes' ?
                    decodeURIComponent(this.props.match.params.subIdentificador)
                    :
                    ((data.lista > 0 && data.lista[0].idJuicio) || ''));
                planes.menuItemSeleccionado = menuItem;

                planes.infoSeccion = data;

                this.setState({ planes });
            }).catch(err => {
                console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
            });

        Promise.all([service1,
            service2,
            service3,
            service4]).then(() => {
                this.props.mostrarCargando(false);
            });
    }

    //- Recargamos datos en la grilla de acuerdo al menu seleccionado
    //- Mostramos "Alternativa de plan" cuando existe una fecha mayor a 60 días ( mostrarAlternativaPlan )
    //- Cambiamos "Datos de Cuenta" respecto a cada seccion ( infoDatosCuenta )
    refreshValoresPantalla(parametros) {
        const datosItemSeleccionado = parametros.datosItemSeleccionado || null;

        if (datosItemSeleccionado == null)
            return false;

        let mostrarAlternativaPlan = false;
        let infoDatosCuenta = [];

        infoDatosCuenta = datosItemSeleccionado.datosCuenta ? datosItemSeleccionado.datosCuenta : 'No se encontraron registros';

        datosItemSeleccionado.rowList && datosItemSeleccionado.rowList.some((item) => {

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

    //Evento cuando se cambia de identificador (se recarga la página)
    selectIdentificador = event => {
        if (event.target.value == '0')
            return false;

        this.props.mostrarCargando(true);
        this.props.redireccionar('/DetalleTributario/' + this.props.match.params.tributo + '/' + encodeURIComponent(event.target.value));
        this.props.mostrarCargando(false);
        // window.location.reload();//Recargamos la pagina con la nueva url
    };

    //Evento cuando se cambia de sección del MENU principal
    handleMenuChange = (event, value) => {
        const seccionSeleccionada = event.currentTarget.attributes.value ? event.currentTarget.attributes.value.value : value;

        this.setState({
            menuItemSeleccionado: seccionSeleccionada
        });

        //Luego verificamos si la sección es una lista de tributos (submenu)
        //De ser asi, obtenemos los datos del primer item de la lista (submenu)
        //De lo contrario se muestra los datos de la seccion seleccionada
        const datosItemSeleccionado = this.state[seccionSeleccionada].tieneSubMenu ? this.getDatosSubItem(this.state[seccionSeleccionada].infoSeccion) : this.state[seccionSeleccionada].infoSeccion;

        //En caso de ser una lista (submenu), se selecciona el primero que aparece
        //Seleccionamos el item del SUBMENU
        if (this.state[seccionSeleccionada].tieneSubMenu && datosItemSeleccionado.rowList && datosItemSeleccionado.rowList.length > 0) {
            let seccionState = Object.assign({}, this.state[seccionSeleccionada]);
            //Seteamos el subitem seleccionado, como seleccionado
            seccionState.menuItemSeleccionado = datosItemSeleccionado.identificador;
            this.setState({
                [seccionSeleccionada]: seccionState
            });
        }

        //Mostramos los datos del item seleccionado
        this.refreshValoresPantalla({
            datosItemSeleccionado: datosItemSeleccionado
        });
    };

    /*
        Retorna "datosItemSeleccionado" de un subitem del submenu
    */
    getDatosSubItem = (infoDatos, identificador) => {

        let listaDatos = {};
        if (!identificador) {
            listaDatos = (infoDatos && infoDatos.lista[0]) || {};
        } else {
            infoDatos && infoDatos.lista.some((item) => {

                if (!identificador || item.identificador == identificador) {
                    listaDatos = item;
                    return false
                }
            });
        }

        return listaDatos;
    }

    //Evento cuando se cambia de subsección (SUBMENU)
    handleSubMenuChange = (event, identificador) => {
        const identificadorSeleccionado = event.currentTarget.attributes.identificador ? event.currentTarget.attributes.identificador.value : identificador;

        const seccionActual = this.state.menuItemSeleccionado;

        // Seteamos el submenu seleccionado, como seleccionado
        let seccionState = Object.assign({}, this.state[seccionActual]);
        seccionState.menuItemSeleccionado = identificadorSeleccionado;

        this.setState({
            [seccionActual]: seccionState,
            anchorElMenu: null
        });

        //Seteamos valores de acuerdo a la subsección seleccionada
        const datosItemSeleccionado = this.getDatosSubItem(this.state[seccionActual].infoSeccion, identificadorSeleccionado);
        this.refreshValoresPantalla({
            datosItemSeleccionado: datosItemSeleccionado
        });
    };

    //Función para registrar en el state las filas seleccionadas de la grilla 
    //de la seccion actual para generar cedulon
    setRegistrosSeleccionados = (menuItemSeleccionado, registrosSeleccionados) => {

        let itemSeleccionado = Object.assign({}, this.state[menuItemSeleccionado]);
        itemSeleccionado.registrosSeleccionados = registrosSeleccionados;

        this.setState({ [menuItemSeleccionado]: itemSeleccionado });
    };

    //Traemos datos de últimos pagos trayendo datos del WS
    onUltimosPagosDialogoOpen = () => {
        this.props.mostrarCargando(true);
        const token = this.props.loggedUser.token;
        const tipoTributo = getIdTipoTributo(this.props.match.params.tributo);
        const identificador = decodeURIComponent(this.props.match.params.identificador);

        if (this.state.ultimosPagos.infoGrilla.length == 0) {
            servicesTributarioOnline.getUltimosPagos(token, {
                tipoTributo: tipoTributo,
                identificador: identificador
            })
                .then((datos) => {
                    if (!datos.ok) { this.props.mostrarCargando(false); mostrarAlerta('Últimos Pagos: ' + datos.error); return false; }

                    let rowList = (datos.return && datos.return.map((pago) => {

                        return {
                            concepto: pago.concepto,
                            vencimiento: dateToString(new Date(pago.fecha), 'DD/MM/YYYY'),
                            importe: formatNumber(pago.importe.total),
                            detalle: <MiTooltip
                                contenidoDetalle={<div>
                                    <Typography>Base: <b>$ {pago.importe.base}</b></Typography>
                                    <Typography>Recargo: <b>$ {pago.importe.recargo}</b></Typography>
                                    <Typography>Deducción: <b>$ {pago.importe.deduccion}</b></Typography>
                                    <Typography>Citación: <b>{pago.citacion}</b></Typography>
                                    <Typography>CTL: <b>{pago.ctl}</b></Typography>
                                    <Typography>Estado: <b>{pago.estado}</b></Typography>
                                    <Typography>Caja: <b>{pago.caja}</b></Typography>
                                </div>}>
                                <i class="material-icons" style={{ color: '#149257', cursor: 'help' }}>add_circle_outline</i>
                            </MiTooltip>,
                            data: pago //atributo "data" no se muestra en MiTabla
                        }
                    })) || [];

                    this.setState({
                        ultimosPagos: {
                            ...this.state.ultimosPagos,
                            infoGrilla: rowList
                        }
                    });

                    this.handleUltimosPagosOpenDialog();
                }).catch(err => {
                    console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
                });
        } else {
            this.handleUltimosPagosOpenDialog();
        }
    }

    //Abrimos modal últimos pagos
    handleUltimosPagosOpenDialog = () => {
        this.setState({
            ultimosPagos: {
                ...this.state.ultimosPagos,
                modal: {
                    ...this.state.ultimosPagos.modal,
                    open: true
                }
            }
        }, () => {
            this.props.mostrarCargando(false);
        });
    }

    //Cerramos modal últimos pagos seteando los valores iniciales del state
    onUltimosPagosDialogoClose = () => {
        this.setState({
            ultimosPagos: {
                ...this.state.ultimosPagos,
                modal: {
                    ...this.state.ultimosPagos.modal,
                    open: false
                }
            }
        });
    }

    //Traemos datos de periodos adeudados trayendo datos del WS
    onPeriodosAdeudadosDialogoOpen = () => {
        this.props.mostrarCargando(true);
        const token = this.props.loggedUser.token;
        let tipoTributo = getIdTipoTributo(this.props.match.params.tributo);
        let identificador = decodeURIComponent(this.props.match.params.identificador);

        //En caso de Juicios y Planes
        const menuItemSeleccionado = this.state.menuItemSeleccionado;
        if (this.state[menuItemSeleccionado].subItemTipoTributos) {
            tipoTributo = getIdTipoTributo(this.state[menuItemSeleccionado].subItemTipoTributos);
            identificador = decodeURIComponent(this.state[menuItemSeleccionado].menuItemSeleccionado);
        }

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

    //Traemos datos de informe antecedentes trayendo datos del WS
    onInformeAntecedentesDialogoOpen = () => {
        this.props.mostrarCargando(true);
        const token = this.props.loggedUser.token;
        const tipoTributo = getIdTipoTributo(this.props.match.params.tributo);
        const identificador = decodeURIComponent(this.props.match.params.identificador);

        let arrayService = [];
        if (!this.state.informeAntecedentes.reporteBase64) {
            const service1 = servicesTributarioOnline.getInformeAntecedentes(token, {
                tipoTributo: tipoTributo,
                identificador: identificador
            })
                .then((datos) => {
                    if (!datos.ok) { this.props.mostrarCargando(false); mostrarAlerta('Informe Antecedentes: ' + datos.error); return false; }

                    let rowList = (datos.return && datos.return.map((row) => {

                        return {
                            causa: row.causa,
                            fecha: dateToString(new Date(row.fecha), 'DD/MM/YYYY'),
                            infraccion: row.infraccion,
                            detalle: <MiTooltip
                                contenidoDetalle={<div>
                                    <Typography>Juzg.: <b>{row.juzgado}</b></Typography>
                                    <Typography>Fallo: <b>{row.fallo}</b></Typography>
                                    <Typography>Cad.: <b>{row.caducidad}</b></Typography>
                                    <Typography>Acumulada: <b>{row.acumulada}</b></Typography>
                                </div>}>
                                <i class="material-icons" style={{ color: '#149257', cursor: 'help' }}>add_circle_outline</i>
                            </MiTooltip>,
                            data: row //atributo "data" no se muestra en MiTabla
                        }
                    })) || [];

                    this.setState({
                        informeAntecedentes: {
                            ...this.state.informeAntecedentes,
                            infoGrilla: rowList
                        }
                    });

                }).catch(err => {
                    console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
                });

            arrayService.push(service1);

            const service2 = servicesTributarioOnline.getReporteInformeAntecedentes(token, {
                tipoTributo: tipoTributo,
                identificador: identificador
            })
                .then((datos) => {
                    if (!datos.ok) { return false; } //mostrarAlerta('Informe Cuenta: ' + datos.error);

                    this.setState({
                        informeAntecedentes: {
                            ...this.state.informeAntecedentes,
                            reporteBase64: datos.return
                        }
                    });

                }).catch(err => {
                    console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
                });

            arrayService.push(service2);

            Promise.all(arrayService).then(() => {
                this.handleInformeAntecedentesOpenDialog();
                this.props.mostrarCargando(false);
            });
        } else {
            this.handleInformeAntecedentesOpenDialog();
            this.props.mostrarCargando(false);
        }
    }

    //Abrimos modal informe antecedentes
    handleInformeAntecedentesOpenDialog = () => {
        this.setState({
            informeAntecedentes: {
                ...this.state.informeAntecedentes,
                modal: {
                    ...this.state.informeAntecedentes.modal,
                    open: true
                }
            }
        }, () => {
            this.props.mostrarCargando(false);
        });
    }

    //Cerramos modal informe antecedentes seteando los valores iniciales del state
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

    //Mostramos el reporte en el modal de informe Antecedentes
    onInformeAntecedentesShowReporte = () => {
        this.setState({
            informeAntecedentes: {
                ...this.state.informeAntecedentes,
                modal: {
                    ...this.state.informeAntecedentes.modal,
                    showReporte: true
                }
            }
        });
    }

    //Ocultamos el reporte en el modal de informe Antecedentes
    onInformeAntecedentesHideReporte = () => {
        this.setState({
            informeAntecedentes: {
                ...this.state.informeAntecedentes,
                modal: {
                    ...this.state.informeAntecedentes.modal,
                    showReporte: false
                }
            }
        });
    }

    //Traemos datos de informe REMAT trayendo datos del WS
    onInformeREMATDialogoOpen = () => {
        this.props.mostrarCargando(true);
        const token = this.props.loggedUser.token;
        const tipoTributo = getIdTipoTributo(this.props.match.params.tributo);
        const identificador = decodeURIComponent(this.props.match.params.identificador);

        let arrayService = [];
        if (!this.state.informeREMAT.reporteBase64) {
            const service1 = servicesTributarioOnline.getInformeREMAT(token, {
                tipoTributo: tipoTributo,
                identificador: identificador
            })
                .then((datos) => {
                    if (!datos.ok) { this.props.mostrarCargando(false); mostrarAlerta('Informe REMAT: ' + datos.error); return false; }

                    let rowList = (datos.return && datos.return.map((row) => {

                        return {
                            causa: row.causa,
                            fecha: dateToString(new Date(row.fecha), 'DD/MM/YYYY'),
                            infraccion: row.infraccion,
                            detalle: <MiTooltip
                                contenidoDetalle={<div>
                                    <Typography>Juzg.: <b>{row.juzgado}</b></Typography>
                                    <Typography>Fallo: <b>{row.fallo}</b></Typography>
                                    <Typography>Acumulada: <b>{row.acumulada}</b></Typography>
                                </div>}>
                                <i class="material-icons" style={{ color: '#149257', cursor: 'help' }}>add_circle_outline</i>
                            </MiTooltip>,
                            data: row //atributo "data" no se muestra en MiTabla
                        }
                    })) || [];

                    this.setState({
                        informeREMAT: {
                            ...this.state.informeREMAT,
                            infoGrilla: rowList
                        }
                    });

                }).catch(err => {
                    console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
                });

            arrayService.push(service1);

            const service2 = servicesTributarioOnline.getReporteInformeREMAT(token, {
                tipoTributo: tipoTributo,
                identificador: identificador
            })
                .then((datos) => {
                    if (!datos.ok) { return false; } //mostrarAlerta('Informe Cuenta: ' + datos.error);

                    this.setState({
                        informeREMAT: {
                            ...this.state.informeREMAT,
                            reporteBase64: datos.return
                        }
                    });
                }).catch(err => {
                    console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
                });

            arrayService.push(service2);

            Promise.all(arrayService).then(() => {
                this.handleInformeREMATOpenDialog();
                this.props.mostrarCargando(false);
            });
        } else {
            this.handleInformeREMATOpenDialog();
            this.props.mostrarCargando(false);
        }
    }

    //Abrimos modal informe REMAT
    handleInformeREMATOpenDialog = () => {
        this.setState({
            informeREMAT: {
                ...this.state.informeREMAT,
                modal: {
                    ...this.state.informeREMAT.modal,
                    open: true
                }
            }
        }, () => {
            this.props.mostrarCargando(false);
        });
    }

    //Cerramos modal informe REMAT seteando los valores iniciales del state
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

    //Mostramos el reporte en el modal de informe REMAT
    onInformeREMATShowReporte = () => {
        this.setState({
            informeREMAT: {
                ...this.state.informeREMAT,
                modal: {
                    ...this.state.informeREMAT.modal,
                    showReporte: true
                }
            }
        });
    }

    //Ocultamos el reporte en el modal de informe REMAT
    onInformeREMATHideReporte = () => {
        this.setState({
            informeREMAT: {
                ...this.state.informeREMAT,
                modal: {
                    ...this.state.informeREMAT.modal,
                    showReporte: false
                }
            }
        });
    }


    //Traemos datos de informe cuenta trayendo datos del WS
    onInformeCuentaDialogoOpen = () => {
        this.props.mostrarCargando(true);
        const token = this.props.loggedUser.token;
        const tipoTributo = getIdTipoTributo(this.props.match.params.tributo);
        const identificador = decodeURIComponent(this.props.match.params.identificador);

        let arrayService = [];
        if (!this.state.informeCuenta.reporteBase64) {
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
        }

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


    //Traemos datos de Declaración Jurada trayendo datos del WS
    onDeclaracionJuradaDialogoOpen = () => {
        this.props.mostrarCargando(true);
        const token = this.props.loggedUser.token;
        const identificador = decodeURIComponent(this.props.match.params.identificador);

        servicesTributarioOnline.getDeclaracionJurada(token, {
            cuit: identificador //El identificador del comercio es el cuit
        })
            .then((datos) => {
                if (!datos.ok) { mostrarAlerta('Declaración Jurada: ' + datos.error); this.props.mostrarCargando(false); return false; }

                let rowList = (datos.return.periodos && datos.return.periodos.map((periodo, key) => {
                    return {
                        id: key,
                        periodo: periodo
                    }
                })) || [];

                if (rowList.length == 0) {
                    mostrarAlerta('Declaración Jurada: Demasiados rubros opción en desarrollo'); this.props.mostrarCargando(false); return false;
                }

                this.setState({
                    declaracionJurada: {
                        ...this.state.declaracionJurada,
                        infoGrilla: rowList,
                        reporteBase64: ''
                    }
                });

                this.handleDeclaracionJuradaOpenDialog();
                this.props.mostrarCargando(false);
            }).catch(err => {
                console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
            });
    }

    //Abrimos modal Declaración Jurada
    handleDeclaracionJuradaOpenDialog = () => {
        this.setState({
            declaracionJurada: {
                ...this.state.declaracionJurada,
                modal: {
                    ...this.state.declaracionJurada.modal,
                    open: true
                }
            }
        }, () => {
            this.props.mostrarCargando(false);
        });
    }

    //Cerramos modal Declaración Jurada seteando los valores iniciales del state
    onDeclaracionJuradaDialogoClose = () => {
        this.setState({
            declaracionJurada: {
                modal: {
                    open: false,
                    showReporte: false
                },
                reporteBase64: undefined,
                infoGrilla: [],
                registrosSeleccionados: [],
            }
        });
    }

    //Mostramos el reporte en el modal de Declaración Jurada
    onDeclaracionJuradaShowReporte = () => {
        this.props.mostrarCargando(true);
        const token = this.props.loggedUser.token;
        const identificador = decodeURIComponent(this.props.match.params.identificador);

        servicesTributarioOnline.getImprecionDeclaracionJurada(token, {
            cuit: identificador, //El identificador del comercio es el cuit
            periodosSeleccionados: this.state.declaracionJurada.registrosSeleccionados
        })
            .then((datos) => {
                if (!datos.ok) { mostrarAlerta('Declaración Jurada: ' + datos.error); this.props.mostrarCargando(false); return false; }

                this.setState({
                    declaracionJurada: {
                        ...this.state.declaracionJurada,
                        modal: {
                            ...this.state.declaracionJurada.modal,
                            showReporte: true
                        },
                        reporteBase64: datos.return.reporte
                    }
                });

                this.props.mostrarCargando(false);
            }).catch(err => {
                console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
            });
    }

    //Ocultamos el reporte en el modal de Declaración Jurada
    onDeclaracionJuradaHideReporte = () => {
        this.setState({
            declaracionJurada: {
                ...this.state.declaracionJurada,
                modal: {
                    ...this.state.declaracionJurada.modal,
                    showReporte: false
                },
                reporteBase64: '',
                registrosSeleccionados: []
            }
        });
    }

    //Totalizador de importe de filas seleccionadas
    getFilasSeleccionadasDDJJ = (filas, idFilasSeleccionadas) => {
        let registrosSeleccionados = []

        filas.map((item) => {
            if (idFilasSeleccionadas.indexOf(item.id) != -1)
                registrosSeleccionados.push(item['periodo']);
        });

        this.setState({
            declaracionJurada: {
                ...this.state.declaracionJurada,
                registrosSeleccionados: registrosSeleccionados
            }
        });

    };

    //Evento para agregar nuevo tributo
    handleOnClickAddTributo = (event) => {
        const tributo = this.props.match.params.tributo;
        this.props.redireccionar('/Inicio/Representantes/' + tributo + '?url=/DetalleTributario/' + tributo + '/:nuevoTributo');
    }

    //Evento para agregar comercios desde AFIP
    handleOnClickImportarAFIP = () => {
        const tributo = this.props.match.params.tributo;
        const identificador = decodeURIComponent(this.props.match.params.identificador);

        window.location.href = window.Config.BASE_URL_AFIP + "/afipInicio.html?urlRedirect=" + encodeURIComponent(window.Config.BASE_URL_SET_AFIP + '/importacionMasivaAFIP?appUrlRedirect=' + '/DetalleTributario/' + tributo + '/' + encodeURIComponent(identificador));
    };

    handleClickMenu = event => {
        this.setState({ anchorElMenu: event.currentTarget });
    };

    handleMenuSubMenu = (event, cerrarMenu) => {
        if (cerrarMenu) this.setState({ anchorElMenu: null });

        this.handleMenuChange(event);
    };

    handleCloseMenu = () => {
        this.setState({ anchorElMenu: null });
    };

    render() {
        const { classes } = this.props;

        const {
            contribucion,
            multas,
            identificadores,
            menuItemSeleccionado,
            juicios,
            planes,
            informeCuenta,
            infoDatosCuenta,
            ultimosPagos,
            periodosAdeudados,
            mostrarAlternativaPlan,
            declaracionJurada,
            informeAntecedentes,
            informeREMAT
        } = this.state;
        const infoContribucion = contribucion.infoSeccion;
        const infoMultas = multas.infoSeccion;
        const infoJuicios = juicios.infoSeccion;
        const infoPlanes = planes.infoSeccion;

        //rowList - Filas de grilla
        //lista - lista de tributos que contienen rowLists para mostrar en la grilla
        const listContribucion = infoContribucion && infoContribucion.rowList ? infoContribucion.rowList : [];
        const listMultas = infoMultas && infoMultas.rowList ? infoMultas.rowList : [];
        const listJuicios = infoJuicios && infoJuicios.lista ? infoJuicios.lista : [];
        const listPlanes = infoPlanes && infoPlanes.lista ? infoPlanes.lista : [];

        const tipoTributo = getIdTipoTributo(this.props.match.params.tributo);

        return (
            <div className={classNames(classes.mainContainer, "contentDetalleTributo", "mainContainer")}>
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={8} className={"container"}>
                        <MiCard>
                            {/* Titulo y selección de identificador */}
                            <Typography className={classNames(classes.title, "tituloDetalleTributo")} variant="title">Identificador:
                            <Select
                                    className={classNames(classes.selectIdentificador, "MenuItemIdentificadores")}
                                    inputProps={{
                                        name: 'identificador',
                                        id: 'identificador',
                                    }}
                                    value={decodeURIComponent(this.props.match.params.identificador)}
                                    disableUnderline
                                    onChange={this.selectIdentificador}
                                >

                                    {identificadores && identificadores.map((tributo, index) => {
                                        return <MenuItem key={index} value={tributo.identificador}>{tributo.identificador}{tributo.representado && ' - ' + tributo.representado}</MenuItem>
                                    })}
                                </Select>
                                {!this.props.paraMobile && <span>- <b className={classes.textoNoWrap}>{this.state[menuItemSeleccionado].labels.detalleTitulo}</b></span>}
                            </Typography>

                            {!this.props.paraMobile && <div>

                                {/* Menu de secciones */}
                                <Grid container spacing={16}>
                                    <Grid item sm={12} className={classes.tabMenu}>

                                        <Tabs
                                            value={menuItemSeleccionado}
                                            onChange={this.handleMenuChange}
                                            indicatorColor="secondary"
                                            textColor="secondary"
                                            centered
                                            scrollButtons="auto"
                                            classes={{ flexContainer: classNames(classes.flexContainersMenu, "flexContainersMenu"), scrollButtons: classes.scrollButtonsMenu }}
                                        >

                                            <Tab classes={{ root: classNames(classes.itemMenu, "itemMenu"), labelContainer: classes.labelItemMenu }} value="contribucion" label={<Badge className={classes.badgeTab} classes={{ badge: classes.badgeGreen }} color="secondary" badgeContent={listContribucion ? listContribucion.length : 0}><div title="Períodos correspondientes a la deuda adminsitrativa">Deuda Administrativa</div></Badge>} />

                                            <Tab classes={{ root: classNames(classes.itemMenu, "itemMenu"), labelContainer: classes.labelItemMenu }} value="multas" label={<Badge className={classes.badgeTab} classes={{ badge: classes.badgeGreen }} color="secondary" badgeContent={listMultas ? listMultas.length : 0}><div title="Multas correspondiente al Tribunal de Faltas">Multas</div></Badge>} />

                                            <Tab classes={{ root: classNames(classes.itemMenu, "itemMenu"), labelContainer: classes.labelItemMenu }} value="juicios" label={<Badge className={classes.badgeTab} classes={{ badge: classes.badgeRed }} color="secondary" badgeContent={listJuicios ? listJuicios.length : 0}><div title="Deuda Judicial correspondientes a perídos en Procuración Fiscal">Deuda Judicial</div></Badge>} />

                                            <Tab classes={{ root: classNames(classes.itemMenu, "itemMenu"), labelContainer: classes.labelItemMenu }} value="planes" label={<Badge className={classes.badgeTab} classes={{ badge: classes.badgeGreen }} color="secondary" badgeContent={listPlanes ? listPlanes.length : 0}><div title="Deuda correspondientes a Planes de Pago">Planes</div></Badge>} />

                                        </Tabs>

                                    </Grid>
                                </Grid>

                                {/* Sub Menus */}

                                {/* Juicio */}
                                {(menuItemSeleccionado == 'juicios' &&
                                    (listJuicios.length > 0 &&
                                        <div>

                                            <Grid container spacing={16}>
                                                <Grid item sm={12} className={classes.tabMenu}>
                                                    {/* SubMenu */}
                                                    <Tabs
                                                        value={juicios.menuItemSeleccionado}
                                                        onChange={this.handleSubMenuChange}
                                                        classes={{ flexContainer: "flexContainersMenu", scrollButtons: classes.scrollButtonsSubMenu, root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                                                        scrollable
                                                        scrollButtons="auto"
                                                    >

                                                        {/* Juicio por Contribución */}
                                                        {listJuicios.map((juicio) => {
                                                            return <Tab classes={{ root: classNames(classes.itemSubMenu, "itemMenu"), labelContainer: classes.labelItemMenu }} value={juicio.idJuicio} label={<Badge className={classes.badgeSubTab} classes={{ badge: classNames(classes.badgeJuicios, classes.badgeRed) }} badgeContent={juicio.rowList ? juicio.rowList.length : 0}><div>{juicio.idJuicio}</div></Badge>} />
                                                        })}

                                                    </Tabs>

                                                </Grid>
                                            </Grid>
                                        </div>)
                                    || menuItemSeleccionado == 'juicios' &&
                                    <Typography className={classes.infoTexto}>
                                        {`Le informamos que no posee juicios`}
                                    </Typography>)
                                }

                                {/* Planes de Pago */}
                                {(menuItemSeleccionado == 'planes' && listPlanes.length > 0 && <div>

                                    <Grid container spacing={16}>
                                        <Grid item sm={12} className={classes.tabMenu}>
                                            {/* SubMenu */}
                                            <Tabs
                                                value={planes.menuItemSeleccionado}
                                                onChange={this.handleSubMenuChange}
                                                scrollable
                                                scrollButtons="auto"
                                                classes={{ flexContainer: "flexContainersMenu", scrollButtons: classes.scrollButtonsSubMenu }}
                                            >

                                                {listPlanes.map((plan) => {
                                                    return <Tab classes={{ root: classNames(classes.itemSubMenu, "itemMenu"), labelContainer: classes.labelItemMenu }} value={plan.idPlan} label={<Badge className={classes.badgeSubTab} classes={{ badge: classes.badgeGreen }} color="secondary" badgeContent={plan.rowList ? plan.rowList.length : 0}><div>{plan.idPlan}</div></Badge>} />
                                                })}

                                            </Tabs>

                                        </Grid>
                                    </Grid>
                                </div>)
                                    ||
                                    menuItemSeleccionado == 'planes' &&
                                    <Typography className={classes.infoTexto}>
                                        {`Le informamos que no posee planes de pago`}
                                    </Typography>}

                            </div>}

                            {this.props.paraMobile && <div>
                                <Grid container spacing={16}>
                                    <Grid item sm={12} className={classes.menuContainer}>
                                        <Button
                                            aria-owns={this.state.anchorElMenu ? 'simple-menu' : undefined}
                                            aria-haspopup="true"
                                            onClick={this.handleClickMenu}
                                            className={"menuParaMobile"}
                                        >Menu</Button> {((menuItemSeleccionado == 'juicios' || menuItemSeleccionado == 'planes') && <b className={classNames(classes.subItemSeleccionadoMobile, classes.textoNoWrap)}>{this.state[menuItemSeleccionado].labels.detalleTitulo} - {this.state[menuItemSeleccionado].menuItemSeleccionado}</b>) || <b className={classNames(classes.subItemSeleccionadoMobile, classes.textoNoWrap)}>{this.state[menuItemSeleccionado].labels.detalleTitulo}</b>}
                                        <Menu
                                            id="simple-menu"
                                            anchorEl={this.state.anchorElMenu}
                                            open={Boolean(this.state.anchorElMenu)}
                                            onClose={this.handleCloseMenu}
                                        >
                                            <MenuItem
                                                disabled={this.state.menuItemSeleccionado == 'contribucion'}
                                                value={'contribucion'}
                                                onClick={(event) => this.handleMenuSubMenu(event, true)}
                                            >Deuda Administrativa</MenuItem>
                                            <MenuItem
                                                disabled={this.state.menuItemSeleccionado == 'multas'}
                                                value={'multas'}
                                                onClick={(event) => this.handleMenuSubMenu(event, true)}
                                            >Multas</MenuItem>
                                            <MenuItem
                                                disabled={this.state.menuItemSeleccionado == 'juicios'}
                                                value={'juicios'}
                                                onClick={(event) => this.handleMenuSubMenu(event, false)}
                                            >Deuda Judicial</MenuItem>
                                            {(menuItemSeleccionado == 'juicios' && listJuicios.length > 0 && <div>
                                                {listJuicios.map((juicio) => {
                                                    return <MenuItem
                                                        className={classes.itemSubMenuMobile}
                                                        disabled={this.state[menuItemSeleccionado].menuItemSeleccionado == juicio.idJuicio}
                                                        identificador={juicio.idJuicio}
                                                        onClick={this.handleSubMenuChange}
                                                    >{juicio.idJuicio}</MenuItem>;
                                                })}
                                            </div>)}
                                            <MenuItem
                                                disabled={this.state.menuItemSeleccionado == 'planes'}
                                                value={'planes'}
                                                onClick={(event) => this.handleMenuSubMenu(event, false)}
                                            >Planes</MenuItem>
                                            {(menuItemSeleccionado == 'planes' && listPlanes.length > 0 && <div>
                                                {listPlanes.map((plan) => {
                                                    return <MenuItem
                                                        className={classes.itemSubMenuMobile}
                                                        disabled={this.state[menuItemSeleccionado].menuItemSeleccionado == plan.idPlan}
                                                        identificador={plan.idPlan}
                                                        onClick={this.handleSubMenuChange}
                                                    >{plan.idPlan}</MenuItem>;
                                                })}
                                            </div>)}
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </div>}

                            {/* Secciones */}

                            {/* Contribución por período */}
                            {(menuItemSeleccionado == 'contribucion' &&
                                listContribucion.length > 0 && <div>
                                    <Typography className={classes.infoTexto}>
                                        {`En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`}
                                    </Typography>
                                    <MisPagosDetalle
                                        paraMobile={this.props.paraMobile}
                                        pagoRedirect={'/DetalleTributario/' + this.props.match.params.tributo + '/' + decodeURIComponent(this.props.match.params.identificador) + '/' + menuItemSeleccionado}
                                        tipoCedulon={this.state[menuItemSeleccionado].tipoCedulon}
                                        check={true}
                                        info={infoContribucion || null}
                                        menuItemSeleccionado={menuItemSeleccionado}
                                        data={this.state[menuItemSeleccionado]}
                                        registrosSeleccionados={this.state[menuItemSeleccionado].registrosSeleccionados}
                                        setRegistrosSeleccionados={this.setRegistrosSeleccionados}
                                        identificadorActual={decodeURIComponent(this.props.match.params.identificador)}
                                        tributoActual={this.props.match.params.tributo}
                                    />
                                </div>)
                                || menuItemSeleccionado == 'contribucion' &&
                                <Typography className={classes.infoTexto}>
                                    {`Le informamos que no posee deudas`}
                                </Typography>}

                            {/* Multas */}
                            {(menuItemSeleccionado == 'multas' &&
                                listMultas.length > 0 && <div>
                                    <div>
                                        <Typography className={classes.infoTexto}>
                                            {`En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`}
                                        </Typography>
                                        <MisPagosDetalle
                                            paraMobile={this.props.paraMobile}
                                            pagoRedirect={'/DetalleTributario/' + this.props.match.params.tributo + '/' + decodeURIComponent(this.props.match.params.identificador) + '/' + menuItemSeleccionado}
                                            tipoCedulon={this.state[menuItemSeleccionado].tipoCedulon}
                                            check={true}
                                            info={infoMultas || null}
                                            menuItemSeleccionado={menuItemSeleccionado}
                                            data={this.state[menuItemSeleccionado]}
                                            registrosSeleccionados={this.state[menuItemSeleccionado].registrosSeleccionados}
                                            setRegistrosSeleccionados={this.setRegistrosSeleccionados}
                                            identificadorActual={decodeURIComponent(this.props.match.params.identificador)}
                                            tributoActual={this.props.match.params.tributo}
                                        />
                                    </div>
                                </div>)
                                || menuItemSeleccionado == 'multas' &&
                                <Typography className={classes.infoTexto}>
                                    {`Le informamos que no posee multas`}
                                </Typography>}

                            {/* Sub Secciones */}

                            {/* Juicio por Contribucion */}
                            {menuItemSeleccionado == 'juicios' &&
                                listJuicios.map((juicio) => {
                                    return <div>
                                        {juicios.menuItemSeleccionado == juicio.idJuicio &&
                                            <div>
                                                <Typography className={classes.infoTexto}>
                                                    {`En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`}
                                                </Typography>
                                                <MisPagosDetalle
                                                    paraMobile={this.props.paraMobile}
                                                    pagoRedirect={'/DetalleTributario/' + this.props.match.params.tributo + '/' + decodeURIComponent(this.props.match.params.identificador) + '/' + menuItemSeleccionado}
                                                    tipoCedulon={this.state[menuItemSeleccionado].tipoCedulon}
                                                    check={false}
                                                    info={juicio || null}
                                                    menuItemSeleccionado={menuItemSeleccionado}
                                                    data={this.state[menuItemSeleccionado]}
                                                    registrosSeleccionados={this.state[menuItemSeleccionado].registrosSeleccionados}
                                                    setRegistrosSeleccionados={this.setRegistrosSeleccionados}
                                                    identificadorActual={decodeURIComponent(this.state[menuItemSeleccionado].menuItemSeleccionado)}
                                                    tributoActual={'Juicio'}
                                                />
                                            </div>}
                                    </div>
                                })}



                            {/* Planes de Pago */}
                            {menuItemSeleccionado == 'planes' &&
                                listPlanes.map((plan) => {
                                    return <div>
                                        {planes.menuItemSeleccionado == plan.idPlan &&
                                            <div>
                                                <Typography className={classes.infoTexto}>
                                                    {plan.textoInfo || `En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`}
                                                </Typography>
                                                <MisPagosDetalle
                                                    paraMobile={this.props.paraMobile}
                                                    pagoRedirect={'/DetalleTributario/' + this.props.match.params.tributo + '/' + decodeURIComponent(this.props.match.params.identificador) + '/' + menuItemSeleccionado}
                                                    tipoCedulon={this.state[menuItemSeleccionado].tipoCedulon}
                                                    check={true}
                                                    disabled={plan.esCbuSI || false}
                                                    info={plan || null}
                                                    menuItemSeleccionado={menuItemSeleccionado}
                                                    data={this.state[menuItemSeleccionado]}
                                                    registrosSeleccionados={this.state[menuItemSeleccionado].registrosSeleccionados}
                                                    setRegistrosSeleccionados={this.setRegistrosSeleccionados}
                                                    identificadorActual={decodeURIComponent(this.state[menuItemSeleccionado].menuItemSeleccionado)}
                                                    tributoActual={'Plan'}
                                                />
                                            </div>}
                                    </div>
                                })}

                        </MiCard>
                    </Grid>
                    <Grid item xs={4} className={"container"}>
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
                                        <b>{infoContribucion && infoContribucion.titular && infoContribucion.titular.titular}</b>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={16}>
                                <Grid item sm={4}>
                                    <Typography variant="subheading" gutterBottom>CUIT: </Typography>
                                </Grid>
                                <Grid item sm={8}>
                                    <Typography variant="subheading" gutterBottom>
                                        <b>{infoContribucion && infoContribucion.titular && infoContribucion.titular.cuit}</b>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={16}>
                                <Grid item sm={4}>
                                    <Typography variant="subheading" gutterBottom>Identificador: </Typography>
                                </Grid>
                                <Grid item sm={8}>
                                    <Typography variant="subheading" gutterBottom>
                                        <b>{decodeURIComponent(this.props.match.params.identificador)}</b>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={16}>
                                <Grid item sm={4}>
                                    <Typography variant="subheading" gutterBottom>Juicios: </Typography>
                                </Grid>
                                <Grid item sm={8}>
                                    <Typography variant="subheading" gutterBottom>
                                        <b>{infoContribucion && infoContribucion.tieneJuicios ? 'Si tiene' : 'No tiene'}</b>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={16}>
                                <Grid item sm={4}>
                                    <Typography variant="subheading" gutterBottom>Planes: </Typography>
                                </Grid>
                                <Grid item sm={8}>
                                    <Typography variant="subheading" gutterBottom>
                                        <b>{infoContribucion && infoContribucion.tienePlanes ? 'Si tiene' : 'No tiene'}</b>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={16}>
                                <Grid item sm={4}>
                                    <Typography variant="subheading" gutterBottom>Multas: </Typography>
                                </Grid>
                                <Grid item sm={8}>
                                    <Typography variant="subheading" gutterBottom>
                                        <b>{infoContribucion && infoContribucion.tieneMultas ? 'Si tiene' : 'No tiene'}</b>
                                    </Typography>
                                </Grid>
                            </Grid>

                        </MiCard>

                        <MiCard rootClassName={"otrasOperaciones"}>
                            {/* Bloque Otras Operaciones */}
                            <Typography className={classes.title} variant="title">Otras operaciones</Typography>
                            <Divider className={classes.divider} />

                            {!this.modoInvitado && <div>
                                {(tipoTributo != 3 &&
                                    <Grid container spacing={16}>
                                        <Grid item sm={2}>
                                            <svg className={classes.icon} viewBox="0 0 24 24">
                                                <path fill="#149257" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z" />
                                            </svg>
                                        </Grid>
                                        <Grid item sm={10}>
                                            <Typography
                                                onClick={this.handleOnClickAddTributo}
                                                variant="subheading"
                                                className={classNames(classes.textList, classes.link)}
                                                gutterBottom>
                                                Agregar nuevo tributo
                                        </Typography>
                                        </Grid>
                                    </Grid>) ||
                                    <Grid container spacing={16}>
                                        <Grid item sm={2}>
                                            <svg className={classes.icon} viewBox="0 0 24 24">
                                                <path fill="#149257" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z" />
                                            </svg>
                                        </Grid>
                                        <Grid item sm={10}>
                                            <Typography
                                                onClick={this.handleOnClickImportarAFIP}
                                                variant="subheading"
                                                className={classNames(classes.textList, classes.link)}
                                                gutterBottom>
                                                Importar AFIP
                                        </Typography>
                                        </Grid>
                                    </Grid>}
                            </div>}

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
                                        classMaxWidth={classes.maxWidthInformeCuenta}
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
                                                    <object data={'data:application/pdf;base64,' + informeCuenta.reporteBase64} type="application/pdf" height="384px" width="856px">
                                                        <a href={'data:application/pdf;base64,' + informeCuenta.reporteBase64} download>Descargar Informe de Cuenta</a>
                                                    </object>}
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
                                    >
                                        <MiTabla
                                            pagination={!this.props.paraMobile}
                                            columns={[
                                                { id: 'concepto', type: 'string', numeric: false, disablePadding: false, label: 'Concepto' },
                                                { id: 'vencimiento', type: 'date', numeric: false, disablePadding: false, label: 'Vencimiento' },
                                                { id: 'importe', type: 'string', numeric: true, disablePadding: false, label: 'Importe ($)' },
                                                { id: 'detalle', type: 'custom', numeric: false, disablePadding: true, label: 'Detalle' },
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

                            <Grid container spacing={16}>
                                <Grid item sm={2}>
                                    <svg className={classes.icon} viewBox="0 0 24 24">
                                        <path fill="#149257" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z" />
                                    </svg>
                                </Grid>
                                <Grid item sm={10}>
                                    <MiControledDialog
                                        paraMobile={this.props.paraMobile}
                                        open={ultimosPagos.modal.open == true}
                                        onDialogoOpen={this.onUltimosPagosDialogoOpen}
                                        onDialogoClose={this.onUltimosPagosDialogoClose}
                                        textoLink={'Últimos pagos'}
                                        titulo={'Últimos pagos'}
                                    >
                                        <MiTabla
                                            pagination={!this.props.paraMobile}
                                            columns={[
                                                { id: 'concepto', type: 'string', numeric: false, disablePadding: false, label: 'Concepto' },
                                                { id: 'vencimiento', type: 'date', numeric: false, disablePadding: false, label: 'Fecha' },
                                                { id: 'importe', type: 'string', numeric: true, disablePadding: false, label: 'Importe ($)' },
                                                { id: 'detalle', type: 'custom', numeric: false, disablePadding: true, label: 'Detalle' },
                                            ]}
                                            rows={ultimosPagos.infoGrilla || []}
                                            msgNoRows={'No existen pagos registrados en los últimos dos años'}
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
                            {menuItemSeleccionado != 'planes' && <div>

                                {/* SE QUITA HASTA QUE SE IMPLEMENTE
                                
                                mostrarAlternativaPlan && <div>
                                    <Grid container spacing={16}>
                                        <Grid item sm={2}>
                                            <svg className={classes.icon} viewBox="0 0 24 24">
                                                <path fill="#149257" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z" />
                                            </svg>
                                        </Grid>
                                        <Grid item sm={10}>
                                            <MiLinkDialog
                                                paraMobile={this.props.paraMobile}
                                                textoLink={'Simular Plan de Pagos'}
                                                titulo={'Simular Plan de Pagos'}
                                            >
                                                Simulador en proceso, estamos trabajando en ello.
                                            </MiLinkDialog>
                                        </Grid>
                                    </Grid>
                                </div>*/}

                                {tipoTributo == 1 && <div>
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
                                                paraMobile={this.props.paraMobile}
                                                open={informeAntecedentes.modal.open}
                                                onDialogoOpen={this.onInformeAntecedentesDialogoOpen}
                                                onDialogoClose={this.onInformeAntecedentesDialogoClose}
                                                textoLink={'Informe Antecedentes'}
                                                titulo={'Informe Antecedentes'}
                                            >
                                                <div key="headerContent"></div>
                                                <div key="mainContent">
                                                    {!informeAntecedentes.modal.showReporte && <div>
                                                        <MiTabla
                                                            pagination={!this.props.paraMobile}
                                                            columns={[
                                                                { id: 'causa', type: 'string', numeric: false, disablePadding: false, label: 'Causa' },
                                                                { id: 'fecha', type: 'date', numeric: false, disablePadding: false, label: 'Fecha' },
                                                                { id: 'infracciones', type: 'string', numeric: false, disablePadding: false, label: 'Infracciones' },
                                                                { id: 'detalle', type: 'custom', numeric: false, disablePadding: true, label: 'Detalle' },
                                                            ]}
                                                            rows={informeAntecedentes.infoGrilla || []}
                                                            order='desc'
                                                            orderBy='fecha'
                                                            check={false}
                                                            rowsPerPage={5}
                                                            classes={{
                                                                root: classes.miTabla
                                                            }}
                                                        />
                                                    </div>}

                                                    {informeAntecedentes.modal.showReporte && <div>
                                                        {informeAntecedentes.reporteBase64 && informeAntecedentes.reporteBase64 != '' &&
                                                            <object data={'data:application/pdf;base64,' + informeAntecedentes.reporteBase64} type="application/pdf" height="384px" width="856px">
                                                                <a href={'data:application/pdf;base64,' + informeAntecedentes.reporteBase64} download>Descargar Informe de Antecedentes</a>
                                                            </object>}
                                                        {!informeAntecedentes.reporteBase64 && 'En este momento no se puede generar el detalle para imprimir, estamos trabajando en ello.'}
                                                    </div>}
                                                </div>
                                                <div key="footerContent" className={classes.buttonFotterDialog}>
                                                    {!informeAntecedentes.modal.showReporte && <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        className={classes.buttonActions}
                                                        onClick={this.onInformeAntecedentesShowReporte}
                                                    >
                                                        Imprimir Informe
                                            </Button>}

                                                    {informeAntecedentes.modal.showReporte && <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        className={classes.buttonActions}
                                                        onClick={this.onInformeAntecedentesHideReporte}
                                                    >
                                                        Volver
                                            </Button>}
                                                </div>

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
                                                paraMobile={this.props.paraMobile}
                                                open={informeREMAT.modal.open}
                                                onDialogoOpen={this.onInformeREMATDialogoOpen}
                                                onDialogoClose={this.onInformeREMATDialogoClose}
                                                textoLink={'Informe REMAT'}
                                                titulo={'Informe REMAT'}
                                            >
                                                <div key="headerContent"></div>
                                                <div key="mainContent">
                                                    {!informeREMAT.modal.showReporte && <div>
                                                        <MiTabla
                                                            pagination={!this.props.paraMobile}
                                                            columns={[
                                                                { id: 'causa', type: 'string', numeric: false, disablePadding: false, label: 'Causa' },
                                                                { id: 'fecha', type: 'date', numeric: false, disablePadding: false, label: 'Fecha' },
                                                                { id: 'infracciones', type: 'string', numeric: false, disablePadding: false, label: 'Infracciones' },
                                                                { id: 'detalle', type: 'custom', numeric: false, disablePadding: true, label: 'Detalle' },
                                                            ]}
                                                            rows={informeREMAT.infoGrilla || []}
                                                            order='desc'
                                                            orderBy='fecha'
                                                            check={false}
                                                            rowsPerPage={5}
                                                            classes={{
                                                                root: classes.miTabla
                                                            }}
                                                        />
                                                    </div>}

                                                    {informeREMAT.modal.showReporte && <div>
                                                        {informeREMAT.reporteBase64 && informeREMAT.reporteBase64 != '' &&
                                                            <object data={'data:application/pdf;base64,' + informeREMAT.reporteBase64} type="application/pdf" height="384px" width="856px">
                                                                <a href={'data:application/pdf;base64,' + informeREMAT.reporteBase64} download>Descargar Informe REMAT</a>
                                                            </object>}
                                                        {!informeREMAT.reporteBase64 && 'En este momento no se puede generar el detalle para imprimir, estamos trabajando en ello.'}
                                                    </div>}
                                                </div>
                                                <div key="footerContent" className={classes.buttonFotterDialog}>
                                                    {!informeREMAT.modal.showReporte && <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        className={classes.buttonActions}
                                                        onClick={this.onInformeREMATShowReporte}
                                                    >
                                                        Imprimir Informe
                                            </Button>}

                                                    {informeREMAT.modal.showReporte && <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        className={classes.buttonActions}
                                                        onClick={this.onInformeREMATHideReporte}
                                                    >
                                                        Volver
                                            </Button>}
                                                </div>
                                            </MiControledDialog>
                                        </Grid>
                                    </Grid>
                                </div>}
                            </div>}

                            {/* Cuando no este seleccionado Planes de Pago */}
                            {menuItemSeleccionado == 'planes' && <div>
                                {/*
                                <Grid container spacing={16}>
                                    <Grid item sm={2}>
                                        <svg className={classes.icon} viewBox="0 0 24 24">
                                            <path fill="#149257" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z" />
                                        </svg>
                                    </Grid>
                                    <Grid item sm={10}>
                                        <MiLinkDialog
                                            paraMobile={this.props.paraMobile}
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
                                            paraMobile={this.props.paraMobile}
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
                                            paraMobile={this.props.paraMobile}
                                            textoLink={'Imprimir Solicitud'}
                                            titulo={'Imprimir Solicitud'}
                                        >
                                            Contenido Imprimir Solicitud!
                                        </MiLinkDialog>
                                    </Grid>
                                </Grid>*/}
                            </div>}

                            {/* Solo en comercios */}
                            {getIdTipoTributo(this.props.match.params.tributo) == 3 && <div>
                                <Grid container spacing={16}>
                                    <Grid item sm={2}>
                                        <svg className={classes.icon} viewBox="0 0 24 24">
                                            <path fill="#149257" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z" />
                                        </svg>
                                    </Grid>
                                    <Grid item sm={10}>
                                        <MiControledDialog
                                            paraMobile={this.props.paraMobile}
                                            open={declaracionJurada.modal.open}
                                            onDialogoOpen={this.onDeclaracionJuradaDialogoOpen}
                                            onDialogoClose={this.onDeclaracionJuradaDialogoClose}
                                            textoLink={'Imprimir DDJJ'}
                                            titulo={'Imprimir DDJJ'}
                                        >
                                            <div key="headerContent"></div>
                                            <div key="mainContent">
                                                {!declaracionJurada.modal.showReporte && <div>
                                                    <MiTabla
                                                        pagination={!this.props.paraMobile}
                                                        columns={[
                                                            { id: 'periodo', type: 'string', numeric: false, disablePadding: false, label: 'Periodos' },
                                                        ]}
                                                        rows={declaracionJurada.infoGrilla || []}
                                                        getFilasSeleccionadas={this.getFilasSeleccionadasDDJJ}
                                                        order='desc'
                                                        orderBy='vencimiento'
                                                        check={true}
                                                        rowsPerPage={5}
                                                        classes={{
                                                            root: classes.miTabla
                                                        }}
                                                    />
                                                </div>}

                                                {declaracionJurada.modal.showReporte && <div>
                                                    {declaracionJurada.reporteBase64 && declaracionJurada.reporteBase64 != '' &&
                                                        <object data={'data:application/pdf;base64,' + declaracionJurada.reporteBase64} type="application/pdf" height="384px" width="856px">
                                                            <a href={'data:application/pdf;base64,' + declaracionJurada.reporteBase64} download>Descargar DDJJ</a>
                                                        </object>}
                                                    {declaracionJurada.reporteBase64 == undefined && 'En este momento no se puede generar el detalle para imprimir, estamos trabajando en ello.'}
                                                    {declaracionJurada.reporteBase64 == '' && 'Generando DDJJ.'}
                                                </div>}
                                            </div>
                                            <div key="footerContent" className={classes.buttonFotterDialog}>
                                                {!declaracionJurada.modal.showReporte && <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.buttonActions}
                                                    onClick={this.onDeclaracionJuradaShowReporte}
                                                    disabled={!declaracionJurada.registrosSeleccionados.length > 0}
                                                >
                                                    Imprimir DDJJ
                                            </Button>}

                                                {declaracionJurada.modal.showReporte && <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.buttonActions}
                                                    onClick={this.onDeclaracionJuradaHideReporte}
                                                >
                                                    Volver
                                            </Button>}
                                            </div>
                                        </MiControledDialog>
                                    </Grid>
                                </Grid>
                            </div>}
                        </MiCard>

                    </Grid>
                </Grid>
            </div >
        );
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

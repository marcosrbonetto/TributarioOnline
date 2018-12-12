import React, { Component } from 'react'

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import _ from "lodash";
import './style.css'
import { mostrarAlerta } from "@Utils/functions";

import { setPagosMercadoPago } from "@ReduxSrc/TributarioOnline/DetalleTributario/actions";
import servicesMercadoPago from '@Rules/Rules_MercadoPago';

import { getAllUrlParams, getIdTipoTributo } from "@Utils/functions"
import MiPanelMensaje from "@Componentes/MiPanelMensaje";

const mapStateToProps = state => {
    return {
        loggedUser: state.Usuario.loggedUser,
        infoPagosMercadoPago: state.DetalleTributario.infoPagosMercadoPago,
        tipoCedulones: state.MainContent.tipoCedulones,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        redireccionar: url => {
            dispatch(push(url));
        },
        setPropsUpdatePagosMercadoPago: (arrayNexos) => {
            dispatch(setPagosMercadoPago(arrayNexos));
        }
    };
};

class PagoNexo extends Component {
    constructor() {
        super();

        this.state = {
            cargando: true,
            error: false,
            exito: false,
            finPagos: false,
            mensajeOK: '¡Pago realizado con éxito!',
            mensajeError: 'Ocurrió un error al guardar el pago',
            mensajeCargando: 'Procesando su pago...',
            btnOK: 'Continuar'
        }
    }

    componentDidMount() {
        
        /* NOTA: 'this.props.infoPagosMercadoPago' tiene los nexos a pagar a partir de ellos se lo actualizará para realizar los pagos */
        const token = this.props.loggedUser.token;
        const mercadoPago = getAllUrlParams(window.location.href).mercadoPago; //Ej.: true
        const nexo = getAllUrlParams(window.location.href).nexo; //Ej.: 183060018127
        const tipoTributo = getAllUrlParams(window.location.href).tipoTributo; //Ej.: 1
        const identificador = getAllUrlParams(window.location.href).identificador; //Ej.: HCJ675
        const tokenNexo = getAllUrlParams(window.location.href).token; //Ej.: c643dcdeae55ee341509701473ae202d
        const emisor = getAllUrlParams(window.location.href).issuer_id; //Ej.: 310
        const cuotas = getAllUrlParams(window.location.href).installments; //Ej.: 1
        const metodoPago = getAllUrlParams(window.location.href).payment_method_id; //Ej.: visa
        
        const tipoCedulon = getAllUrlParams(window.location.href).tipoCedulon; //Ej.: Contribuciones
        const idTipoCedulon = this.props.tipoCedulones.byValue[tipoCedulon];

        const email = decodeURIComponent(getAllUrlParams(window.location.href).email); //Ej.: ruben@hotmail.com

        const idBtnMercadoPago = getAllUrlParams(window.location.href).idBtnMercadoPago;
        localStorage.setItem('idBtnMercadoPago', idBtnMercadoPago);

        if (mercadoPago && this.props.infoPagosMercadoPago &&
            this.props.infoPagosMercadoPago.arrayNexos &&
            this.props.infoPagosMercadoPago.arrayNexos.length > 0) {

            let arrayNexos = this.props.infoPagosMercadoPago.arrayNexos;
            const result = _.filter(arrayNexos, {
                nexo: nexo,
                tipoTributo: parseInt(tipoTributo),
                identificador: identificador
            });

            if (result.length == 0) return false;

            let nexoActual = result[0];
            
            servicesMercadoPago.pagoMercadoPago(token, {
                nexo: nexoActual.nexo,
                tipoTributo: parseInt(tipoTributo),
                identificador: identificador,
                token: tokenNexo,
                metodoPago: metodoPago,
                emisor: emisor,
                cuotas: parseInt(cuotas),
                email: email,
                tipoCedulon: idTipoCedulon
            })
                .then((datos) => {

                    if (!datos.ok) {
                        this.setState({
                            ...this.state,
                            cargando: false,
                            error: true,
                            exito: false,
                        });

                        mostrarAlerta('Pago MercadoPago: ' + datos.error);

                        localStorage.removeItem('idBtnMercadoPago');
                        console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");

                        return false;
                    }

                    //Luego del pago, seteamos al nexo como pagado para luego pasarlo al componente MiMercadoPago
                    //Y muestre los nexos actualizados
                    nexoActual.token = token;
                    nexoActual.metodoPago = metodoPago;
                    nexoActual.emisor = emisor;
                    nexoActual.cuotas = cuotas;
                    nexoActual.pagado = true;

                    this.props.setPropsUpdatePagosMercadoPago({
                        email: email,
                        arrayNexos: arrayNexos
                    });

                    const allNexosPagos = _.filter(arrayNexos, function (nexo) {
                        return !nexo.pagado;
                    });

                    //Corroboramos si todos los nexos estan pagos, procedemos a no mostrar el modal de pagos online
                    if (allNexosPagos.length == 0) {
                        this.props.setPropsUpdatePagosMercadoPago({
                            email: '',
                            arrayNexos: []
                        });

                        this.setState({
                            ...this.state,
                            cargando: false,
                            error: false,
                            exito: true,
                            finPagos: true,
                            mensajeOK: <div>{'¡Pago realizado con éxito!'} <br/> {'El comprobante le será remitido a la casilla de correo ' + email}</div>,
                            btnOK: 'Finalizar'
                        });
                        return false;
                    }

                    this.setState({
                        ...this.state,
                        cargando: false,
                        error: false,
                        exito: true,
                        mensajeOK: <div>{'¡Pago realizado con éxito!'} <br/> {'El comprobante le será remitido a la casilla de correo ' + email}</div>
                    });

                }).catch(err => {

                    this.setState({
                        ...this.state,
                        cargando: false,
                        error: true,
                        exito: false,
                    });

                    localStorage.removeItem('idBtnMercadoPago');
                    console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
                });
        } else {
            this.setState({
                ...this.state,
                cargando: false,
                error: true,
                exito: false,
            });

            localStorage.removeItem('idBtnMercadoPago');
            this.props.redireccionar("/");
        }
    }

    onBotonContinuarClick = () => {
        const urlRedirect = getAllUrlParams(window.location.href).urlRedirect;

        if (this.state.finPagos)
            window.location.href = window.location.origin + window.location.pathname + '#' + decodeURIComponent(urlRedirect);
        else
            this.props.redireccionar(decodeURIComponent(urlRedirect));
    }

    onBotonErrorClick = () => {
        window.location.href = window.location.origin + window.location.pathname + '#/';
    }

    render() {
        return <div style={{ width: '100%' }}>
            {this.state.cargando &&
                <div className="cargando">
                    <MiPanelMensaje
                    cargando
                    mensaje={this.state.mensajeCargando}
                /></div>}

            {this.state.error &&
                <MiPanelMensaje
                    error
                    mensaje={this.state.mensajeError}
                    tieneBoton
                    onBotonClick={this.onBotonErrorClick}
                    boton="Volver"
                />}

            {this.state.exito &&
                <MiPanelMensaje
                    lottieExito
                    mensaje={this.state.mensajeOK}
                    tieneBoton
                    onBotonClick={this.onBotonContinuarClick}
                    boton={this.state.btnOK}
                />}
        </div>
    }
}

let componente = PagoNexo;
componente = connect(
    mapStateToProps,
    mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

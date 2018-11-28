import React, { Component } from 'react'

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import _ from "lodash";

import { mostrarCargando } from '@Redux/Actions/mainContent';
import { mostrarAlerta } from "@Utils/functions";

import { setPagosMercadoPago } from "@ReduxSrc/TributarioOnline/DetalleTributario/actions";
import servicesMercadoPago from '@Rules/Rules_MercadoPago';

import { getAllUrlParams, getIdTipoTributo } from "@Utils/functions"

const mapStateToProps = state => {
    return {
        loggedUser: state.Usuario.loggedUser,
        infoPagosMercadoPago: state.DetalleTributario.infoPagosMercadoPago,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        redireccionar: url => {
            dispatch(push(url));
        },
        mostrarCargando: (cargar) => {
            dispatch(mostrarCargando(cargar));
        },
        setPropsUpdatePagosMercadoPago: (arrayNexos) => {
            dispatch(setPagosMercadoPago(arrayNexos));
        }
    };
};

class PagoNexo extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.mostrarCargando(true);

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

        const idBtnMercadoPago = getAllUrlParams(window.location.href).idBtnMercadoPago;
        localStorage.setItem('idBtnMercadoPago', idBtnMercadoPago);
        const seccionDetalleTributo = getAllUrlParams(window.location.href).seccionDetalleTributo;
        localStorage.setItem('seccionDetalleTributo', seccionDetalleTributo);

        const urlRedirect = getAllUrlParams(window.location.href).urlRedirect;

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

                    this.props.setPropsUpdatePagosMercadoPago({
                        arrayNexos: arrayNexos
                    });

                    const allNexosPagos = _.filter(arrayNexos, function (nexo) {
                        return !nexo.pagado;
                    });

                    //Corroboramos si todos los nexos estan pagos, procedemos a no mostrar el modal de pagos online
                    if (allNexosPagos.length == 0) {
                        this.props.setPropsUpdatePagosMercadoPago({
                            arrayNexos: []
                        });

                        this.props.mostrarCargando(false);

                        window.location.href = window.location.origin + window.location.pathname + '#' + decodeURIComponent(urlRedirect);
                        return false;
                    }

                    this.props.mostrarCargando(false);
                    this.props.redireccionar(decodeURIComponent(urlRedirect));
                }).catch(err => {
                    localStorage.removeItem('idBtnMercadoPago');
                    localStorage.removeItem('seccionDetalleTributo');
                    this.props.redireccionar("/");
                    console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
                });
        } else {
            localStorage.removeItem('idBtnMercadoPago');
            localStorage.removeItem('seccionDetalleTributo');
            this.props.redireccionar("/");
        }
    }

    render() {
        return null
    }
}

let componente = PagoNexo;
componente = connect(
    mapStateToProps,
    mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

import React, { Component } from 'react'
import _ from "lodash";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { mostrarCargando } from '@Redux/Actions/mainContent';

import servicesTributarioOnline from '@Rules/Rules_TributarioOnline';

//Redux
import { setTributosBienesPorCUIT } from "@ReduxSrc/AfipController/actions";

const mapStateToProps = state => {
    return {
        loggedUser: state.Usuario.loggedUser,
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
        setTributosBienesPorCUIT: (datos) => {
            dispatch(setTributosBienesPorCUIT(datos));
        },
    };
};

class importacionBienesCuit extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.mostrarCargando(true);
        const token = this.props.loggedUser.token;
        const hash = new URLSearchParams(this.props.location.search).get('data');

        if (hash) {
            const arrayCUIT = hash.split(',');
            let arrayServices = [];

            if (arrayCUIT.length > 0) {
                arrayCUIT.map((cuit) => {
                    const service = servicesTributarioOnline.getTributosByCUIT(token, cuit)
                        .then((datos) => {
                            if (!datos.ok) { return false; }

                            return datos.return;
                        }).catch(err => {
                            console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
                        });

                    arrayServices.push(service);
                });

                Promise.all(arrayServices).then((arrayData) => {
                    this.props.mostrarCargando(false);
                    let tributosCUIT = [];

                    if (arrayData.length > 0) {
                        arrayData.map((arrayTributos) => {
                            arrayTributos.map((item) => {

                                const result = _.filter(tributosCUIT, {
                                    tipoTributo: item.tipoTributo,
                                    identificador: item.identificador,
                                    representado: item.titular.titular
                                });

                                if (!result.length > 0) {
                                    tributosCUIT.push({
                                        tipoTributo: item.tipoTributo,
                                        identificador: item.identificador,
                                        representado: item.titular.titular
                                    });
                                }
                            });
                        });
                    }

                    this.props.setTributosBienesPorCUIT(tributosCUIT);

                    const appUrlRedirect = this.getAppUrlRedirect();
                    this.props.redireccionar({
                        pathname: appUrlRedirect,
                        search: '?status=OK'
                      });
                }).catch((err) => {
                    debugger;
                    this.props.mostrarCargando(false);
                    const appUrlRedirect = this.getAppUrlRedirect();
                    this.props.redireccionar(appUrlRedirect + '?status=' + err);
                });
            } else {
                this.props.mostrarCargando(false);
                const appUrlRedirect = this.getAppUrlRedirect();
                this.props.redireccionar(appUrlRedirect);
            }
        } else {
            this.props.mostrarCargando(false);
            const appUrlRedirect = this.getAppUrlRedirect();
            this.props.redireccionar(appUrlRedirect);
        }
    }

    getAppUrlRedirect = () => {
        let appUrlRedirect = new URLSearchParams(this.props.location.search).get('appUrlRedirect');
        appUrlRedirect = appUrlRedirect ? appUrlRedirect : '/';
        if (appUrlRedirect.indexOf('?') != -1)
            appUrlRedirect = appUrlRedirect + '&';

        return appUrlRedirect;
    }

    render() {
        return null
    }
}

let componente = importacionBienesCuit;
componente = connect(
    mapStateToProps,
    mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

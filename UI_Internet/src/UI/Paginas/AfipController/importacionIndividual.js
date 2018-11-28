import React, { Component } from 'react'

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { mostrarCargando } from '@Redux/Actions/mainContent';
import { mostrarAlerta } from "@Utils/functions";

import servicesAfip from '@Rules/Rules_Afip';


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
        }
    };
};

class importacionIndividual extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.mostrarCargando(true);
        const token = this.props.loggedUser.token;
        const hash = new URLSearchParams(this.props.location.search).get('data');

        let appUrlRedirect = new URLSearchParams(this.props.location.search).get('appUrlRedirect');
        appUrlRedirect = appUrlRedirect ? appUrlRedirect : '/';
        if(appUrlRedirect.indexOf('?') == -1)
            appUrlRedirect = appUrlRedirect + '?';
        else 
            appUrlRedirect = appUrlRedirect + '&';

        if (hash) {
            servicesAfip.importarRepresentanteAFIP(token, {
                hash: hash
            })
                .then((datos) => {
                    this.props.mostrarCargando(false);

                    if (!datos.ok) {
                        this.props.redireccionar(appUrlRedirect + 'afipProcess=' + datos.error);
                    } else {
                        this.props.redireccionar(appUrlRedirect + 'afipProcess=OK');
                    }
                    
                }).catch(err => {
                    this.props.mostrarCargando(false);
                    this.props.redireccionar(appUrlRedirect + 'afipProcess=' + err);
                });
        } else {
            this.props.mostrarCargando(false);
            this.props.redireccionar(appUrlRedirect);
        }
    }

    render() {
        return null
    }
}

let componente = importacionIndividual;
componente = connect(
    mapStateToProps,
    mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

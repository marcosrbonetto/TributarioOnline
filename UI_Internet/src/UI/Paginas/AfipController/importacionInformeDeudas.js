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


class importacionInformeDeudas extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        const cuits = new URLSearchParams(this.props.location.search).get('data');

        let appUrlRedirect = new URLSearchParams(this.props.location.search).get('appUrlRedirect');
        appUrlRedirect = appUrlRedirect ? appUrlRedirect : '/';
        if (appUrlRedirect.indexOf('?') == -1)
            appUrlRedirect = appUrlRedirect + '?';
        else
            appUrlRedirect = appUrlRedirect + '&';

        //Corroboración de que el cuit ingresado en afip es el del VV
        localStorage.setItem('statusAfipImportacion', 'OK');
        //Cuits a mostrar
        localStorage.setItem('cuitsInformeDeudas', cuits);

        this.props.redireccionar(appUrlRedirect);
    }

    render() {
        return null
    }
}

let componente = importacionInformeDeudas;
componente = connect(
    mapStateToProps,
    mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

import React, { Component } from 'react'

import { connect } from "react-redux";
import { push } from "connected-react-router";

import { mostrarCargando } from '@Redux/Actions/mainContent';

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

class TributarioOnline extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const token = this.props.loggedUser.token;

        if (token == window.Config.TOKEN_INVITADO)
            this.props.redireccionar("/Inicio/HomeInvitado");
        else
            this.props.redireccionar("/Inicio/HomeUsuario");

    }

    render() {
        return null
    }
}

let componente = TributarioOnline;
componente = connect(
    mapStateToProps,
    mapDispatchToProps
)(componente);
export default componente;

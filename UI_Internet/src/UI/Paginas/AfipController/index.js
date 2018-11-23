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

class AfipController extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.mostrarCargando(true);
        const token = this.props.loggedUser.token;
        const hash = new URLSearchParams(this.props.location.search).get('data');

        if (hash) {
            servicesAfip.addRepresentandosAfip(token, {
                hash: hash
            })
                .then((datos) => {
                    if (!datos.ok) { mostrarAlerta('Importación AFIP: ' + datos.error); return false; }

                    this.props.mostrarCargando(false);
                    this.props.redireccionar('/Inicio');
                    
                }).catch(err => {
                    mostrarAlerta('Importación AFIP: ' + err);
                    this.props.mostrarCargando(false);
                    this.props.redireccionar('/Inicio');
                });
        } else {
            this.props.mostrarCargando(false);
            this.props.redireccionar('/Inicio');
        }
    }

    render() {
        return null
    }
}

let componente = AfipController;
componente = connect(
    mapStateToProps,
    mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

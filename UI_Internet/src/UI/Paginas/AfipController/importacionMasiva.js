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

class importacionMasiva extends Component {
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

        const cuitUsuarioLog = this.props.loggedUser.datos.cuil || '';
        const cuitLogAFIP = hash.split(',')[0];

        if(cuitUsuarioLog != cuitLogAFIP) {
            this.props.mostrarCargando(false);
            
            localStorage.setItem('statusAfipImportacionMasiva', 'Los datos que ingresó en AFIP no pertenecen al usuario logueado.');
            this.props.redireccionar(appUrlRedirect);
            return false;
        }

        if (hash) {
            servicesAfip.importarListaRepresentantesAFIP(token, {
                hash: hash
            })
                .then((datos) => {
                    this.props.mostrarCargando(false);

                    if (!datos.ok) {
                        localStorage.setItem('statusAfipImportacionMasiva', datos.error);
                        this.props.redireccionar(appUrlRedirect);
                    } else {
                        localStorage.setItem('statusAfipImportacionMasiva', 'OK');
                        this.props.redireccionar(appUrlRedirect);
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

let componente = importacionMasiva;
componente = connect(
    mapStateToProps,
    mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

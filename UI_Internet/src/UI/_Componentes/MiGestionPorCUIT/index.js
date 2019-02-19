import React, { Component } from "react";
import _ from "lodash";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import classNames from 'classnames';
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { mostrarCargando } from '@Redux/Actions/mainContent'

import Button from "@material-ui/core/Button";
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import MiCard from "@Componentes/MiCard";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import servicesTributarioOnline from '@Rules/Rules_TributarioOnline';

const mapStateToProps = state => {
    return {
        loggedUser: state.Usuario.loggedUser,
        paraMobile: state.MainContent.paraMobile,
        tipoTributos: state.MainContent.tipoTributos,
    };
};

const mapDispatchToProps = dispatch => ({
    mostrarCargando: (cargar) => {
        dispatch(mostrarCargando(cargar));
    },
    redireccionar: url => {
        dispatch(push(url));
    },
});

class MiGestionPorCUIT extends Component {
    constructor(props) {
        super(props);

        this.token = this.props.loggedUser.token;

        this.state = {
            inputCUIT: '',
            errorInputCUIT: false,
            mensajeError: false,
            lista: []
        }
    }

    handleIrAlTributo = (event) => {
        const tipoTributoPadre = event.currentTarget.attributes.tipoTributoPadre.value;
        const identificadorPadre = event.currentTarget.attributes.identificadorPadre.value;
        const identificador = event.currentTarget.attributes.identificador.value;

        let destino = 'planes';
        if (this.props.idTipoTributo == 11)
            destino = 'juicios';

        this.props.redireccionar('/DetalleTributario/' + tipoTributoPadre + '/' + identificadorPadre + '/' + destino + '/' + encodeURIComponent(identificador));
    }

    handleGetTributosHijos = (event) => {
        if (!/^[0-9]{11}$/.test(this.state.inputCUIT)) {
            this.setState({
                errorInputCUIT: true,
                mensajeError: 'El CUIT ingresado es incorrecto'
            });
            return;
        }

        this.setState({
            errorInputCUIT: false,
            mensajeError: undefined,
            lista: []
        }, () => {

            this.props.mostrarCargando(true);
            const cuit = this.state.inputCUIT;

            servicesTributarioOnline.getTributosByCUIT(this.token, cuit)
                .then((datos) => {
                    this.props.mostrarCargando(false);
                    if (!datos.ok) { console.log('Busqueda por CUIT: ' + datos.error); this.props.mostrarCargando(false); return false; }

                    this.cargarTributosHijos(datos.return);
                }).catch(err => {
                    this.props.mostrarCargando(false);
                    console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
                });
        });
    }

    cargarTributosHijos = (arrayTributosCUIT) => {
        this.props.mostrarCargando(true);
        const tipoTributo = this.props.tipoTributos.byKey[this.props.idTipoTributo];
        let arrayServicios = [];

        arrayTributosCUIT.map((tributo) => {
            let servicio;
            switch (tipoTributo) {
                case 'Juicio':
                    servicio = servicesTributarioOnline.getInfoJuicios(this.token, tributo.tipoTributo, tributo.identificador)
                        .then((datos) => {
                            if (!datos.ok) { console.log('Busqueda por CUIT: ' + datos.error); this.props.mostrarCargando(false); }

                            this.setState({
                                lista: _.union(this.state.lista, [{
                                    idTipoTributo: tributo.tipoTributo,
                                    identificador: tributo.identificador,
                                    tributos: _.map(datos.return, 'identificador')
                                }])
                            });
                        }).catch(err => {
                            console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
                        });

                    arrayServicios.push(servicio);
                    break;
                case 'Plan':
                    servicio = servicesTributarioOnline.getInfoPlanes(this.token, tributo.tipoTributo, tributo.identificador)
                        .then((datos) => {
                            if (!datos.ok) { console.log('Busqueda por CUIT: ' + datos.error); this.props.mostrarCargando(false); }

                            this.setState({
                                lista: _.union(this.state.lista, [{
                                    idTipoTributo: tributo.tipoTributo,
                                    identificador: tributo.identificador,
                                    tributos: _.map(datos.return, 'identificador')
                                }])
                            });
                        }).catch(err => {
                            console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
                        });

                    arrayServicios.push(servicio);
                    break;
            }
        });

        Promise.all(arrayServicios).then(() => {
            this.props.mostrarCargando(false);
        });
    }

    handleInputCUIT = (event) => {
        this.setState({
            ...this.state,
            inputCUIT: event.target.value
        });
    }

    render() {
        const { classes } = this.props;
        const { lista } = this.state;

        return (
            <div>
                <MiCard
                    onClick={this.props.onClick}
                    onMouseLeave={this.onMouseLeave}
                    onMouseEnter={this.onMouseEnter}
                >
                    <CardHeader
                        className={classes.header}
                        avatar={
                            (this.props.icono && <Icon className={classes.icon}>
                                {this.props.icono}
                            </Icon>)
                            ||
                            (!this.props.icono && <div className={classes.iconSvg}>{this.props.iconoSvg}</div>)
                        }

                        title={
                            <Typography className={classes.title} variant="title">{this.props.titulo}</Typography>
                        }
                    />
                    <div className={classes.sectionInputSpacingInvitado}>

                        <Grid container spacing={0} alignItems="flex-end">
                            <Grid item xs={9}>

                                <TextField
                                    id="input-identificador"
                                    label={"Ingresar " + this.props.identificador}
                                    className={classes.selectTipoTributo}
                                    margin="normal"
                                    value={this.state.inputCUIT}
                                    onChange={this.handleInputCUIT}
                                    error={this.state.errorInputCUIT}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classNames(classes.buttonActions, "buttonActions")}
                                    onClick={this.handleGetTributosHijos}
                                >Entrar</Button>
                            </Grid>

                            {this.state.mensajeError && <div>
                                <Typography className={classes.mensajeError} variant="subheading">{this.state.mensajeError}</Typography>
                            </div>}
                        </Grid>


                        {lista && lista.length > 0 && <React.Fragment>
                            <Grid container spacing={0} alignItems="flex-end">
                                <Grid item xs={12} className={classes.containerLista}>
                                    {lista.map((item) => {
                                        const tipoTributo = this.props.tipoTributos.byKey[item.idTipoTributo];
                                        const esJuicio = this.props.idTipoTributo == 11;

                                        return <React.Fragment>
                                            {item.tributos && item.tributos.length > 0 && <div>
                                                <br />
                                                <Typography variant="subheading">{tipoTributo} - {item.identificador}</Typography>
                                                {item.tributos && item.tributos.map((identificador) => {
                                                    return <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        onClick={this.handleIrAlTributo}
                                                        tipoTributoPadre={tipoTributo}
                                                        identificadorPadre={item.identificador}
                                                        identificador={identificador}
                                                        className={classNames(classes.buttonTributo, esJuicio && classes.redButton)}
                                                    >
                                                        {identificador}
                                                    </Button>
                                                })}
                                            </div>}
                                        </React.Fragment>
                                    })}
                                </Grid>
                            </Grid>
                        </React.Fragment>}

                    </div>
                </MiCard>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MiGestionPorCUIT));

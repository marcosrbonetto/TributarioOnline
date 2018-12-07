import React from "react";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import { connect } from "react-redux";
import { push } from "connected-react-router";

import Button from "@material-ui/core/Button";
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import MiCard from "@Componentes/MiCard";

import { mostrarCargando } from '@Redux/Actions/mainContent';

import servicesTributarioOnline from '@Rules/Rules_TributarioOnline';

const mapStateToProps = state => {
    return {
        loggedUser: state.Usuario.loggedUser,
        tipoTributos: state.MainContent.tipoTributos,

    };
};

const mapDispatchToProps = dispatch => ({
    redireccionar: url => {
        dispatch(push(url));
    },
    mostrarCargando: (cargar) => {
        dispatch(mostrarCargando(cargar));
    },
});

class TributarioAccessBusqueda extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            inputIdentificador: '',
            errorInputIdentificador: false,
            mensajeError: false
        }
    }

    //Ingreso de identificador en busqueda por Tributo
    handleInputIdentificador = (event) => {
        this.setState({
            ...this.state,
            inputIdentificador: event.target.value.toUpperCase()
        });
    }

    handleEntrarIdentificador = () => {
        const token = this.props.loggedUser.token;
        const idTipoOperacion = this.props.idTipoOperacion;
        const identificador = this.state.inputIdentificador;

        if(identificador == '') {
            this.setState({
                errorInputIdentificador: true,
                mensajeError: 'Debe ingresar un identificador'
            });
            return false;
        } else if (!this.props.regexFormato.test(identificador)) {
            this.setState({
                errorInputIdentificador: true,
                mensajeError: 'El formato es incorrecto'
            });
            return false;
        }

        this.props.mostrarCargando(true);
        servicesTributarioOnline.getTributoByIdentificador(token, idTipoOperacion, identificador)
            .then((datos) => {
                this.props.mostrarCargando(false);

                if (!datos.ok) { 
                    this.setState({
                        errorInputIdentificador: true,
                        mensajeError: datos.error
                    });
                    return false; 
                }

                const data = datos.return;
                const valueTipoTributo = this.props.tipoTributos.byKey[data.tipoTributo];

                let seccionDetalle = 'juicios'; //Esto se deberá mejorar para no hardcodear los valores
                switch(idTipoOperacion) {
                    case 1:
                        seccionDetalle = 'juicios';
                    break;
                    case 2:
                        seccionDetalle = 'planesPago';
                    break;
                }
                this.props.redireccionar('/DetalleTributario/'+valueTipoTributo+'/'+data.identificador+'/'+seccionDetalle+'/'+encodeURIComponent(identificador))
            }).catch(err => {
                console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
            });
    }

    render() {
        const { classes } = this.props;

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
                                    value={this.state.inputIdentificador}
                                    onChange={this.handleInputIdentificador}
                                    error={this.state.errorInputIdentificador}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.buttonActions}
                                    onClick={this.handleEntrarIdentificador}
                                >Entrar</Button>
                            </Grid>

                            {this.state.mensajeError && <div>
                                <Typography className={classes.mensajeError} variant="subheading">{this.state.mensajeError}</Typography>
                            </div>}
                        </Grid>

                    </div>
                </MiCard>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(TributarioAccessBusqueda));

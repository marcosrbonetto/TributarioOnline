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
import servicesRepresentantes from '@Rules/Rules_Representantes';


const mapStateToProps = state => {
    return {
        loggedUser: state.Usuario.loggedUser,
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

class TributarioAccessInvitado extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            inputIdentificadorTributo: '',
            errorInputIdentificador: false,
            mensajeError: false
        }
    }

    //Ingreso de identificador en busqueda por Tributo
    handleInputIdentificador = (event) => {
        this.setState({
            ...this.state,
            inputIdentificadorTributo: event.target.value.toUpperCase()
        });
    }

    handleEntrarTributo = () => {
        this.props.mostrarCargando(true);
        const token = this.props.loggedUser.token;
        const idTipoTributo = this.props.id;
        const tipoTributo = this.props.tipo;
        const identificador = this.state.inputIdentificadorTributo;

        servicesRepresentantes.getTitularTributo(token, {
            "tipoTributo": idTipoTributo,
            "identificador": identificador
        })
            .then((datos) => {
                this.props.mostrarCargando(false);

                if (datos.ok) {
                    this.props.redireccionar('/DetalleTributario/' + tipoTributo + '/' + encodeURIComponent(identificador));
                } else {
                    this.setState({
                        ...this.state,
                        mensajeError: 'El identificador es incorrecto.',
                        errorInputIdentificador: true
                    })
                }

            }).catch(err => {
                console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
            });
    }

    handleEnter = (e) => {
        if (e.key === 'Enter') {
            this.handleEntrarTributo();
        }
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
                                    label="Ingresar Identificador"
                                    className={classes.selectTipoTributo}
                                    margin="normal"
                                    value={this.state.inputIdentificadorTributo}
                                    onChange={this.handleInputIdentificador}
                                    error={this.state.errorInputIdentificador}
                                    onKeyUp={this.handleEnter}
                                    autoComplete="on"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.buttonActions}
                                    onClick={this.handleEntrarTributo}
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
)(withStyles(styles)(TributarioAccessInvitado));

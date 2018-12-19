import React from "react";
import _ from "lodash";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import './styles.css';
import classNames from 'classnames';
import { connect } from "react-redux";

//Router
import { withRouter } from "react-router-dom";

//Redux
import { mostrarCargando } from '@Redux/Actions/mainContent'
import { replace, push } from "connected-react-router";

//Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

//Custom Components
import MiCard from "@Componentes/MiCard";
import servicesTributarioOnline from '@Rules/Rules_TributarioOnline';

//Funciones Útiles
import { getIdTipoTributo, getTextoTipoTributo } from "@Utils/functions"

const mapStateToProps = state => {
    return {
        loggedUser: state.Usuario.loggedUser
    };
};

const mapDispatchToProps = dispatch => ({
    mostrarCargando: (cargar) => {
        dispatch(mostrarCargando(cargar));
    },
    redireccionar: url => {
        dispatch(replace(url));
    },
});

class SeleccionTributo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            datosTributos: [],
            arrayTributos: []
        };
    }

    componentDidMount() {
        const token = this.props.loggedUser.token;

        //Redireccionamos al Inicio si es usuario Invitado
        if(token == window.Config.TOKEN_INVITADO) {
            this.props.redireccionar('/Inicio/HomeInvitado/' + this.props.match.params.tributo);
            return false;
        }

        this.props.mostrarCargando(true);
        //Traemos los tributos asociados al Token
        servicesTributarioOnline.getIdTributos(token)
            .then((datos) => {

                if (!datos.ok) { return false; } //mostrarAlerta('Tributos: ' + datos.error); return false; }

                const tipoTributo = getIdTipoTributo(this.props.match.params.tributo);
                this.setIdentificadores(datos.return, tipoTributo);

                this.setState({
                    datosTributos: datos.return
                });

                this.props.mostrarCargando(false);
            }).catch(err => {
                console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
            });
    }

    componentWillReceiveProps(nextProps) {
        let anteriorTipoTributo = getIdTipoTributo(this.props.match.params.tributo);
        let nuevoTipoTributo = getIdTipoTributo(nextProps.match.params.tributo);
        
        if (anteriorTipoTributo != nuevoTipoTributo) {
            const datosTributos = this.state.datosTributos;
            this.setIdentificadores(datosTributos, nuevoTipoTributo)
        }
    }

    setIdentificadores = (datos, tipoTributo) => {
        let IdsTributos = [];

        var arrayTributos = _.filter(datos, { tipoTributo: tipoTributo });

        IdsTributos = (arrayTributos && arrayTributos.map((tributo) => {
            return {
                representado: tributo.titular.titular,
                identificador: tributo.identificador
            }
        })) || [];

        this.setState({
            arrayTributos: IdsTributos
        });
    }

    //Evento cuando se cambia de identificador (se recarga la página)
    selectIdentificador = event => {
        if (event.target.value == '0')
            return false;

        this.props.mostrarCargando(true);
        this.props.redireccionar('/DetalleTributario/' + this.props.match.params.tributo + '/' + encodeURIComponent(event.target.value));
        this.props.mostrarCargando(false);
        // window.location.reload();//Recargamos la pagina con la nueva url
    };

    render() {
        const { classes } = this.props;

        const {
            arrayTributos
        } = this.state;

        const titulo = getTextoTipoTributo(this.props.match.params.tributo);
        
        return (
            <div className={classNames(classes.mainContainer, "contentDetalleTributo", "mainContainer")}>
                <Grid container spacing={16} justify="center">
                    <Grid item xs={5} className={"container"} >
                        <MiCard contentClassName={classes.root} >
                            {/* Titulo y selección de identificador */}
                            <Typography className={classes.title} variant="title">{titulo}:
                            <Select
                                    className={classes.selectIdentificador}
                                    inputProps={{
                                        name: 'identificador',
                                        id: 'identificador',
                                    }}
                                    value={0}
                                    disableUnderline
                                    onChange={this.selectIdentificador}
                                >
                                    <MenuItem key={0} value={0}>Seleccionar Identificador</MenuItem>

                                    {arrayTributos && arrayTributos.map((tributo, index) => {
                                        return <MenuItem key={index} value={tributo.identificador}>{tributo.identificador}{tributo.representado && ' - ' + tributo.representado}</MenuItem>
                                    })}
                                </Select>
                            </Typography>
                        </MiCard>
                    </Grid>
                </Grid>
            </div >
        );
    }
}

let componente = SeleccionTributo;
componente = withStyles(styles)(componente);
componente = connect(
    mapStateToProps,
    mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

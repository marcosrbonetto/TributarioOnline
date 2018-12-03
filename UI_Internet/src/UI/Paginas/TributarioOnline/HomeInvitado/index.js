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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";

//Custom Components
import MiCard from "@Componentes/MiCard";
import servicesRepresentantes from '@Rules/Rules_Representantes';

//Funciones Útiles
import { getIdTipoTributo, getTextoTipoTributo } from "@Utils/functions"

const mapStateToProps = state => {
  return {
    loggedUser: state.Usuario.loggedUser,
    idTipoTributos: state.MainContent.idTipoTributos,
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

class HomeInvitado extends React.PureComponent {
  constructor(props) {
    super(props);

    this.tipoTributo = this.props.match.params.tributo;

    this.state = {
      selectTributos: this.tipoTributo || 'Automotor',
      inputIdentificadorTributo: '',
      errorInputIdentificador: '',
      mensajeError: false
    };
  }

  //Seleccion tipoTributo en busqueda por Tributo
  handleSelectTipoTributo = (event) => {
    this.setState({
      selectTributos: event.target.value
    });
  }

  //Ingreso de identificador en busqueda por Tributo
  handleInputIdentificador = (event) => {
    this.setState({
      inputIdentificadorTributo: event.target.value
    });
  }

  handleEntrarTributo = () => {
    this.props.mostrarCargando(true);
    const token = this.props.loggedUser.token;
    const idTipoTributo = getIdTipoTributo(this.state.selectTributos);
    const tipoTributo = this.state.selectTributos;
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
            mensajeError: 'El identificador es incorrecto.',
            errorInputIdentificador: true
          })
        }

      }).catch(err => {
        console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
      });
  }

  render() {
    const { classes } = this.props;

    const { } = this.state;

    return (
      <div className={classNames(classes.mainContainer, "contentDetalleTributo")}>
        <Grid container spacing={16} justify="center">
          <Grid item xs={4} className={"container"} >
            <MiCard contentClassName={classes.root} >

              <Typography className={classes.title} variant="title">Ingreso a Tributo</Typography><br />

              <Grid container>
                <InputLabel htmlFor="tipo_tributo">Tipo Tributo</InputLabel>
                {/* Titulo y selección de identificador */}
                <Select
                  value={this.state.selectTributos}
                  onChange={this.handleSelectTipoTributo}
                  inputProps={{
                    name: 'tipo_tributo',
                    id: 'tipo_tributo',
                  }}
                  className={classes.selectTipoTributo}
                >
                  {this.props.idTipoTributos && this.props.idTipoTributos.map((tributo, index) => {
                    return <MenuItem key={index} value={tributo.value}>
                      <em className={classes.itemTributo}>{getTextoTipoTributo(tributo.value)}</em>
                    </MenuItem>
                  })}
                </Select>

                <Grid container spacing={0} alignItems="flex-end">
                  <Grid item xs={9}>

                    <TextField
                      id="input-identificador"
                      label="Ingresar Identificador"
                      className={classes.selectTipoTributo}
                      margin="normal"
                      value={this.state.inputIdentificadorTributo}
                      onChange={this.handleInputIdentificador}
                      autoFocus={true}
                      error={this.state.errorInputIdentificador}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.buttonActions}
                      onClick={this.handleEntrarTributo}
                    >
                      Entrar
                </Button>
                  </Grid>

                  {this.state.mensajeError && <div>
                    <Typography className={classes.mensajeError} variant="subheading">{this.state.mensajeError}</Typography>
                  </div>}
                </Grid>
              </Grid>
            </MiCard>
          </Grid>
        </Grid>
      </div >
    );
  }
}

let componente = HomeInvitado;
componente = withStyles(styles)(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

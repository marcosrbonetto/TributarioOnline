import React from "react";

//Styles
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import styles from "./styles";

//Router
import { withRouter } from "react-router-dom";

//REDUX
import { connect } from "react-redux";

//Componentes
import { Typography, Icon, Button, Grid, IconButton } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import _ from "lodash";
import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";

//Mis componentes
import MiPanelMensaje from "@Componentes/MiPanelMensaje";

//Mis Rules
import Rules_Usuario from "@Rules/Rules_Usuario";

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => {
  return {};
};

class PaginaDatosContacto extends React.Component {
  static defaultProps = {
    onCargando: () => {},
    onReady: () => {}
  };

  constructor(props) {
    super(props);

    let datosIniciales = props.datosIniciales || {};
    this.state = {
      email: datosIniciales.email || "",
      emailRepeat: datosIniciales.email || "",
      telefonoCelularArea: datosIniciales.telefonoCelularArea || "",
      telefonoCelularNumero: datosIniciales.telefonoCelularNumero || "",
      telefonoFijoArea: datosIniciales.telefonoFijoArea || "",
      telefonoFijoNumero: datosIniciales.telefonoFijoNumero || "",
      facebook: datosIniciales.facebook || "",
      twitter: datosIniciales.twitter || "",
      instagram: datosIniciales.instagram || "",
      linkedin: datosIniciales.linkedin || "",
      mostrarError: false,
      error: undefined,
      errores: []
    };
  }

  componentDidMount() {}

  onInputChange = e => {
    let errores = this.state.errores || [];
    errores[e.target.name] = undefined;
    this.setState({ [e.target.name]: e.target.value, errores: errores });
  };

  onInputKeyPress = event => {
    if (event.key === "Enter") {
      this.onBotonSiguienteClick();
    }
  };

  onBotonSiguienteClick = () => {
    const { username, password, passwordRepeat } = this.state;

    this.setState({ errores: [] });
    let conError = false;
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.renderContent()}
        {this.renderFooter()}
      </div>
    );
  }

  renderContent() {
    const { classes, padding } = this.props;

    return (
      <div className={classes.content}>
        <div
          className={classNames(
            classes.contenedorError,
            this.state.mostrarError && "visible"
          )}
        >
          <div>
            <Icon style={{ color: red["500"] }}>error</Icon>
            <Typography
              variant="body2"
              className="texto"
              style={{ color: red["500"] }}
            >
              {this.state.error}
            </Typography>
            <IconButton
              onClick={() => {
                this.setState({ mostrarError: false });
              }}
            >
              <Icon>clear</Icon>
            </IconButton>
          </div>
        </div>

        <div style={{ padding: padding, paddingTop: "16px" }}>
          <div className={classes.encabezado}>
            <Typography variant="headline">Nuevo Usuario</Typography>
            <Icon>keyboard_arrow_right</Icon>
            <Typography variant="subheading">Datos de contacto</Typography>
          </div>

          <Grid container spacing={16}>
            {/* Email */}
            <Grid item xs={12} sm={6}>
              <FormControl
                className={classes.formControl}
                fullWidth
                margin="dense"
                error={this.state.errores["email"] !== undefined}
                aria-describedby="textoEmailError"
              >
                <InputLabel htmlFor="inputEmail">E-mail</InputLabel>
                <Input
                  id="inputEmail"
                  autoFocus
                  inputProps={{
                    maxLength: 20
                  }}
                  value={this.state.email}
                  name="email"
                  type="text"
                  onKeyPress={this.onInputKeyPress}
                  onChange={this.onInputChange}
                />
                <FormHelperText id="textoEmailError">
                  {this.state.errores["email"]}
                </FormHelperText>
              </FormControl>
            </Grid>

            {/* Repetir email */}
            <Grid item xs={12} sm={6}>
              <FormControl
                className={classes.formControl}
                fullWidth
                margin="dense"
                error={this.state.errores["emailRepeat"] !== undefined}
                aria-describedby="textoEmailRepeatError"
              >
                <InputLabel htmlFor="inputEmailRepeat">
                  Repita su e-mail
                </InputLabel>
                <Input
                  id="inputEmailRepeat"
                  autoFocus
                  inputProps={{
                    maxLength: 20
                  }}
                  value={this.state.emailRepeat}
                  name="emailRepeat"
                  type="text"
                  onKeyPress={this.onInputKeyPress}
                  onChange={this.onInputChange}
                />
                <FormHelperText id="textoEmailRepeatError">
                  {this.state.errores["emailRepeat"]}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2">Teléfono Celular</Typography>
            </Grid>

            {/* Telefono Celular */}
            <Grid item xs={3} sm={2}>
              <FormControl
                className={classes.formControl}
                fullWidth
                margin="dense"
                error={this.state.errores["telefonoCelularArea"] !== undefined}
                aria-describedby="textoTelefonoCelularAreaError"
              >
                <InputLabel htmlFor="inputTelefonoCelularArea">Area</InputLabel>
                <Input
                  id="inputTelefonoCelularArea"
                  autoFocus
                  inputProps={{ max: 10 }}
                  value={this.state.telefonoCelularArea}
                  name="telefonoCelularArea"
                  type="number"
                  onKeyPress={this.onInputKeyPress}
                  onChange={this.onInputChange}
                  startAdornment={
                    <div style={{ display: "flex" }}>
                      <InputAdornment position="start">0</InputAdornment>
                    </div>
                  }
                />
                <FormHelperText id="textoTelefonoCelularAreaError">
                  {this.state.errores["telefonoCelularArea"]}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={9} sm={4}>
              <FormControl
                className={classes.formControl}
                fullWidth
                margin="dense"
                error={
                  this.state.errores["telefonoCelularNumero"] !== undefined
                }
                aria-describedby="textoTelefonoCelularNumeroError"
              >
                <InputLabel htmlFor="inputTelefonoCelularNumero">
                  Número
                </InputLabel>
                <Input
                  id="inputTelefonoCelularNumero"
                  autoFocus
                  value={this.state.telefonoCelularNumero}
                  name="telefonoCelularNumero"
                  type="number"
                  onKeyPress={this.onInputKeyPress}
                  onChange={this.onInputChange}
                  startAdornment={
                    <InputAdornment position="start">15</InputAdornment>
                  }
                />
                <FormHelperText id="textoTelefonoCelularNumeroError">
                  {this.state.errores["telefonoCelularNumero"]}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

  renderFooter() {
    const { classes, padding } = this.props;

    return (
      <div
        className={classes.footer}
        style={{
          padding: padding,
          paddingBottom: "16px",
          paddingTop: "16px"
        }}
      >
        <div style={{ flex: 1 }}>
          <Button
            variant="flat"
            color="primary"
            className={classes.button}
            onClick={this.props.onBotonVolverClick}
          >
            Volver
          </Button>
        </div>

        <Button
          variant="raised"
          color="primary"
          className={classes.button}
          onClick={this.onBotonSiguienteClick}
        >
          Siguiente
        </Button>
      </div>
    );
  }
}

let componente = PaginaDatosContacto;
componente = withStyles(styles)(componente);
componente = withRouter(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);

export default componente;

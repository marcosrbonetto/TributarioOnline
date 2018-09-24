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

class PaginaDatosAcceso extends React.Component {
  static defaultProps = {
    onCargando: () => {},
    onReady: () => {}
  };

  constructor(props) {
    super(props);

    let datosIniciales = props.datosIniciales || {};

    this.state = {
      username: datosIniciales.username || "",
      password: datosIniciales.password || "",
      passwordRepeat: datosIniciales.password || "",
      mostrarError: false,
      error: undefined,
      errores: [],
      showPassword: false,
      showPasswordRepeat: false
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

    //username
    if (username == undefined || username.trim().length == 0) {
      let errores = this.state.errores;
      errores["username"] = "Dato requerido";
      this.setState({ errores: errores });
      conError = true;
    } else {
      if (username.length < 8) {
        let errores = this.state.errores;
        errores["username"] = "Al menos 8 caracteres";
        this.setState({ errores: errores });
        conError = true;
      }
    }

    //Password
    if (password == undefined || password.length == 0) {
      let errores = this.state.errores;
      errores["password"] = "Dato requerido";
      this.setState({ errores: errores });
      conError = true;
    } else {
      if (password.length < 8) {
        let errores = this.state.errores;
        errores["password"] = "Al menos 8 caracteres";
        this.setState({ errores: errores });
        conError = true;
      }
    }

    //Password repeat
    if (passwordRepeat == undefined || passwordRepeat.length == 0) {
      let errores = this.state.errores;
      errores["passwordRepeat"] = "Dato requerido";
      this.setState({ errores: errores });
      conError = true;
    } else {
      if (passwordRepeat.length < 8) {
        let errores = this.state.errores;
        errores["passwordRepeat"] = "Al menos 8 caracteres";
        this.setState({ errores: errores });
        conError = true;
      }
    }

    if (conError == false) {
      if (password != passwordRepeat) {
        let errores = this.state.errores;
        errores["password"] = "Las contraseñas no coinciden";
        this.setState({ errores: errores });
        conError = true;
      }
    }

    if (conError == true) return;

    this.props.onCargando(true);
    this.setState({ mostrarError: false }, () => {
      Rules_Usuario.validarUsername(username)
        .then(existe => {
          if (existe === true) {
            this.setState({
              mostrarError: true,
              error: "El nombre de usuario ya se encuentra en uso"
            });
            return;
          }

          this.props.onReady({
            username: username,
            password: password
          });
        })
        .catch(error => {
          this.setState({ mostrarError: true, error: error });
        })
        .finally(() => {
          this.props.onCargando(false);
        });
    });
  };

  onBotonShowPasswordClick = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  onBotonShowPasswordRepeatClick = () => {
    this.setState({ showPasswordRepeat: !this.state.showPasswordRepeat });
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
            <Typography variant="subheading">Datos de acceso</Typography>
          </div>

          <Grid container spacing={16}>
            <Grid item xs={12} sm={6}>
              <FormControl
                className={classes.formControl}
                fullWidth
                margin="dense"
                error={this.state.errores["username"] !== undefined}
                aria-describedby="textoUsernameError"
              >
                <InputLabel htmlFor="inputUsername">
                  Nombre de usuario
                </InputLabel>
                <Input
                  id="inputUsername"
                  autoFocus
                  inputProps={{
                    maxLength: 20
                  }}
                  value={this.state.username}
                  name="username"
                  type="text"
                  onKeyPress={this.onInputKeyPress}
                  onChange={this.onInputChange}
                />
                <FormHelperText id="textoUsernameError">
                  {this.state.errores["username"]}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.contenedorInfoUsername}>
                <Icon style={{ color: orange["500"] }}>info</Icon>
                <Typography variant="body1">
                  Su nombre de usuario por defecto es su número de CUIL pero, si
                  usted lo desea, puede indicar uno. Tenga en cuenta que si lo
                  hace, usted todavía podrá acceder con su número de CUIL.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                className={classes.formControl}
                fullWidth
                margin="dense"
                error={this.state.errores["password"] !== undefined}
                aria-describedby="textoPasswordError"
              >
                <InputLabel htmlFor="inputPassword">Contraseña</InputLabel>
                <Input
                  id="inputPassword"
                  value={this.state.password}
                  name="password"
                  inputProps={{
                    maxLength: 20
                  }}
                  type={this.state.showPassword ? "text" : "password"}
                  onKeyPress={this.onInputKeyPress}
                  onChange={this.onInputChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.onBotonShowPasswordClick}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="textoPasswordError">
                  {this.state.errores["password"]}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                className={classes.formControl}
                fullWidth
                margin="dense"
                error={this.state.errores["passwordRepeat"] !== undefined}
                aria-describedby="textoPasswordRepeatError"
              >
                <InputLabel htmlFor="passwordRepeat">
                  Repetir contraseña
                </InputLabel>
                <Input
                  id="inputPasswordRepeat"
                  value={this.state.passwordRepeat}
                  name="passwordRepeat"
                  inputProps={{
                    maxLength: 20
                  }}
                  type={this.state.showPasswordRepeat ? "text" : "password"}
                  onKeyPress={this.onInputKeyPress}
                  onChange={this.onInputChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.onBotonShowPasswordRepeatClick}
                      >
                        {this.state.showPasswordRepeat ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="textoPasswordRepeatError">
                  {this.state.errores["passwordRepeat"]}
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

let componente = PaginaDatosAcceso;
componente = withStyles(styles)(componente);
componente = withRouter(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);

export default componente;

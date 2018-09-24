import React from "react";

//Styles
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import "@UI/transitions.css";
import styles from "./styles";

//Router
import { withRouter } from "react-router-dom";

//REDUX
import { connect } from "react-redux";
import { push } from "connected-react-router";

//Componentes
import { Button } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Grid } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

//Mis componentes
import MiCardLogin from "@Componentes/MiCardLogin";
import ContentSwapper from "@Componentes/ContentSwapper";
import MiPanelMensaje from "@Componentes/MiPanelMensaje";

//Mis Rules
import Rules_Usuario from "@Rules/Rules_Usuario";

const mapDispatchToProps = dispatch => ({
  redireccionar: url => {
    dispatch(push(url));
  }
});

const mapStateToProps = state => {
  return {};
};

const padding = "2rem";

const PAGINA_ERROR_VALIDANDO_CODIGO = "PAGINA_ERROR_VALIDANDO_CODIGO";
const PAGINA_FORM = "PAGINA_FORM";
const PAGINA_OK = "PAGINA_OK";
const PAGINA_ERROR = "PAGINA_ERROR";

class ProcesarRecuperarPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      codigo: props.location.search.split("codigo=")[1],
      validandoCodigo: true,
      cargando: false,
      password: "",
      passwordRepeat: "",
      errorPassword: undefined,
      errorPasswordRepeat: undefined,
      showPassword: false,
      showPasswordRepeat: false,
      visible: false,
      paginaActual: undefined,
      urlRetorno: ""
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ visible: true });
    }, 500);

    this.setState(
      {
        validandoCodigo: true,
        paginaActual: undefined
      },
      () => {
        Rules_Usuario.getRecuperacionCuenta(this.state.codigo)
          .then(data => {
            if (data == undefined) {
              this.setState({
                paginaActual: PAGINA_ERROR_VALIDANDO_CODIGO,
                errorValidandoCodigo: "Solicitud inválida"
              });
            }
          })
          .catch(error => {
            this.setState({
              paginaActual: PAGINA_ERROR_VALIDANDO_CODIGO,
              errorValidandoCodigo: error
            });
          })
          .finally(() => {
            this.setState({
              validandoCodigo: false
            });
          });
      }
    );
  }

  onBotonShowPasswordClick = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  onBotonShowPasswordRepeatClick = () => {
    this.setState({ showPasswordRepeat: !this.state.showPasswordRepeat });
  };

  onInputChange = event => {
    this.setState({
      error: undefined,
      [event.target.name]: event.target.value
    });
  };

  onInputKeyPress = event => {
    if (event.key === "Enter") {
      this.recuperarPassword();
    }
  };

  recuperarPassword = () => {
    const { password, passwordRepeat } = this.state;

    this.setState({
      errorPassword: undefined,
      errorPasswordRepeat: undefined
    });

    if (password.length < 8) {
      this.setState({
        errorPassword: "Mínimo 8 caracteres"
      });
      return;
    }

    if (password != passwordRepeat) {
      this.setState({
        errorPasswordRepeat: "Las contraseñas no coinciden"
      });
      return;
    }

    this.setState({ cargando: true }, () => {
      Rules_Usuario.procesarRecuperarPassword({
        codigo: this.state.codigo,
        password: password
      })
        .then(data => {
          this.setState({
            urlRetorno: data,
            cargando: false,
            paginaActual: PAGINA_OK
          });
        })
        .catch(error => {
          this.setState({
            error: error,
            cargando: false,
            paginaActual: PAGINA_ERROR
          });
        });
    });
  };

  onBotonReintentarClick = () => {
    this.setState({
      paginaActual: PAGINA_FORM
    });
  };

  onBotonInicioClick = () => {
    this.setState({ visible: false }, () => {
      setTimeout(() => {
        window.location = this.state.urlRetorno;
      }, 500);
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <MiCardLogin
            visible={this.state.visible}
            cargando={this.state.cargando || this.state.validandoCodigo}
            titulo="Vecino Virtual"
            subtitulo="Cambiar contraseña"
          >
            {this.renderContent()}
          </MiCardLogin>
        </div>
      </React.Fragment>
    );
  }

  renderContent() {
    const { classes } = this.props;

    console.log(this.state);
    return (
      <div className={classes.content}>
        <ContentSwapper
          transitionName="cross-fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          className={classes.contentSwapper}
        >
          <div
            key="paginaErrorValidando"
            className={classes.contentSwapperContent}
            visible={
              "" + (this.state.paginaActual == PAGINA_ERROR_VALIDANDO_CODIGO)
            }
          >
            {this.renderPaginaErrorValidandoCodigo()}
          </div>
          <div
            key="paginaPassword"
            className={classes.contentSwapperContent}
            visible={"" + (this.state.paginaActual == PAGINA_FORM)}
          >
            {this.renderPaginaPassword()}
          </div>
          <div
            key="paginaOk"
            className={classes.contentSwapperContent}
            visible={"" + (this.state.paginaActual == PAGINA_OK)}
          >
            {this.renderPaginaOk()}
          </div>
          <div
            key="paginaError"
            className={classes.contentSwapperContent}
            visible={"" + (this.state.paginaActual == PAGINA_ERROR)}
          >
            {this.renderPaginaError()}
          </div>
        </ContentSwapper>
      </div>
    );
  }

  renderPaginaPassword() {
    const { classes } = this.props;

    return (
      <div className={classes.content}>
        {this.renderPaginaPasswordMain()}
        {this.renderPaginaPasswordFooter()}
      </div>
    );
  }

  renderPaginaPasswordMain() {
    const { classes } = this.props;

    return (
      <div className={classes.mainContent} style={{ padding: padding }}>
        <Grid container>
          <Grid item xs={12} className={classes.fixPadding}>
            <FormControl
              className={classes.formControl}
              fullWidth
              margin="normal"
              error={this.state.errorPassword !== undefined}
              aria-describedby="textoPasswordError"
            >
              <InputLabel htmlFor="inputPassword">Contraseña</InputLabel>
              <Input
                id="inputPassword"
                autoFocus
                value={this.state.password}
                name="password"
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
                {this.state.errorPassword}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.fixPadding}>
            <FormControl
              className={classes.formControl}
              fullWidth
              margin="normal"
              error={this.state.errorPasswordRepeat !== undefined}
              aria-describedby="textoPasswordRepeatError"
            >
              <InputLabel htmlFor="inputPasswordRepeat">
                Repetita la contraseña
              </InputLabel>
              <Input
                id="inputPasswordRepeat"
                value={this.state.passwordRepeat}
                name="passwordRepeat"
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
                {this.state.errorPasswordRepeat}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }

  renderPaginaPasswordFooter() {
    const { classes } = this.props;

    return (
      <div
        className={classes.footer}
        style={{
          padding: padding,
          paddingBottom: "16px",
          paddingTop: "16px"
        }}
      >
        <div style={{ flex: 1 }} />

        <Button
          variant="raised"
          color="primary"
          className={classes.button}
          onClick={this.recuperarPassword}
        >
          Recuperar contraseña
        </Button>
      </div>
    );
  }

  renderPaginaOk() {
    return (
      <MiPanelMensaje
        lottieExito
        boton="Ir a inicio"
        onBotonClick={this.onBotonInicioClick}
        mensaje="Su contraseña ha sido modificada correctamente"
      />
    );
  }

  renderPaginaError() {
    return (
      <MiPanelMensaje
        mensaje={this.state.error}
        error
        boton="Reintentar"
        onBotonClick={this.onBotonReintentarClick}
      />
    );
  }

  renderPaginaErrorValidandoCodigo() {
    return <MiPanelMensaje mensaje={this.state.errorValidandoCodigo} error />;
  }
}

let componente = ProcesarRecuperarPassword;
componente = withStyles(styles)(componente);
componente = withRouter(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);

export default componente;

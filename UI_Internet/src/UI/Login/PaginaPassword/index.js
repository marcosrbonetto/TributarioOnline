import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";

//Componentes
import Button from "@material-ui/core/Button";
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
import HintUsuarioSeleccionado from "./HintUsuarioSeleccionado";

//Mis Rules
import Rules_Usuario from "@Rules/Rules_Usuario";

const mapDispatchToProps = dispatch => ({});
const mapStateToProps = state => {
  return {};
};

class PaginaPassword extends React.Component {
  static defaultProps = {
    onCargando: () => {},
    onLogin: () => {},
    onUsuarioNoValidado: () => {}
  };

  static propTypes = {
    onCargando: PropTypes.func,
    onLogin: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      password: "",
      error: undefined,
      showPassword: false
    };
  }

  onBotonAccederClick = () => {
    const username = this.props.dataUsuario.username;
    const password = this.state.password;

    this.props.onCargando(true);
    this.setState({ error: undefined }, () => {
      Rules_Usuario.validarUsuarioActivado(username, password)
        .then(validado => {
          if (validado === false) {
            this.props.onCargando(false);
            this.props.onUsuarioNoValidado(username, password);
            return;
          }

          Rules_Usuario.acceder(username, password)
            .then(data => {
              this.props.onLogin(data);
            })
            .catch(error => {
              this.setState({ error: error });
            })
            .finally(() => {
              this.props.onCargando(false);
            });
        })
        .catch(error => {
          this.setState({ error: error });
          this.props.onCargando(false);
        });
    });
  };

  onInputChange = event => {
    this.setState({
      error: undefined,
      [event.target.name]: event.target.value
    });
  };

  onInputKeyPress = event => {
    if (event.key === "Enter") {
      this.onBotonAccederClick();
    }
  };

  onBotonShowPasswordClick = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { classes, padding } = this.props;
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
      <div className={classes.content} style={{ padding: padding }}>
        <Grid container>
          <Grid item xs={12} className={classes.fixPadding}>
            <HintUsuarioSeleccionado
              dataUsuario={this.props.dataUsuario}
              onBotonVerUsuariosRecientesClick={
                this.props.onBotonVerUsuariosRecientesClick
              }
            />
          </Grid>
          <Grid item xs={12} className={classes.fixPadding}>
            <FormControl
              className={classes.formControl}
              fullWidth
              margin="normal"
              error={this.state.error !== undefined}
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
                {this.state.error}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="flat"
              color="primary"
              onClick={this.props.onBotonRecuperarPassword}
            >
              ¿No recordás tu contraseña?
            </Button>
          </Grid>
        </Grid>
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
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={this.onBotonAccederClick}
        >
          Acceder
        </Button>
      </div>
    );
  }
}

const styles = theme => {
  return {
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      height: "100%"
    },
    content: {
      flex: 1,
      overflow: "auto"
    },
    botonRecuperarCUIL: {
      cursor: "pointer",
      textDecoration: "underline",
      color: theme.palette.primary.main
    },
    fixPadding: {
      marginLeft: "16px",
      marginRight: "16px"
    },
    footer: {
      borderTop: "1px solid rgba(0,0,0,0.1)",
      display: "flex"
    }
  };
};

let componente = PaginaPassword;
componente = withStyles(styles)(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
export default componente;

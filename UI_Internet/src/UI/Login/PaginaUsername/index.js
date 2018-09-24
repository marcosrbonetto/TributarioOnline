import React from "react";
import { withStyles } from "@material-ui/core/styles";

//REDUX
import { connect } from "react-redux";

//Componentes
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Typography, Grid } from "@material-ui/core";

//Mis Rules
import Rules_Usuario from "@Rules/Rules_Usuario";

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => {
  return {};
};

class PaginaUsername extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.cuilGenerado || "",
      error: undefined
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cuilGenerado != this.props.cuilGenerado) {
      this.setState({ username: nextProps.cuilGenerado });
    }
  }

  onBotonSiguienteClick = () => {
    let errorUsername = undefined;
    if (this.state.username.trim() == "") {
      errorUsername = "Dato requerido";
    }

    if (errorUsername != undefined) {
      this.setState({ error: errorUsername });
      return;
    }

    this.props.onCargando(true);
    this.setState({ error: undefined }, () => {
      Rules_Usuario.getInfoPublica(this.state.username)
        .then(data => {
          Rules_Usuario.guardarUsuarioReciente(data);
          this.props.onBotonSiguienteClick(data);
        })
        .catch(error => {
          this.setState({ error: error });
        })
        .finally(() => {
          this.props.onCargando(false);
        });
    });
  };

  onBotonGenerarCuilClick = () => {
    this.props.onBotonGenerarCuil();
  };

  onInputChange = event => {
    this.setState({
      error: undefined,
      [event.target.name]: event.target.value
    });
    
    
    
  };

  onInputKeyPress = event => {
    if (event.key === "Enter") {
      this.onBotonSiguienteClick();
    }
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
            <Typography variant="title">Iniciar Sesión</Typography>
          </Grid>
          <Grid item xs={12} className={classes.fixPadding}>
            <FormControl
              className={classes.formControl}
              fullWidth
              margin="normal"
              error={this.state.error !== undefined}
              aria-describedby="textoUsernameError"
            >
              <InputLabel htmlFor="inputUsername">
                CUIL o Nombre de Usuario
              </InputLabel>
              <Input
                id="inputUsername"
                autoFocus
                value={this.state.username}
                name="username"
                onKeyPress={this.onInputKeyPress}
                onChange={this.onInputChange}
              />
              <FormHelperText id="textoUsernameError">
                {this.state.error}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="flat"
              color="primary"
              onClick={this.onBotonGenerarCuilClick}
            >
              ¿No recordás tu CUIL?
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
          paddingTop: "1rem",
          paddingBottom: "1rem"
        }}
      >
        <div style={{ flex: 1 }}>
          <Button
            variant="flat"
            color="primary"
            className={classes.button}
            onClick={this.onBotonNuevoUsuarioClick}
          >
            Nuevo usuario
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

const styles = theme => {
  return {
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      height:'100%'
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
    footer: {
      borderTop: "1px solid rgba(0,0,0,0.1)",
      display: "flex"
    },
    fixPadding: {
      marginLeft: "16px",
      marginRight: "16px"
    }
  };
};

let componente = PaginaUsername;
componente = withStyles(styles)(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
export default componente;

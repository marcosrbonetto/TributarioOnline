import React from "react";
import { withStyles } from "@material-ui/core/styles";

//Styles
import styles from "./styles";
import "@UI/transitions.css";

//REDUX
import { connect } from "react-redux";

//Componentes
import TextField from "@material-ui/core/TextField";
import { Typography, Grid, Icon, Button } from "@material-ui/core";
import Lottie from "react-lottie";
import * as animExito from "@Resources/animaciones/anim_success.json";
import red from "@material-ui/core/colors/red";

//Mis rules
import Rules_Usuario from "@Rules/Rules_Usuario";

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => {
  return {};
};

const opcionesAnimExito = {
  loop: false,
  autoplay: true,
  animationData: animExito,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

class PaginaUsuarioNoActivado extends React.Component {
  static defaultProps = {
    onCargando: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      cargando: true,
      procesado: false,
      error: undefined
    };
  }

  activar = () => {
    const username = this.props.username;
    const password = this.props.password;
    this.props.onCargando(true);
    Rules_Usuario.iniciarActivacion({
      username: username,
      password: password,
      urlRetorno: window.location.href
    })
      .then(() => {
        this.setState({ procesado: true, error: undefined });
      })
      .catch(error => {
        this.setState({ procesado: true, error: error });
      })
      .finally(() => {
        this.props.onCargando(false);
      });
  };

  onBotonActivarClick = () => {
    this.setState({ cargando: true, procesado: false }, () => {
      this.activar();
    });
  };

  onBotonReintentarClick = () => {
    this.activar();
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
        {this.renderMain()}
        {this.renderOk()}
        {this.renderError()}
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
      </div>
    );
  }

  renderMain() {
    if (this.state.procesado === true || this.state.error !== undefined)
      return null;

    const { classes, padding } = this.props;

    return (
      <div className={classes.pagina} style={{ padding: padding }}>
        <Typography variant="headline" className={classes.texto}>
          Su usuario no se encuentra activado. Si lo desea puede solicitar
          nuevamente el e-mail de activación.
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          style={{ marginTop: "16px" }}
          onClick={this.onBotonActivarClick}
        >
          Solicitar e-mail de activación
        </Button>
      </div>
    );
  }

  renderOk() {
    if (this.state.procesado === false || this.state.error !== undefined)
      return null;

    const { classes, padding } = this.props;

    return (
      <div className={classes.pagina} style={{ padding: padding }}>
        <Lottie options={opcionesAnimExito} height={150} width={150} />

        <Typography variant="headline" className={classes.texto}>
          Se ha enviado un e-mail a su casilla de correo con las instrucciones
          para la activacion de su usuario
        </Typography>
      </div>
    );
  }

  renderError() {
    if (this.state.procesado === false || this.state.error === undefined)
      return null;

    const { classes, padding } = this.props;

    return (
      <div className={classes.pagina} style={{ padding: padding }}>
        <Icon className={classes.icono} style={{ color: red["500"] }}>
          error
        </Icon>
        <Typography variant="headline" className={classes.texto}>
          {this.state.error}
        </Typography>
        <Button
          variant="outlined"
          style={{ marginTop: "16px" }}
          onClick={this.onBotonReintentarClick}
        >
          Reintentar
        </Button>
      </div>
    );
  }
}

let componente = PaginaUsuarioNoActivado;
componente = withStyles(styles)(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
export default componente;

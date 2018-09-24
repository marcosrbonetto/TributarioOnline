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

const PAGINA_OK = "PAGINA_OK";
const PAGINA_ERROR = "PAGINA_ERROR";

class ProcesarActivacionUsuario extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.location.search.split("codigo=")[1]);
    this.state = {
      codigo: props.location.search.split("codigo=")[1],
      validandoCodigo: true,
      visible: false,
      paginaActual: undefined,
      urlRetorno: ""
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ visible: true });
    }, 500);

    this.procesar();
  }

  procesar = () => {
    this.setState({ cargando: true, paginaActual: undefined }, () => {
      Rules_Usuario.procesarActivacionUsuario(this.state.codigo)
        .then(data => {
          this.setState({
            urlRetorno: data,
            error: undefined,
            paginaActual: PAGINA_OK
          });
        })
        .catch(error => {
          this.setState({
            error: error,
            paginaActual: PAGINA_ERROR
          });
        })
        .finally(() => {
          this.setState({ cargando: false });
        });
    });
  };

  onBotonReintentarClick = () => {
    this.procesar();
  };

  onBotonAceptarClick = () => {
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
            titulo="Vecino Virtual"
            subtitulo="Activar usuario"
            cargando={this.state.cargando}
            visible={this.state.visible}
          >
            {this.renderContent()}
          </MiCardLogin>
        </div>
      </React.Fragment>
    );
  }

  renderContent() {
    const { classes } = this.props;

    return (
      <div className={classes.content}>
        <ContentSwapper
          transitionName="cross-fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          className={classes.contentSwapper}
        >
          <div
            key="paginaOk"
            style={{ height: "100%", width: "100%", display: "flex" }}
            visible={"" + (this.state.paginaActual == PAGINA_OK)}
          >
            {this.renderPaginaOk()}
          </div>
          <div
            key="paginaError"
            style={{ height: "100%", width: "100%", display: "flex" }}
            visible={"" + (this.state.paginaActual == PAGINA_ERROR)}
          >
            {this.renderPaginaError()}
          </div>
        </ContentSwapper>
      </div>
    );
  }

  renderPaginaOk() {
    return (
      <MiPanelMensaje
        boton="Aceptar"
        onBotonClick={this.onBotonAceptarClick}
        lottieExito
        mensaje=" E-mail validado correctamente"
      />
    );
  }

  renderPaginaError() {
    return (
      <MiPanelMensaje
        error
        boton="Reintentar"
        mensaje={this.state.error}
        onBotonClick={this.onBotonReintentarClick}
      />
    );
  }
}

let componente = ProcesarActivacionUsuario;
componente = withStyles(styles)(componente);
componente = withRouter(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);

export default componente;

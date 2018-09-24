import React from "react";

//Styles
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import styles from "./styles";
import "@UI/transitions.css";

//Router
import { withRouter } from "react-router-dom";

//REDUX
import { connect } from "react-redux";
import { push } from "connected-react-router";

//Mis compontentes
import MiPanelMensaje from "@Componentes/MiPanelMensaje";
import ContentSwapper from "@Componentes/ContentSwapper";

//Mis Rules
import Rules_Usuario from "@Rules/Rules_Usuario";

const PAGINA_ERROR = "PAGINA_ERROR";
const PAGINA_OK = "PAGINA_OK";

const mapDispatchToProps = dispatch => ({
  redireccionar: url => {
    dispatch(push(url));
  }
});

const mapStateToProps = state => {
  return {};
};

class PaginaRecuperarPassword extends React.Component {
  static defaultProps = {
    onCargando: () => {},
    onBotonVolverClick: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      cargando: true,
      paginaActual: undefined
    };
  }

  componentDidMount() {
    this.procesar();
  }

  procesar = () => {
    const username = this.props.username;
    this.props.onCargando(true);
    this.setState(
      {
        cargando: true,
        paginaActual: undefined
      },
      () => {
        Rules_Usuario.iniciarRecuperarPassword({
          username: username,
          urlRetorno: window.location.href
        })
          .then(() => {
            this.setState({
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
            this.props.onCargando(false);
            this.setState({ cargando: false });
          });
      }
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ContentSwapper
          transitionName={"cross-fade"}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          className={classes.contentSwapper}
        >
          <div
            key="paginaOK"
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

  renderPaginaOk() {
    return (
      <MiPanelMensaje
        lottieExito
        mensaje=" Se ha enviado un e-mail a su casilla de correo con las instrucciones
      para recuperar su contraseña"
      />
    );
  }

  renderPaginaError() {
    return (
      <MiPanelMensaje
        boton="Volver"
        onBotonClick={this.props.onBotonVolverClick}
        error
        mensaje={this.state.error}
      />
    );
  }
}

let componente = PaginaRecuperarPassword;
componente = withStyles(styles)(componente);
componente = withRouter(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);

export default componente;

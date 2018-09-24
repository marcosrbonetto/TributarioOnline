import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

//Styles
import "@UI/transitions.css";
import styles from "./styles";

//Router
import { withRouter } from "react-router-dom";

//REDUX
import { connect } from "react-redux";
import { push } from "connected-react-router";

//Mis componentes
import MiCardLogin from "@Componentes/MiCardLogin";
import PaginaUsername from "./PaginaUsername";
import PaginaPassword from "./PaginaPassword";
import PaginaUsuariosRecientes from "./PaginaUsuariosRecientes";
import PaginaGenerarCUIL from "./PaginaGeneralCuil";
import PaginaRecuperarPassword from "./PaginaRecuperarPassword";
import PaginaUsuarioNoActivado from "./PaginaUsuarioNoActivado";
import ContentSwapper from "@Componentes/ContentSwapper";
import Ayuda from "./Ayuda";
import MiPanelMensaje from "@Componentes/MiPanelMensaje";

//Mis Rules
import Rules_Usuario from "@Rules/Rules_Usuario";
import Rules_Aplicacion from "@Rules/Rules_Aplicacion";

const PAGINA_ERROR_VALIDANDO_CODIGO = "PAGINA_ERROR_VALIDANDO_CODIGO";
const PAGINA_USERNAME = "PAGINA_USERNAME";
const PAGINA_PASSWORD = "PAGINA_PASSWORD";
const PAGINA_USUARIOS_RECIENTES = "PAGINA_USUARIOS_RECIENTES";
const PAGINA_GENERAR_CUIL = "PAGINA_GENERAR_CUIL";
const PAGINA_RECUPERAR_PASSWORD = "PAGINA_RECUPERAR_PASSWORD";
const PAGINA_USUARIO_NO_ACTIVADO = "PAGINA_USUARIO_NO_ACTIVADO";

const mapDispatchToProps = dispatch => ({
  redireccionar: url => {
    dispatch(push(url));
  }
});

const mapStateToProps = state => {
  return {};
};

const padding = "2rem";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //Init
      codigo: props.match.params.codigo, //Busco el codigo en el query string
      validandoCodigo: true,
      errorValidandoCodigo: undefined,
      infoLogin: undefined,
      //UI
      visible: false,
      cargando: false,
      paginaActual: undefined,
      //Info util
      dataUsuario: undefined,
      cuilGenerado: undefined,
      activarUsername: undefined,
      activarPassword: undefined
    };
  }

  componentDidMount() {
    this.setState(
      {
        validandoCodigo: true,
        paginaActual: undefined
      },
      () => {
        Rules_Aplicacion.getInfoLogin(this.state.codigo)
          .then(info => {
            this.setState({
              infoLogin: info,
              paginaActual: PAGINA_USERNAME
            });
          })
          .catch(error => {
            this.setState({
              errorValidandoCodigo: error,
              paginaActual: PAGINA_ERROR_VALIDANDO_CODIGO
            });
          })
          .finally(() => {
            this.setState({
              validandoCodigo: false
            });
          });
      }
    );

    setTimeout(() => {
      this.setState({ visible: true });
    }, 500);
  }

  onCargando = cargando => {
    this.setState({ cargando: cargando || false });
  };

  onLogin = user => {
    this.setState({ visible: false });
    console.log(user);
    setTimeout(() => {
      window.location.replace(
        this.state.infoLogin.url + "?token=" + user.token
      );
    }, 500);
  };

  onCuilGenerado = cuilGenerado => {
    this.setState({
      cuilGenerado: cuilGenerado,
      paginaActual: PAGINA_USERNAME
    });
  };

  onPaginaUsernameBotonSiguienteClick = data => {
    this.setState({ dataUsuario: data, paginaActual: PAGINA_PASSWORD });
  };

  onPaginaUsernameBotonGenerarCuilClick = () => {
    this.setState({ paginaActual: PAGINA_GENERAR_CUIL });
  };

  onPaginaPasswordBotonVerUsuariosRecientesClick = () => {
    this.setState({ paginaActual: PAGINA_USUARIOS_RECIENTES });
  };

  onPaginaPasswordBotonVolverClick = () => {
    this.setState({ paginaActual: PAGINA_USERNAME });
  };

  onPaginaPasswordBotonRecuperarPasswordClick = () => {
    this.setState({ paginaActual: PAGINA_RECUPERAR_PASSWORD });
  };

  onPaginaPasswordUsuarioNoValidado = (username, password) => {
    this.setState({
      activarUsername: username,
      activarPassword: password,
      paginaActual: PAGINA_USUARIO_NO_ACTIVADO
    });
  };

  onPaginaRecuperarPasswordBotonVolverClick = () => {
    this.setState({ paginaActual: PAGINA_PASSWORD });
  };

  onPaginaGenerarCuilBotonVolverClick = () => {
    this.setState({ cuilGenerado: undefined, paginaActual: PAGINA_USERNAME });
  };

  onPaginaUsuariosRecientesBotonVolverClick = () => {
    this.setState({ paginaActual: PAGINA_PASSWORD });
  };

  onPaginaUsuarioRecientesUsuarioSeleccionado = data => {
    Rules_Usuario.guardarUsuarioReciente(data);
    this.onPaginaUsernameBotonSiguienteClick(data);
  };

  onPaginaUsuariosRecientesOtraCuentaClick = () => {
    this.setState({ paginaActual: PAGINA_USERNAME });
  };

  onPaginaUsuarioNoActivadoBotonVolverClick = () => {
    this.setState({ paginaActual: PAGINA_PASSWORD });
  };

  render() {
    const { classes } = this.props;

    const nombreSistema =
      this.state.infoLogin != undefined
        ? this.state.infoLogin.aplicacionNombre
        : "";

    const cargando = this.state.cargando || this.state.validandoCodigo;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <MiCardLogin
            titulo="Vecino Virtual"
            subtitulo={nombreSistema}
            cargando={cargando}
            visible={this.state.visible}
          >
            {this.renderContent()}
          </MiCardLogin>
        </div>

        <Ayuda expandido={this.state.expandido} />
      </React.Fragment>
    );
  }

  renderContent() {
    const { classes } = this.props;

    let anim =
      this.state.paginaActual == PAGINA_ERROR_VALIDANDO_CODIGO
        ? "cross-fade"
        : "roll-up";

    return (
      <ContentSwapper
        transitionName={anim}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        className={classes.contentSwapper}
      >
        <div
          key="paginaErrorValidandoCodigo"
          className={classes.contentSwapperContent}
          visible={
            "" + (this.state.paginaActual == PAGINA_ERROR_VALIDANDO_CODIGO)
          }
        >
          {this.renderPaginaErrorValidandoCodigo()}
        </div>

        <div
          key="paginaUsername"
          className={classes.contentSwapperContent}
          visible={"" + (this.state.paginaActual == PAGINA_USERNAME)}
        >
          {this.renderPaginaUsername()}
        </div>
        <div
          key="paginaPassword"
          className={classes.contentSwapperContent}
          visible={"" + (this.state.paginaActual == PAGINA_PASSWORD)}
        >
          {this.renderPaginaPassword()}
        </div>
        <div
          key="paginaUsuariosRecientes"
          className={classes.contentSwapperContent}
          visible={"" + (this.state.paginaActual == PAGINA_USUARIOS_RECIENTES)}
        >
          {this.renderPaginaUsuariosRecientes()}
        </div>
        <div
          key="paginaGenerarCuil"
          className={classes.contentSwapperContent}
          visible={"" + (this.state.paginaActual == PAGINA_GENERAR_CUIL)}
        >
          {this.renderPaginaGenerarCuil()}
        </div>
        <div
          key="paginaRecuperarPassword"
          className={classes.contentSwapperContent}
          visible={"" + (this.state.paginaActual == PAGINA_RECUPERAR_PASSWORD)}
        >
          {this.renderPaginaRecuperarPassword()}
        </div>

        <div
          key="paginaUsuarioNoActivado"
          className={classes.contentSwapperContent}
          visible={"" + (this.state.paginaActual == PAGINA_USUARIO_NO_ACTIVADO)}
        >
          {this.renderPaginaUsuarioNoActivado()}
        </div>
      </ContentSwapper>
    );
  }

  renderPaginaErrorValidandoCodigo() {
    return <MiPanelMensaje error mensaje={this.state.errorValidandoCodigo} />;
  }

  renderPaginaUsername() {
    return (
      <PaginaUsername
        padding={padding}
        cuilGenerado={this.state.cuilGenerado}
        onCargando={this.onCargando}
        username={this.state.username}
        onBotonSiguienteClick={this.onPaginaUsernameBotonSiguienteClick}
        onBotonGenerarCuil={this.onPaginaUsernameBotonGenerarCuilClick}
      />
    );
  }

  renderPaginaPassword() {
    return (
      <PaginaPassword
        dataUsuario={this.state.dataUsuario}
        onCargando={this.onCargando}
        onLogin={this.onLogin}
        padding={padding}
        onBotonVolverClick={this.onPaginaPasswordBotonVolverClick}
        onBotonVerUsuariosRecientesClick={
          this.onPaginaPasswordBotonVerUsuariosRecientesClick
        }
        onBotonRecuperarPassword={
          this.onPaginaPasswordBotonRecuperarPasswordClick
        }
        onUsuarioNoValidado={this.onPaginaPasswordUsuarioNoValidado}
      />
    );
  }

  renderPaginaUsuariosRecientes() {
    return (
      <PaginaUsuariosRecientes
        padding={padding}
        onUsuarioSeleccionado={this.onPaginaUsuarioRecientesUsuarioSeleccionado}
        onOtraCuentaClick={this.onPaginaUsuariosRecientesOtraCuentaClick}
        onBotonVolverClick={this.onPaginaUsuariosRecientesBotonVolverClick}
      />
    );
  }

  renderPaginaGenerarCuil() {
    return (
      <PaginaGenerarCUIL
        padding={padding}
        onCargando={this.onCargando}
        onBotonVolverClick={this.onPaginaGenerarCuilBotonVolverClick}
        onCuilGenerado={this.onCuilGenerado}
      />
    );
  }

  renderPaginaRecuperarPassword() {
    let username = "";
    if (this.state.dataUsuario != undefined) {
      username = this.state.dataUsuario.username;
    }

    return (
      <PaginaRecuperarPassword
        padding={padding}
        onBotonVolverClick={this.onPaginaRecuperarPasswordBotonVolverClick}
        onCargando={this.onCargando}
        username={username}
      />
    );
  }

  renderPaginaUsuarioNoActivado() {
    let username = this.state.activarUsername;
    let password = this.state.activarPassword;

    return (
      <PaginaUsuarioNoActivado
        padding={padding}
        onCargando={this.onCargando}
        onBotonVolverClick={this.onPaginaUsuarioNoActivadoBotonVolverClick}
        username={username}
        password={password}
      />
    );
  }
}

let componente = Login;
componente = withStyles(styles)(componente);
componente = withRouter(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);

export default componente;

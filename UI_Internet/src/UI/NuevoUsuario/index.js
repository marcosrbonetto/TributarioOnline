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
import PaginaDatosBasicos from "./PaginaDatosBasicos";
import PaginaDatosAcceso from "./PaginaDatosAcceso";
import PaginaDatosContacto from "./PaginaDatosContacto";

//Mis Rules
import Rules_Usuario from "@Rules/Rules_Usuario";
import Rules_Aplicacion from "@Rules/Rules_Aplicacion";

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
const PAGINA_DATOS_BASICOS = "DATOS_BASICOS";
const PAGINA_DATOS_ACCESO = "DATOS_ACCESO";
const PAGINA_DATOS_CONTACTO = "DATOS_CONTACTO";

class NuevoUsuario extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      codigo: props.match.params.codigo, //Busco el codigo en el query string
      validandoCodigo: true,
      errorValidandoCodigo: undefined,
      infoLogin: undefined,
      //UI
      visible: false,
      paginaActual: undefined
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ visible: true });
    }, 500);

    this.validarCodigo();
  }

  validarCodigo = () => {
    this.setState(
      {
        validandoCodigo: true,
        paginaActual: undefined
      },
      () => {
        Rules_Aplicacion.getInfoLogin(this.state.codigo)
          .then(data => {
            this.setState({
              infoLogin: data,
              paginaActual: PAGINA_DATOS_BASICOS
            });
          })
          .catch(error => {
            this.setState({
              errorValidandoCodigo: error,
              paginaActual: PAGINA_ERROR_VALIDANDO_CODIGO
            });
          })
          .finally(() => {
            this.setState({ validandoCodigo: false });
          });
      }
    );
  };

  onCargando = cargando => {
    this.setState({ cargando: cargando || false });
  };

  onDatosBasicosReady = datos => {
    console.log(datos);

    this.setState({
      datosBasicos: datos,
      paginaActual: PAGINA_DATOS_ACCESO
    });
  };

  onDatosAccesoReady = datos => {
    console.log(datos);

    this.setState({
      datosAcceso: datos,
      paginaActual: PAGINA_DATOS_CONTACTO
    });
  };

  onDatosContactoReady = datos => {
    console.log(datos);

    this.setState({
      datosContacto: datos,
      paginaActual: undefined
    });
  };

  onPaginaDatosAccesoBotonVolverClick = () => {
    this.setState({ paginaActual: PAGINA_DATOS_BASICOS });
  };

  onPaginaDatosContactoBotonVolverClick = () => {
    this.setState({ paginaActual: PAGINA_DATOS_ACCESO });
  };

  render() {
    const { classes } = this.props;

    const cargando = this.state.cargando || this.state.validandoCodigo;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <MiCardLogin
            cargando={cargando}
            visible={this.state.visible}
            rootClassName={classes.cardRoot}
            titulo="Vecino Virtual"
            subtitulo="Nuevo usuario"
          >
            {this.renderContent()}
          </MiCardLogin>
        </div>
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
      <div className={classes.content}>
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
            key="paginaDatosBasicos"
            className={classes.contentSwapperContent}
            visible={"" + (this.state.paginaActual == PAGINA_DATOS_BASICOS)}
          >
            {this.renderPaginaDatosBasicos()}
          </div>
          <div
            key="paginaDatosAcceso"
            className={classes.contentSwapperContent}
            visible={"" + (this.state.paginaActual == PAGINA_DATOS_ACCESO)}
          >
            {this.renderPaginaDatosAcceso()}
          </div>
          <div
            key="paginaDatosContacto"
            className={classes.contentSwapperContent}
            visible={"" + (this.state.paginaActual == PAGINA_DATOS_CONTACTO)}
          >
            {this.renderPaginaDatosContacto()}
          </div>
        </ContentSwapper>
      </div>
    );
  }

  renderPaginaErrorValidandoCodigo() {
    return <MiPanelMensaje error mensaje={this.state.errorValidandoCodigo} />;
  }

  renderPaginaDatosBasicos() {
    return (
      <PaginaDatosBasicos
        padding={padding}
        datosIniciales={this.state.datosBasicos}
        onCargando={this.onCargando}
        onReady={this.onDatosBasicosReady}
      />
    );
  }

  renderPaginaDatosAcceso() {
    return (
      <PaginaDatosAcceso
        padding={padding}
        datosIniciales={this.state.datosAcceso}
        onCargando={this.onCargando}
        onReady={this.onDatosAccesoReady}
        onBotonVolverClick={this.onPaginaDatosAccesoBotonVolverClick}
      />
    );
  }

  renderPaginaDatosContacto() {
    return (
      <PaginaDatosContacto
        padding={padding}
        datosIniciales={this.state.datosContacto}
        onCargando={this.onCargando}
        onReady={this.onDatosContactoReady}
        onBotonVolverClick={this.onPaginaDatosContactoBotonVolverClick}
      />
    );
  }
}

let componente = NuevoUsuario;
componente = withStyles(styles)(componente);
componente = withRouter(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);

export default componente;

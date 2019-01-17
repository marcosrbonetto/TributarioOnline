import React from "react";

//Style
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import classNames from "classnames";

//Redux
import { connect } from "react-redux";
import { mostrarCargando } from '@Redux/Actions/mainContent'
import { replace } from "connected-react-router";
import { setAccessCaptcha, setStateAccess } from "@ReduxSrc/CaptchaAccess/actions";

//Router
import { withRouter } from "react-router-dom";

//Mis Componentes
import MiCaptcha from "@Componentes/MiCaptcha";

//Rules
import Rules_Captcha from '@Rules/Rules_Captcha';

//Utils
import { getAllUrlParams, mostrarAlerta } from "@Utils/functions";

//Material UI
import Typography from "@material-ui/core/Typography";

//Cargando
import IndicadorCargando from "@UI/_Componentes/IndicadorCargando"

const mapStateToProps = state => {
  return {
    loggedUser: state.Usuario.loggedUser
  };
};

const mapDispatchToProps = dispatch => ({
  mostrarCargando: (cargar) => {
    dispatch(mostrarCargando(cargar));
  },
  redireccionar: url => {
    dispatch(replace(url));
  },
  setAccessCaptcha: (data) => {
    dispatch(setAccessCaptcha(data));
  },
  setStateAccess: (data) => {
    dispatch(setStateAccess(data));
  }
});

class CaptchaAccess extends React.PureComponent {

  constructor(props) {
    super(props);

    this.token = 'INVITADO';
    const urlRedirect = getAllUrlParams(this.props.location.search).redirect || '/';
    this.urlRedirect = decodeURIComponent(urlRedirect);

    this.state = {
      cargandoVisible: true
    };
  }

  componentDidMount() {

    if (!this.urlRedirect)
      this.props.redireccionar('/Inicio');
  }

  handleAfterMount = () => {
    this.setState({
      cargandoVisible: false
    });
  }

  handleValidationCaptcha = (valueCaptcha) => {

    this.setState({
      cargandoVisible: true
    }, () => {
      Rules_Captcha.validarCaptcha(this.token, valueCaptcha)
        .then(datos => {

          if (!datos.ok) { mostrarAlerta(datos.error); return false; }

          this.props.setAccessCaptcha(datos.return);
          this.props.setStateAccess(true); //Seteamos acceso correcto

          this.props.mostrarCargando('reset');
          this.props.redireccionar(this.urlRedirect);

          this.setState({
            cargandoVisible: true
          });
        })
        .catch(error => {
          mostrarAlerta('Ocurrió un error al verificar el captcha, intente nuevamente.')
        });
    });
  };

  render() {
    let { classes } = this.props;
    const { cargandoVisible } = this.state;

    return (<div className={classes.mainContainer}>
      <IndicadorCargando visible={cargandoVisible} />
      <i className={classNames(classes.iconoSeguridad, "material-icons")}>
        security
      </i>
      <br />
      <Typography variant="title" className={classes.textoExplicativo}>
        Por cuestiones de seguridad, se solicita realizar una validación de usuario.
      </Typography>
      <br />
      <MiCaptcha
        handleAfterMount={this.handleAfterMount}
        classNameCaptcha={classes.captcha}
        handleValidationCaptcha={this.handleValidationCaptcha} />
    </div>
    );
  }
}

let componente = CaptchaAccess;
componente = withStyles(styles)(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

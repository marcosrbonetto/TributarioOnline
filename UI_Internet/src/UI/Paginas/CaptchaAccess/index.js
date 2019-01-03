import React from "react";

//Style
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import classNames from "classnames";

//Redux
import { connect } from "react-redux";
import { mostrarCargando } from '@Redux/Actions/mainContent'
import { replace } from "connected-react-router";
import { setAccessCaptcha } from "@ReduxSrc/CaptchaAccess/actions";

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
  }
});

class CaptchaAccess extends React.PureComponent {

  constructor(props) {
    super(props);

    this.token = 'INVITADO';
    const urlRedirect = getAllUrlParams(this.props.location.search).redirect || '/';
    this.urlRedirect = decodeURIComponent(urlRedirect);

    this.state = {
      //accessCaptcha
    };
  }

  componentDidMount() {

    if(!this.urlRedirect)
      this.props.redireccionar('/Inicio');
  }

  handleValidationCaptcha = (valueCaptcha) => {
    this.props.mostrarCargando(true);

    Rules_Captcha.validarCaptcha(this.token, valueCaptcha)
    .then(datos => {
      this.props.mostrarCargando(false);

      if (!datos.ok) { mostrarAlerta(datos.error); return false; }

      this.props.setAccessCaptcha(datos.return);
      this.props.redireccionar(this.urlRedirect);
    })
    .catch(error => {
      mostrarAlerta('Ocurrió un error al verificar el captcha, intente nuevamente.')
      this.props.mostrarCargando(false);
    });
  };

  render() {
    let { classes } = this.props;

    return (<div className={classes.mainContainer}>
      <i className={classNames(classes.iconoSeguridad,"material-icons")}>
        security
      </i>
      <br />
      <Typography variant="title" className={classes.textoExplicativo}>
        Por cuestiones de seguridad, se solicita realizar una validación de usuario.
      </Typography>
      <br />
      <MiCaptcha
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

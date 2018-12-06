import React from "react";

//Styles
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import "./style.css";

//Router
import { withRouter } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import { replace } from "connected-react-router";

//REDUX
import { connect } from "react-redux";
import { ocultarAlerta } from "@Redux/Actions/alerta";
import { login, logout } from '@Redux/Actions/usuario';
import { setTipoTributos, setTipoCedulones } from '@Redux/Actions/mainContent';

//Componentes
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { IconButton, Icon } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

//Mis componentes
import Inicio from "./Inicio";
import DetalleTributario from "@UI/Paginas/TributarioOnline/DetalleTributario/index";
import importacionMasivaAFIP from "@UI/Paginas/AfipController/importacionMasiva";
import importacionIndividualAFIP from "@UI/Paginas/AfipController/importacionIndividual";
import pagoNexo from "@UI/Paginas/MercadoPagoController/pagoNexo";
import Pagina404 from "@UI/_Pagina404";

import Rules_Usuario from "@Rules/Rules_Usuario";
import Rules_TributarioOnline from '@Rules/Rules_TributarioOnline';
import { mostrarAlerta, mostrarMensaje } from "@Utils/functions";
import { callbackify } from "util";

const mapStateToProps = state => {
  return {
    alertas: state.Alerta.alertas,
    loggedUser: state.Usuario.loggedUser
  };
};

const mapDispatchToProps = dispatch => ({
  onAlertaClose: id => {
    dispatch(ocultarAlerta(id));
  },
  login: (data) => {
    dispatch(login(data));
  },
  logout: () => {
    dispatch(logout());
  },
  redireccionar: url => {
    dispatch(replace(url));
  },
  setTipoTributos: data => {
    dispatch(setTipoTributos(data));
  },
  setTipoCedulones: data => {
    dispatch(setTipoCedulones(data));
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validandoToken: false
    };
  }

  componentWillReceiveProps(nextProps) {

    //Corroboramos Resultado importacion AFIP
    let afipProcess = new URLSearchParams(this.props.location.search).get('afipProcess');
    if (afipProcess) {
      if (afipProcess == 'OK')
        mostrarMensaje('La imporación de AFIP se realizó con éxito');
      else
        mostrarAlerta(afipProcess);
    }

    if (this.props.loggedUser != nextProps.loggedUser) {
      if (nextProps.loggedUser === undefined) {
        this.props.logout();
        window.location.href = window.Config.URL_LOGIN + "?url=" + this.props.location.pathname + this.props.location.search;
      }
    }

    if (this.props.location.pathname != nextProps.location.pathname) {
      if (nextProps.location.pathname == "/") {
        this.props.redireccionar("/Inicio");
      }
    }
  }

  componentWillMount() {

    //Seteo Token en cookies // para salir del apuro asumimos que siempre viene
    /*const tokenParam = getAllUrlParams(window.location.href).Token;
    tokenParam && localStorage.setItem('token', tokenParam);

    const token = localStorage.getItem('token');

    if(!token) window.location.href = "https://servicios2.cordoba.gov.ar/TributarioOnline/vecino-virtual.html";

    this.props.login({
      token: token
    });

    //Traemos datos de usuario para guardarlos en las props de redux
    services.getDatosUsuario(token) //this.props.loggedUser.token
      .then((datos) => {
        
        //Seteamos las props
        this.props.login({
          datos: datos.return
        });

      });*/
  }

  componentDidMount() {
    //Realizamos acciónes iniciales y luego seguimos cargando la aplicación
    this.init(() => {
      let token = localStorage.getItem("token");

      let search = this.props.location.search;
      if (search.startsWith("?")) {
        search = search.substring(1);
        search = new URLSearchParams(search);
        let tokenQueryString = search.get("token");
        if (tokenQueryString) {
          token = tokenQueryString;
        }
      }

      //Usuario Invitado
      if (token == undefined || token == null || token == "undefined" || token == "" || token == window.Config.TOKEN_INVITADO) {

        //Borramos el localStorage por si hay algun pago inconcluso o algun dato del redux persistente
        if(!token == window.Config.TOKEN_INVITADO) //Solo en caso que no exista un token
          localStorage.clear();
          
        //Logueamos con el usuario Invitado
        this.props.login({
          datos: undefined,
          token: window.Config.TOKEN_INVITADO
        });

        if (search) {
          let url = search.get("url") || "/";
          if (url == "/") url = "/Inicio";
          this.props.redireccionar(url);
        } else {
          console.log(this.props.location);

          if (this.props.location.pathname == "/") {
            this.props.redireccionar("/Inicio");
          }
        }
      } else { //Usuario Vecino Virtual
        this.setState({ validandoToken: true }, () => {
          Rules_Usuario.validarToken(token)
            .then(resultado => {
              if (resultado == false) {
                this.props.logout();
                window.location.href = window.Config.URL_LOGIN + "?url=" + this.props.location.pathname + this.props.location.search;
                return;
              }

              Rules_Usuario.datos(token)
                .then(datos => {

                  this.props.login({
                    datos: datos,
                    token: token
                  });

                  //let url = "/";
                  if (search) {
                    let url = search.get("url") || "/";
                    if (url == "/") url = "/Inicio";
                    this.props.redireccionar(url);
                  } else {
                    console.log(this.props.location);

                    if (this.props.location.pathname == "/") {
                      this.props.redireccionar("/Inicio");
                    }
                  }

                  this.onLogin();
                })
                .catch(() => {
                  this.props.logout();
                  window.location.href = window.Config.URL_LOGIN + "?url=" + this.props.location.pathname + this.props.location.search;
                });
            })
            .catch(error => {
              this.props.logout();
              window.location.href = window.Config.URL_LOGIN + "?url=" + this.props.location.pathname + this.props.location.search;
            })
            .finally(() => {
              this.setState({ validandoToken: false });
            });
        });
      }
    });
  }

  init = (callback) => {
    //Seteamos los tipo tributos en la aplicacion
    this.setTipoTributos(callback);
  }

  setTipoTributos = (callback) => {
    const service1 = Rules_TributarioOnline.getTipoTributos()
      .then(datos => {
        this.props.setTipoTributos(datos.return);
      })
      .catch(error => {
        this.props.logout();
        window.location.href = window.Config.URL_LOGIN + "?url=" + this.props.location.pathname + this.props.location.search;
      });

    const service2 = Rules_TributarioOnline.getTipoCedulones()
      .then(datos => {
        this.props.setTipoCedulones(datos.return);
      })
      .catch(error => {
        this.props.logout();
        window.location.href = window.Config.URL_LOGIN + "?url=" + this.props.location.pathname + this.props.location.search;
      });

    Promise.all([service1, service2]).then(() => {
      callback();
    });
  };

  onLogin = () => {
    //Cada 5 seg valido el token
    this.intervalo = setInterval(() => {
      let token = localStorage.getItem("token");
      if (token == undefined || token == null || token == "undefined") {
        this.props.logout();
        window.location.href = window.Config.URL_LOGIN + "?url=" + this.props.location.pathname + this.props.location.search;
        return;
      }

      Rules_Usuario.validarToken(token)
        .then(resultado => {
          if (resultado == false) {
            this.props.logout();
            window.location.href = window.Config.URL_LOGIN + "?url=" + this.props.location.pathname + this.props.location.search;
            return;
          }
        })
        .catch(error => {
          this.props.logout();
          window.location.href = window.Config.URL_LOGIN + "?url=" + this.props.location.pathname + this.props.location.search;
        });
    }, 5000);
  };

  componentWillUnmount() {
    this.intervalo && clearInterval(this.intervalo);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        {this.renderContent()}
        {this.renderAlertas()}
      </div>
    );
  }

  renderContent() {
    const { classes } = this.props;

    let base = "";
    const login = this.state.validandoToken == false && this.props.loggedUser != undefined;

    return (
      <main className={classes.content}>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className={"switch-wrapper"}
        >
          <Route exact path="/" component={null} />
          <Route path={`${base}/DetalleTributario/:tributo`} component={login ? DetalleTributario : null} />
          <Route path={`${base}/DetalleTributario/:tributo/:identificador`} component={login ? DetalleTributario : null} />
          <Route path={`${base}/Inicio`} component={login ? Inicio : null} />
          <Route path={`${base}/importacionMasivaAFIP`} component={login ? importacionMasivaAFIP : null} />
          <Route path={`${base}/importacionIndividualAFIP`} component={login ? importacionIndividualAFIP : null} />
          <Route path={`${base}/PagoNexo`} component={login ? pagoNexo : null} />
          <Route component={login ? Pagina404 : null} />
        </AnimatedSwitch>
      </main>
    );
  }

  renderAlertas() {
    const { classes } = this.props;

    return this.props.alertas.map((alerta, index) => {
      return (
        <Snackbar
          key={alerta.id}
          key={index}
          open={alerta.visible}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          autoHideDuration={5000}
          onClose={() => {
            this.props.onAlertaClose(alerta.id);
          }}
          ContentProps={{
            "aria-describedby": "message-id" + alerta.id
          }}
        >
          <SnackbarContent
            style={{ backgroundColor: alerta.color }}
            aria-describedby="client-snackbar"
            message={
              <span
                id={"message-id" + alerta.id}
                className={classes.snackMessage}
              >
                {alerta.icono != undefined && (
                  <Icon className={classes.snackCustomIcon}>
                    {alerta.icono}
                  </Icon>
                )}
                {alerta.texto}
              </span>
            }
            action={[
              alerta.mostrarIconoCerrar && (
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => {
                    this.props.onAlertaClose(alerta.id);
                  }}
                >
                  <CloseIcon className={classes.icon} />
                </IconButton>
              )
            ]}
          />
        </Snackbar>
      );
    });
  }
}

const styles = theme => {
  return {
    root: {
      display: "flex",
      height: "100vh",
      overflow: "hidden"
    },
    content: {
      display: "flex",
      flexGrow: 1,
      overflow: "auto",
      overflow: "hidden"
    },
    icon: {
      fontSize: 20
    },
    snackCustomIcon: {
      marginRight: theme.spacing.unit
    },
    snackMessage: {
      display: "flex",
      alignItems: "center"
    }
  };
};

let componente = App;
componente = withStyles(styles)(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

import React from "react";

//Styles
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import "./style.css";

//Router
import { withRouter } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";

//REDUX
import { connect } from "react-redux";
import { ocultarAlerta } from "@Redux/Actions/alerta";

//Componentes
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { IconButton, Icon } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

//Mis componentes
import Login from "./Login/index";
import NuevoUsuario from "./NuevoUsuario";
import Pagina404 from "@UI/_Pagina404";
import ProcesarRecuperarPassword from "@UI/ProcesarRecuperarPassword";
import ProcesarActivacionUsuario from "@UI/ProcesarActivacionUsuario";

const mapStateToProps = state => {
  return {
    alertas: state.Alerta.alertas
  };
};

const mapDispatchToProps = dispatch => ({
  onAlertaClose: id => {
    dispatch(ocultarAlerta(id));
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

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

    return (
      <main className={classes.content}>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className={"switch-wrapper"}
        >
          <Route path="/Login/:codigo" component={Login} />
          <Route path="/NuevoUsuario/:codigo" component={NuevoUsuario} />
          <Route
            path="/ProcesarRecuperarPassword"
            component={ProcesarRecuperarPassword}
          />
          <Route
            path="/ProcesarActivacionUsuario"
            component={ProcesarActivacionUsuario}
          />
          <Route component={Pagina404} />
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

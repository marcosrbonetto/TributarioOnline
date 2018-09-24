import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";

//REDUX
import { connect } from "react-redux";
import { login } from "@Redux/Actions/usuario";
import {
  mostrarAlerta,
  mostrarAlertaNaranja,
  mostrarAlertaRoja,
  mostrarAlertaVerde
} from "@Redux/Actions/alerta";
import { mostrarCargando } from "@Redux/Actions/mainContent";

//Mis componentes
import MiCard from "@Componentes/MiCard";
import MiContent from "@Componentes/MiContent";
import ContentDialogo from "./ContentDialogoComponente";

const mapStateToProps = state => {
  return {
    cargando: state.MainContent.cargando
  };
};

const mapDispatchToProps = dispatch => ({
  onBotonLoginClick: () => {
    dispatch(login({ nombre: "fede" }));
  },
  mostrarAlerta: props => {
    dispatch(
      mostrarAlerta({
        texto: "Alerta default",
        icono: props.icono,
        mostrarIconoCerrar: props.mostrarIconoCerrar
      })
    );
  },
  mostrarAlertaVerde: props => {
    dispatch(
      mostrarAlertaVerde({
        texto: "Alerta verde",
        icono: props.icono,
        mostrarIconoCerrar: props.mostrarIconoCerrar
      })
    );
  },
  mostrarAlertaNaranja: props => {
    dispatch(
      mostrarAlertaNaranja({
        texto: "Alerta naranja",
        icono: props.icono,
        mostrarIconoCerrar: props.mostrarIconoCerrar
      })
    );
  },
  mostrarAlertaRoja: props => {
    dispatch(
      mostrarAlertaRoja({
        texto: "Alerta roja",
        icono: props.icono,
        mostrarIconoCerrar: props.mostrarIconoCerrar
      })
    );
  },
  mostrarCargando: cargando => {
    dispatch(mostrarCargando(cargando));
  }
});

class TestComponentes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      botonesConIcono: false,
      alertasConIcono: false,
      alertasCustomIcon: undefined,
      dialogo1: false
    };
  }

  onCheckBotonesConIconoChange = () => {
    this.setState({ botonesConIcono: !this.state.botonesConIcono });
  };

  onCheckAlertasConIconoChange = () => {
    this.setState({ alertasConIcono: !this.state.alertasConIcono });
  };

  onCheckAlertasCustomIconChange = () => {
    this.setState({ alertasCustomIcon: !this.state.alertasCustomIcon });
  };

  onBotonAlertaDefaultClick = () => {
    let icono = this.state.alertasCustomIcon === true ? "info" : undefined;
    this.props.mostrarAlerta({
      mostrarIconoCerrar: this.state.alertasConIcono,
      icono: icono
    });
  };

  onBotonAlertaVerdeClick = () => {
    let icono = this.state.alertasCustomIcon === true ? "check" : undefined;

    this.props.mostrarAlertaVerde({
      mostrarIconoCerrar: this.state.alertasConIcono,
      icono: icono
    });
  };

  onBotonAlertaNaranjaClick = () => {
    let icono = this.state.alertasCustomIcon === true ? "warning" : undefined;

    this.props.mostrarAlertaNaranja({
      mostrarIconoCerrar: this.state.alertasConIcono,
      icono: icono
    });
  };

  onBotonAlertaRojaClick = () => {
    let icono = this.state.alertasCustomIcon === true ? "error" : undefined;

    this.props.mostrarAlertaRoja({
      mostrarIconoCerrar: this.state.alertasConIcono,
      icono: icono
    });
  };

  onBotonCargandoClick = () => {
    this.props.mostrarCargando(!this.props.cargando);

    setTimeout(() => {
      this.props.mostrarCargando(false);
    }, 2000);
  };

  onBotonDialogoClick = () => {
    this.setState({ dialogo1: true });
  };

  cerrarDialogo1 = () => {
    this.setState({ dialogo1: false });
  };

  render() {
    return (
      <MiContent>
        {this.renderBotones()}
        {this.renderAlertas()}
        {this.renderUtils()}
        {this.renderDialogos()}
      </MiContent>
    );
  }

  renderBotones() {
    const { classes } = this.props;

    return (
      <MiCard margin titulo="Botones">
        <Grid container>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              {this.state.botonesConIcono && (
                <Icon className={classes.iconoIzquierda}>add</Icon>
              )}
              contained
            </Button>
            <Button variant="fab" color="secondary" className={classes.button}>
              <Icon>add</Icon>
            </Button>
            <Button
              variant="extendedFab"
              color="secondary"
              className={classes.button}
            >
              {this.state.botonesConIcono && (
                <Icon className={classes.iconoIzquierda}>add</Icon>
              )}
              extendedFab
            </Button>
            <Button variant="flat" color="secondary" className={classes.button}>
              {this.state.botonesConIcono && (
                <Icon className={classes.iconoIzquierda}>add</Icon>
              )}
              flat
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
            >
              {this.state.botonesConIcono && (
                <Icon className={classes.iconoIzquierda}>add</Icon>
              )}
              outlined
            </Button>
            <Button
              variant="raised"
              className={classes.button}
              color="secondary"
            >
              {this.state.botonesConIcono && (
                <Icon className={classes.iconoIzquierda}>add</Icon>
              )}
              raised
            </Button>
            <Button variant="text" className={classes.button} color="secondary">
              {this.state.botonesConIcono && (
                <Icon className={classes.iconoIzquierda}>add</Icon>
              )}
              text
            </Button>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  color="secondary"
                  checked={this.state.botonesConIcono}
                  onChange={this.onCheckBotonesConIconoChange}
                  value="Icono"
                />
              }
              label="Botones con icono"
            />
          </Grid>
        </Grid>
      </MiCard>
    );
  }

  renderAlertas() {
    const { classes } = this.props;

    return (
      <MiCard margin titulo="Alertas">
        <Grid container>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              style={{ backgroundColor: grey["800"] }}
              className={classes.button}
              onClick={this.onBotonAlertaDefaultClick}
            >
              Normal
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ backgroundColor: green["500"] }}
              onClick={this.onBotonAlertaVerdeClick}
              className={classes.button}
            >
              Verde
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ backgroundColor: orange["500"] }}
              className={classes.button}
              onClick={this.onBotonAlertaNaranjaClick}
            >
              Naranja
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ backgroundColor: red["500"] }}
              className={classes.button}
              onClick={this.onBotonAlertaRojaClick}
            >
              Rojo
            </Button>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  color="secondary"
                  checked={this.state.alertasConIcono}
                  onChange={this.onCheckAlertasConIconoChange}
                  value="alertaIcono"
                />
              }
              label="Con icono cerrar"
            />
            <FormControlLabel
              control={
                <Switch
                  color="secondary"
                  checked={this.state.alertasCustomIcon}
                  onChange={this.onCheckAlertasCustomIconChange}
                  value="alertaIconoCustom"
                />
              }
              label="Custom icon"
            />
          </Grid>
        </Grid>
      </MiCard>
    );
  }

  renderUtils() {
    const { classes } = this.props;
    return (
      <MiCard margin titulo="Utils">
        <Grid container>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.onBotonCargandoClick}
            >
              Mostrar cargando
            </Button>
          </Grid>
        </Grid>

        <Dialog
          fullScreen={this.props.fullScreen}
          open={this.state.dialogo1}
          onClose={this.cerrarDialogo1}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Dialogo de prueba</DialogTitle>
          <DialogContent>
            {/* <DialogContentText id="alert-dialog-description">
              Test test test test test test test test test test test test test
              test test test test test test test test test test test test test
              test test test test test test test test test test test test test
              test test test test test test test test test test test test test
              test test test test test test test test test test test test test
              test test test test
            </DialogContentText> */}
            <ContentDialogo onClose={this.cerrarDialogo1} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cerrarDialogo1} color="secondary">
              Cancelar
            </Button>
            <Button onClick={this.cerrarDialogo1} color="secondary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </MiCard>
    );
  }

  renderDialogos() {
    const { classes } = this.props;
    return (
      <MiCard margin titulo="Dialogos">
        <Grid container>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.onBotonDialogoClick}
            >
              Crear dialogo
            </Button>
          </Grid>
        </Grid>
      </MiCard>
    );
  }
}

const styles = theme => ({
  root: {
    flex: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  iconoIzquierda: {
    marginRight: theme.spacing.unit
  },
  iconoDerecha: {
    marginLeft: theme.spacing.unit
  }
});

let componente = TestComponentes;
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
componente = withStyles(styles)(componente);
componente = withMobileDialog()(componente);
export default componente;

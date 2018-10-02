import React from "react";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import { connect } from "react-redux";

//Redux
import { mostrarCargando } from '@Redux/Actions/mainContent'

//Componentes
import Typography from '@material-ui/core/Typography';
import MiCard from "@Componentes/MiCard";
import MiTabla from "@Componentes/MiTabla";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MiSolicPermisos from "@Componentes/MiSolicPermisos";

import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';


import { getTributosCUIT, getSolicitudesPermiso, cancelSolicitudPermisos } from "@ReduxSrc/Representantes/actions";

import services from './services.js';


const mapStateToProps = state => {
  return {
    datosEnvioSolicitudPermisos: state.Representantes.datosEnvioSolicitudPermisos,
    datosPedidoSolicitudPermisos: state.Representantes.datosPedidoSolicitudPermisos
  };
};

const mapDispatchToProps = dispatch => ({
  mostrarCargando: (cargar) => {
    dispatch(mostrarCargando(cargar));
  },
  getTributosCUIT: (datos) => {
    dispatch(getTributosCUIT(datos));
  },
  getSolicitudesPermiso: (datos) => {
    dispatch(getSolicitudesPermiso(datos));
  },
  cancelSolicitudPermisos: () => {
    dispatch(cancelSolicitudPermisos());
  }
});

class Representantes extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleaddPermiso = this.handleaddPermiso.bind(this);

    this.state = {
      inputCuit: '', //Input para la busqueda de representado
      envioSolicitud: {
        representado: '', //Representado ya que es a quien envío la solicitud
        cuitRepresentado: '', //CUIT del representado
        tributos: undefined //Tributos para el uso del envío de solicitud
      },
      recepcionSolicitud: [], //Array de solicitudes de representantes
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (JSON.stringify(this.props.datosEnvioSolicitudPermisos) != JSON.stringify(nextProps.datosEnvioSolicitudPermisos)) {
      this.setState({
        envioSolicitud: {
          representado: nextProps.datosEnvioSolicitudPermisos.representado,
          cuitRepresentado: nextProps.datosEnvioSolicitudPermisos.cuitRepresentado,
          tributos: nextProps.datosEnvioSolicitudPermisos.tributos
        }
      });
    }

    if (JSON.stringify(this.props.datosPedidoSolicitudPermisos) != JSON.stringify(nextProps.datosPedidoSolicitudPermisos)) {
      this.setState({
        recepcionSolicitud: nextProps.datosPedidoSolicitudPermisos
      });
    }
  }

  componentWillMount() {
    this.props.mostrarCargando(true);

    //Traemos los tributos asociados al CUIT
    services.getSolicitudesPermiso('20355266169', (datos) => {
      //Guardamos los datos en el store
      this.props.getSolicitudesPermiso(datos);
      //Finalizamos el cargando 
      this.props.mostrarCargando(false);
    });
  }

  buscarTributosCUIT = () => {
    this.props.mostrarCargando(true);

    this.setState({
      inputCuit: ''
    });

    //Traemos los tributos asociados al CUIT
    services.getTributosCUIT('20355266169', (datos) => {
      //Guardamos los datos en el store
      this.props.getTributosCUIT(datos);
      //Finalizamos el cargando 
      this.props.mostrarCargando(false);
    });
  }

  handleInputCuit = (event) => {
    this.setState({
      inputCuit: event.currentTarget.value
    });
  }

  handleaddPermiso = (tipo, cantidad) => {
    var newState = { ...this.state }
    newState.envioSolicitud.tributos[tipo].cantPermisos = cantidad;

    this.setState({ newState });
  }

  handleCancelarSolicitudPermisos = () => {

    this.props.cancelSolicitudPermisos();

    this.setState({
      inputCuit: '',
      envioSolicitud: {
        representado: '',
        cuitRepresentado: '',
        tributos: undefined
      }
    });
  }

  handleEnviarSolicitudPermisos = () => {

    //this.props.enviarSolicitudPermisos();

    this.setState({
      inputCuit: '',
      envioSolicitud: {
        representado: '',
        cuitRepresentado: '',
        tributos: undefined
      }
    });

  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mainContainer}>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={8}>
            <MiCard>
              <Typography className={classes.title} variant="title">Mis Representantes</Typography>
              {/*<Divider className={classes.divider} />*/}
              <MiTabla
                rowType={'Representantes'}
                columns={[
                  { id: 'usuario', type: 'string', numeric: false, disablePadding: true, label: 'Representante' },
                  { id: 'tributo', type: 'date', numeric: false, disablePadding: true, label: 'Permiso' },
                  { id: 'estado', type: 'string', numeric: false, disablePadding: true, label: 'Estado' },
                  { id: 'denegar', type: 'string', numeric: false, disablePadding: true, label: 'Denegar' },
                ]}
                rows={[]}
                orderBy={'usuario'}
                getImporteTotal={this.getImporteTotal}></MiTabla>
            </MiCard>
            <br />
            <MiCard>
              <Typography className={classes.title} variant="title">Mis Representados</Typography>
              {/*<Divider className={classes.divider} />*/}
              <MiTabla
                rowType={'Representados'}
                columns={[
                  { id: 'usuario', type: 'string', numeric: false, disablePadding: true, label: 'Representados' },
                  { id: 'tributo', type: 'date', numeric: false, disablePadding: true, label: 'Permiso' },
                  { id: 'estado', type: 'string', numeric: false, disablePadding: true, label: 'Estado' },
                  { id: 'denegar', type: 'string', numeric: false, disablePadding: true, label: 'Denegar' },
                ]}
                rows={[]}
                orderBy={'usuario'}
                getImporteTotal={this.getImporteTotal}></MiTabla>
            </MiCard>
          </Grid>

          <Grid item xs={4}>
            <MiCard>
              <Typography className={classes.title} variant="title">Solicitudes de representantes</Typography>
              <Divider className={classes.divider} />

              {[0, 1, 2, 3, 4].length == 0 &&
                <Typography className={classes.infoTexto}>
                  {`
                No tiene solicitudes pendientes.
              `}
                </Typography>}
              <List className={classes.listaSolicitudes} subheader={<li />}>
                {this.state.recepcionSolicitud && this.state.recepcionSolicitud.map((repr, index1) => (
                  <li key={`section-${index1}`} className={classes.containerLista}>
                    <ul className={classes.ulLista}>
                      <ListSubheader className={classes.labelItemTributo}>
                        {repr.representante}
                        <Button size="small" variant="outlined" color="secondary" className={classNames(classes.button, classes.botonCancelacionSolicitud)}>x</Button>
                        <Button size="small" variant="outlined" color="secondary" className={classNames(classes.button, classes.botonAceptacionSolicitud)}>Aceptar</Button>
                      </ListSubheader>
                      {repr.tributos && Object.keys(repr.tributos).map((tributo, index2) => (
                        <div>
                          <ListItem key={`item-${tributo}-${index2}`} className={classes.itemsTributo}>
                            <ListItemText primary={repr.tributos[tributo].label} />
                          </ListItem>
                          <div className={classes.subItemsTributo}>
                            {repr.tributos[tributo] && repr.tributos[tributo].opciones.map((item, index3) => (
                              <ListItem key={`item-${tributo}-${index2}-${index3}`}>
                                <ListItemText primary={`- ${item}`} />
                              </ListItem>
                            ))}
                          </div>
                        </div>
                      ))}
                    </ul>
                  </li>
                ))}
              </List>

            </MiCard>
            <br />
            <MiCard>
              <Typography className={classes.title} variant="title">Enviar solicitud de permisos</Typography>
              <Divider className={classes.divider} />
              <Typography className={classes.infoTexto}>
                {`
                Debe seleccione por cada tributo los identificadores en los que desee operar
              `}
              </Typography>

              {!this.state.envioSolicitud.representado && !this.state.envioSolicitud.cuitRepresentado &&
                <Grid container spacing={0}>
                  <Grid item md={9}>
                    <TextField
                      id="input-cuit"
                      label="Ingresar CUIT"
                      className={classes.textField}
                      margin="normal"
                      value={this.state.inputCuit}
                      onChange={this.handleInputCuit}
                    />
                  </Grid>
                  <Grid item md={3} className={classes.containerButton}>
                    <Button
                      type="enter"
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={this.buscarTributosCUIT}
                    >
                      Buscar</Button>
                  </Grid>
                </Grid>}


              {this.state.envioSolicitud.representado && this.state.envioSolicitud.cuitRepresentado &&
                <div><Grid container spacing={0} className={classes.textRepresentante}>
                  <Grid item md={6}>
                    <Typography variant="subheading" gutterBottom>Representado:</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <b>
                      <Typography className={classes.cuitData} variant="subheading">{this.state.envioSolicitud.representado}</Typography>
                      <Typography className={classes.cuitData} variant="subheading">{this.state.envioSolicitud.cuitRepresentado}</Typography>
                    </b>
                  </Grid>
                </Grid>
                  <Divider className={classes.divider} />

                  {this.state.envioSolicitud.tributos && Object.keys(this.state.envioSolicitud.tributos).map(tributo => {
                    return <MiSolicPermisos
                      label={this.state.envioSolicitud.tributos[tributo].label}
                      tipo={this.state.envioSolicitud.tributos[tributo].tipo}
                      opciones={this.state.envioSolicitud.tributos[tributo].opciones}
                      addPermiso={this.handleaddPermiso}
                      cantPermisos={this.state.envioSolicitud.tributos[tributo].cantPermisos}
                    />
                  })}
                  <ExpansionPanelActions className={classes.actionButtons}>
                    <Button size="small" onClick={this.handleCancelarSolicitudPermisos}>Cancelar</Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={this.handleEnviarSolicitudPermisos}>
                      Enviar Solicitud
                  </Button>
                  </ExpansionPanelActions>
                </div>}
            </MiCard>
          </Grid>
        </Grid>
      </div>
    );
  }
}

let componente = Representantes;
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(componente));
componente = withRouter(componente);
export default componente;
import React from "react";
import { withRouter } from "react-router-dom";
import { push } from "connected-react-router";

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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import MiLinkDialog from "@Componentes/MiLinkDialog";

import {
  getTributosCUIT,
  getMisRepresentados,
  getMisRepresentantes,
  cambiarEstadoPermiso,
  agregarRegistroGrilla
} from "@ReduxSrc/Representantes/actions";

import servicesRepresentantes from '@Rules/Rules_Representantes';
import servicesTributarioOnline from '@Rules/Rules_TributarioOnline';

import { getIdTipoTributo } from "@Utils/functions"


const mapStateToProps = state => {

  return {
    loggedUser: state.MainContent.loggedUser,
    datosEnvioSolicitudPermisos: state.Representantes.datosEnvioSolicitudPermisos,
    datosPedidoSolicitudPermisos: state.Representantes.datosPedidoSolicitudPermisos,
    datosMisRepresentantes: state.Representantes.datosMisRepresentantes,
    datosMisRepresentados: state.Representantes.datosMisRepresentados,
  };
};

const mapDispatchToProps = dispatch => ({
  redireccionar: url => {
    dispatch(push(url));
  },
  mostrarCargando: (cargar) => {
    dispatch(mostrarCargando(cargar));
  },
  setPropsTributosCUIT: (datos) => {
    dispatch(getTributosCUIT(datos));
  },
  setPropsMisRepresentados: (datos) => {
    dispatch(getMisRepresentados(datos));
  },
  setPropsMisRepresentantes: (datos) => {
    dispatch(getMisRepresentantes(datos));
  },
  setPropsCambiarEstadoPermiso: (datos) => {
    dispatch(cambiarEstadoPermiso(datos));
  },
  setPropsAgregarRegistroGrilla: (datos) => {
    dispatch(agregarRegistroGrilla(datos));
  }
});

class Representantes extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      inputCuit: '', //Input para la busqueda de representado
      selectTributos: '1',
      inputIdentificadorTributo: '',
      errorInputCuit: false,
      envioSolicitud: {
        representado: null, //Representado ya que es a quien envío la solicitud
        cuitRepresentado: null, //CUIT del representado
        tributos: undefined, //Tributos para el uso del envío de solicitud
        mensajeError: null
      },
      busquedaTitular: {
        titular: null,
        cuitTitular: null,
        tipoTributo: null,
        identificador: null,
        mensajeError: null
      },
      datosGrillaMisRepresentantes: [],
      datosGrillaMisRepresentados: []
    };
  }

  componentWillReceiveProps(nextProps) {

    if (JSON.stringify(this.props.datosEnvioSolicitudPermisos) != JSON.stringify(nextProps.datosEnvioSolicitudPermisos)) {
      this.setState({
        envioSolicitud: {
          representado: nextProps.datosEnvioSolicitudPermisos.representado,
          cuitRepresentado: nextProps.datosEnvioSolicitudPermisos.cuitRepresentado,
          tributos: nextProps.datosEnvioSolicitudPermisos.tributos
        }
      });
    }

    if (JSON.stringify(this.props.datosMisRepresentantes) != JSON.stringify(nextProps.datosMisRepresentantes)) {

      var datosMisRepresentantes = (nextProps.datosMisRepresentantes || []).map((row, key) => {
        row.id = key;
        row.data.grilla = 'MisRepresentantes';
        return row;
      });

      this.setState({
        datosGrillaMisRepresentantes: datosMisRepresentantes
      });
    }

    if (JSON.stringify(this.props.datosMisRepresentados) != JSON.stringify(nextProps.datosMisRepresentados)) {

      var datosMisRepresentados = (nextProps.datosMisRepresentados || []).map((row, key) => {
        row.id = key;
        row.data.grilla = 'MisRepresentados';
        return row;
      });

      this.setState({
        datosGrillaMisRepresentados: datosMisRepresentados
      });
    }
  }

  componentDidMount() {
    const idTipoTributo = getIdTipoTributo(this.props.match.params.tributo);
    idTipoTributo && this.setState({
      selectTributos: idTipoTributo.toString()
    });
  }

  componentWillMount() {
    //Servicios que setean los datos en las props del store de redux
    this.props.mostrarCargando(true);
    const token = this.props.loggedUser.token;

    const service1 = servicesRepresentantes.getMisRepresentantes(token)
      .then((datos) => {
        if(!datos.ok) {this.props.mostrarCargando(false); return false;}
        this.props.setPropsMisRepresentantes(datos);
      }).catch(err => {
        console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
      });

    const service2 = servicesRepresentantes.getMisRepresentados(token)
      .then((datos) => {
        if(!datos.ok) {this.props.mostrarCargando(false); return false;}
        this.props.setPropsMisRepresentados(datos);
      }).catch(err => {
        console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
      });

    Promise.all([service1, service2]).then(() => {
      this.props.mostrarCargando(false);
    });
  }

  buscarTributosCUIT = () => {

    if (!/^[0-9]{11}$/.test(this.state.inputCuit)) {
      this.setState({
        errorInputCuit: true
      });
      return;
    }

    //Servicios que setean los datos en las props del store de redux
    this.props.mostrarCargando(true);
    const token = this.props.loggedUser.token;
    const identificador = this.state.inputCuit;

    const service = servicesTributarioOnline.getTributosByCUIT(token, identificador)
      .then((datos) => {
        
        this.handleCancelarSolicitudPermiso();
        if(datos.ok && datos.return.titular) {
          this.props.setPropsTributosCUIT(datos);

          this.setState({
            inputCuit: '',
            errorInputCuit: false
          });
        } else {
          this.setState({
            inputCuit: '',
            errorInputCuit: false,
            envioSolicitud: {
              ...this.state.envioSolicitud,
              mensajeError: 'No se encontraron registros'
            },
          });
        };

        this.props.mostrarCargando(false);
      }).catch(err => {
        console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
      });
  }

  handleInputCuit = (event) => {

    if (event.currentTarget.value.length <= 11 && /^[0-9]{0,11}$/.test(event.currentTarget.value)) {
      this.setState({
        inputCuit: event.currentTarget.value
      });
    }
  }

  handleAddPermiso = (tipo, cantidad) => {
    var newState = { ...this.state };
    newState.envioSolicitud.tributos[tipo].cantPermisos = cantidad;
    this.setState({ newState });
  }

  handleCancelarSolicitudPermiso = () => {

    this.setState({
      inputCuit: '',
      selectTributos: '1',
      inputIdentificadorTributo: '',
      envioSolicitud: {
        representado: null,
        cuitRepresentado: null,
        tributos: undefined,
        mensajeError: null
      },
      busquedaTitular: {
        titular: null,
        cuitTitular: null,
        tipoTributo: null,
        identificador: null,
        mensajeError: null
      }
    });
  }

  handleAceptarSolicitudPermiso = () => {

    //Servicios que setean los datos en las props del store de redux
    this.props.mostrarCargando(true);

    const tributos = this.state.envioSolicitud.tributos;
    let services = [];
    Object.keys(tributos).length > 0 &&
      Object.keys(tributos).map((tributo, index) => {

        if (tributos[tributo].opciones.length > 0) {
          tributos[tributo].opciones.map((identificador, index) => {

            const service = this.servicioAgregarSolicitudPermiso({
              tipoTributo: tributos[tributo].tipoTributo,
              identificador: identificador
            }, (datos) => {
              if(!datos.ok) {this.props.mostrarCargando(false); return false;}
              
              this.props.setPropsAgregarRegistroGrilla({
                cuilRepresentado: datos.return.cuilRepresentado,
                identificador: datos.return.identificador,
                aceptado: datos.return.aceptado,
                tipoTributo:datos.return.tipoTributo
              });
            });

            services.push(service);
          });
        }
      });

    Promise.all(services).then(() => {
      this.handleCancelarSolicitudPermiso();

      this.props.mostrarCargando(false);
    }).catch(err => {
      console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
    });
  }

  servicioAgregarSolicitudPermiso = (param, callback) => {
    const token = this.props.loggedUser.token;

    return servicesRepresentantes.agregarSolicitudPermiso(token, {
      "tipoTributo": param.tipoTributo,
      "identificador": param.identificador
    })
      .then((datos) => {
        if(!datos.ok) {this.props.mostrarCargando(false); return false;}
        if(typeof callback === "function")
          callback(datos);
      }).catch(err => {
        console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
      });
  }

  handleCancelarPermiso = (datosFila) => {

    //Servicios que setean los datosFila en las props del store de redux
    this.props.mostrarCargando(true);
    const token = this.props.loggedUser.token;

    let cuil = "cuilRepresentado";
    let datosGrilla = this.props.datosMisRepresentados;
    if (datosFila.data.grilla == 'MisRepresentantes') {
      cuil = "cuilRepresentante";
      datosGrilla = this.props.datosMisRepresentantes;
    }


    const service = servicesRepresentantes.cancelarPermiso(token, {
      [cuil]: datosFila.usuario,
      "tipoTributo": datosFila.data.tipoTributo,
      "identificador": datosFila.data.identificador
    })
      .then((datos) => {
        if(!datos.ok) {this.props.mostrarCargando(false); return false;}

        this.props.setPropsCambiarEstadoPermiso({
          grilla: datosFila.data.grilla,
          datosGrilla: datosGrilla,
          datosFila: datosFila
        });

        this.props.mostrarCargando(false);
      }).catch(err => {
        console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
      });
  }

  handleAceptarPermiso = (datosFila) => {

    //Servicios que setean los datos en las props del store de redux
    this.props.mostrarCargando(true);
    const token = this.props.loggedUser.token;

    let cuil = "cuilRepresentado";
    let datosGrilla = this.props.datosMisRepresentados;
    if (datosFila.data.grilla == 'MisRepresentantes') {
      cuil = "cuilRepresentante";
      datosGrilla = this.props.datosMisRepresentantes;
    }

    const service = servicesRepresentantes.aceptarPermiso(token, {
      [cuil]: datosFila.usuario,
      "tipoTributo": datosFila.data.tipoTributo,
      "identificador": datosFila.data.identificador
    })
      .then((datos) => {
        if(!datos.ok) {this.props.mostrarCargando(false); return false;}

        this.props.setPropsCambiarEstadoPermiso({
          grilla: datosFila.data.grilla,
          datosGrilla: datosGrilla,
          datosFila: datosFila
        });

        this.props.mostrarCargando(false);
      }).catch(err => {
        console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
      });
  }

  //Link "Detalle" que se mostrará en la grilla y se pasara al componente MiTabla
  getCustomCell = (datosExtra) => {
    const { classes } = this.props;

    return (datosExtra.data.aceptado && <div className={classes.iconEliminarPermiso}>
      <MiLinkDialog
        textoLink={'Cancelar Permiso'}
        titulo={'Cancelar Permiso'}
        buttonOptions={true}
        buttonAction={true}
        labelCancel={'No'}
        labelAccept={'Si'}
        acceptEvent={this.handleCancelarPermiso}
        acceptEventData={datosExtra}
      >
        <div key='buttonAction'>
          <i class="material-icons" title="Cancelar Permiso">
            cancel
        </i>
        </div>
        <div key='mainContent'>
          ¿Está seguro que desea eliminar el permiso para este tributo?
      </div>
      </MiLinkDialog>
    </div>) || <div className={classes.iconAgregarPermiso}>
        <MiLinkDialog
          textoLink={'Aceptar Permiso'}
          titulo={'Aceptar Permiso'}
          buttonOptions={true}
          buttonAction={true}
          labelCancel={'No'}
          labelAccept={'Si'}
          acceptEvent={this.handleAceptarPermiso}
          acceptEventData={datosExtra}
        >
          <div key='buttonAction'>
            <i class="material-icons" title="Aceptar Permiso">
              check_circle
        </i>
          </div>
          <div key='mainContent'>
            ¿Está seguro que desea aceptar el permiso para este tributo?
      </div>
        </MiLinkDialog>
      </div>;
  }

  buscarTributosIdentificador = () => {
    //Servicios que setean los datos en las props del store de redux
    this.props.mostrarCargando(true);
    const token = this.props.loggedUser.token;

    const service = servicesRepresentantes.getTitularTributo(token, {
      "tipoTributo": this.state.selectTributos,
      "identificador": this.state.inputIdentificadorTributo
    })
      .then((datos) => {

        if(datos.ok) {
          this.setState({
            busquedaTitular: {
              titular: datos.return.titular,
              cuitTitular: datos.return.cuit,
              tipoTributo: this.state.selectTributos,
              identificador: this.state.inputIdentificadorTributo
            }
          });
        } else {
          this.handleCancelarSolicitudPermiso();
          
          this.setState({
            busquedaTitular: {
              ...this.state.busquedaTitular,
              mensajeError: 'No se encontraron registros'
            }
          });
        };

        this.props.mostrarCargando(false);
      }).catch(err => {
        console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
      });
  }

  handleAceptarSolicitudPermisoTitular = () => {
    this.props.mostrarCargando(true);

    this.servicioAgregarSolicitudPermiso({
      tipoTributo: this.state.selectTributos,
      identificador: this.state.inputIdentificadorTributo
    }, (datos) => {
      if(!datos.ok) {this.props.mostrarCargando(false); return false;}
      
      this.props.setPropsAgregarRegistroGrilla({
        cuilRepresentado: datos.return.cuilRepresentado,
        identificador: datos.return.identificador,
        aceptado: datos.return.aceptado,
        tipoTributo:datos.return.tipoTributo
      });
      this.handleCancelarSolicitudPermiso();

      //Redireccionamos solo si "agregamos" desde la pantalla Inicio
      this.props.match.params.tributo && this.props.redireccionar('/Inicio');

      this.props.mostrarCargando(false);
    });
  }

  handleSelectTipoTributo = (event) => {
    this.setState({
      selectTributos: event.target.value
    });
  }

  handleInputIdentificador = (event) => {
    this.setState({
      inputIdentificadorTributo: event.target.value
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
                  { id: 'usuario', type: 'string', numeric: false, label: 'Representante' },
                  { id: 'tributo', type: 'date', numeric: false, label: 'Permiso' },
                  { id: 'estado', type: 'string', numeric: false, label: 'Estado' },
                  { id: 'eliminarPermiso', type: 'customCell', numeric: false, label: '' },
                ]}
                rows={this.state.datosGrillaMisRepresentantes || []}
                orderBy={'usuario'}
                customCell={this.getCustomCell}
                check={false}
                rowsPerPage={5}
              />
            </MiCard>
            <br />
            <MiCard>
              <Typography className={classes.title} variant="title">Mis Representados</Typography>
              {/*<Divider className={classes.divider} />*/}

              <MiTabla
                rowType={'Representados'}
                columns={[
                  { id: 'usuario', type: 'string', numeric: false, label: 'Representados' },
                  { id: 'tributo', type: 'date', numeric: false, label: 'Permiso' },
                  { id: 'estado', type: 'string', numeric: false, label: 'Estado' },
                  { id: 'eliminarPermiso', type: 'customCell', numeric: false, label: '' },
                ]}
                rows={this.state.datosGrillaMisRepresentados || []}
                orderBy={'usuario'}
                customCell={this.getCustomCell}
                check={false}
                rowsPerPage={5}
              />
            </MiCard>
          </Grid>

          <Grid item xs={4}>
            {/*<MiCard>
              <Typography className={classes.title} variant="title">Solicitudes de representantes</Typography>
              <Divider className={classes.divider} />

              {this.props.datosPedidoSolicitudPermisos && this.props.datosPedidoSolicitudPermisos.length == 0 &&
                <Typography className={classes.infoTexto}>
                  {`
                No tiene solicitudes pendientes.
              `}
                </Typography>}
              <List className={classes.listaSolicitudes} subheader={<li />}>
                {this.props.datosPedidoSolicitudPermisos && this.props.datosPedidoSolicitudPermisos.map((repr, index1) => (
                  <li key={`section-${index1}`} className={classes.containerLista}>
                    <ul className={classes.ulLista}>
                      <ListSubheader className={classes.labelItemTributo}>
                        {repr.representante}
                        <Button size="small" variant="outlined" color="secondary" className={classNames(classes.button, classes.botonCancelacionSolicitud)}>x</Button>
                        <Button size="small" variant="outlined" color="secondary" className={classNames(classes.button, classes.botonAceptacionSolicitud)}>Aceptar</Button>
                      </ListSubheader>
                      {repr.tributos && Object.keys(repr.tributos).map((tributo, index2) => (
                        <div key={index2}>
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

              </MiCard>*/}
            <MiCard>
              <Typography className={classes.title} variant="title">Agregar solicitud por Tributo</Typography>
              <Divider className={classes.divider} />
              <Typography className={classes.infoTexto}>
                {`
                Debe ingresar el tipo de tributo y el identificador que desee operar
              `}
              </Typography>

              <InputLabel className={classes.labelInput}>Tipo Tributo:</InputLabel>
              <Select
                value={this.state.selectTributos}
                onChange={this.selectOnChangeTipoTributo}
                inputProps={{
                  name: 'tipo_tributo',
                  id: 'tipo_tributo',
                }}
                className={classes.selectTipoTributo}
              >
                <MenuItem value="1">
                  <em>Automotores</em>
                </MenuItem>
                <MenuItem value="2">
                  <em>Inmuebles</em>
                </MenuItem>
                <MenuItem value="3">
                  <em>Comercios</em>
                </MenuItem>
                <MenuItem value="4">
                  <em>Cementerio</em>
                </MenuItem>
              </Select>

              <Grid container spacing={0}>
                <Grid item md={9}>
                  <TextField
                    id="input-identificador"
                    label="Ingresar Identificador"
                    className={classes.textField}
                    margin="normal"
                    value={this.state.inputIdentificadorTributo}
                    onChange={this.handleInputIdentificador}
                    autoFocus={true}
                  />
                </Grid>
                <Grid item md={3} className={classes.containerButton}>
                  <Button
                    type="enter"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={this.buscarTributosIdentificador}
                  >
                    Buscar</Button>
                </Grid>
              </Grid>

              {this.state.busquedaTitular.titular && this.state.busquedaTitular.cuitTitular &&
                <div><Grid container spacing={0} className={classes.textRepresentante}>
                  <Grid item md={6}>
                    <Typography variant="subheading" gutterBottom>Titular:</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <b>
                      <Typography className={classes.cuitData} variant="subheading">{this.state.busquedaTitular.titular}</Typography>
                      <Typography className={classes.cuitData} variant="subheading">{this.state.busquedaTitular.cuitTitular}</Typography>
                    </b>
                  </Grid>
                </Grid>
                  <Divider className={classes.divider} />

                  <ExpansionPanelActions className={classes.actionButtons}>
                    <Button size="small" onClick={this.handleCancelarSolicitudPermiso}>Cancelar</Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={this.handleAceptarSolicitudPermisoTitular}>
                      Agregar Permiso
                  </Button>
                  </ExpansionPanelActions>
                </div>}

              {this.state.busquedaTitular.mensajeError && <div>
                <Typography className={classes.mensajeError} variant="subheading">{this.state.busquedaTitular.mensajeError}</Typography>
              </div>}

            </MiCard>
            <br />
            <MiCard>
              <Typography className={classes.title} variant="title">Agregar solicitud por CUIT</Typography>
              <Divider className={classes.divider} />
              <Typography className={classes.infoTexto}>
                {`
                Debe seleccionar por cada tributo los identificadores en los que desee operar
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
                      error={this.state.errorInputCuit}
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
                      addPermiso={this.handleAddPermiso}
                      cantPermisos={this.state.envioSolicitud.tributos[tributo].cantPermisos}
                    />
                  })}
                  <ExpansionPanelActions className={classes.actionButtons}>
                    <Button size="small" onClick={this.handleCancelarSolicitudPermiso}>Cancelar</Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={this.handleAceptarSolicitudPermiso}>
                      Agregar Permiso
                  </Button>
                  </ExpansionPanelActions>
                </div>}

                {this.state.envioSolicitud.mensajeError && <div>
                  <Typography className={classes.mensajeError} variant="subheading">{this.state.envioSolicitud.mensajeError}</Typography>
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
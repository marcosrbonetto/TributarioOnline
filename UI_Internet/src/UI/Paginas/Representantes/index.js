import React from "react";
import { withRouter } from "react-router-dom";
import { push } from "connected-react-router";

//Alert
import { mostrarAlerta } from "@Utils/functions";

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
      inputCuit: '', //Input de busqueda por CUIT
      selectTributos: '1', //Select de busqueda por Tributo
      inputIdentificadorTributo: '', //Input de busqueda por Tributo
      errorInputIdentificador: false, //Error en busqueda por Tributo
      errorInputCuit: false, //Error en busqueda por CUIT
      busquedaCUIT: { //Busqueda por CUIT
        representado: null,
        cuitRepresentado: null,
        tributos: undefined,
        mensajeError: null
      },
      busquedaTributo: { //Busqueda por Tributo
        titular: null,
        cuitTitular: null,
        tipoTributo: null,
        identificador: null,
        mensajeError: null
      },
      datosGrillaMisRepresentantes: [], //Datos grilla mir representantes
      datosGrillaMisRepresentados: [] //Datos grilla mir representados
    };
  }

  //Obtenemos las props desde redux(async) y actualizamos nuestro state
  //Tributos de CUIT buscado
  componentWillReceiveProps(nextProps) {

    if (JSON.stringify(this.props.datosEnvioSolicitudPermisos) != JSON.stringify(nextProps.datosEnvioSolicitudPermisos)) {
      this.setState({
        busquedaCUIT: {
          representado: nextProps.datosEnvioSolicitudPermisos.representado,
          cuitRepresentado: nextProps.datosEnvioSolicitudPermisos.cuitRepresentado,
          tributos: nextProps.datosEnvioSolicitudPermisos.tributos
        }
      });
    }

    //Obtenemos las props desde redux(async) y actualizamos nuestro state
    //Datos de mir representantes - agregamos datos adicionales
    if (this.state.datosGrillaMisRepresentantes.length == 0 || JSON.stringify(this.props.datosMisRepresentantes) != JSON.stringify(nextProps.datosMisRepresentantes)) {

      var datosMisRepresentantes = (nextProps.datosMisRepresentantes || []).map((row, key) => {
        row.id = key;
        row.data.grilla = 'MisRepresentantes';
        return row;
      });

      this.setState({
        datosGrillaMisRepresentantes: datosMisRepresentantes
      });
    }

    //Obtenemos las props desde redux(async) y actualizamos nuestro state
    //Datos de mir representados - agregamos datos adicionales
    if (this.state.datosGrillaMisRepresentados.length == 0 || JSON.stringify(this.props.datosMisRepresentados) != JSON.stringify(nextProps.datosMisRepresentados)) {

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

  //En caso que se precione "+ Agregar" desde Menu, se setea el combo en el tributo seleccionado
  componentDidMount() {
    const idTipoTributo = getIdTipoTributo(this.props.match.params.tributo);
    idTipoTributo && this.setState({
      selectTributos: idTipoTributo.toString()
    });
  }

  //Servicios que setean los datos en las props del store de redux
  componentWillMount() {

    this.props.mostrarCargando(true);
    const token = this.props.loggedUser.token;

    const service1 = servicesRepresentantes.getMisRepresentantes(token)
      .then((datos) => {
        if (!datos.ok) { mostrarAlerta(datos.error); this.props.mostrarCargando(false); return false; }
        this.props.setPropsMisRepresentantes(datos);
      }).catch(err => {
        console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
      });

    const service2 = servicesRepresentantes.getMisRepresentados(token)
      .then((datos) => {
        if (!datos.ok) { mostrarAlerta(datos.error); this.props.mostrarCargando(false); return false; }
        this.props.setPropsMisRepresentados(datos);
      }).catch(err => {
        console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
      });

    Promise.all([service1, service2]).then(() => {
      this.props.mostrarCargando(false);
    });
  }

  //Servicios que setean los datos en las props del store de redux
  //Busqueda de tributos por CUIT
  buscarTributosCUIT = () => {

    if (!/^[0-9]{11}$/.test(this.state.inputCuit)) {
      this.setState({
        errorInputCuit: true
      });
      return;
    }

    this.props.mostrarCargando(true);
    const token = this.props.loggedUser.token;
    const identificador = this.state.inputCuit;

    const service = servicesTributarioOnline.getTributosByCUIT(token, identificador)
      .then((datos) => {
        if (!datos.ok) { mostrarAlerta(datos.error); this.props.mostrarCargando(false); return false; }
        
        this.handleCancelarSolicitudPermiso();
        if (datos.ok && datos.return.titular) {
          this.props.setPropsTributosCUIT(datos);

          this.setState({
            inputCuit: '',
            errorInputCuit: false
          });
        } else {
          this.setState({
            inputCuit: '',
            errorInputCuit: false,
            busquedaCUIT: {
              ...this.state.busquedaCUIT,
              mensajeError: 'No se encontraron registros'
            },
          });
        };

        this.props.mostrarCargando(false);
      }).catch(err => {
        console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
      });
  }

  //Validación input CUIT
  handleInputCuit = (event) => {

    if (event.currentTarget.value.length <= 11 && /^[0-9]{0,11}$/.test(event.currentTarget.value)) {
      this.setState({
        inputCuit: event.currentTarget.value
      });
    }
  }

  //Agregamos permisos antes de aceptarlos
  handleAddPermiso = (tipo, cantidad) => {

    var newState = { ...this.state };
    newState.busquedaCUIT.tributos[tipo].cantPermisos = cantidad;
    this.setState({ newState });
  }

  //Limpiamos estado luego de cancelar o aceptar permisos exitosamente
  handleCancelarSolicitudPermiso = () => {

    this.setState({
      inputCuit: '',
      selectTributos: '1',
      inputIdentificadorTributo: '',
      busquedaCUIT: {
        representado: null,
        cuitRepresentado: null,
        tributos: undefined,
        mensajeError: null
      },
      busquedaTributo: {
        titular: null,
        cuitTitular: null,
        tipoTributo: null,
        identificador: null,
        mensajeError: null
      }
    });
  }

  //Servicios que setean los datos en las props del store de redux
  //Aceptación de permisos seleccionados
  handleAceptarSolicitudPermiso = () => {
    this.props.mostrarCargando(true);

    const tributos = this.state.busquedaCUIT.tributos;
    let services = [];
    Object.keys(tributos).length > 0 &&
      Object.keys(tributos).map((tributo, index) => {

        if (tributos[tributo].opciones.length > 0) {
          tributos[tributo].opciones.map((identificador, index) => {

            const service = this.servicioAgregarSolicitudPermiso({
              tipoTributo: tributos[tributo].tipoTributo,
              identificador: identificador
            }, (datos) => {
              if (!datos.ok) { mostrarAlerta(datos.error); this.props.mostrarCargando(false); return false; }

              this.props.setPropsAgregarRegistroGrilla({
                cuilRepresentado: datos.return.cuilRepresentado,
                identificador: datos.return.identificador,
                aceptado: datos.return.aceptado,
                tipoTributo: datos.return.tipoTributo
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

  //Función útilizada tanto cuando se acepta permisos en busqueda por CUIT como por Tributo
  servicioAgregarSolicitudPermiso = (param, callback) => {
    const token = this.props.loggedUser.token;

    return servicesRepresentantes.agregarSolicitudPermiso(token, {
      "tipoTributo": param.tipoTributo,
      "identificador": param.identificador
    })
      .then((datos) => {
        if (!datos.ok) { mostrarAlerta(datos.error); this.props.mostrarCargando(false); return false; }
        if (typeof callback === "function")
          callback(datos);
      }).catch(err => {
        console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
      });
  }

  //Servicios que setean los datosFila en las props del store de redux
  //Cancelamos permiso - en MisRepresentantes y en MisRepresentados
  handleCancelarPermiso = (datosFila) => {

    this.props.mostrarCargando(true);
    const token = this.props.loggedUser.token;

    //De acuerdo en que gruilla se precionó el botón
    let cuil = this.props.loggedUser.datos.cuil;
    let datosGrilla = this.props.datosMisRepresentados;
    if (datosFila.data.grilla == 'MisRepresentantes') {
      cuil = datosFila.usuario;
      datosGrilla = this.props.datosMisRepresentantes;
    }


    const service = servicesRepresentantes.cancelarPermiso(token, {
      "cuilRepresentante": cuil,
      "tipoTributo": datosFila.data.tipoTributo,
      "identificador": datosFila.data.identificador
    })
      .then((datos) => {
        if (!datos.ok) { mostrarAlerta(datos.error); this.props.mostrarCargando(false); return false; }

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

  //Servicios que setean los datos en las props del store de redux
  //Aceptamos permiso - solo en MisRepresentantes
  handleAceptarPermiso = (datosFila) => {

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
        if (!datos.ok) { mostrarAlerta(datos.error); this.props.mostrarCargando(false); return false; }

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

  //Botón Cancelar ó Aceptar que se mostrará en la grilla y se pasara al componente MiTabla en "customCell"
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
    </div>) || (datosExtra.data.grilla == 'MisRepresentantes' && <div className={classes.iconAgregarPermiso}>
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
    </div>);
  }

  //Buscando Titular por Tributos
  buscarTributosIdentificador = () => {
    if (this.state.inputIdentificadorTributo == '') {
      this.setState({
        errorInputIdentificador: true
      });
      return;
    }

    //Servicios que setean los datos en las props del store de redux
    this.props.mostrarCargando(true);
    const token = this.props.loggedUser.token;

    const service = servicesRepresentantes.getTitularTributo(token, {
      "tipoTributo": this.state.selectTributos,
      "identificador": this.state.inputIdentificadorTributo
    })
      .then((datos) => {

        if (datos.ok) {
          this.setState({
            errorInputIdentificador: false,
            busquedaTributo: {
              titular: datos.return.titular,
              cuitTitular: datos.return.cuit,
              tipoTributo: this.state.selectTributos,
              identificador: this.state.inputIdentificadorTributo
            }
          });
        } else {
          this.handleCancelarSolicitudPermiso();

          this.setState({
            errorInputIdentificador: false,
            busquedaTributo: {
              ...this.state.busquedaTributo,
              mensajeError: 'No se encontraron registros'
            }
          });
        };

        this.props.mostrarCargando(false);
      }).catch(err => {
        console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
      });
  }

  //Aceptando solicitud en busca por Tributo
  handleAceptarSolicitudPermisoTitular = () => {
    this.props.mostrarCargando(true);

    this.servicioAgregarSolicitudPermiso({
      tipoTributo: this.state.selectTributos,
      identificador: this.state.inputIdentificadorTributo
    }, (datos) => {
      if (!datos.ok) { mostrarAlerta(datos.error); this.props.mostrarCargando(false); return false; }

      this.props.setPropsAgregarRegistroGrilla({
        cuilRepresentado: datos.return.cuilRepresentado,
        identificador: datos.return.identificador,
        aceptado: datos.return.aceptado,
        tipoTributo: datos.return.tipoTributo
      });
      this.handleCancelarSolicitudPermiso();

      //Redireccionamos solo si "agregamos" desde la pantalla Inicio
      this.props.match.params.tributo && this.props.redireccionar('/Inicio');

      this.props.mostrarCargando(false);
    });
  }

  //Seleccion tipoTributo en busqueda por Tributo
  handleSelectTipoTributo = (event) => {
    this.setState({
      selectTributos: event.target.value
    });
  }

  //Ingreso de identificador en busqueda por Tributo
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
            {/* Tabla Mis Representantes */}
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
            {/* Tabla Mis Representados */}
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
            {/* SE COMENTA LA ACEPTACIÖN DE SOLICITUDES DE PERMISOS PARA MAS ADELANTE */}
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

            {/* Busqueda por Tributo */}
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
                onChange={this.handleSelectTipoTributo}
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
                    error={this.state.errorInputIdentificador}
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

              {this.state.busquedaTributo.titular && this.state.busquedaTributo.cuitTitular &&
                <div><Grid container spacing={0} className={classes.textRepresentante}>
                  <Grid item md={6}>
                    <Typography variant="subheading" gutterBottom>Titular:</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <b>
                      <Typography className={classes.cuitData} variant="subheading">{this.state.busquedaTributo.titular}</Typography>
                      <Typography className={classes.cuitData} variant="subheading">{this.state.busquedaTributo.cuitTitular}</Typography>
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

              {this.state.busquedaTributo.mensajeError && <div>
                <Typography className={classes.mensajeError} variant="subheading">{this.state.busquedaTributo.mensajeError}</Typography>
              </div>}

            </MiCard>
            <br />
            {/* Busqueda por CUIT */}
            <MiCard>
              <Typography className={classes.title} variant="title">Agregar solicitud por CUIT</Typography>
              <Divider className={classes.divider} />
              <Typography className={classes.infoTexto}>
                {`
                Debe seleccionar por cada tributo los identificadores en los que desee operar
              `}
              </Typography>

              {!this.state.busquedaCUIT.representado && !this.state.busquedaCUIT.cuitRepresentado &&
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


              {this.state.busquedaCUIT.representado && this.state.busquedaCUIT.cuitRepresentado &&
                <div><Grid container spacing={0} className={classes.textRepresentante}>
                  <Grid item md={6}>
                    <Typography variant="subheading" gutterBottom>Representado:</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <b>
                      <Typography className={classes.cuitData} variant="subheading">{this.state.busquedaCUIT.representado}</Typography>
                      <Typography className={classes.cuitData} variant="subheading">{this.state.busquedaCUIT.cuitRepresentado}</Typography>
                    </b>
                  </Grid>
                </Grid>
                  <Divider className={classes.divider} />

                  {this.state.busquedaCUIT.tributos && Object.keys(this.state.busquedaCUIT.tributos).map(tributo => {
                    return <MiSolicPermisos
                      label={this.state.busquedaCUIT.tributos[tributo].label}
                      tipo={this.state.busquedaCUIT.tributos[tributo].tipo}
                      opciones={this.state.busquedaCUIT.tributos[tributo].opciones}
                      addPermiso={this.handleAddPermiso}
                      cantPermisos={this.state.busquedaCUIT.tributos[tributo].cantPermisos}
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

              {this.state.busquedaCUIT.mensajeError && <div>
                <Typography className={classes.mensajeError} variant="subheading">{this.state.busquedaCUIT.mensajeError}</Typography>
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
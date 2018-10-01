import React from "react";
import { withRouter } from "react-router-dom";

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

import { getTributosCUIT, cancelSolicitudPermisos } from "@ReduxSrc/Representantes/actions";

import services from './services.js';


const mapStateToProps = state => {
  return {
    datos: state.Representantes.datosSolicitudPermisos
  };
};

const mapDispatchToProps = dispatch => ({
  mostrarCargando: (cargar) => {
    dispatch(mostrarCargando(cargar));
  },
  getTributosCUIT: (datos) => {
    dispatch(getTributosCUIT(datos));
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
      representado: '',
      cuitRepresentado: '',
      tributos: undefined
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (JSON.stringify(this.props.datos) != JSON.stringify(nextProps.datos)) {
      this.setState({
        representado: nextProps.datos.representado,
        cuitRepresentado: nextProps.datos.cuitRepresentado,
        tributos: nextProps.datos.tributos
      });
    }
  }

  buscarTributosCUIT = () => {
    this.props.mostrarCargando(true);

    //Traemos los tributos asociados al CUIT
    services.getTributosCUIT('20355266169', (datos) => {
      //Guardamos los datos en el store
      this.props.getTributosCUIT(datos);
      //Finalizamos el cargando 
      this.props.mostrarCargando(false);
    });
  }

  handleaddPermiso = (tipo, cantidad) => {
    var tributos = { ...this.state.tributos }
    tributos[tipo].cantPermisos = cantidad;

    this.setState({ tributos })
  }

  handleCancelarSolicitudPermisos = () => {

    this.props.cancelSolicitudPermisos();

    this.setState({ 
      representado: '',
      cuitRepresentado: '',
      tributos: undefined
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

              <Grid container spacing={0}>
                <Grid item md={9}>
                  <TextField
                    id="input-cuit"
                    label="Ingresar CUIT"
                    className={classes.textField}
                    margin="normal"
                    style={{
                      width: '100%'
                    }}
                  />
                </Grid>
                <Grid item md={3} className={classes.conainerButton}>
                  <Button
                    type="enter"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={this.buscarTributosCUIT}
                  >
                    Buscar</Button>
                </Grid>
              </Grid>

              
              {this.state.representado && this.state.cuitRepresentado && 
              <Grid container spacing={0}>
                <br />
                <Grid item md={6}>
                  <Typography variant="subheading" gutterBottom>Representado:</Typography>
                </Grid>
                <Grid item md={6}>
                  <b>
                      <Typography className={classes.cuitData} variant="subheading">{this.state.representado}</Typography>
                      <Typography className={classes.cuitData} variant="subheading">{this.state.cuitRepresentado}</Typography>
                  </b>
                </Grid>
                <br />
              </Grid>}

              {this.state.tributos && Object.keys(this.state.tributos).map(tributo => {
                return <MiSolicPermisos
                  label={this.state.tributos[tributo].label}
                  tipo={this.state.tributos[tributo].tipo}
                  opciones={this.state.tributos[tributo].opciones}
                  addPermiso={this.handleaddPermiso}
                  cantPermisos={this.state.tributos[tributo].cantPermisos}
                />
              })}
              {this.state.tributos &&
                <ExpansionPanelActions>
                  <Button size="small" onClick={this.handleCancelarSolicitudPermisos}>Cancelar</Button>
                  <Button size="small" color="secondary">
                    Enviar Solicitud
                  </Button>
                </ExpansionPanelActions>}
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
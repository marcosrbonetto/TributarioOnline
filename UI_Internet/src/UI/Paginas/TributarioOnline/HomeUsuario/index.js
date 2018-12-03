import React from "react";
import _ from "lodash";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import './styles.css';

//Librerias
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//Redux
import { mostrarCargando } from '@Redux/Actions/mainContent'
import { login } from '@Redux/Actions/usuario'

import Grid from '@material-ui/core/Grid';
import { push } from "connected-react-router";

//Componentes
import TributarioAccess from '@Componentes/TributarioAccess';

//Servicios
import servicesTributarioOnline from '@Rules/Rules_TributarioOnline.js';

//Alerta
import { mostrarAlerta } from "@Utils/functions";

const mapStateToProps = state => {
  return {
    loggedUser: state.Usuario.loggedUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    redireccionar: url => {
      dispatch(push(url));
    },
    mostrarCargando: (cargar) => {
      dispatch(mostrarCargando(cargar));
    },
    setLoggedUser: (data) => {
      dispatch(login(data));
    }
  };
};

class HomeUsuario extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      idsTributos: []
    }
  }

  componentWillMount() {
    this.props.mostrarCargando(true);

    const token = this.props.loggedUser.token;

    servicesTributarioOnline.getIdTributos(token)
      .then((datos) => {
        if (!datos.ok) { mostrarAlerta('Tributos: ' + datos.error); this.props.mostrarCargando(false); return false; }

        this.setIdentificadores(datos.return);

        this.props.mostrarCargando(false);
      }).catch(err => {
        console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
      });
  }

  setIdentificadores = (datos) => {
    let IdsTributos = {};

    const tipoTributos = _.map(datos, (x) => { return x.tipoTributo }).filter( (value, index, self) => { 
        return self.indexOf(value) === index;
    });

    _.each(tipoTributos, (tipoTributo) => {
      var arrayTributos = _.filter(datos, { tipoTributo: tipoTributo });

      arrayTributos = _.sortBy(arrayTributos, function(o) { return o.titular.titular; });

      IdsTributos[tipoTributo] = (arrayTributos && arrayTributos.map((tributo) => {
        return {
          representado: tributo.titular.titular,
          identificador: tributo.identificador
        }
      })) || [];
    });

    this.setState({
      idsTributos: IdsTributos
    });
  }

  eventRedirect = (tipoTributo, identificador) => {
    this.props.redireccionar('/DetalleTributario/' + tipoTributo + '/' + encodeURIComponent(identificador));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mainContainer}>
        <Grid container className={classes.root} spacing={16}>
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'Automotor') &&
            <Grid item xs={4} classes={{ "grid-xs-4": "tributarioAccess" }} >
              <TributarioAccess
                id="1"
                tipo="Automotor"
                titulo="Automotor"
                identificador="Dominio"
                icono="directions_car"
                opciones={this.state.idsTributos}
                opcionTest='([a-zA-Z]{3}[0-9]{3}$)|([a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$)'
                eventRedirect={this.eventRedirect} />
            </Grid>
          )}
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'Inmueble') &&
            <Grid item xs={4} classes={{ "grid-xs-4": "tributarioAccess" }} >
              <TributarioAccess
                id="2"
                tipo="Inmueble"
                titulo="Inmueble"
                opciones={this.state.idsTributos}
                identificador="Identificador"
                icono="home"
                eventRedirect={this.eventRedirect} />
            </Grid>
          )}
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'Comercio') &&
            <Grid item xs={4} classes={{ "grid-xs-4": "tributarioAccess" }} >
              <TributarioAccess
                id="3"
                tipo="Comercio"
                titulo="Comercio"
                opciones={this.state.idsTributos}
                identificador="Identificador"
                icono="store"
                eventRedirect={this.eventRedirect} />
            </Grid>
          )}
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'Cementerio') &&
            <Grid item xs={4} classes={{ "grid-xs-4": "tributarioAccess" }} >
              <TributarioAccess
                id="4"
                tipo="Cementerio"
                titulo="Cementerio"
                opciones={this.state.idsTributos}
                identificador="Identificador"
                iconoSvg={<svg viewBox="0 0 24 24">
                  <path d="M10.5,2H13.5V8H19V11H13.5V22H10.5V11H5V8H10.5V2Z" />
                </svg>}
                eventRedirect={this.eventRedirect} />
            </Grid>
          )}

          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'FeriaMercado') &&
            <Grid item xs={4} classes={{ "grid-xs-4": "tributarioAccess" }} >
              <TributarioAccess
                id="5"
                tipo="FeriaMercado"
                titulo="Ferias y Mercados"
                opciones={this.state.idsTributos}
                identificador="Identificador"
                iconoSvg={<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 7V4H5v3H2v13h8v-4h4v4h8V7h-3zm-8 3H9v1h2v1H8V9h2V8H8V7h3v3zm5 2h-1v-2h-2V7h1v2h1V7h1v5z"/></svg>}
                eventRedirect={this.eventRedirect} />
            </Grid>
          )}
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'TaxiRemis') &&
            <Grid item xs={4} classes={{ "grid-xs-4": "tributarioAccess" }} >
              <TributarioAccess
                id="6"
                tipo="TaxiRemis"
                titulo="Taxis y Remises"
                opciones={this.state.idsTributos}
                identificador="Identificador"
                iconoSvg={<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>}
                eventRedirect={this.eventRedirect} />
            </Grid>
          )}
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'AgentePercepcionRetencion') &&
            <Grid item xs={4} classes={{ "grid-xs-4": "tributarioAccess" }} >
              <TributarioAccess
                id="7"
                tipo="AgentePercepcionRetencion"
                titulo="Agente de Percepción/Retención"
                opciones={this.state.idsTributos}
                identificador="Identificador"
                iconoSvg={<svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16.49 15.5v-1.75L14 16.25l2.49 2.5V17H22v-1.5zm3.02 4.25H14v1.5h5.51V23L22 20.5 19.51 18zM9.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5.75 8.9L3 23h2.1l1.75-8L9 17v6h2v-7.55L8.95 13.4l.6-3C10.85 12 12.8 13 15 13v-2c-1.85 0-3.45-1-4.35-2.45l-.95-1.6C9.35 6.35 8.7 6 8 6c-.25 0-.5.05-.75.15L2 8.3V13h2V9.65l1.75-.75"/></svg>}
                eventRedirect={this.eventRedirect} />
            </Grid>
          )}
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'ContribucionMejoras') &&
            <Grid item xs={4} classes={{ "grid-xs-4": "tributarioAccess" }} >
              <TributarioAccess
                id="8"
                tipo="ContribucionMejoras"
                titulo="Contribución por Mejoras"
                opciones={this.state.idsTributos}
                identificador="Identificador"
                iconoSvg={<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M22.17 9.17c0-3.87-3.13-7-7-7s-7 3.13-7 7c0 3.47 2.52 6.34 5.83 6.89V20H6v-3h1v-4c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v4h1v5h16v-2h-3v-3.88c3.47-.41 6.17-3.36 6.17-6.95zM4.5 11c.83 0 1.5-.67 1.5-1.5S5.33 8 4.5 8 3 8.67 3 9.5 3.67 11 4.5 11z"/></svg>}
                eventRedirect={this.eventRedirect} />
            </Grid>
          )}
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'PlanesDeVivienda') &&
            <Grid item xs={4} classes={{ "grid-xs-4": "tributarioAccess" }} >
              <TributarioAccess
                id="9"
                tipo="PlanesDeVivienda"
                titulo="Planes De Vivienda"
                opciones={this.state.idsTributos}
                identificador="Identificador"
                iconoSvg={<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>}
                eventRedirect={this.eventRedirect} />
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

let componente = HomeUsuario;
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(componente));
componente = withRouter(componente);
export default componente;

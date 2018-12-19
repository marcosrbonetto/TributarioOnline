import React from "react";
import _ from "lodash";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import './styles.css';
import classNames from "classnames";

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
        console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
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
      <div className={classNames(classes.mainContainer,'mainContainer')}>
        <Grid container className={classes.root} spacing={16}>
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'Automotor') &&
            <Grid item xs={4} classes={{ "grid-xs-4": "tributarioAccess" }} >
              <TributarioAccess
                id="1"
                tipo="Automotor"
                titulo="Automotores"
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
                titulo="Inmuebles"
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
                titulo="Comercios e Industria"
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
                titulo="Cementerios"
                opciones={this.state.idsTributos}
                identificador="Identificador"
                iconoSvg={<svg viewBox="0 0 471.951 471.951">
                <path id="XMLID_29_" d="M193.921,223.469c0.072-0.072,0.168-0.121,0.24-0.192c-19.894,5.763-42.637,8.565-64.766,8.565   c-36.976,0-75.646-7.793-99.854-24.264v144.449c0,22.432,44.705,40.605,99.854,40.605c13.39,0,26.142-1.091,37.811-3.032   c-0.453-0.422-0.97-0.749-1.409-1.187c-12.975-12.967-20.116-30.209-20.1-48.525c0-9.768,2.157-19.009,5.851-27.433   c5.062-11.526,13.103-21.467,23.284-28.657c-0.669-3.861-1.011-7.809-1.011-11.805C173.821,253.654,180.954,236.42,193.921,223.469   z"/>
                <path id="XMLID_30_" d="M129.394,207.388c55.149,0,99.854-18.173,99.854-40.605c0-12.083-13.056-22.902-33.657-30.344   c-14.4,21.207-38.694,35.168-66.197,35.168c-27.503,0-51.797-13.962-66.197-35.168c-20.601,7.442-33.657,18.261-33.657,30.344   C29.54,189.215,74.246,207.388,129.394,207.388z"/>
                <path id="XMLID_31_" d="M108.586,143.044c-3.972-4.744-6.462-10.777-6.462-17.441c0-15.061,24.016-34.277,27.271-51.296   c3.75,17.186,27.273,36.235,27.273,51.296c0,6.663-2.493,12.696-6.464,17.441c20.337-8.246,34.723-28.123,34.723-51.423   c0-25.914-34.186-57.619-49.4-87.932c-2.494-4.968-9.56-4.899-12.021,0.085c-14.879,30.123-49.641,61.99-49.641,87.847   C73.864,114.921,88.248,134.798,108.586,143.044z"/>
                <path id="XMLID_32_" d="M442.41,339.889c0-19.893-16.128-36.013-36.013-36.013c-3.565,0-9.488,1.21-16.62,3.104   c6.384-3.701,11.423-7.028,13.938-9.536c14.066-14.074,14.081-36.896,0.008-50.939c-7.03-7.036-16.239-10.554-25.458-10.554   c-9.218,0-18.435,3.518-25.473,10.554c-2.515,2.507-5.843,7.555-9.535,13.931c1.886-7.116,3.096-13.023,3.096-16.573   c0-19.893-16.12-36.02-36.013-36.02c-19.884,0-36.013,16.127-36.013,36.02c0,3.542,1.211,9.441,3.089,16.543   c-3.678-6.354-6.997-11.376-9.504-13.884c-7.038-7.028-16.255-10.548-25.473-10.548c-9.211,0-18.436,3.52-25.465,10.548   c-14.066,14.058-14.066,36.864,0.015,50.93c2.509,2.508,7.54,5.829,13.899,9.521c-7.107-1.894-13.016-3.096-16.565-3.096   c-19.901,0-36.021,16.12-36.021,36.013c-0.016,19.893,16.12,36.004,36.021,36.004c3.549,0,9.458-1.211,16.565-3.098   c-6.359,3.686-11.391,7.014-13.899,9.521c-14.081,14.066-14.081,36.872,0,50.938c7.021,7.03,16.232,10.548,25.45,10.548   c9.218,0,18.435-3.518,25.473-10.556c2.507-2.507,5.827-7.546,9.521-13.906c-1.894,7.125-3.105,13.039-3.105,16.598   c0,19.893,16.128,36.013,36.013,36.013c19.893,0,36.013-16.12,36.013-36.013c0-3.567-1.21-9.49-3.112-16.637   c3.701,6.391,7.037,11.446,9.552,13.962c7.038,7.03,16.264,10.548,25.482,10.548c9.217,0,18.428-3.512,25.45-10.54   c14.072-14.066,14.058-36.872,0-50.93c-2.516-2.516-7.571-5.851-13.963-9.562c7.141,1.903,13.063,3.114,16.621,3.114   C426.282,375.893,442.427,359.765,442.41,339.889z M310.356,372.74c-18.133,0-32.837-14.71-32.837-32.843   c0-18.135,14.704-32.837,32.837-32.837c18.142,0,32.844,14.702,32.844,32.837C343.2,358.03,328.498,372.74,310.356,372.74z"/>
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
                iconoSvg={<svg viewBox="0 0 366.79 366.79"><g id="Layer_5_38_"><path d="M331.82,63.705c1.444,3.582-0.534,6.512-4.395,6.512H39.364c-3.861,0-5.92-2.961-4.575-6.58L55.981,6.581    C57.326,2.962,61.585,0,65.445,0h233.676c3.861,0,8.201,2.929,9.646,6.51L331.82,63.705z"/><path d="M32.344,106.039c0,14.053,11.392,25.444,25.445,25.444c10.579,0,19.647-6.455,23.484-15.642    c0.761-1.821,2.52-1.795,3.288,0.038c3.846,9.167,12.906,15.604,23.469,15.604c10.609,0,19.701-6.494,23.52-15.724    c0.742-1.796,2.419-1.94,3.12-0.203c3.768,9.337,12.915,15.927,23.603,15.927c10.687,0,19.832-6.588,23.6-15.926    c0.701-1.737,2.341-1.737,3.042,0c3.769,9.338,12.915,15.926,23.601,15.926c10.687,0,19.833-6.588,23.6-15.926    c0.703-1.737,2.34-1.737,3.039,0c3.769,9.337,12.916,15.927,23.604,15.927c10.688,0,19.834-6.588,23.602-15.926    c0.699-1.737,2.339-1.737,3.038,0c3.769,9.337,12.914,15.927,23.603,15.927c14.053,0,25.445-11.392,25.445-25.444V95.285    c0,0,0-5.021-5.302-5.021c-72.441,0-215.995,0-289.76,0c-7.04,0-7.04,5.219-7.04,5.219L32.344,106.039z"/><path d="M327.065,342.699c0-0.005,0.001-0.009,0.001-0.013V241.792c0-6.12-5.009-11.128-11.127-11.128H50.851    c-6.12,0-11.128,5.008-11.128,11.128v100.894c0,0.658,0,3.59,0,4.445c0,10.858,8.802,19.659,19.659,19.659    c7.443,0,13.904-4.144,17.237-10.247c0.476-0.873,0.818-2.729,5.548-2.729h202.764c4.451,0,5.272,1.833,5.74,2.693    c3.327,6.122,9.799,10.283,17.256,10.283c10.857,0,19.14-8.801,19.14-19.659C327.067,345.605,327.065,345.217,327.065,342.699z"/><path d="M91.226,148.782c-0.133-1.813-1.642-3.258-3.485-3.258H77.602c-1.931,0-3.51,1.579-3.51,3.51v0.046v58.106v0.046    c0,1.932,1.58,3.51,3.51,3.51h10.139c1.844,0,3.353-1.445,3.485-3.258c0.009-0.03,0.025-0.06,0.025-0.091v-0.161v-58.199v-0.161    C91.251,148.841,91.235,148.812,91.226,148.782z"/><path d="M293.63,148.782c-0.133-1.813-1.642-3.258-3.485-3.258h-10.139c-1.932,0-3.511,1.579-3.511,3.51v0.046v58.106v0.046    c0,1.932,1.579,3.51,3.511,3.51h10.139c1.844,0,3.353-1.445,3.485-3.258c0.009-0.03,0.025-0.06,0.025-0.091v-0.161v-58.199v-0.161    C293.656,148.841,293.638,148.812,293.63,148.782z"/></g></svg>} 
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

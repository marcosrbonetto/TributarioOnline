import React from "react";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//Redux
import { mostrarCargando, loginUser } from '@Redux/Actions/mainContent'

import Grid from '@material-ui/core/Grid';
import { push } from "connected-react-router";

import TributarioAccess from '@Componentes/TributarioAccess';

import { getIdTributos } from "@ReduxSrc/TributarioOnline/actions";

import services from '@Rules/Rules_TributarioOnline.js';

const mapStateToProps = state => {
  return {
    loggedUser: state.MainContent.loggedUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    redireccionar: url => {
      dispatch(push(url));
    },
    setPropsIdTributos: (datos) => {
      dispatch(getIdTributos(datos));
    },
    mostrarCargando: (cargar) => {
      dispatch(mostrarCargando(cargar));
    },
    setLoggedUser: (data) => {
      dispatch(loginUser(data));
    }
  };
};

class TributarioOnline extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.mostrarCargando(true);

    //Traemos datos de usuario para guardarlos en las props de redux
    services.getDatosUsuario(this.props.loggedUser.token) //this.props.loggedUser.token
      .then((datos) => {

        //Seteamos las props
        this.props.setLoggedUser({
          datos: datos.return
        });

      });

    //Traemos los tributos asociados al Token
    services.getIdTributos(this.props.loggedUser.token)
      .then((datos) => {
        //Guardamos los datos en el store
        this.props.setPropsIdTributos(datos);
        //Finalizamos el cargando 
        this.props.mostrarCargando(false);
      });
  }

  eventRedirect = (tipoTributo, identificador) => {
    this.props.redireccionar('/DetalleTributario/' + tipoTributo + '/' + identificador);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mainContainer}>
        <Grid container className={classes.root} spacing={16}>
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'Automotores') &&
            <Grid item xs={6}>
              <TributarioAccess
                id="automotores"
                tipo="Automotores"
                identificador="Dominio"
                icono="directions_car"
                opciones={[]}
                opcionInicial={'0'}
                opcionTest='([a-zA-Z]{3}[0-9]{3}$)|([a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$)'
                eventRedirect={this.eventRedirect} />
            </Grid>
          )}
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'Inmuebles') &&
            <Grid item xs={6}>
              <TributarioAccess
                id="inmuebles"
                tipo="Inmuebles"
                identificador="Identificador"
                icono="home" />
            </Grid>
          )}
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'Comercios') &&
            <Grid item xs={6}>
              <TributarioAccess
                id="comercios"
                tipo="Comercios"
                identificador="Identificador"
                icono="store"
              />
            </Grid>
          )}
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'Cementerios') &&
            <Grid item xs={6}>
              <TributarioAccess
                id="cementerios"
                tipo="Cementerios"
                identificador="Identificador"
                iconoSvg={<svg viewBox="0 0 24 24">
                  <path d="M10.5,2H13.5V8H19V11H13.5V22H10.5V11H5V8H10.5V2Z" />
                </svg>}
              />
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

let componente = TributarioOnline;
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(componente));
componente = withRouter(componente);
export default componente;

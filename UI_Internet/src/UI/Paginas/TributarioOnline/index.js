import React from "react";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import './styles.css';

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//Redux
import { mostrarCargando, loginUser } from '@Redux/Actions/mainContent'

import Grid from '@material-ui/core/Grid';
import { push } from "connected-react-router";

import TributarioAccess from '@Componentes/TributarioAccess';

import { getIdTributos } from "@ReduxSrc/TributarioOnline/actions";

import servicesTributarioOnline from '@Rules/Rules_TributarioOnline.js';

//Alerta
import { mostrarAlerta } from "@Utils/functions";

const mapStateToProps = state => {
  return {
    loggedUser: state.MainContent.loggedUser,
    idsTributos: state.TributarioOnline.idsTributos,
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

    this.state = {
      idsTributos: []
    }
  }

  componentWillMount() {
    this.props.mostrarCargando(true);

    const token = this.props.loggedUser.token;
    
    const service1 = servicesTributarioOnline.getIdTributos(token)
      .then((datos) => {
        if (!datos.ok) { mostrarAlerta('Tributos: '+datos.error); this.props.mostrarCargando(false); return false; }

        this.props.setPropsIdTributos(datos);

        this.props.mostrarCargando(false);
      }).catch(err => {
        console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
      });
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.idsTributos) != JSON.stringify(nextProps.idsTributos)) {
        this.setState({
          idsTributos: nextProps.idsTributos
        });
    }
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
            <Grid item xs={6} classes={{"grid-xs-6": "tributarioAccess"}} >
              <TributarioAccess
                id="automotores"
                tipo="Automotores"
                identificador="Dominio"
                icono="directions_car"
                opciones={this.state.idsTributos}
                opcionTest='([a-zA-Z]{3}[0-9]{3}$)|([a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$)'
                eventRedirect={this.eventRedirect} />
            </Grid>
          )}
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'Inmuebles') &&
            <Grid item xs={6} classes={{"grid-xs-6": "tributarioAccess"}} >
              <TributarioAccess
                id="inmuebles"
                tipo="Inmuebles"
                opciones={this.state.idsTributos}
                identificador="Identificador"
                icono="home" />
            </Grid>
          )}
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'Comercios') &&
            <Grid item xs={6} classes={{"grid-xs-6": "tributarioAccess"}} >
              <TributarioAccess
                id="comercios"
                tipo="Comercios"
                opciones={this.state.idsTributos}
                identificador="Identificador"
                icono="store"
              />
            </Grid>
          )}
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'Cementerios') &&
            <Grid item xs={6} classes={{"grid-xs-6": "tributarioAccess"}} >
              <TributarioAccess
                id="cementerios"
                tipo="Cementerios"
                opciones={this.state.idsTributos}
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

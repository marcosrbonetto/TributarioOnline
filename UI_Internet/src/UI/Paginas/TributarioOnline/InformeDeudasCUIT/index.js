import React from "react";
import _ from "lodash";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import './styles.css';
import classNames from 'classnames';
import { connect } from "react-redux";

//Router
import { withRouter } from "react-router-dom";

//Redux
import { mostrarCargando } from '@Redux/Actions/mainContent'
import { replace, push } from "connected-react-router";

import MiInformacionDeudaCUIT from "@Componentes/MiInformacionDeudaCUIT";

import { mostrarAlerta } from "@Utils/functions";

//Material UI Components
import Grid from '@material-ui/core/Grid';

const mapStateToProps = state => {
  return {
    loggedUser: state.Usuario.loggedUser,
  };
};

const mapDispatchToProps = dispatch => ({
  mostrarCargando: (cargar) => {
    dispatch(mostrarCargando(cargar));
  },
  redireccionar: url => {
    dispatch(replace(url));
  },
});

class InformeDeudasCUIT extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      arrayCuits: []
    };
  }

  componentDidMount() {
    //Corroboramos Resultado importacion AFIP - BIENES por CUIT
    let statusAfipImportacion = localStorage.getItem('statusAfipImportacion');
    localStorage.removeItem('statusAfipImportacion');

    //CUITs a mostrar
    let cuitsInformeDeudas = localStorage.getItem('cuitsInformeDeudas');
    localStorage.removeItem('cuitsInformeDeudas');

    if (statusAfipImportacion && cuitsInformeDeudas) {
        if (statusAfipImportacion == 'OK') {
            //Quitamos al primer cuit ya que es el del log de afip
            cuitsInformeDeudas = cuitsInformeDeudas.split(',');
            cuitsInformeDeudas.shift();

            this.setState({
                arrayCuits: cuitsInformeDeudas
            });
        } else {
            mostrarAlerta(statusAfipImportacion);
        }
    }
  }

  render() {
    const { classes } = this.props;
    const { arrayCuits } = this.state;

    return (
      <div className={classes.mainContainer}>
        <Grid container className={classes.root} spacing={16} justify="center">
          <Grid item xs={5} classes={{ "grid-xs-4": "tributarioAccess" }} >
            <MiInformacionDeudaCUIT
              titulo="Informe de Deudas"
              icono="list_alt"
              arrayCuits={arrayCuits}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

let componente = InformeDeudasCUIT;
componente = withStyles(styles)(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

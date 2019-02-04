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

    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mainContainer}>
        <Grid container className={classes.root} spacing={16} justify="center">
          <Grid item xs={5} classes={{ "grid-xs-4": "tributarioAccess" }} >
            <MiInformacionDeudaCUIT
              titulo="Informe de Deudas"
              icono="list_alt"
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

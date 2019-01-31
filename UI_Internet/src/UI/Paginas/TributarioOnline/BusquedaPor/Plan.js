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

//Material UI Components
import Grid from '@material-ui/core/Grid';

//Componentes
import TributarioAccessBusqueda from '@Componentes/TributarioAccessBusqueda';


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

class BusquedaPor extends React.PureComponent {
  constructor(props) {
    super(props);

    this.tipoTributo = this.props.match.params.tributo;

    this.state = {
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mainContainer}>
        <Grid container className={classes.root} spacing={16} justify="center">
          <Grid item xs={5} classes={{ "grid-xs-4": "tributarioAccess" }} >
            <TributarioAccessBusqueda
              idTipoTributo={12}
              regexFormato={/^[0-9]{8}$/}
              titulo="Por Plan"
              identificador="N° de Plan"
              iconoSvg={<svg style={{height: '50px'}} viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /><path d="M0 0h24v24H0z" fill="none" /></svg>}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

let componente = BusquedaPor;
componente = withStyles(styles)(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

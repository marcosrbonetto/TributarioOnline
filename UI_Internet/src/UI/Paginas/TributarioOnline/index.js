import React from "react";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Grid from '@material-ui/core/Grid';
import { push } from "connected-react-router";

import TributarioAccess from '@Componentes/TributarioAccess';

const mapDispatchToProps = dispatch => ({
  redireccionar: url => {
    dispatch(push(url));
  }
});

class TributarioOnline extends React.PureComponent {
  constructor(props) {
    super(props);
    let tributoParam = this.props.match.params.tributo;
  }

  eventRedirect = () => {
    this.props.redireccionar('/DetalleTributario')
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mainContainer}>
        <Grid container className={classes.root} spacing={16}>
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'Automotores') &&
            <Grid item xs={6}>
              <TributarioAccess
                tipo="Automotores"
                identificador="Dominio"
                icono="directions_car"
                opciones={[
                  {
                    sistema: 'true',
                    identificador: 'HCJ675'
                  },
                  {
                    sistema: 'true',
                    identificador: 'ERT324'
                  },
                  {
                    sistema: 'false',
                    identificador: 'RFG475'
                  },
                ]}
                opcionInicial='HCJ675'
                opcionTest='([a-zA-Z]{3}[0-9]{3}$)|([a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$)'
                eventRedirect={this.eventRedirect} />
            </Grid>
          )}
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'Inmuebles') &&
            <Grid item xs={6}>
              <TributarioAccess
                tipo="Inmuebles"
                identificador="Identificador"
                icono="home" />
            </Grid>
          )}
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'Comercios') &&
          <Grid item xs={6}>
            <TributarioAccess
              tipo="Comercios"
              identificador="Identificador"
              icono="store"
            />
          </Grid>
          )}
          {((!this.props.match.params.tributo || this.props.match.params.tributo == 'Cementerios') &&
          <Grid item xs={6}>
            <TributarioAccess
              tipo="Cementerios"
              identificador="Identificador"
              icono="account_balance"
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
  null,
  mapDispatchToProps
)(withStyles(styles)(componente));
componente = withRouter(componente);
export default componente;

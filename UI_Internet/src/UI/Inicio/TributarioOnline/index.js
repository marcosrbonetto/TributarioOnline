import React from "react";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';

import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';

import TributarioAccess from '@Componentes/TributarioAccess';

const mapDispatchToProps = dispatch => ({

});

class TributarioOnline extends React.PureComponent {
  constructor(props) {
    super(props);


  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mainContainer}>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={6}>
            <TributarioAccess 
            tipo="Inmuebles" 
            identificador="Identificador" 
            icono="home"/>
          </Grid>
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
            opcionTest='([a-zA-Z]{3}[0-9]{3}$)|([a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$)'/>
          </Grid>
          <Grid item xs={6}>
            <TributarioAccess 
            tipo="Comercios" 
            identificador="Identificador" 
            icono="store"
            />
          </Grid>
          <Grid item xs={6}>
            <TributarioAccess 
            tipo="Cementerios" 
            identificador="Identificador" 
            icono="account_balance"
            />
          </Grid>
          <Grid item xs={6}>
            <TributarioAccess 
            tipo="Procuración Fiscal" 
            identificador="Identificador" 
            icono="gavel"
            />
          </Grid>
          <Grid item xs={6}>
            <TributarioAccess 
            tipo="Tribunal de Faltas" 
            identificador="Identificador" 
            icono="sms_failed"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(TributarioOnline));

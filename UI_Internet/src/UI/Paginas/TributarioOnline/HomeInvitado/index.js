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
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

//Custom Components
import MiCard from "@Componentes/MiCard";
import servicesTributarioOnline from '@Rules/Rules_TributarioOnline';

//Funciones Útiles
import { getIdTipoTributo, getTextoTipoTributo } from "@Utils/functions"

const mapStateToProps = state => {
  return {
    loggedUser: state.Usuario.loggedUser
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

class HomeInvitado extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectTributos: 1
    };
  }

  componentDidMount() {
    
  }

  //Seleccion tipoTributo en busqueda por Tributo
  handleSelectTipoTributo = (event) => {
    this.setState({
      selectTributos: event.target.value
    });
  }

  render() {
    const { classes } = this.props;

    const { } = this.state;

    //const titulo = getTextoTipoTributo(this.props.match.params.tributo);

    return (
      <div className={classNames(classes.mainContainer, "contentDetalleTributo")}>
        <Grid container spacing={16} justify="center">
          <Grid item xs={5} className={"container"} >
            <MiCard contentClassName={classes.root} >
              {/* Titulo y selección de identificador */}
              <Typography className={classes.title} variant="title">Identificador:
                <Select
                  value={this.state.selectTributos}
                  onChange={this.handleSelectTipoTributo}
                  inputProps={{
                    name: 'tipo_tributo',
                    id: 'tipo_tributo',
                  }}
                  className={classes.selectTipoTributo}
                >
                  {this.props.idTipoTributos && this.props.idTipoTributos.map(tributo => {
                    return <MenuItem value={tributo.key}>
                      <em>{getTextoTipoTributo(tributo.value)}</em>
                    </MenuItem>
                  })}
                </Select>
              </Typography>
            </MiCard>
          </Grid>
        </Grid>
      </div >
    );
  }
}

let componente = HomeInvitado;
componente = withStyles(styles)(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

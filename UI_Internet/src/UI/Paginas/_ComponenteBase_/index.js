import React from "react";
import { withRouter } from "react-router-dom";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import { connect } from "react-redux";

//Redux
import { mostrarCargando } from '@Redux/Actions/mainContent'

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  mostrarCargando: (cargar) => {
    dispatch(mostrarCargando(cargar));
  }
});

class ComponenteBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  componentWillMount() {
    this.props.mostrarCargando(true);

  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mainContainer}>
        
      </div>
    );
  }
}

let componente = ComponenteBase;
componente = connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(componente));
componente = withRouter(componente);
export default componente;
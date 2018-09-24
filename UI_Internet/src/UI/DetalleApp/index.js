import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

//Router
import { withRouter } from "react-router-dom";

//REDUX
import { connect } from "react-redux";
import { goBack } from "connected-react-router";

//Componentes
import Button from "@material-ui/core/Button";
// import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import IconoFlechaAtras from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";

//Mis componentes
import MiContent from "@Componentes/MiContent";
import MiCard from "@Componentes/MiCard";
import MiPagina from "@Componentes/MiPagina";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  goBack: () => {
    dispatch(goBack());
  }
});

class DetalleApp extends React.Component {
  render() {
    const { classes, location } = this.props;
    // const values = queryString.parse(location.search);
    // let app = values.app;

    return (
      <React.Fragment>
        <MiPagina
          // cargando={true}
          toolbarLeftIcon="arrow_back"
          toolbarLeftIconClick={this.props.goBack}
        >
          <label>hijos</label>
        </MiPagina>
      </React.Fragment>
    );
  }
}

const styles = theme => ({});

let componente = DetalleApp;
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
componente = withStyles(styles)(componente);
componente = withRouter(componente);
export default componente;

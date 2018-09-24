import React from "react";
import { withStyles } from "@material-ui/core/styles";

//Componentes
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import TextField from "@material-ui/core/TextField";

//REDUX
import { connect } from "react-redux";

import { Typography, Grid, Icon } from "@material-ui/core";

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => {
  return {};
};

class HintUsuarioSeleccionado extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.dataUsuario == undefined) return null;

    const { classes } = this.props;
    const urlFoto =
      "https://servicios2.cordoba.gov.ar/cordobafiles/archivo/" +
      this.props.dataUsuario.identificadorFotoPersonal +
      "/3";
    const nombre =
      this.props.dataUsuario.nombre + " " + this.props.dataUsuario.apellido;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <div
            className={classes.content}
            onClick={this.props.onBotonVerUsuariosRecientesClick}
          >
            <div
              className={classes.imagen}
              style={{ backgroundImage: "url(" + urlFoto + ")" }}
            />
            <Typography variant="body2">{nombre}</Typography>
            <Icon className={classes.botonMas}>keyboard_arrow_down</Icon>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const styles = theme => {
  return {
    root: {
      display: "flex"
    },
    content: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      border: "1px solid rgba(0,0,0,0.1)",
      borderRadius: "32px",
      alignSelf: "flex-start",
      padding: "8px",
      transition: "all 0.3s",
      cursor: "pointer",
      "& *": {
        cursor: "pointer"
      },
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.1)"
      }
    },
    imagen: {
      width: "28px",
      marginRight: "8px",
      height: "28px",
      borderRadius: "16px",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center"
    },
    botonMas: {
      marginLeft: "8px"
    }
  };
};

let componente = HintUsuarioSeleccionado;
componente = withStyles(styles)(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
export default componente;

import React from "react";

//Styles
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import styles from "./styles";
import "@UI/transitions.css";

//REDUX
import { connect } from "react-redux";

//Componentes
import { Typography, Grid, Icon, Button, IconButton } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

//Mis recursos

import ImagenHelper from "@Resources/imagenes/avatar_help.png";
import ImagenHeader from "@Resources/imagenes/chat_soporte_header.png";

const mapDispatchToProps = dispatch => ({});
const mapStateToProps = state => {
  return {
    expandido: false
  };
};

class LoginAyuda extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = { abierto: false };
  }

  toggle = () => {
    this.setState({ abierto: !this.state.abierto });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div
          className={classes.persona}
          style={{
            backgroundImage: "url(" + ImagenHelper + ")"
          }}
        />
        {/* <Lottie
          options={opcionesAnimExito}
          height={150}
          width={150}
          style={{ minHeight: "150px" }}
        /> */}
        <Paper className={classNames(classes.burbuja)} onClick={this.toggle}>
          <Icon>chat</Icon>
          <Typography variant="body1">Necesitas ayuda?</Typography>
        </Paper>

        <Paper
          className={classNames(classes.panel, this.state.abierto && "abierto")}
        >
          <div className={classes.panelEncabezado}>
            <div>
              <Typography variant="title">Asistente virtual</Typography>
            </div>
            <IconButton>
              <Icon>keyboard_arrow_down</Icon>
            </IconButton>
            <IconButton onClick={this.toggle}>
              <Icon>close</Icon>
            </IconButton>
          </div>
          <div
            className={classes.panelContentHeader}
            style={{ backgroundImage: "url(" + ImagenHeader + ")" }}
          />
          <div className={classes.panelContent}>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
            <Typography>Test</Typography>
          </div>
        </Paper>
      </div>
    );
  }
}

let componente = LoginAyuda;
componente = withStyles(styles)(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
export default componente;

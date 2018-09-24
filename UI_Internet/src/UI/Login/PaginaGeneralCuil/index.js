import React from "react";
import { withStyles } from "@material-ui/core/styles";

//Styles
import "@UI/transitions.css";
import styles from "./styles";

//Componentes
import { Typography, Icon, Button, Grid } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import red from "@material-ui/core/colors/red";

//Mis componentes
import ContentSwapper from "@Componentes/ContentSwapper";

//REDUX
import { connect } from "react-redux";

//Mis Rules
import Rules_Usuario from "@Rules/Rules_Usuario";

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => {
  return {};
};

class PaginaGenerarCUIL extends React.Component {
  static defaultProps = {
    onCargando: () => {},
    onCuil: () => {},
    onBotonVolverClick: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      dni: "",
      errorDni: undefined,
      sexo: "m",
      errorSexo: undefined,
      paginaFormVisible: true,
      paginaErrorVisible: false
    };
  }

  onBotonGenerarClick = () => {
    let errorDni = undefined;
    if (this.state.dni.trim() === "") {
      errorDni = "Dato requerido";
    }

    if (errorDni != undefined) {
      this.setState({ errorDni: errorDni });
      return;
    }

    let comando = {
      dni: this.state.dni,
      sexoMasculino: this.state.sexo === "m"
    };

    this.props.onCargando(true);
    Rules_Usuario.generarCuil(comando)
      .then(cuil => {
        this.props.onCuilGenerado(cuil);
      })
      .catch(error => {
        this.setState({
          error: error,
          paginaFormVisible: false,
          paginaErrorVisible: true
        });
      })
      .finally(() => {
        this.props.onCargando(false);
      });
  };

  onInputChange = event => {
    this.setState({
      errorDni: undefined,
      [event.target.name]: event.target.value
    });
  };

  onInputKeyPress = event => {
    if (event.key === "Enter") {
      this.onBotonGenerarClick();
    }
  };

  onSexoChange = event => {
    this.setState({ errorSexo: undefined, sexo: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <ContentSwapper
        transitionName="cross-fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        className={classes.contentSwapper}
      >
        <div
          key="paginaForm"
          className={classes.contentSwapperContent}
          visible={"" + this.state.paginaFormVisible}
        >
          {this.renderPaginaForm()}
        </div>

        <div
          key="paginaError"
          className={classes.contentSwapperContent}
          visible={"" + this.state.paginaErrorVisible}
        >
          {this.renderPaginaError()}
        </div>
      </ContentSwapper>
    );
  }

  renderPaginaForm() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.renderPaginaFormContent()}
        {this.renderPaginaFormFooter()}
      </div>
    );
  }

  renderPaginaFormContent() {
    const { classes, padding } = this.props;

    return (
      <div className={classes.content} style={{ padding: padding }}>
        <Grid container>
          <Grid item xs={12}>
            <FormControl
              className={classes.formControl}
              fullWidth
              margin="normal"
              error={this.state.errorDni !== undefined}
              aria-describedby="textoDniError"
            >
              <InputLabel htmlFor="inputPassword">N° de Documento</InputLabel>
              <Input
                id="inputDni"
                autoFocus
                value={this.state.password}
                name="dni"
                type="number"
                onKeyPress={this.onInputKeyPress}
                onChange={this.onInputChange}
              />
              <FormHelperText id="textoDniError">
                {this.state.errorDni}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              className={classes.formControl}
              fullWidth
              margin="normal"
              error={this.state.errorSexo !== undefined}
              aria-describedby="textoSexoError"
            >
              <FormLabel component="legend">Sexo</FormLabel>
              <RadioGroup
                aria-label="Gender"
                name="gender1"
                className={classes.group}
                value={this.state.sexo}
                onChange={this.onSexoChange}
              >
                <FormControlLabel
                  value="m"
                  control={<Radio />}
                  label="Masculino"
                />

                <FormControlLabel
                  value="f"
                  control={<Radio />}
                  label="Femenino"
                />
              </RadioGroup>
              {this.state.errorSexo != undefined && (
                <FormHelperText>{this.state.errorSexo}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }
  renderPaginaFormFooter() {
    const { classes, padding } = this.props;

    return (
      <div
        className={classes.footer}
        style={{
          padding: padding,
          paddingTop: "1rem",
          paddingBottom: "1rem"
        }}
      >
        <div style={{ flex: 1 }}>
          <Button
            variant="flat"
            color="primary"
            className={classes.button}
            onClick={this.props.onBotonVolverClick}
          >
            Volver
          </Button>
        </div>

        <Button
          variant="raised"
          color="primary"
          className={classes.button}
          onClick={this.onBotonGenerarClick}
        >
          Obtener CUIL
        </Button>
      </div>
    );
  }

  renderPaginaError() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.renderPaginaErrorContent()}
        {this.renderPaginaErrorFooter()}
      </div>
    );
  }

  renderPaginaErrorContent() {
    const { classes, padding } = this.props;

    return (
      <div className={classes.contenedorError}>
        <Icon className={classes.iconoError} style={{ color: red["500"] }}>
          error
        </Icon>
        <Typography variant="headline" className={classes.textoError}>
          {this.state.error || "Error procesando la solicitud"}
        </Typography>
        <Button
          variant="outlined"
          style={{ marginTop: "16px" }}
          onClick={this.onBotonGenerarClick}
        >
          Reintentar
        </Button>
      </div>
    );
  }

  renderPaginaErrorFooter() {
    const { classes, padding } = this.props;

    return (
      <div
        className={classes.footer}
        style={{
          padding: padding,
          paddingTop: "1rem",
          paddingBottom: "1rem"
        }}
      >
        <div style={{ flex: 1 }}>
          <Button
            variant="flat"
            color="primary"
            className={classes.button}
            onClick={this.props.onBotonVolverClick}
          >
            Volver
          </Button>
        </div>
      </div>
    );
  }
}

let componente = PaginaGenerarCUIL;
componente = withStyles(styles)(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
export default componente;

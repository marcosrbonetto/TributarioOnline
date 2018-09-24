import React from "react";
import { withStyles } from "@material-ui/core/styles";

//REDUX
import { connect } from "react-redux";

//Componentes
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {
  Typography,
  Grid,
  ListItem,
  Icon,
  IconButton
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import moment from "moment";

//Mis rules
import Rules_Usuario from "@Rules/Rules_Usuario";

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => {
  return {};
};

class PaginaUsuariosRecientes extends React.Component {
  static defaultProps = {
    onUsuarioSeleccionado: () => {},
    onOtraCuentaClick: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      usuariosRecientes: this.generarUsuarios()
    };
  }

  generarUsuarios = () => {
    let usuarios = Rules_Usuario.getUsuariosRecientes();
    usuarios.push({
      nombre: "Otra cuenta",
      esOtraCuenta: true
    });
    return usuarios;
  };

  onUsuarioClick = data => {
    if (data.esOtraCuenta === true) {
      this.props.onOtraCuentaClick();
    } else {
      this.props.onUsuarioSeleccionado(data);
    }
  };

  onBorrarClick = data => {
    Rules_Usuario.borrarUsuarioReciente(data.username);
    this.setState({ usuariosRecientes: this.generarUsuarios() });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderContent()}
        {this.renderFooter()}
      </div>
    );
  }

  renderContent() {
    const { classes, padding } = this.props;
    return (
      <div className={classes.content}>
        {this.state.usuariosRecientes != undefined && (
          <Grid container>
            <Grid item xs={12}>
              <List>
                {this.state.usuariosRecientes.map((item, index) => {
                  const urlFoto =
                    "https://servicios2.cordoba.gov.ar/cordobafiles/archivo/" +
                    item.identificadorFotoPersonal +
                    "/3";

                  return (
                    <UsuarioReciente
                      data={item}
                      key={index}
                      onClick={this.onUsuarioClick}
                      onBorrarClick={this.onBorrarClick}
                    />
                  );
                })}
              </List>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }

  renderFooter() {
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

class UsuarioReciente extends React.PureComponent {
  onClick = () => {
    this.props.onClick(this.props.data);
  };

  onBorrarClick = e => {
    e.stopPropagation();
    this.props.onBorrarClick(this.props.data);
  };

  render() {
    if (this.props.data === undefined) return null;
    let fecha = "";
    if (this.props.data.fecha !== undefined) {
      fecha =
        "Último acceso: " + moment(this.props.data.fecha).format("DD/MM/YYYY");
    }

    const urlFoto =
      "https://servicios2.cordoba.gov.ar/cordobafiles/archivo/" +
      this.props.data.identificadorFotoPersonal +
      "/3";

    return (
      <ListItem button onClick={this.onClick}>
        {this.props.data.esOtraCuenta === true ? (
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
        ) : (
          <Avatar
            style={{
              backgroundImage: "url(" + urlFoto + ")",
              backgroundSize: "cover"
            }}
          />
        )}
        <ListItemText
          primary={
            (this.props.data.nombre || "") +
            " " +
            (this.props.data.apellido || "")
          }
          secondary={fecha}
        />
        {this.props.data.esOtraCuenta !== true && (
          <IconButton onClick={this.onBorrarClick}>
            <Icon>delete</Icon>
          </IconButton>
        )}
      </ListItem>
    );
  }
}
const styles = theme => {
  return {
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      height:'100%'

    },
    content: {
      flex: 1,
      overflow: "auto",
      padding: "16px"
    },
    footer: {
      borderTop: "1px solid rgba(0,0,0,0.1)",
      padding: "16px",
      display: "flex"
    }
  };
};

let componente = PaginaUsuariosRecientes;
componente = withStyles(styles)(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
export default componente;

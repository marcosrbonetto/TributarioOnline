import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

//Componentes
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// import Badge from "@material-ui/core/Badge";
// import IconoAccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Popper from "@material-ui/core/Popper";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListItemText from "@material-ui/core/ListItemText";

import MiCard from "@Componentes/MiCard";

//REDUX
import { connect } from "react-redux";
import { cerrarSesion } from "@Redux/Actions/usuario";
import Icon from '@material-ui/core/Icon';

const mapStateToProps = state => {
  return { usuario: state.Usuario.usuario };
};

const mapDispatchToProps = dispatch => {
  return {
    cerrarSesion: () => {
      dispatch(cerrarSesion());
    }
  };
};

class MiToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);

    this.state = {
      anchorPopupUsuario: undefined,
      anchorEl: null,
      open: false
    };
  }

  onUsuarioPress = event => {
    if (this.props.cargando) return;
    this.setState({ anchorPopupUsuario: event.currentTarget });
  };

  onUsuarioMenuClose = () => {
    if (this.props.cargando) return;
    this.setState({ anchorPopupUsuario: null });
  };

  onBotonCerrarSesionPress = () => {
    if (this.props.cargando) return;
    this.setState({ anchorPopupUsuario: null });
    this.props.cerrarSesion();
  };

  handleDrawerClose = () => {
    if (this.props.cargando) return;
    this.props.onClose();
  };

  handleDrawerOpen = () => {
    if (this.props.cargando) return;

    if (this.props.open) {
      this.props.onClose();
    } else {
      this.props.onOpen();
    }
  };

  handleToggle = event => {
    const { currentTarget }  = event;
    this.setState({ 
      anchorEl: currentTarget,
      open: !this.state.open 
    });
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  }

  render() {
    let { classes, titulo } = this.props;

    const { open, anchorEl, expanded } = this.state;

    return (
      <AppBar position="absolute" className={classNames(classes.appBar)}>
        <Toolbar disableGutters={true} className={classes.toolbar}>
          {this.props.renderLeftIcon != undefined &&
            this.props.renderLeftIcon()}

          {this.props.renderLeftIcon == undefined &&
            this.props.leftIcon != undefined && (
              <div className={classes.menuButton}>
                <IconButton
                  color="inherit"
                  aria-label={this.props.leftIconHint || "Boton del toolbar"}
                  onClick={this.props.leftIconClick}
                >
                  <Icon>{this.props.leftIcon}</Icon>
                </IconButton>
              </div>
            )}

          {/* Logo muni */}
          {<img
            className={classes.logoMuni}
            src="https://www.cordoba.gob.ar/wp-content/uploads/2016/07/logo-oscuro-01.png"
          />}


          <Typography
            variant="title"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {titulo}
          </Typography>

          {/* Icono de Notificaciones */}
          <IconButton
            className={classes.marginIcon}
            color="inherit"
            onClick={this.handleToggle}
          >
            <Badge badgeContent={17} color="secondary" >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Icono del usuario */}
          <IconButton onClick={this.onUsuarioPress} color="inherit">
            <Avatar
              alt="Menu del usuario"
              src="https://servicios2.cordoba.gov.ar/CordobaFiles/Archivo/f_qdag0f9irgka9xj2l6mbll69gxmhlghezkmkj2mykg1pj0uuhwogqiqfic_c327l9gmyk9tutz1fuq0rc3_z2byq5gcg2j5tjpqcn6jid4x2rlv2nsaa2it7s64d7m2k4h7e_xegt2w8p79uvk4jj42a7uvrcfm1cn8jpq31o4raxvsv8ktwtsa_q6iqbxeop56c_zee/3"
              className={classNames(classes.icono)}
            />
          </IconButton>
        </Toolbar>

        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorPopupUsuario}
          getContentAnchorEl={null}
          className={classes.menuUsuario}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(this.state.anchorPopupUsuario)}
          onClose={this.onUsuarioMenuClose}
        >
          <div className={classes.menuUsuarioInfo} style={{ display: "flex" }}>
            <Avatar
              alt="Menu del usuario"
              src="https://servicios2.cordoba.gov.ar/CordobaFiles/Archivo/f_qdag0f9irgka9xj2l6mbll69gxmhlghezkmkj2mykg1pj0uuhwogqiqfic_c327l9gmyk9tutz1fuq0rc3_z2byq5gcg2j5tjpqcn6jid4x2rlv2nsaa2it7s64d7m2k4h7e_xegt2w8p79uvk4jj42a7uvrcfm1cn8jpq31o4raxvsv8ktwtsa_q6iqbxeop56c_zee/3"
              className={classNames(classes.icono)}
            />
            <Typography align="center" variant="subheading" color="inherit">
              Federico Gabriel asdasd asdasd adasdasd asdasda sdasd asdasd
              asdasda Amura
            </Typography>
          </div>

          <MenuItem onClick={this.handleClose}>Mi perfil</MenuItem>
          <MenuItem divider onClick={this.handleClose}>
            Cambiar contraseña
          </MenuItem>
          <MenuItem onClick={this.onBotonCerrarSesionPress}>
            Cerrar sesión
          </MenuItem>
        </Menu>


        <Popper open={open} anchorEl={anchorEl} transition disablePortal>
          {open && <MiCard padding={false}>
            <Typography className={classes.titleMiCard} variant="subheading"><b>Notificaciones</b></Typography>

            <Badge badgeContent={7} color="secondary" classes={{ badge: classes.badgeNotificaciones}}>
              <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                  <Typography variant="subheading">Mis Notificaciones</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.detalleNotificacion}>
                  <MenuList className={classes.listNotificacion}>
                    <MenuItem onClick={this.handleToggle}>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Notificacion 1" />
                    </MenuItem>
                    <MenuItem onClick={this.handleToggle}>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Notificacion 2" />
                    </MenuItem>
                  </MenuList>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Badge>
            <br/>
            <Badge badgeContent={10} color="secondary" classes={{ badge: classes.badgeNotificaciones}}>
              <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                  <Typography variant="subheading">20-35526616-9</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.detalleNotificacion}>
                  <MenuList className={classes.listNotificacion}>
                    <MenuItem onClick={this.handleToggle}>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Notificacion 1" />
                    </MenuItem>
                    <MenuItem onClick={this.handleToggle}>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Notificacion 2" />
                    </MenuItem>
                  </MenuList>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Badge>

          </MiCard>}
        </Popper>

        <div
          className={classNames(
            classes.contenedorCargando,
            this.props.cargando == true && classes.contenedorCargandoVisible
          )}
        >
          <LinearProgress color="secondary" />
        </div>
      </AppBar>
    );
  }
}

const styles = theme => {
  return {
    toolbar: {
      paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 12
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 2
    },
    logoMuni: {
      width: '140px',
      marginRight: '20px'
    },
    title: {
      borderLeft: '1px solid rgba(0,0,0,0.2)',
      padding: '10px 0px 10px 20px',
      flexGrow: 1
    },
    titleMiCard: {
      background: '#149257',
      color: '#fff',
      padding: '14px',
      margin: '0px',
    },
    icono: {
      width: 40,
      height: 40,
      borderRadius: 40,
      backgroundColor: "white"
    },
    menuUsuario: {
      "& div:nth-child(2)": {
        width: "20rem",
        minWidth: "20rem",
        maxWidth: "20rem"
      },
      "& ul": {
        paddingTop: 0
      }
    },
    menuUsuarioInfo: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing.unit * 2,
      "& h2": {
        marginLeft: theme.spacing.unit
      },
      "& > div": {
        width: "5rem",
        height: "5rem",
        marginBottom: "0.5rem"
      },
      "&:focus": {
        outline: "none"
      },
      backgroundColor: "rgba(0,0,0,0.025)",
      borderBottom: "1px solid rgba(0, 0, 0, 0.095);"
    },
    contenedorCargando: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      opacity: 0,
      transition: "all 0.3s"
    },
    contenedorCargandoVisible: {
      opacity: 1
    },
    marginIcon: {
      margin: '0px 15px'
    },
    dividerMiCard: {
      margin: '10px 0px'
    },
    detalleNotificacion: {
      padding: '0px',
      width: '300px'
    },
    listNotificacion: {
      width: '100%'
    },
    badgeNotificaciones: {
      top: '12px',
      right: '20px',
    }
  };
};

let componente = undefined;
componente = withStyles(styles)(MiToolbar);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
export default componente;

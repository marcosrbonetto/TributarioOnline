import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

//Componentes
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
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

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MiCard from "@Componentes/MiCard";

//REDUX
import { connect } from "react-redux";

class MiNotificacion extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleToggleLista = this.handleToggleLista.bind(this);

    this.state = {
      anchorEl: null,
      openListado: false,
      openNotificacion: false,
      notificacion: {
        tituloNotificacion: '',
        textoNotificacion: ''
      }
    };
  }

  handleToggleLista = event => {
    const { currentTarget } = event;
    this.setState({
      anchorEl: currentTarget,
      openListado: !this.state.openListado
    });
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  }

  handleToggleNotificacion = event => {
    this.setState({
      openNotificacion: !this.state.openNotificacion
    });
  }

  handleClickItemLista = event => {
    this.handleToggleLista(event);
    this.setState({
      notificacion: {
        tituloNotificacion: 'Notificacion 1',
        textoNotificacion: 'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac\
              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum\
              at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus\
              sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum\
              nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur\
              et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras\
              mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,\
              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.\
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis\
              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla\
              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.\
              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis\
              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,\
              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.\
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis\
              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla\
              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.\
              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis\
              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,\
              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.\
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis\
              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla\
              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.\
              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis\
              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,\
              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.\
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis\
              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla\
              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.\
              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis\
              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,\
              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.\
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis\
              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla\
              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.\
              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.'
      }
    });
    this.handleToggleNotificacion();
  }



  render() {
    let { classes } = this.props;

    const { openListado, openNotificacion, anchorEl, expanded } = this.state;

    return (
      <div>
        {/* Icono de Notificaciones */}
        <IconButton
          className={classes.marginIcon}
          color="inherit"
          onClick={this.handleToggleLista}
        >
          <Badge badgeContent={4} color="secondary" >
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Popper open={openListado} anchorEl={anchorEl} transition disablePortal>
          {openListado && <MiCard padding={false}>
            <Typography className={classes.titleMiCard} variant="subheading"><b>Notificaciones</b></Typography>

            <Badge badgeContent={2} color="secondary" classes={{ badge: classes.badgeNotificaciones }}>
              <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                <ExpansionPanelSummary>
                  <Typography variant="subheading">Mis Notificaciones</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.detalleNotificacion}>
                  <MenuList className={classes.listNotificacion}>
                    <MenuItem onClick={this.handleClickItemLista}>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Notificacion 1" />
                    </MenuItem>
                    <MenuItem onClick={this.handleClickItemLista}>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Notificacion 2" />
                    </MenuItem>
                  </MenuList>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Badge>
            <br />
            <Badge badgeContent={2} color="secondary" classes={{ badge: classes.badgeNotificaciones }}>
              <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                <ExpansionPanelSummary>
                  <Typography variant="subheading">20-35526616-9</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.detalleNotificacion}>
                  <MenuList className={classes.listNotificacion}>
                    <MenuItem onClick={this.handleClickItemLista}>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Notificacion 1" />
                    </MenuItem>
                    <MenuItem onClick={this.handleClickItemLista}>
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


        <Dialog
          open={openNotificacion}
          onClose={this.handleToggleNotificacion}
          scroll='paper'
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">{this.state.notificacion.tituloNotificacion}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.notificacion.textoNotificacion}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleToggleNotificacion} color="secondary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const styles = theme => {
  return {
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
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
    marginIcon: {
      margin: '0px 15px'
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
componente = withStyles(styles)(MiNotificacion);
componente = connect(
  null,
  null
)(componente);
export default componente;
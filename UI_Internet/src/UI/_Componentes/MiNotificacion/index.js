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
import Popover from "@material-ui/core/Popover";

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

import servicesNotificaciones from '@Rules/Rules_Notificaciones';

//REDUX
import { connect } from "react-redux";

class MiNotificacion extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      openNotificacion: false,
      notificacion: {
        tituloNotificacion: '',
        textoNotificacion: ''
      }
    };
  }

  componentDidMount() {
    servicesNotificaciones.getMisNotificaciones(this.props.token)
    .then((datos) => {
      if (!datos.ok) { return false; }

      
    });
  }

  handleClick  = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

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
    this.handleClick (event);
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

    const { openNotificacion, anchorEl, expanded } = this.state;
    const openListado = Boolean(anchorEl);

    return (
      <div>
        {/* Icono de Notificaciones */}
        <IconButton
          className={classes.marginIcon}
          color="inherit"
          onClick={this.handleClick}
        >
          <Badge badgeContent={4} color="secondary" >
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Popover 
        open={openListado} 
        anchorEl={anchorEl} 
        onClose={this.handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{ 
          paper: classes.contentPopover
        }}>
          <MiCard padding={false}>
            <Typography className={classes.titleMiCard} variant="subheading"><b>Notificaciones</b></Typography>

            <Badge badgeContent={2} color="secondary" classes={{ badge: classes.badgeNotificaciones }}>
              <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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

          </MiCard>
        </Popover>


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
      right: '46px',
    },
    contentPopover: {
      borderRadius: '16px'
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
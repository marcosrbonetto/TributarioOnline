import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

//Componentes
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";

//Mis componntes
import Menu from "../menu";
import DrawerItem from "./DrawerItem";

class MiDrawer extends React.PureComponent {
  handleDrawerClose = () => {
    this.props.onClose();
  };

  handleDrawerOpen = () => {
    this.props.onOpen();
  };

  onDrawerItemClick = index => {
    if (this.props.onPaginaClick == undefined) return;
    this.props.onPaginaClick(Menu[index].url);
  };

  render() {
    const { classes, open, paraMobile, paginaActual } = this.props;
    return (
      <SwipeableDrawer
        onClose={this.handleDrawerClose}
        onOpen={this.handleDrawerOpen}
        variant={paraMobile ? "temporary" : "permanent"}
        classes={{
          paper: classNames(
            classes.drawerPaper,
            paraMobile == false && !open && classes.drawerPaperClose
          )
        }}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        open={open}
      >
        {/* <DrawerComponent {...this.props}> */}
        {paraMobile == false && (
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
        )}

        <List component="nav">
          {Menu.map((item, index) => {
            if (item.mostrarEnMenu == false) return null;
            return (
              <DrawerItem
                key={index}
                index={index}
                texto={item.nombre || "Sin texto"}
                icono={item.icono}
                seleccionado={paginaActual.url == item.url}
                onClick={this.onDrawerItemClick}
              />
            );
            // return (
            //   <ListItem
            //     button
            //     key={index}
            //     onClick={() => {
            //       this.props.onPaginaClick(item.url);
            //     }}
            //     selected={paginaActual.url == item.url}
            //   >
            //     {item.icono != undefined && (
            //       <ListItemIcon>
            //         <Icon>{item.icono}</Icon>
            //       </ListItemIcon>
            //     )}
            //     <ListItemText primary={item.nombre} />
            //   </ListItem>
            // );
          })}
        </List>
      </SwipeableDrawer>
    );
  }
}

const drawerWidth = 240;
const styles = theme => {
  return {
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    drawerPaper: {
      overflow: "hidden",
      position: "relative",
      whiteSpace: "nowrap",
      backgroundColor: theme.palette.background.default,
      width: drawerWidth,
      borderRight: "none",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerParaMobile: {
      backgroundColor: "white"
    },
    drawerEscritorio: {
      backgroundColor: theme.palette.secondary.light
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing.unit * 9
      }
    }
  };
};

export default withStyles(styles)(MiDrawer);

import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import "./style.css";
import _ from "lodash";

//Router
import { Route, withRouter } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";

//REDUX
import { connect } from "react-redux";
import { push } from "connected-react-router";

//Compontes
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

//Mis Componentes
import MiDrawer from "./_DrawerNavigation/index";
import MiToolbar from "@Componentes/MiToolbar";
import Menu from "./menu";

const mapStateToProps = state => {
  return {
    usuario: state.Usuario.usuario,
    cargando: state.MainContent.cargando
  };
};

const mapDispatchToProps = dispatch => ({
  redireccionar: url => {
    dispatch(push(url));
  }
});

const limite = "lg";
class App extends React.Component {
  constructor(props) {
    super(props);

    let paraMobile = !isWidthUp(limite, props.width);
    this.state = {
      open: paraMobile ? false : true,
      paraMobile: paraMobile
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  onResize = () => {
    setTimeout(() => {
      let paraMobile = !isWidthUp(limite, this.props.width);
      this.setState({
        open: false,
        paraMobile: paraMobile
      });
    }, 500);
  };

  onDrawerOpen = () => {
    this.setState({ open: true });
  };

  onDrawerClose = () => {
    this.setState({ open: false });
  };

  toggleDrawerOpen = () => {
    if (this.props.cargando == true) return;
    this.setState({ open: !this.state.open });
  };

  onDrawerItemClick = url => {
    if (this.props.cargando == true) return;

    let drawerOpen = this.state.open;
    if (this.state.paraMobile == true) drawerOpen = false;

    this.setState({ open: drawerOpen }, () => {
      this.props.redireccionar(url);
    });
  };

  onSubPaginaCargando = cargando => {
    this.setState({ cargando: cargando });
  };

  render() {
    const { classes, width, location } = this.props;

    let paginaActual = _.find(Menu, item => {
      return item.url == location.pathname;
    });

    return (
      <React.Fragment>
        <div className={classes.root}>
          {/* Toolbar */}
          <MiToolbar
            paraMobile={this.state.paraMobile}
            titulo={paginaActual.titulo}
            cargando={this.props.cargando}
            width={width}
            leftIcon="menu"
            leftIconClick={this.toggleDrawerOpen}
          />

          {/* Drawer */}
          <MiDrawer
            width={width}
            paginaActual={paginaActual}
            paraMobile={this.state.paraMobile}
            onOpen={this.onDrawerOpen}
            onClose={this.onDrawerClose}
            onPaginaClick={this.onDrawerItemClick}
            open={this.state.open}
          />

          {/* Contenido */}
          <div className={classNames(classes.main)}>
            <div className={classes.separadorToolbar} />
            <div className={classes.content}>
              <Route path="/" component={Content} />
            </div>
          </div>
        </div>

        <div
          className={classNames(
            classes.contentOverlayCargando,
            this.props.cargando == true && classes.contentOverlayCargandoVisible
          )}
        />
      </React.Fragment>
    );
  }
}

const Content = () => {
  return (
    <div className={styles.switchWrapper}>
      <AnimatedSwitch
        atEnter={{ opacity: 0, top: 20 }}
        atLeave={{ opacity: 0, top: 0 }}
        atActive={{ opacity: 1, top: 0 }}
        className={"switch-wrapper"}
      >
        {Menu.map((item, index) => {
          return (
            <Route
              key={index}
              exact={item.exact}
              path={item.url}
              component={item.component}
            />
          );
        })}
      </AnimatedSwitch>
    </div>
  );
};

const styles = theme => {
  return {
    root: {
      display: "flex",
      width: "100%",
      height: "100vh",
      backgroundColor: theme.palette.background.default
    },
    main: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.background.default
    },
    separadorToolbar: theme.mixins.toolbar,
    content: {
      backgroundColor: theme.palette.background.default,
      flex: 1,
      width: "100%",
      overflow: "auto",
      "& > div": {
        width: "100%",
        height: "100%"
      }
    },
    contentOverlayCargando: {
      backgroundColor: "rgba(255,255,255,0.6)",
      position: "absolute",
      left: 0,
      right: 0,
      zIndex: theme.zIndex.drawer + 1,
      top: 0,
      bottom: 0,
      opacity: 0,
      pointerEvents: "none",
      transition: "opacity 0.3s"
    },
    contentOverlayCargandoVisible: {
      opacity: 1,
      pointerEvents: "auto"
    },
    switchWrapper: {
      backgroundColor: theme.palette.background.default,
      position: "relative",
      width: "100%",
      flex: 1
    }
  };
};

let componente = undefined;
componente = withStyles(styles)(App);
componente = withWidth()(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

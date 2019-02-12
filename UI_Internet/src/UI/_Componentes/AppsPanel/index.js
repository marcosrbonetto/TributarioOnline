import React from "react";
import { withStyles } from "@material-ui/core/styles";

import AppsIcon from '@material-ui/icons/Apps';
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import MiCard from "@Componentes/MiCard";

class AppsPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    }
  }

  handleClickPanelVV = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleClosePanelVV = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { anchorEl } = this.state;

    let {
      classes,
      token,
      aplicacionesPanel
    } = this.props;

    return (
      <React.Fragment>
        <IconButton
          aria-label="More"
          aria-haspopup="true"
          onClick={this.handleClickPanelVV}
        >
          <AppsIcon />
        </IconButton>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClosePanelVV}
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
          }}
        >
          <MiCard contentClassName={classes.containerMiCard} padding={false} className={classes.styleMiCard}>
            {aplicacionesPanel && aplicacionesPanel.map((item, index) => {
              let urlRedirect = item.url;
              if (item.urlToken && token && token != 'INVITADO') {
                urlRedirect = item.urlToken.replace(/{token}/g, token);
              }

              let nombreItem = item.nombre;
              if(nombreItem.indexOf('.') != -1) {
                nombreItem = item.nombre.split('.')[1];
              }

              return <a href={urlRedirect} target="_blank" className={classes.containerItems}>
                <Avatar title={item.nombre} alt={item.nombre} src={item.urlIcono} className={classes.bigAvatar} />
                <Typography align="center" variant="subheading" color="inherit" className={classes.textoItem}>
                  {nombreItem}
                </Typography>
              </a>;
            })}
          </MiCard>
        </Popover>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  contentPopover: {
    borderRadius: '10px'
  },
  containerMiCard: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  styleMiCard: {
    borderRadius: '10px',
    padding: '10px',
    width: '264px',
    display: 'flex'
  },
  containerItems: {
    width: '100px',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#000'
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
    display: 'inline-block',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 0px 16px 0px #149257'
    }
  },
  textoItem: {
    fontSize: '12px'
  }
});

export default withStyles(styles)(AppsPanel);

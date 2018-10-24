import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { connect } from "react-redux";

import { Typography } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";

class MiControledDialog extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  getComponent(key) {

    if (Array.isArray(this.props.children) && this.props.children.filter((seccion)=>{return seccion.key == "mainContent"}).length > 0)
      return this.props.children.filter((comp) => {
        return comp.key === key;
      });
    else if (key == 'mainContent')
      return this.props.children

    return false;
  }

  handleOpenModal = event => {

    if (this.props.promiseBeforeOpen) {
      this.props.promiseBeforeOpen()
        .then(() => {
          this.props.onDialogoOpen && this.props.onDialogoOpen();
        });
      return;
    }

    this.props.onDialogoOpen && this.props.onDialogoOpen();
  };

  handleCloseModal = (event) => {
    this.props.onDialogoClose && this.props.onDialogoClose();

  };

  render() {
    let { classes, titulo, textoLink } = this.props;

    return (
      <div>
        {!this.props.buttonAction &&
          <Typography
            onClick={this.handleOpenModal}
            variant="subheading" className={classNames(classes.textList, classes.link)} gutterBottom>{textoLink}</Typography>
        }
        {this.props.buttonAction && 
          <div>
            {this.getComponent('buttonAction')}
          </div>
        }
        <Dialog
          open={this.props.open}
          scroll='paper'
          aria-labelledby="scroll-dialog-title"
          classes={{
            paper: classes.maxWidth
          }}
        >
          <DialogTitle id="scroll-dialog-title">{titulo}</DialogTitle>
          <DialogContent className={classes.content}>
            <DialogContentText>
              {this.getComponent('headerContent')}
              {this.getComponent('mainContent')}
              {this.getComponent('footerContent')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseModal} color="secondary">Cerrar</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  textList: {
    lineHeight: '28px',
    position: 'relative',
    top: '2px'
  },
  link: {
    color: theme.color.info.main,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  maxWidth: {
    maxWidth: '748px'
  },
  content: {
    paddingBottom: '0px'
  }
});

let componente = undefined;
componente = withStyles(styles)(MiControledDialog);
componente = connect(
  null,
  null
)(componente);
export default componente;
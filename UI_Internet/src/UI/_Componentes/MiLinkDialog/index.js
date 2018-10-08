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

class MiLinkDialog extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }
  
  handleOpenModal = event => {

    if(this.props.promiseBeforeOpen) {
      return this.props.promiseBeforeOpen()
      .then(() => {
        this.setState({
          open: true
        });
      });
    }

    this.setState({
      open: true
    });
  };

  handleCloseModal = (event) => {
    this.setState({
      open: false
    });
  };

  render() {
    let { classes, titulo, textoLink } = this.props;

    return (
      <div>
        <Typography
          onClick={this.handleOpenModal}
          variant="subheading" className={classNames(classes.textList, classes.link)} gutterBottom>{textoLink}</Typography>

        <Dialog
          open={this.state.open || false}
          scroll='paper'
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">{titulo}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.children}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseModal} color="secondary">
              Cerrar
                    </Button>
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
});

let componente = undefined;
componente = withStyles(styles)(MiLinkDialog);
componente = connect(
  null,
  null
)(componente);
export default componente;
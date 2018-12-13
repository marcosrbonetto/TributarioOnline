import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import Button from "@material-ui/core/Button";
import Tooltip from '@material-ui/core/Tooltip';

class MisBeneficios extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button
          variant="contained"
          color="secondary"
          className={classNames(classes.buttonActions, classes.promotionButton)}
        >Beneficios</Button>

        <div className={classes.infoContainer}>
          <Tooltip classes={{ tooltip: classes.textTooltip }} title={<span>Las promociones estarán<br />vigentes desde el año 2019</span>}>
            <i className={classNames(classes.infoIcon, "material-icons")}>info</i>
          </Tooltip>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'inline-block'
  },
  buttonActionsContent: {
    textAlign: 'right',
    marginTop: '18px'
  },
  buttonActions: {
    display: 'inline-block',
    minWidth: 'auto',
    margin: '2px',
    borderRadius: '20px',
  },
  promotionButton: {
    background: '#ffa114',
    '&:hover': {
      background: '#ffa114'
    }
  },
  infoContainer: {
    display: 'inline-block',
    width: '36px',
    height: '45px',
    textAlign: 'left',
  },
  infoIcon: {
    color: '#0f8fea',
    verticalAlign: 'middle',
    cursor: 'help'
  },
  textTooltip: {
    fontSize: 16,
  }
});

let componente = MisBeneficios;
componente = withStyles(styles)(componente);
export default componente;

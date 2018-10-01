import React from 'react';
import { withStyles } from "@material-ui/core/styles";

import styles from './styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Badge from '@material-ui/core/Badge';

class MiSolicPermisos extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checked: [],
      cantPermisos: 0
    };
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });

    this.props.addPermiso(this.props.tipo,newChecked.length);
  };

  render() {
    let { classes } = this.props;

    return (
      <div className={classes.root}>
        <Badge badgeContent={this.props.cantPermisos} color="secondary" className={classes.lista}>
          <ExpansionPanel className={classes.lista}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{this.props.label}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List>
                {this.props.opciones && this.props.opciones.map(value => (
                  <ListItem key={value} dense button className={classes.listItem}>
                    <ListItemText primary={`${value}`} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        onChange={this.handleToggle(value)}
                        checked={this.state.checked.indexOf(value) !== -1}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Badge>
      </div>
    );
  }
}

let componente = MiSolicPermisos;
componente = withStyles(styles)(componente);
export default componente;

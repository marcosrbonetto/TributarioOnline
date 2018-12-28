import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import _ from "lodash";

import Button from "@material-ui/core/Button";
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

//Beneficios
import beneficios from './beneficios';

class MisBeneficios extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      anchorEl: null,
      itemChecked: 0,
      arrayBeneficios: []
    };
  }

  componentDidMount() {
    //Corroboramos que el tipoTributo y la sección tienen los beneficios
    const tipoTributoArrayBeneficios = beneficios[this.props.tipoTributo];
    if (tipoTributoArrayBeneficios) {
      const arrayBeneficios = _.filter(tipoTributoArrayBeneficios, (beneficio) => {
        return beneficio.secciones.indexOf(this.props.seccion) != -1;
      });

      if (arrayBeneficios.length > 0) {
        this.setState({ arrayBeneficios: arrayBeneficios });
        return true;
      }
    }

    this.setState({ visible: false });
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event) => {
    let idItemSeleccionado = parseInt(event.currentTarget.attributes.idbeneficio.value);

    if (this.state.itemChecked == idItemSeleccionado) {
      //Reseteo
      const beneficio = _.find(this.state.arrayBeneficios, { 'key': idItemSeleccionado });
      idItemSeleccionado = 0;
      this.handleBeneficio(beneficio,idItemSeleccionado); 
    } else {
      const beneficio = _.find(this.state.arrayBeneficios, { 'key': idItemSeleccionado });
      this.handleBeneficio(beneficio,idItemSeleccionado); //Seteo
    }

    this.setState({
      anchorEl: null,
      itemChecked: idItemSeleccionado
    });
  };

  handleBeneficio = (beneficio,idItemSeleccionado) => {
    if (!this.props.rows) return [];

    let result = undefined;

    if (idItemSeleccionado != 0) {
      let arrayRows = this.props.rows;
      _.each(arrayRows, (row) => {
        beneficio.condicion(row);
      });

      var itemsSeleccionados  =_.filter(arrayRows,(o) => { return o.data.checked == true});
      const idSeleccionados=  _.map(itemsSeleccionados,'id');

      result = {
        rowList: arrayRows,
        rowsSelected: idSeleccionados,
        tableDisabled: beneficio.tableDisabled
      };
    } else {
      let arrayRows = this.props.rows;
      _.each(arrayRows, (row) => {
        beneficio.reset(row);
      });

      result = {
        rowList: arrayRows,
        rowsSelected: [],
        tableDisabled: false
      };
    }

    this.props.handleBeneficiosResult && this.props.handleBeneficiosResult(result);
  }

  handleCloseMenu = () => {
    this.setState({
      anchorEl: null
    });
  }

  render() {
    let { classes, tipoTributo, seccion } = this.props;
    const { visible, anchorEl, itemChecked, arrayBeneficios } = this.state;

    return (<div className={classNames(classes.root, "BtnMisBeneficios")}>
      {visible && <div>
        <Button
          variant="contained"
          color="secondary"
          className={classNames(classes.buttonActions, classes.promotionButton)}
          onClick={this.handleClick}
        >Beneficios</Button>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleCloseMenu}
        >
          {arrayBeneficios.map((beneficio, key) => {
            return <MenuItem key={key} idbeneficio={beneficio.key} onClick={this.handleClose}>
              <Checkbox
                checked={itemChecked == beneficio.key}
                disableRipple
              />{beneficio.titulo}
            </MenuItem>
          })}
        </Menu>

        <div className={classes.infoContainer}>
          <Tooltip
            disableFocusListener disableTouchListener
            classes={{ tooltip: classes.textTooltip }}
            title={
              <span>CONTRIBUYENTE CUMPLIDOR 2019 INMOBILIARIO Y AUTOMOTOR<br />
                BENEFICIO DTO. 3068/2018<br />
                <br />
                Cancelá tu deuda vencida hasta el 18/12/2018 y obtené el premio Contribuyente Cumplidor 2019.<br />
                <br />
                Recordá que se encuentra vigente una reducción del 50% de los recargos por pago de CONTADO
              </span>
            }
          >
            <i className={classNames(classes.infoIcon, "material-icons")}>info</i>
          </Tooltip>
        </div>
      </div>}
    </div>);
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

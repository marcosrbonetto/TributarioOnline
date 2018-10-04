import React from "react";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import { connect } from "react-redux";
import classNames from 'classnames';

//Router
import { withRouter } from "react-router-dom";

//Redux
import { mostrarCargando } from '@Redux/Actions/mainContent'
import { replace, push } from "connected-react-router";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import Modal from '@material-ui/core/Modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';

import MiCard from "@Componentes/MiCard";
import MiTabla from "@Componentes/MiTabla";

import cedulonFoto from './img/cedulon.png';
import cedulonFoto2 from './img/MP4.png';

import { getInfoTributo } from "@ReduxSrc/TributarioOnline/DetalleTributario/Automotores/actions";

import services from './services.js';

const mapStateToProps = state => {
  return { infoTributo: state.Automotores.infoTributo };
};

const mapDispatchToProps = dispatch => ({
  mostrarCargando: (cargar) => {
    dispatch(mostrarCargando(cargar));
  },
  getInfoTributo: (datos) => {
    dispatch(getInfoTributo(datos));
  },
  redireccionar: url => {
    dispatch(replace(url));
  }
});

class DetalleTributo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.numItemGrilla = 0;

    this.state = {
      importeAPagar: '0,00',
      identificadorActual: this.props.match.params.identificador,
      menuItemSeleccionado: 'item0',
      anchorEl: null,
    };
  }

  componentWillMount() {
    this.props.mostrarCargando(true);
    console.log("itemMenu");
    services.getInfoTributo('HCJ675', (datos) => {
      this.props.getInfoTributo(datos);
      this.props.mostrarCargando(false);
    });
  }

  getTotalSeleccionado = (importeTotal) => {
    this.setState({ importeAPagar: importeTotal.toFixed(2).replace('.', ',') });
  };

  handleOpenModalCedulon = () => {
    this.setState({ openModalCedulon: true });
  };

  handleOpenModalMercadoPago = () => {
    this.setState({ openModalMercadoPago: true });
  };

  handleCloseModalCedulon = () => {
    this.setState({ openModalCedulon: false });
  };

  handleCloseModalMercadoPago = () => {
    this.setState({ openModalMercadoPago: false });
  };

  selectIdentificador = event => {
    if (event.target.value == '0')
      return false;


    this.setState({
      identificadorActual: event.target.value
    });

    this.props.mostrarCargando(true);
    this.props.redireccionar('/DetalleTributario/' + event.target.value);
    window.location.reload();//Recargamos la pagina con la nueva url
  };

  handleMenuChange = (event, value) => {

    this.setState({
      menuItemSeleccionado: value
    });
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  getCustomCell = (datosExtra) => {
    const { classes } = this.props;

    return <div>
      <Typography
        onClick={this.handlePopoverOpen}
        className={classes.link}
      >Detalle</Typography>
        <Popover
          id="simple-popper"
          open={Boolean(this.state.anchorEl)}
          anchorEl={this.state.anchorEl}
          onClose={this.handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Paper className={classes.contaninerDetalle}>
            <div class="closePopover" onClick={this.handlePopoverClose}>x</div>
            <Typography className={classes.typography}>Base: <b>$ {datosExtra.data.importe.base}</b></Typography>
            <Typography className={classes.typography}>Recargo: <b>$ {datosExtra.data.importe.recargo}</b></Typography>
            <Typography className={classes.typography}>Deducción: <b>$ {datosExtra.data.importe.deduccion}</b></Typography>
            <Typography className={classes.typography}>Citación: <b>$ {datosExtra.data.importe.citacion}</b></Typography>
          </Paper>
        </Popover>
    </div>;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mainContainer}>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={8}>
            <MiCard>
              <Typography className={classes.title} variant="title">Dominio:
              <Select
                  className={classes.selectIdentificador}
                  inputProps={{
                    name: 'identificador',
                    id: 'identificador',
                  }}
                  value={this.state.identificadorActual}
                  disableUnderline
                  onChange={this.selectIdentificador}
                >
                  <MenuItem value="HCJ675">
                    HCJ675
                    </MenuItem>
                  <MenuItem value="FGH454">
                    FGH454
                    </MenuItem>
                </Select>
              </Typography>

              <Typography className={classes.infoTexto}>
                {`
                En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas
              `}
              </Typography>

              <Grid container spacing={16}>
                <Grid item sm={12} className={classes.tabMenu}>

                  <Tabs
                    value={this.state.menuItemSeleccionado}
                    onChange={this.handleMenuChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    scrollable
                    scrollButtons="on"
                  >

                    <Tab className={classes.itemMenu} value="item0" label={
                      <Badge classes={{ badge: classes.badgeMenu }} color="secondary" badgeContent={4}>
                        Contribución por período
                  </Badge>} />

                    <Tab className={classes.itemMenu} value="item1" label={
                      <Badge classes={{ badge: classes.badgeMenu }} color="secondary" badgeContent={4}>
                        Multas
                      </Badge>} />

                    <Tab className={classes.itemMenu} value="item2" label={
                      <Badge classes={{ badge: classes.badgeMenu }} color="secondary" badgeContent={4}>
                        Juicios por contribución
                  </Badge>} />

                    <Tab className={classes.itemMenu} value="item3" label={
                      <Badge classes={{ badge: classes.badgeMenu }} color="secondary" badgeContent={4}>
                        Juicios por multas
                  </Badge>} />

                    <Tab className={classes.itemMenu} value="item4" label={
                      <Badge classes={{ badge: classes.badgeMenu }} color="secondary" badgeContent={4}>
                        Planes de pago
                      </Badge>} />

                  </Tabs>

                </Grid>
              </Grid>

              {this.state.menuItemSeleccionado == 'item0' && <div>
                <Grid container className={classes.containerDeudaAdm}>
                  <Typography className={classes.tituloDeudaAdm} variant="title" gutterBottom>Deuda Administrativa</Typography>
                  <Grid item sm={4}>
                    <Grid container>
                      <Grid item sm={6}>
                        <Typography variant="subheading" gutterBottom>Total: </Typography>
                      </Grid>
                      <Grid item sm={6}>
                        <Typography variant="subheading" gutterBottom><b>$ {this.props.infoTributo.deudaAdministrativa && this.props.infoTributo.deudaAdministrativa.total}</b></Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={4}>
                    <Grid container>
                      <Grid item sm={6}>
                        <Typography variant="subheading" gutterBottom>Vencida: </Typography>
                      </Grid>
                      <Grid item sm={6}>
                        <Typography variant="subheading" gutterBottom><b>$ {this.props.infoTributo.deudaAdministrativa && this.props.infoTributo.deudaAdministrativa.vencida}</b></Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={4}>
                    <Grid container>
                      <Grid item sm={6}>
                        <Typography variant="subheading" gutterBottom>A vencer: </Typography>
                      </Grid>
                      <Grid item sm={6}>
                        <Typography variant="subheading" gutterBottom><b>$ {this.props.infoTributo.deudaAdministrativa && this.props.infoTributo.deudaAdministrativa.aVecer}</b></Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={16}>
                  <Grid item sm={7}>
                    <TextField
                      id="standard-full-width"
                      label="Total a pagar"
                      style={{ margin: 8 }}
                      placeholder="0,00"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={this.state.importeAPagar}
                    />
                  </Grid>
                  <Grid item sm={5} className={classes.buttonActionsContent}>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.buttonActions}
                      onClick={this.handleOpenModalCedulon}
                    >
                      CEDULÓN
                    <Typography className={classes.buttonActionsCaption} variant="caption" gutterBottom align="center">
                        Pago Efectivo
                    </Typography>
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classNames(classes.buttonActions, classes.buttonMercadoLibre)}
                      onClick={this.handleOpenModalMercadoPago}
                    >
                      <Typography className={classes.buttonActionsCaption} variant="caption" gutterBottom align="center">
                        Pago Online
                    </Typography>
                    </Button>
                  </Grid>
                </Grid>

                <MiTabla
                  columns={[
                    { id: 'concepto', type: 'string', numeric: false, disablePadding: true, label: 'Concepto' },
                    { id: 'vencimiento', type: 'date', numeric: false, disablePadding: true, label: 'Vencimiento' },
                    { id: 'importe', type: 'string', numeric: false, disablePadding: true, label: 'Importe ($)' },
                    { id: 'detalle', type: 'customCell', numeric: false, disablePadding: true, label: 'Detalle' },
                  ]}
                  rows={this.props.infoTributo.rowList || []}
                  order={'asc'}
                  orderBy={'concepto'}
                  getTotalSeleccionado={this.getTotalSeleccionado}
                  colCalculoSeleccion={'importe'}
                  customCell={this.getCustomCell} />

                <Grid container spacing={16}>
                  <Grid item sm={7}>
                    <TextField
                      id="standard-full-width"
                      label="Total a pagar"
                      style={{ margin: 8 }}
                      placeholder="0,00"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={this.state.importeAPagar}
                    />
                  </Grid>
                  <Grid item sm={5} className={classes.buttonActionsContent}>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.buttonActions}
                      onClick={this.handleOpenModalCedulon}
                    >
                      CEDULÓN
                    <Typography className={classes.buttonActionsCaption} variant="caption" gutterBottom align="center">
                        Pago Efectivo
                    </Typography>
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classNames(classes.buttonActions, classes.buttonMercadoLibre)}
                      onClick={this.handleOpenModalMercadoPago}
                    >
                      <Typography className={classes.buttonActionsCaption} variant="caption" gutterBottom align="center">
                        Pago Online
                    </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </div>}
            </MiCard>
          </Grid>
          <Grid item xs={4}>
            <MiCard>
              <Typography className={classes.title} variant="title">Datos Generales</Typography>
              <Divider className={classes.divider} />
              <Grid container spacing={16}>
                <Grid item sm={4}>
                  <Typography variant="subheading" gutterBottom>Titular: </Typography>
                </Grid>
                <Grid item sm={8}>
                  <Typography variant="subheading" gutterBottom><b>{this.props.infoTributo.titular && this.props.infoTributo.titular.titular}</b></Typography>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item sm={4}>
                  <Typography variant="subheading" gutterBottom>CUIT: </Typography>
                </Grid>
                <Grid item sm={8}>
                  <Typography variant="subheading" gutterBottom><b>{this.props.infoTributo.titular && this.props.infoTributo.titular.cuit}</b></Typography>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item sm={4}>
                  <Typography variant="subheading" gutterBottom>Identificador: </Typography>
                </Grid>
                <Grid item sm={8}>
                  <Typography variant="subheading" gutterBottom><b>{this.props.match.params.identificador}</b></Typography>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item sm={4}>
                  <Typography variant="subheading" gutterBottom>Juicios: </Typography>
                </Grid>
                <Grid item sm={8}>
                  <Typography variant="subheading" gutterBottom><b>{this.props.infoTributo.tieneJuicios ? 'Si tiene' : 'No tiene'}</b></Typography>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item sm={4}>
                  <Typography variant="subheading" gutterBottom>Planes: </Typography>
                </Grid>
                <Grid item sm={8}>
                  <Typography variant="subheading" gutterBottom><b>{this.props.infoTributo.tienePlanes ? 'Si tiene' : 'No tiene'}</b></Typography>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item sm={4}>
                  <Typography variant="subheading" gutterBottom>Multas: </Typography>
                </Grid>
                <Grid item sm={8}>
                  <Typography variant="subheading" gutterBottom><b>{this.props.infoTributo.tieneMultas ? 'Si tiene' : 'No tiene'}</b></Typography>
                </Grid>
              </Grid>

            </MiCard>
            <br />
            <MiCard>
              <Typography className={classes.title} variant="title">Otras operaciones</Typography>
              <Divider className={classes.divider} />

              <Grid container spacing={16}>
                <Grid item sm={2}>
                  <svg className={classes.icon} viewBox="0 0 24 24">
                    <path fill="#149257" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z" />
                  </svg>
                </Grid>
                <Grid item sm={10}>
                  <Typography variant="subheading" className={classNames(classes.textList, classes.link)} gutterBottom>Informe de Cuenta</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item sm={2}>
                  <svg className={classes.icon} viewBox="0 0 24 24">
                    <path fill="#149257" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z" />
                  </svg>
                </Grid>
                <Grid item sm={10}>
                  <Typography variant="subheading" className={classNames(classes.textList, classes.link)} gutterBottom>Datos de la Cuenta</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item sm={2}>
                  <svg className={classes.icon} viewBox="0 0 24 24">
                    <path fill="#149257" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z" />
                  </svg>
                </Grid>
                <Grid item sm={10}>
                  <Typography variant="subheading" className={classNames(classes.textList, classes.link)} gutterBottom>Alternativa de plan</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item sm={2}>
                  <svg className={classes.icon} viewBox="0 0 24 24">
                    <path fill="#149257" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z" />
                  </svg>
                </Grid>
                <Grid item sm={10}>
                  <Typography variant="subheading" className={classNames(classes.textList, classes.link)} gutterBottom>Últimos Pagos</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item sm={2}>
                  <svg className={classes.icon} viewBox="0 0 24 24">
                    <path fill="#ED1C24" d="M14,9H19.5L14,3.5V9M7,2H15L21,8V20A2,2 0 0,1 19,22H7C5.89,22 5,21.1 5,20V4A2,2 0 0,1 7,2M11.93,12.44C12.34,13.34 12.86,14.08 13.46,14.59L13.87,14.91C13,15.07 11.8,15.35 10.53,15.84V15.84L10.42,15.88L10.92,14.84C11.37,13.97 11.7,13.18 11.93,12.44M18.41,16.25C18.59,16.07 18.68,15.84 18.69,15.59C18.72,15.39 18.67,15.2 18.57,15.04C18.28,14.57 17.53,14.35 16.29,14.35L15,14.42L14.13,13.84C13.5,13.32 12.93,12.41 12.53,11.28L12.57,11.14C12.9,9.81 13.21,8.2 12.55,7.54C12.39,7.38 12.17,7.3 11.94,7.3H11.7C11.33,7.3 11,7.69 10.91,8.07C10.54,9.4 10.76,10.13 11.13,11.34V11.35C10.88,12.23 10.56,13.25 10.05,14.28L9.09,16.08L8.2,16.57C7,17.32 6.43,18.16 6.32,18.69C6.28,18.88 6.3,19.05 6.37,19.23L6.4,19.28L6.88,19.59L7.32,19.7C8.13,19.7 9.05,18.75 10.29,16.63L10.47,16.56C11.5,16.23 12.78,16 14.5,15.81C15.53,16.32 16.74,16.55 17.5,16.55C17.94,16.55 18.24,16.44 18.41,16.25M18,15.54L18.09,15.65C18.08,15.75 18.05,15.76 18,15.78H17.96L17.77,15.8C17.31,15.8 16.6,15.61 15.87,15.29C15.96,15.19 16,15.19 16.1,15.19C17.5,15.19 17.9,15.44 18,15.54M8.83,17C8.18,18.19 7.59,18.85 7.14,19C7.19,18.62 7.64,17.96 8.35,17.31L8.83,17M11.85,10.09C11.62,9.19 11.61,8.46 11.78,8.04L11.85,7.92L12,7.97C12.17,8.21 12.19,8.53 12.09,9.07L12.06,9.23L11.9,10.05L11.85,10.09Z" />
                  </svg>

                </Grid>
                <Grid item sm={10}>
                  <Typography variant="subheading" className={classNames(classes.textList, classes.link)} gutterBottom>Imprimir Informe Antecedentes</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item sm={2}>
                  <svg className={classes.icon} viewBox="0 0 24 24">
                    <path fill="#ED1C24" d="M14,9H19.5L14,3.5V9M7,2H15L21,8V20A2,2 0 0,1 19,22H7C5.89,22 5,21.1 5,20V4A2,2 0 0,1 7,2M11.93,12.44C12.34,13.34 12.86,14.08 13.46,14.59L13.87,14.91C13,15.07 11.8,15.35 10.53,15.84V15.84L10.42,15.88L10.92,14.84C11.37,13.97 11.7,13.18 11.93,12.44M18.41,16.25C18.59,16.07 18.68,15.84 18.69,15.59C18.72,15.39 18.67,15.2 18.57,15.04C18.28,14.57 17.53,14.35 16.29,14.35L15,14.42L14.13,13.84C13.5,13.32 12.93,12.41 12.53,11.28L12.57,11.14C12.9,9.81 13.21,8.2 12.55,7.54C12.39,7.38 12.17,7.3 11.94,7.3H11.7C11.33,7.3 11,7.69 10.91,8.07C10.54,9.4 10.76,10.13 11.13,11.34V11.35C10.88,12.23 10.56,13.25 10.05,14.28L9.09,16.08L8.2,16.57C7,17.32 6.43,18.16 6.32,18.69C6.28,18.88 6.3,19.05 6.37,19.23L6.4,19.28L6.88,19.59L7.32,19.7C8.13,19.7 9.05,18.75 10.29,16.63L10.47,16.56C11.5,16.23 12.78,16 14.5,15.81C15.53,16.32 16.74,16.55 17.5,16.55C17.94,16.55 18.24,16.44 18.41,16.25M18,15.54L18.09,15.65C18.08,15.75 18.05,15.76 18,15.78H17.96L17.77,15.8C17.31,15.8 16.6,15.61 15.87,15.29C15.96,15.19 16,15.19 16.1,15.19C17.5,15.19 17.9,15.44 18,15.54M8.83,17C8.18,18.19 7.59,18.85 7.14,19C7.19,18.62 7.64,17.96 8.35,17.31L8.83,17M11.85,10.09C11.62,9.19 11.61,8.46 11.78,8.04L11.85,7.92L12,7.97C12.17,8.21 12.19,8.53 12.09,9.07L12.06,9.23L11.9,10.05L11.85,10.09Z" />
                  </svg>

                </Grid>
                <Grid item sm={10}>
                  <Typography variant="subheading" className={classNames(classes.textList, classes.link)} gutterBottom>Imprimir Informe REMAT</Typography>
                </Grid>
              </Grid>

            </MiCard>

          </Grid>
        </Grid>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openModalCedulon || false}
          onClose={this.handleCloseModalCedulon}
        >
          <img src={cedulonFoto} className={classes.imgPago} onClick={this.handleCloseModalCedulon} />
        </Modal>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openModalMercadoPago || false}
          onClose={this.handleCloseModalMercadoPago}
        >
          <img src={cedulonFoto2} className={classes.imgPago2} onClick={this.handleCloseModalMercadoPago} />
        </Modal>

      </div>
    );
  }
}

let componente = DetalleTributo;
componente = withStyles(styles)(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classNames from 'classnames';
import _ from "lodash";

//Alert
import { mostrarAlerta, mostrarMensaje } from "@Utils/functions";
import { getAllUrlParams } from "@Utils/functions"

import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import MiControledDialog from "@Componentes/MiControledDialog";

import services from '@Rules/Rules_TributarioOnline';
import { mostrarCargando } from '@Redux/Actions/mainContent';
import { setPagosMercadoPago } from "@ReduxSrc/TributarioOnline/DetalleTributario/actions";
import { stringToFloat, formatNumber } from "@Utils/functions"
import servicesTributarioOnline from '@Rules/Rules_TributarioOnline';

const mapStateToProps = state => {
  return {
    loggedUser: state.Usuario.loggedUser,
    infoPagosMercadoPago: state.DetalleTributario.infoPagosMercadoPago,
  };
};

const mapDispatchToProps = dispatch => ({
  mostrarCargando: (cargar) => {
    dispatch(mostrarCargando(cargar));
  },
  setPropsUpdatePagosMercadoPago: (arrayNexos) => {
    dispatch(setPagosMercadoPago(arrayNexos));
  }
});

class MiMercadoPago extends React.PureComponent {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();

    this.state = {
      dialogoOpen: this.props.datosNexos && this.props.datosNexos.length > 0 ? true : false,
      disabled: this.props.disabled,
      arrayNexos: []
    };
  }

  componentWillReceiveProps(nextProps) {

    if (JSON.stringify(this.props.disabled) != JSON.stringify(nextProps.disabled)) {
      this.setState({
        ...this.state,
        disabled: nextProps.disabled
      });
    }
  }

  componentDidMount() {
    this.props.mostrarCargando(true);

    //Reseteamos Valores de DetalleTributario (Redux)
    const idBtnMercadoPago = getAllUrlParams(window.location.href).idBtnMercadoPago; //Ej.: true
    if(this.props.idBtnMercadoPago == idBtnMercadoPago)
      this.procesoPagoMercadoPago();
    else 
      this.props.mostrarCargando(false);
  }

  procesoPagoMercadoPago = () => {
    /* -------- Obtenemos datos y realizamos pago del Nexo. Mostramos modal en caso que haya mas para pagar -------- */
    /* -------- Obtenemos datos y realizamos pago del Nexo. Mostramos modal en caso que haya mas para pagar -------- */

    /* NOTA: 'this.props.infoPagosMercadoPago' tiene los nexos a pagar a partir de ellos se lo actualizará para realizar los pagos */
    const token = this.props.loggedUser.token;
    const mercadoPago = getAllUrlParams(window.location.href).mercadoPago; //Ej.: true
    const nexo = getAllUrlParams(window.location.href).nexo; //Ej.: 183060018127
    const tipoTributo = getAllUrlParams(window.location.href).tipoTributo; //Ej.: 1
    const identificador = getAllUrlParams(window.location.href).identificador; //Ej.: HCJ675
    const tokenNexo = getAllUrlParams(window.location.href).token; //Ej.: c643dcdeae55ee341509701473ae202d
    const emisor = getAllUrlParams(window.location.href).issuer_id; //Ej.: 310
    const cuotas = getAllUrlParams(window.location.href).installments; //Ej.: 1
    const metodoPago = getAllUrlParams(window.location.href).payment_method_id; //Ej.: visa

    if (mercadoPago && this.props.infoPagosMercadoPago &&
      this.props.infoPagosMercadoPago.arrayNexos &&
      this.props.infoPagosMercadoPago.arrayNexos.length > 0) {

      let arrayNexos = this.props.infoPagosMercadoPago.arrayNexos;
      const result = _.filter(arrayNexos, {
        nexo: nexo,
        tipoTributo: parseInt(tipoTributo),
        identificador: identificador
      });

      if (result.length == 0) return false;

      let nexoActual = result[0];

      servicesTributarioOnline.pagoMercadoPago(token, {
        nexo: nexoActual.nexo,
        tipoTributo: parseInt(tipoTributo),
        identificador: identificador,
        token: tokenNexo,
        metodoPago: metodoPago,
        emisor: emisor,
        cuotas: parseInt(cuotas)
      })
        .then((datos) => {

          if (!datos.ok) { mostrarAlerta('Pago MercadoPago: ' + datos.error); return false; }

          //Luego del pago, seteamos al nexo como pagado para luego pasarlo al componente MiMercadoPago
          //Y muestre los nexos actualizados
          nexoActual.token = token;
          nexoActual.metodoPago = metodoPago;
          nexoActual.emisor = emisor;
          nexoActual.cuotas = cuotas;
          nexoActual.pagado = true;

          //Al setear el "datosNexos"
          this.setState({
            ...this.state,
            arrayNexos: arrayNexos
          });

          mostrarMensaje('Pago MercadoPago: Pago realizado exitosamente');

          this.onBotonCedulonClick(arrayNexos);
          this.props.mostrarCargando(false);
        }).catch(err => {

          this.setState({
            ...this.state,
            arrayNexos: arrayNexos
          });
          this.props.mostrarCargando(false);
          console.warn("[Tributario Online] Ocurrió un error al intentar comunicarse con el servidor.");
        });
    } else {
      this.props.mostrarCargando(false);
    }
  }

  onBotonCedulonClick = (datosNexos) => {
    //Vemos si se esta pagando el siguiente Nexo (si es que hay mas de uno)
    //Modal tiene que abrirse luego de realizar el pago del primer nexo
    //Si viene vacio se continua con normalidad

    this.props.mostrarCargando(true);

    //Determinamos si hay nexos cargados, de lo contrario se los carga
    if (!datosNexos) {

      //Carga de todos los nexos y mostramos para pagar el primero de ellos
      this.cargarNexos();

    } else {

      //Actualizamos los nexos guardados en el store de redux que utilizamos para luego de cada pago
      this.props.setPropsUpdatePagosMercadoPago({
        arrayNexos: datosNexos
      });

      const allNexosPagos = _.filter(datosNexos, function (nexo) {
        return !nexo.pagado;
      });

      //Corroboramos si todos los nexos estan pagos, procedemos a no mostrar el modal de pagos online
      if (allNexosPagos.length == 0) {
        this.props.setPropsUpdatePagosMercadoPago({
          arrayNexos: []
        });

        this.props.mostrarCargando(false);
        return false;
      }

      this.setState({
        ...this.state,
        dialogoOpen: true,
        arrayNexos: datosNexos
      });
      this.props.mostrarCargando(false);
    }
  }

  cargarNexos = () => {
    const registros = this.props.registrosSeleccionados;
    const token = this.props.loggedUser.token;
    const opcion = "0"; // Hoy

    if (registros.length > 0 || this.props.esJuicio) {
      services.getReporteCedulon(token,
        {
          "tipoTributo": parseInt(this.props.tipoTributo),
          "identificador": this.props.identificador,
          "opcionVencimiento": parseInt(opcion),
          "periodos": registros,
          "tipoCedulon": this.props.tipoCedulon,
          "subItem": this.props.subItemSeleccionado
        })
        .then((datos) => {

          if (!datos.ok) {
            this.setState({ //Esto es temporario
              ...this.state,
              dialogoOpen: true,
              arrayNexos: []
            });

            this.props.mostrarCargando(false); return false;
          } //mostrarAlerta(datos.error);

          const resultData = datos.return;
          let arrayNexos = [];
          _.each(resultData.nexos, (nexo) => {
            var itemNexo = { ...nexo };
            itemNexo.totalPeriodo = 0;

            _.each(nexo.periodos, (periodo) => {
              itemNexo.totalPeriodo += stringToFloat(periodo.importe.total, 2);
            });

            itemNexo.totalPeriodo = formatNumber(itemNexo.totalPeriodo);
            arrayNexos.push(itemNexo);
          });

          this.setState({
            ...this.state,
            dialogoOpen: true,
            arrayNexos: arrayNexos
          });

          this.props.setPropsUpdatePagosMercadoPago({
            arrayNexos: arrayNexos
          });
        })
        .catch((err) => { console.log(err); })
        .finally(() => {
          this.props.mostrarCargando(false);
        });
    } else {
      this.setState({
        ...this.state,
        dialogoOpen: false,
        arrayNexos: []
      });
      this.props.mostrarCargando(false);
    }
  }

  onDialogoClose = () => {

    this.setState({
      ...this.state,
      dialogoOpen: false,
      arrayNexos: []
    });
  }

  loadModalMercadoLibre = (element) => {
    //Carga de componente de MercadoPago por nexo para realizar el pago
    if (element == null) return false;

    const script = document.createElement("script");
    const totalPeriodo = element.attributes.totalPeriodo.value;

    script.src = "https://www.mercadopago.com.ar/integrations/v1/web-tokenize-checkout.js";
    script.setAttribute("data-public-key", "APP_USR-7e5933f0-38bd-402c-be1e-ab7e845fe55d");
    script.setAttribute("data-transaction-amount", stringToFloat(totalPeriodo, 2));
    script.setAttribute("data-button-label", "Pagar Online");

    element && element.appendChild(script);
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  getNextStep = (arrayNexos) => {
    if (!arrayNexos || !Array.isArray(arrayNexos)) return 0;

    for (let index = 0; index < arrayNexos.length; index++) {
      const nexo = arrayNexos[index];

      if (!nexo.pagado) {
        return index;
      }
    }

    return 0;
  }

  render() {
    let { classes } = this.props;
    const activeStep = 0;

    return (
      <div className={classes.root}>
        <MiControledDialog
          open={this.state.dialogoOpen}
          onDialogoClose={this.onDialogoClose}
          buttonAction={true}
          textoLink={'Plataforma Online de MercadoPago'}
          titulo={'Plataforma Online de MercadoPago'}
          classMaxWidth={classes.maxWidth}
        >
          <div key="buttonAction">
            <Button
              variant="contained"
              color="secondary"
              className={classNames(classes.buttonActions, classes.buttonMercadoLibre)}
              onClick={() => { this.onBotonCedulonClick() }}
              disabled={this.state.disabled}
              modal={'MercadoPago'}
            >
              <Typography className={classes.buttonActionsCaption} variant="caption" gutterBottom align="center">
                Pago Online
                    </Typography>
            </Button>
          </div>

          <div key="headerContent">
            <Typography variant="subheading" gutterBottom>
              <b>Atención: </b> Usted está a punto de pagar online ingresando los datos de la tarjeta de débito o crédito.
              Los mismos serán tomados por la plataforma de MercadoPago por lo que la Municipalidad de Córdoba no tendrá responsabilidad sobre ellos.
                    </Typography>
          </div>

          <div key="mainContent">
            {this.state.arrayNexos.length > 0 &&
              <Stepper
                activeStep={this.getNextStep(this.state.arrayNexos)}
                orientation="vertical">
                {Array.isArray(this.state.arrayNexos) && this.state.arrayNexos.length > 0 && this.state.arrayNexos.map((nexo, index) => {


                  return (
                    <Step key={index}>
                      <StepLabel
                        StepIconProps={{
                          classes: { root: classes.stepIcon }
                        }}>Cedulón: {nexo.nexo}</StepLabel>
                      <StepContent>
                        <Grid container spacing={0}>
                          <Grid item md={12}>
                            <Typography variant="title" gutterBottom className={classes.titleNexo}>
                              Total a pagar: $ {nexo.totalPeriodo}
                            </Typography>

                            {/* Si el nexo esta pagado se muestra que lo está - Si no esta pagado, 
                            se muestra solo el botón (form) en el primero que se encuentre sin pagar, 
                            en los siguientes se muestra un pensaje como pendiente a pagar */}
                            {(nexo.pagado && <div className={classes.pagoExito}>(Nexo pagado con éxito)</div>) ||
                              (_.find(this.state.arrayNexos, function (x) { return !x.pagado }).nexo != nexo.nexo ? <div className={classes.pagoExito}>(Nexo pendiente a pagar)</div> :
                                <form
                                  id={"formMercadoLibre-" + nexo.nexo}
                                  onSubmit={this.handleSubmit}
                                  ref={this.loadModalMercadoLibre}
                                  totalPeriodo={nexo.totalPeriodo}
                                  className={classes.formMercadoLibre}
                                >
                                  <input type="hidden" value="true" name="mercadoPago" />
                                  <input type="hidden" value={nexo.nexo} name="nexo" />
                                  <input type="hidden" value={nexo.tipoTributo} name="tipoTributo" />
                                  <input type="hidden" value={nexo.identificador} name="identificador" />
                                  <input type="hidden" value={this.props.seccionDetalleTributo} name="seccionDetalleTributo" />
                                  <input type="hidden" value={this.props.idBtnMercadoPago} name="idBtnMercadoPago" />
                                </form>)}

                          </Grid>
                        </Grid>
                      </StepContent>
                    </Step>
                  );
                })}
              </Stepper>}
            {!this.state.arrayNexos.length > 0 && <div style={{ color: 'red' }}>Se están presentando inconvenientes para pagar con MercadoPago, intente más tarde.</div>}
          </div>

          <div key="footerContent"></div>
        </MiControledDialog>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'inline-block'
  },
  buttonActions: {
    display: 'inline-block',
    minWidth: 'auto',
    margin: '2px',
    borderRadius: '20px',
  },
  buttonMercadoLibre: {
    backgroundColor: '#fff !important',
    backgroundImage: 'url(https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082013/untitled-1_49.png?itok=S3wtZ8fs)',
    backgroundSize: '115px',
    backgroundPosition: '5px',
    backgroundRepeat: 'no-repeat',
    width: '128px',
    '&:hover': {
      background: '#fff',
      backgroundImage: 'url(https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082013/untitled-1_49.png?itok=S3wtZ8fs)',
      backgroundSize: '115px',
      backgroundPosition: '5px',
      backgroundRepeat: 'no-repeat',
    }
  },
  buttonActionsCaption: {
    top: '40px',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90px'
  },
  formMercadoLibre: {
    display: 'inline-block',
    margin: '0px 25px',
    verticalAlign: '4px',
  },
  pagoExito: {
    display: 'inline-block',
    margin: '0px 25px',
  },
  titleNexo: {
    display: 'inline-block',
    fontWeight: '100'
  },
  stepIcon: {
    color: '#149257 !important',
    '& text': {
      fill: '#fff'
    }
  },
  maxWidth: {
    maxWidth: '564px'
  }
});

let componente = MiMercadoPago;
componente = withStyles(styles)(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;
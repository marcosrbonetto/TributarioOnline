import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classNames from 'classnames';
import _ from "lodash";

//Alert
import { mostrarAlerta } from "@Utils/functions";

import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';

import MiControledDialog from "@Componentes/MiControledDialog";

import services from '@Rules/Rules_TributarioOnline';
import { mostrarCargando } from '@Redux/Actions/mainContent';
import { setPagosMercadoPago } from "@ReduxSrc/TributarioOnline/DetalleTributario/actions";

const mapStateToProps = state => {
  return {
    loggedUser: state.MainContent.loggedUser
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
      base64Cedulon: '',
      disabled: true,
      arrayNexos: [],
      modalCedulon: false
    };
  }

  componentDidMount() {
    if (this.props.datosNexos)
      this.onBotonCedulonClick();
  }

  componentWillReceiveProps(nextProps) {

    if (JSON.stringify(this.props.disabled) != JSON.stringify(nextProps.disabled)) {
      this.setState({
        ...this.state,
        disabled: nextProps.disabled
      });
    }
  }

  onBotonCedulonClick = () => {
    //Vemos si se esta pagando el siguiente Nexo (si es que hay mas de uno)
    //Modal tiene que abrirse luego de realizar el pago del primer nexo
    //Si viene vacio se continua con normalidad

    this.props.mostrarCargando(true);

    //Determinamos si hay nexos cargados, de lo contrario se los carga
    if (Object.keys(this.props.datosNexos).length == 0) {

      //Carga de todos los nexos y mostramos para pagar el primero de ellos
      this.cargarNexos();
      
    } else {
      //Cada vez que se paga un nexo mostramos el modal para pagar los siguientes
      const arrayNexos = this.props.datosNexos.arrayNexos;
      const reporte = this.props.datosNexos.reporte;

      //Actualizamos los nexos guardados en el store de redux que utilizamos para luego de cada pago
      this.props.setPropsUpdatePagosMercadoPago({
        reporte: reporte,
        arrayNexos: arrayNexos
      });

      const allNexosPagos = _.filter(arrayNexos, function (nexo) {
        return !nexo.pagado;
      });

      //Corroboramos si todos los nexos estan pagos, procedemos a no mostrar el modal de pagos online
      if (allNexosPagos.length == 0)
        return false;

      this.setState({
        ...this.state,
        base64Cedulon: reporte ? 'data:application/pdf;base64,' + reporte : '',
        dialogoOpen: true,
        arrayNexos: arrayNexos
      });
    }
  }

  cargarNexos = () => {
    const registros = this.props.registrosSeleccionados;
    const token = this.props.loggedUser.token;
    const opcion = "1"; // Hoy

    if (registros.length > 0) {
      services.getReporteCedulon(token,
        {
          "tipoTributo": parseInt(this.props.tipoTributo),
          "identificador": this.props.identificador,
          "opcionVencimiento": parseInt(opcion),
          "periodos": registros
        })
        .then((datos) => {
          if (!datos.ok) { mostrarAlerta(datos.error); this.props.mostrarCargando(false); return false; }

          const resultData = datos.return;
          let arrayNexos = [];
          _.each(resultData.nexos, (nexo) => {
            var itemNexo = { ...nexo };
            itemNexo.totalPeriodo = 0;

            _.each(nexo.periodos, (periodo) => {
              itemNexo.totalPeriodo += periodo.importe.total;
            });

            arrayNexos.push(itemNexo);
          });

          _.each(resultData.nexos, (nexo) => {
            var itemNexo = { ...nexo };
            itemNexo.totalPeriodo = 0;

            _.each(nexo.periodos, (periodo) => {
              itemNexo.totalPeriodo += periodo.importe.total;
            });

            itemNexo.nexo = '1';
            arrayNexos.push(itemNexo);
          });

          this.setState({
            ...this.state,
            base64Cedulon: resultData && resultData.reporte ? 'data:application/pdf;base64,' + resultData.reporte : '',
            dialogoOpen: true,
            arrayNexos: arrayNexos
          });

          this.props.setPropsUpdatePagosMercadoPago({
            reporte: resultData.reporte,
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
        base64Cedulon: '',
        dialogoOpen: false,
        arrayNexos: []
      });
      this.props.mostrarCargando(false);
    }
  }

  onDialogoClose = () => {

    this.props.deleteDataNexos && this.props.deleteDataNexos();

    this.setState({
      ...this.state,
      base64Cedulon: '',
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
    script.setAttribute("data-transaction-amount", totalPeriodo);

    element && element.appendChild(script);
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  onShowCedulon = () => {
    this.setState({
      ...this.state,
      modalCedulon: true
    })
  };

  onHideCedulon = () => {
    this.setState({
      ...this.state,
      modalCedulon: false
    })
  };

  render() {
    let { classes } = this.props;

    return (
      <div className={classes.root}>
        <MiControledDialog
          open={this.state.dialogoOpen}
          onDialogoClose={this.onDialogoClose}
          buttonAction={true}
          textoLink={'Pago Online'}
          titulo={'Pago Online'}
        >
          <div key="buttonAction">
            <Button
              variant="contained"
              color="secondary"
              className={classNames(classes.buttonActions, classes.buttonMercadoLibre)}
              onClick={this.onBotonCedulonClick}
              disabled={this.state.disabled}
              modal={'MercadoPago'}
            >
              <Typography className={classes.buttonActionsCaption} variant="caption" gutterBottom align="center">
                Pago Online
                    </Typography>
            </Button>
          </div>

          <div key="headerContent"></div>

          <div key="mainContent">
            {!this.state.modalCedulon && <div>
              {Array.isArray(this.state.arrayNexos) && this.state.arrayNexos.length > 0 && this.state.arrayNexos.map(nexo => {
                return <div>
                  <Typography component="h2" variant="title" gutterBottom>
                    Nexo: {nexo.nexo}
                  </Typography>

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
                          </form>)}
                    </Grid>
                  </Grid>
                  <br />
                </div>
              })}
            </div>}

            {this.state.modalCedulon && <div>
              {this.state.base64Cedulon != '' && <iframe src={this.state.base64Cedulon} height="396px" width="856px"></iframe>}
              {this.state.base64Cedulon == '' && 'Debe seleccionar algún concepto'}
            </div>}
          </div>

          <div key="footerContent" className={classes.buttonFotterDialog}>
            {!this.state.modalCedulon && <Button
              variant="contained"
              color="secondary"
              className={classNames(classes.buttonActions,classes.buttonModalCedulon)}
              onClick={this.onShowCedulon}
            >
              Ver Cedulón
                                        </Button>}

            {this.state.modalCedulon && <Button
              variant="contained"
              color="secondary"
              className={classNames(classes.buttonActions,classes.buttonModalCedulon)}
              onClick={this.onHideCedulon}
            >
              Pagar Nexos
                                        </Button>}
          </div>
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
  buttonModalCedulon: {
    left: '50%',
    transform: 'translateX(-50%)'
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
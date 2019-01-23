import React from "react";
import _ from "lodash";

//Styles
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { withRouter } from "react-router-dom";

//Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

//Custom Components
import MiTabla from "@Componentes/MiTabla";
import MiCedulon from "@Componentes/MiCedulon";
import MiMercadoPago from "@Componentes/MiMercadoPago";
import MiInterBanking from "@Componentes/MiInterBanking";
import MisBeneficios from "@Componentes/MisBeneficios";
import { checkBeneficios } from "@Componentes/MisBeneficios";
import MiControledDialog from "@Componentes/MiControledDialog"
import Button from "@material-ui/core/Button";

//Funciones Útiles
import { stringToFloat, formatNumber, getIdTipoTributo } from "@Utils/functions"

import { mostrarCargando } from '@Redux/Actions/mainContent';

//Services
import services from '@Rules/Rules_TributarioOnline';

const mapStateToProps = state => {
  return {
      loggedUser: state.Usuario.loggedUser,
  };
};

const mapDispatchToProps = dispatch => ({
  redireccionar: url => {
      dispatch(push(url));
  },
  mostrarCargando: (cargar) => {
      dispatch(mostrarCargando(cargar));
  },
});

class MisPagosDetalle extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      importeAPagar: '0,00',
      recargoAPagar: '0,00',
      rowList: this.props.info ? this.props.info.rowList : [],
      tableDisabled: this.props.disabled || false,
      registrosSeleccionados: this.props.registrosSeleccionados,
      tieneBeneficio: false,
      beneficioKey: {
        key: 0,
        version: (new Date()).getTime()
      },
      revisionBeneficios: {
        arrayTextoBeneficios: undefined,
        modal: {
          open: false
        }
      }
    };
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.info && JSON.stringify(nextProps.info) != JSON.stringify(this.props.info)) {
      this.setState({ rowList: nextProps.info ? nextProps.info.rowList : [] });
    }

    if (JSON.stringify(nextProps.registrosSeleccionados) != JSON.stringify(this.props.registrosSeleccionados)) {
      this.setState({ registrosSeleccionados: nextProps.registrosSeleccionados });
    }
  }

  //Totalizador de importe de filas seleccionadas
  getFilasSeleccionadas = (filas, idFilasSeleccionadas, totalCedulonBeneficio) => {
    let registrosSeleccionados = []

    let importeTotal = 0;
    let recargoTotal = 0;
    filas.map((item) => {
      importeTotal += parseFloat(idFilasSeleccionadas.indexOf(item.id) != -1 ? stringToFloat(item['importe']) : 0);
      recargoTotal += parseFloat(idFilasSeleccionadas.indexOf(item.id) != -1 ? stringToFloat(item['data'].importe.recargo) : 0);

      if (idFilasSeleccionadas.indexOf(item.id) != -1)
        registrosSeleccionados.push(item['concepto']);
    });

    this.props.setRegistrosSeleccionados &&
      this.props.setRegistrosSeleccionados(this.props.menuItemSeleccionado, registrosSeleccionados);

    this.setState({
      importeAPagar: totalCedulonBeneficio ? formatNumber(totalCedulonBeneficio) : formatNumber(importeTotal),
      recargoAPagar: formatNumber(recargoTotal),
      registrosSeleccionados: registrosSeleccionados
    });
  };

  handleBeneficiosResult = (result) => {
    let resultBeneficios = result;

    if(result.rowsSelected.length == 0) {
      this.handleAplicarBeneficiosResult(resultBeneficios);
    } else {
      this.handleCalculoTotalCedulon(resultBeneficios, (totalCedulon) => {
        this.handleAplicarBeneficiosResult({
          ...resultBeneficios,
          totalCedulonBeneficio: totalCedulon
        });
      });
    }
  }

  handleAplicarBeneficiosResult = (result) => {
    //Seteamos las nuevas rows con sus nuevas configuraciones de acuerdo a los beneficios y la tabla
    this.setState({
      ...this.state,
      tableDisabled: result.tableDisabled || false,
      rowList: result.rowList
    });

    //Actualización grilla
    this.getFilasSeleccionadas(result.rowList, result.rowsSelected, result.totalCedulonBeneficio);
  }

  handleCalculoTotalCedulon = (resultBeneficios, callback) => {
    this.props.mostrarCargando(true);

    const { identificadorActual, tipoCedulon, tributoActual } = this.props;
    const token = this.props.loggedUser.token;

    const idTipoTributo = getIdTipoTributo(tributoActual);
    const periodosBeneficio = _.filter(resultBeneficios.rowList,(o) => { return resultBeneficios.rowsSelected.indexOf(o.id) != -1});
    const periodos = _.map(periodosBeneficio,'concepto');

    services.getReporteCedulon(token,
      {
        "tipoTributo": parseInt(idTipoTributo),
        "identificador": identificadorActual,
        "opcionVencimiento": 0,
        "periodos": periodos,
        "tipoCedulon": tipoCedulon,
        "esPagoElectronico": false,
        "esCuotaGlobal": true,
      })
      .then((datos) => {
        const resultData = datos.return;

        callback(resultData.totalCedulon || 0);
      })
      .catch((err) => { console.log(err); })
      .finally(() => {
        this.props.mostrarCargando(false);
      });
  }

  //Una vez que precionamos Cedulon o PagoOnline, chequeamos si las filas seleccionadas pertenecen a algun beneficio vigente
  chekearBeneficios = (callback) => {
    const tipoTributo = this.props.tributoActual;
    const seccion = this.props.tipoCedulon;
    const allRows = this.state.rowList;
    const selectedRows = this.state.registrosSeleccionados;

    //Si seleccionBeneficios = True quiere decir que encontró:
    //Más de un beneficio
    //O un beneficio/s con otro periodo más que no pertenece al mismo
    //Si seleccionBeneficios = False se ve tieneBeneficio (True/False) de acuerdo si coinciden con un beneficio o no
    const resultCheckBeneficio = checkBeneficios(tipoTributo, seccion, allRows, selectedRows);

    if (resultCheckBeneficio.seleccionBeneficios) {
      //En caso que:
      //Más de un beneficio
      //O un beneficio/s con otro periodo más que no pertenece al mismo
      //Preguntaremos que si quiere aplicar algún beneficio

      let arrayTextoSeleccionBeneficio = [];
      _.each(resultCheckBeneficio.arrayResultBeneficios, (beneficio, index) => {
        arrayTextoSeleccionBeneficio.push(<div>
          Dentro de los períodos seleccionados se encuentran: {beneficio.rows.join(', ')}.
          Los cuales pertenecen al beneficio <b>{beneficio.beneficio.titulo}</b>, desea aplicar el descuento?
          <Button
            variant="contained"
            color="secondary"
            size="small"
            style={{
              background: '#ffa114',
              borderRadius: '20px',
              marginLeft: '10px',
              minHeight: '22px',
              lineHeight: '11px',
            }}
            keyBeneficio={beneficio.beneficio.key}
            onClick={this.selectBeneficio}
          >
            Aplicar
          </Button>
          <br />
          <span style={{color: 'red', fontSize: '12px', position: 'relative', top: '-8px'}}>(Recuerde que los periodos que quedan fuera del beneficio deberán ser pagados aparte)</span>
          {!index == (resultCheckBeneficio.arrayResultBeneficios.length-1) && <div><br /><br /></div>}</div>);
      });

      this.setState({
        revisionBeneficios: {
          ...this.state.revisionBeneficios,
          arrayTextoBeneficios: arrayTextoSeleccionBeneficio
        }
      }, () => {
        this.onRevisionBeneficiosDialogoOpen();
      });

    } else {
      //tieneBeneficio True o False, continuamos el cedulon o pago online con beneficio (o no)
      this.setState({
        tieneBeneficio: resultCheckBeneficio.tieneBeneficio
      }, () => {
        //Seguimos con la acción del boton
        callback();
      });
    }
  }

  selectBeneficio = (event) => {
    const key = event.currentTarget.attributes.keyBeneficio.value;

    this.setState({
      beneficioKey: {
        key: parseInt(key),
        version: (new Date()).getTime()
      }
    }, () => {
      this.onRevisionBeneficiosDialogoClose();
    });
  }

  onRevisionBeneficiosDialogoOpen = () => {
    this.setState({
      revisionBeneficios: {
        ...this.state.revisionBeneficios,
        modal: {
          ...this.state.revisionBeneficios.modal,
          open: true
        }
      }
    });
  }

  onRevisionBeneficiosDialogoClose = () => {
    this.setState({
      revisionBeneficios: {
        ...this.state.revisionBeneficios,
        modal: {
          ...this.state.revisionBeneficios.modal,
          open: false
        }
      }
    });
  }

  render() {
    const classes = this.props.classes;

    //deudaAdministrativa ó deudaJuicio contienen los mismos valores pero vienen en diferentes atributos
    //Puede venir una u otra, no las dos juntas
    const deudaTotales = this.props.info ? this.props.info.deudaAdministrativa || this.props.info.deudaJuicio : null;

    let valoresDeuda = {
      valor1: deudaTotales && deudaTotales.total ? deudaTotales.total : 0,
      valor2: (deudaTotales && (deudaTotales.vencida ? deudaTotales.vencida : deudaTotales.capital)) || 0,
      valor3: (deudaTotales && (deudaTotales.aVencer ? deudaTotales.aVencer : deudaTotales.gastos)) || 0,
    }

    //Datos para generar la grilla
    const rowList = this.state.rowList;
    const registrosSeleccionados = this.state.registrosSeleccionados;
    const rowsPerPage = (rowList.length <= 5 && 5) || (rowList.length > 5 && rowList.length <= 10 && 10) || (rowList.length > 10 && 25);
    const columnas = this.props.data.labels.columnas || null;
    const order = this.props.data.order || 'asc';
    const orderBy = this.props.data.orderBy || 'concepto';
    const check = this.props.check;
    const disabled = this.state.tableDisabled;
    const revisionBeneficios = this.state.revisionBeneficios;
    const beneficioKey = this.state.beneficioKey;

    //Tributo y tipo de tributo para generar el cedulon
    const tributo = this.props.tributoActual;
    let tipoTributo = getIdTipoTributo(tributo);

    //Determinamos si el Cedulon tiene que estar deshabilitado
    let disabledCedulon = !(stringToFloat(this.state.importeAPagar) > 0);

    //En caso de ser juicio cambia cedulon siempre habilitado y 
    //el monto a pagar se setea el total (ya q la grilla no tiene checks)
    const esJuicio = this.props.menuItemSeleccionado == 'juicios';
    let auxImporteAPagar;
    let auxRecargoAPagar;
    if (esJuicio) {
      disabledCedulon = false;
      auxImporteAPagar = 0;
      auxRecargoAPagar = 0;
      rowList.map((item) => {
        auxImporteAPagar += stringToFloat(item['importe'], 2);
        auxRecargoAPagar += stringToFloat(item['data'].importe.recargo, 2);
      });

      auxImporteAPagar = formatNumber(auxImporteAPagar);
      auxRecargoAPagar = formatNumber(auxRecargoAPagar);
    }

    const pagination = !this.props.paraMobile;

    return <div>
      <Grid container className={classes.containerDeudaAdm}>
        {/* Totalizadores */}
        <Typography className={classes.tituloDeudaAdm} variant="title" gutterBottom>Deuda {this.props.data.labels.totalesDeuda}</Typography>
        <Grid item sm={4} className={"itemTotales"}>
          <Grid container>
            <Grid item sm={6}>
              <Typography variant="subheading" gutterBottom>Total: </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography variant="subheading" gutterBottom><b>$ {formatNumber(valoresDeuda.valor1)}</b></Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} className={"itemTotales"}>
          <Grid container>
            <Grid item sm={6}>
              <Typography variant="subheading" gutterBottom>{this.props.data.labels.vencida}: </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography variant="subheading" gutterBottom><b>$ {formatNumber(valoresDeuda.valor2)}</b></Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} className={"itemTotales"}>
          <Grid container>
            <Grid item sm={6}>
              <Typography variant="subheading" gutterBottom>{this.props.data.labels.aVencer}: </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography variant="subheading" gutterBottom><b>$ {formatNumber(valoresDeuda.valor3)}</b></Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={16}>
        {/* Totalizador de deudas seleccionadas y botones de pago */}
        <Grid item sm={4} className={"inputTotalPeriodos"}>
          <TextField
            id="standard-full-width"
            label={<span>Total a pagar {auxRecargoAPagar ? <span className={classes.recargo}>(Recargo: {auxRecargoAPagar})</span> : <span className={classes.recargo}>(Recargo: {this.state.recargoAPagar})</span>}</span>}
            style={{ margin: 8 }}
            placeholder="0,00"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.totalAPagar}
            value={auxImporteAPagar ? auxImporteAPagar : this.state.importeAPagar}
          />
        </Grid>
        <Grid item sm={8} className={classNames(classes.buttonActionsContent, "buttonActionsContent")}>

          <MisBeneficios
            tipoTributo={this.props.tributoActual}
            seccion={this.props.tipoCedulon}
            rows={rowList}
            handleBeneficiosResult={this.handleBeneficiosResult}
            seleccionBeneficioByKey={beneficioKey} />

          <MiCedulon
            tieneBeneficio={this.state.tieneBeneficio}
            registrosSeleccionados={registrosSeleccionados}
            subItemSeleccionado={this.props.info.identificador}
            tipoCedulon={this.props.tipoCedulon}
            tipoTributo={tipoTributo}
            identificador={this.props.identificadorActual}
            disabled={disabledCedulon}
            esJuicio={esJuicio}
            onClick={this.chekearBeneficios}
          />

          <MiMercadoPago
            tieneBeneficio={this.state.tieneBeneficio}
            pagoRedirect={this.props.pagoRedirect}
            idBtnMercadoPago={this.props.menuItemSeleccionado + "1"}
            seccionDetalleTributo={this.props.menuItemSeleccionado}
            registrosSeleccionados={registrosSeleccionados}
            subItemSeleccionado={this.props.info.identificador}
            tipoCedulon={this.props.tipoCedulon}
            tipoTributo={tipoTributo}
            identificador={this.props.identificadorActual}
            disabled={disabledCedulon}
            esJuicio={esJuicio}
            onClick={this.chekearBeneficios}
          />

          <MiInterBanking
            tieneBeneficio={this.state.tieneBeneficio}
            registrosSeleccionados={registrosSeleccionados}
            subItemSeleccionado={this.props.info.identificador}
            tipoCedulon={this.props.tipoCedulon}
            tipoTributo={tipoTributo}
            identificador={this.props.identificadorActual}
            disabled={disabledCedulon}
            esJuicio={esJuicio}
            onClick={this.chekearBeneficios}
          />

        </Grid>
      </Grid>

      {/* Tabla de detalle del tributo */}
      <MiTabla
        pagination={pagination}
        columns={[
          { id: 'concepto', type: 'string', numeric: false, disablePadding: false, label: (columnas ? columnas[0] : 'Concepto') },
          { id: 'vencimiento', type: 'date', numeric: false, disablePadding: false, label: (columnas ? columnas[1] : 'Vencimiento') },
          { id: 'importe', type: 'string', numeric: true, disablePadding: false, label: (columnas ? columnas[2] : 'Importe ($)') },
          { id: 'detalle', type: 'custom', numeric: false, disablePadding: true, label: 'Detalle' },
        ]}
        rows={rowList || []}
        order={order}
        orderBy={orderBy}
        getFilasSeleccionadas={this.getFilasSeleccionadas}
        registrosSeleccionados={registrosSeleccionados}
        check={check}
        disabled={disabled}
        rowsPerPage={rowsPerPage}
      />

      <Grid container spacing={16}>
        {/* Totalizador de deudas seleccionadas y botones de pago */}
        <Grid item sm={4} className={"inputTotalPeriodos"}>
          <TextField
            id="standard-full-width"
            label={<span>Total a pagar {auxRecargoAPagar ? <span className={classes.recargo}>(Recargo: {auxRecargoAPagar})</span> : <span className={classes.recargo}>(Recargo: {this.state.recargoAPagar})</span>}</span>}
            style={{ margin: 8 }}
            placeholder="0,00"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.totalAPagar}
            value={auxImporteAPagar ? auxImporteAPagar : this.state.importeAPagar}
          />
        </Grid>
        <Grid item sm={8} className={classNames(classes.buttonActionsContent, "buttonActionsContent")}>
          <MiCedulon
            tieneBeneficio={this.state.tieneBeneficio}
            registrosSeleccionados={registrosSeleccionados}
            subItemSeleccionado={this.props.info.identificador}
            tipoCedulon={this.props.tipoCedulon}
            tipoTributo={tipoTributo}
            identificador={this.props.identificadorActual}
            disabled={disabledCedulon}
            esJuicio={esJuicio}
            onClick={this.chekearBeneficios}
          />

          <MiMercadoPago
            tieneBeneficio={this.state.tieneBeneficio}
            pagoRedirect={this.props.pagoRedirect}
            idBtnMercadoPago={this.props.menuItemSeleccionado + "2"}
            seccionDetalleTributo={this.props.menuItemSeleccionado}
            registrosSeleccionados={registrosSeleccionados}
            subItemSeleccionado={this.props.info.identificador}
            tipoCedulon={this.props.tipoCedulon}
            tipoTributo={tipoTributo}
            identificador={this.props.identificadorActual}
            disabled={disabledCedulon}
            esJuicio={esJuicio}
            onClick={this.chekearBeneficios}
          />
        </Grid>
      </Grid>

      <MiControledDialog
        paraMobile={this.props.paraMobile}
        open={revisionBeneficios.modal.open}
        onDialogoOpen={this.onRevisionBeneficiosDialogoOpen}
        onDialogoClose={this.onRevisionBeneficiosDialogoClose}
        textoLink={''}
        titulo={'Revisión de períodos seleccionados'}
      >
        {revisionBeneficios.arrayTextoBeneficios && revisionBeneficios.arrayTextoBeneficios.map((textoBeneficio) => {
          return textoBeneficio;
        })}
      </MiControledDialog>

    </div>
  }
}

const styles = theme => ({
  containerDeudaAdm: {
    border: '1px solid',
    borderColor: theme.color.ok.main,
    padding: '10px 0px',
    textAlign: 'center',
    position: 'relative',
    margin: '28px 0px 10px 0px',
    borderRadius: '5px',
    '& h3': {
      marginBottom: '0px'
    }
  },
  tituloDeudaAdm: {
    background: '#fff',
    position: 'absolute',
    fontSize: '14px',
    color: theme.color.ok.main,
    top: '-14px',
    left: '8px',
    padding: '5px'
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
  recargo: {
    color: '#aaa'
  },
  totalAPagar: {
    fontWeight: 'bold'
  }
});

let componente = MisPagosDetalle;
componente = withStyles(styles)(componente);
componente = connect(
    mapStateToProps,
    mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;
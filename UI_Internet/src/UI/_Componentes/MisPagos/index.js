import React from "react";
import _ from "lodash";

//Styles
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

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


class MisPagos extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      importeAPagar: '0,00',
      recargoAPagar: '0,00',
      rowList: this.props.rowList || [],
      tableDisabled: this.props.tablaConfig ? this.props.tablaConfig.disabled : false,
      registrosSeleccionados: this.props.registrosSeleccionados,
      tieneBeneficio: false,
      textoBeneficioAplicado: undefined,
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

    if (nextProps.rowList && JSON.stringify(nextProps.rowList) != JSON.stringify(this.props.rowList)) {
      this.setState({ rowList: nextProps.rowList || [] });
    }

    if (nextProps.tablaConfig && JSON.stringify(nextProps.tablaConfig) != JSON.stringify(this.props.tablaConfig)) {
      this.setState({ tableDisabled: nextProps.tablaConfig ? nextProps.tablaConfig.disabled : false });
    }
  }

  //Totalizador de importe de filas seleccionadas
  getFilasSeleccionadas = (filas, idFilasSeleccionadas) => {
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
      this.props.setRegistrosSeleccionados(registrosSeleccionados, this.props);

    this.setState({ 
      importeAPagar: formatNumber(importeTotal),
      recargoAPagar: formatNumber(recargoTotal),
      registrosSeleccionados: registrosSeleccionados
    });
  };

  handleBeneficiosResult = (result) => {
    //Cuando aplicamos beneficio mostramos cuanto es
    let textoBeneficioAplicado;
    if(result.rowsSelected.length > 0)
    textoBeneficioAplicado = 'El ' + this.props.textoBeneficioAplicado +', se verá reflejado en el cedulón o pago online.';

    //Seteamos las nuevas rows con sus nuevas configuraciones de acuerdo a los beneficios y la tabla
    this.setState({
      ...this.state,
      tableDisabled: result.tableDisabled || false,
      rowList: result.rowList,
      textoBeneficioAplicado: textoBeneficioAplicado
    });

    //Actualización grilla
    this.getFilasSeleccionadas(result.rowList, result.rowsSelected);
  }

  //Una vez que precionamos Cedulon o PagoOnline, chequeamos si las filas seleccionadas pertenecen a algun beneficio vigente
  chekearBeneficios = (callback) => {
    const tipoTributo = this.props.cedulonConfig.tipoTributo;
    const seccion = this.props.cedulonConfig.tipoCedulon;
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

    const {
      deudaTotales,
      registrosSeleccionados,
      tablaConfig,
      cedulonConfig,
      mercadoPagoConfig,
      labelsTotales
    } = this.props;

    let valoresDeuda = {
      valor1: deudaTotales && deudaTotales.total || 0,
      valor2: (deudaTotales && (deudaTotales.vencida || deudaTotales.capital)) || 0,
      valor3: (deudaTotales && (deudaTotales.aVencer || deudaTotales.gastos)) || 0,
    }

    //Datos para generar la grilla
    const rowList = this.state.rowList;
    const rowsPerPage = (rowList.length <= 5 && 5) || (rowList.length > 5 && rowList.length <= 10 && 10) || (rowList.length > 10 && 25);
    const columnas = tablaConfig.columnas || null;
    const order = tablaConfig.order || 'asc';
    const orderBy = tablaConfig.orderBy || 'concepto';
    const check = tablaConfig.check;
    const disabled = this.state.tableDisabled;
    const textoBeneficioAplicado = this.state.textoBeneficioAplicado;
    const revisionBeneficios = this.state.revisionBeneficios;
    const beneficioKey = this.state.beneficioKey;

    //Determinamos si el Cedulon tiene que estar deshabilitado
    let disabledCedulon = !(stringToFloat(this.state.importeAPagar) > 0);

    //En caso de ser juicio cambia cedulon siempre habilitado y 
    //el monto a pagar se setea el total (ya q la grilla no tiene checks)
    let auxImporteAPagar = 0;
    let auxRecargoAPagar = 0;
    if (!check) {
      disabledCedulon = false;
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
        <Typography className={classes.tituloDeudaAdm} variant="title" gutterBottom>Deuda {labelsTotales.totalesDeuda}</Typography>
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
              <Typography variant="subheading" gutterBottom>{labelsTotales.vencida}: </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography variant="subheading" gutterBottom><b>$ {formatNumber(valoresDeuda.valor2)}</b></Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} className={"itemTotales"}>
          <Grid container>
            <Grid item sm={6}>
              <Typography variant="subheading" gutterBottom>{labelsTotales.aVencer}: </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography variant="subheading" gutterBottom><b>$ {formatNumber(valoresDeuda.valor3)}</b></Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={16}>
        {/* Totalizador de deudas seleccionadas y botones de pago */}
        <Grid item sm={6} className={"inputTotalPeriodos"}>
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
          {textoBeneficioAplicado && <Typography className={classes.textoBeneficioAplicado} variant="subheading" gutterBottom>{textoBeneficioAplicado}</Typography>}
        </Grid>
        <Grid item sm={6} className={classNames(classes.buttonActionsContent, "buttonActionsContent")}>

          <MisBeneficios
            tipoTributo={cedulonConfig.tipoTributo}
            seccion={cedulonConfig.tipoCedulon}
            rows={rowList}
            handleBeneficiosResult={this.handleBeneficiosResult}
            seleccionBeneficioByKey={beneficioKey} />

          <MiCedulon
            tieneBeneficio={this.state.tieneBeneficio}
            onClick={this.chekearBeneficios}
            registrosSeleccionados={registrosSeleccionados}
            subItem={cedulonConfig.subItem}
            tipoCedulon={cedulonConfig.tipoCedulon}
            tipoTributo={cedulonConfig.idTipoTributo}
            identificador={cedulonConfig.identificador}
            disabled={disabledCedulon}
            allSelected={!check}
          />

          <MiMercadoPago
            tieneBeneficio={this.state.tieneBeneficio}
            onClick={this.chekearBeneficios}
            pagoRedirect={mercadoPagoConfig.pagoRedirect}
            idBtnMercadoPago={mercadoPagoConfig.idBtnMercadoPago + "1"}
            seccionDetalleTributo={mercadoPagoConfig.seccionDetalleTributo}
            registrosSeleccionados={registrosSeleccionados}
            subItem={cedulonConfig.subItem}
            tipoCedulon={cedulonConfig.tipoCedulon}
            tipoTributo={cedulonConfig.idTipoTributo}
            identificador={cedulonConfig.identificador}
            disabled={disabledCedulon}
            allSelected={!check}
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
            onClick={this.chekearBeneficios}
            registrosSeleccionados={registrosSeleccionados}
            subItem={cedulonConfig.subItem}
            tipoCedulon={cedulonConfig.tipoCedulon}
            tipoTributo={cedulonConfig.idTipoTributo}
            identificador={cedulonConfig.identificador}
            disabled={disabledCedulon}
            allSelected={!check}
          />

          <MiMercadoPago
            tieneBeneficio={this.state.tieneBeneficio}
            onClick={this.chekearBeneficios}
            pagoRedirect={mercadoPagoConfig.pagoRedirect}
            idBtnMercadoPago={mercadoPagoConfig.idBtnMercadoPago + "2"}
            seccionDetalleTributo={mercadoPagoConfig.seccionDetalleTributo}
            registrosSeleccionados={registrosSeleccionados}
            subItem={cedulonConfig.subItem}
            tipoCedulon={cedulonConfig.tipoCedulon}
            tipoTributo={cedulonConfig.idTipoTributo}
            identificador={cedulonConfig.identificador}
            disabled={disabledCedulon}
            allSelected={!check}
          />
        </Grid>
      </Grid>

      <MiControledDialog
        paraMobile={this.props.paraMobile}
        open={revisionBeneficios.modal.open}
        onDialogoOpen={this.onRevisionBeneficiosDialogoOpen}
        onDialogoClose={this.onRevisionBeneficiosDialogoClose}
        textoLink={'Revisión de períodos seleccionados'}
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
  },
  textoBeneficioAplicado: {
    fontSize: '11px',
    marginLeft: '8px',
    color: '#ffa114',
    marginTop: '-8px',
    fontWeight: '500'

  }
});

export default withStyles(styles)(MisPagos);

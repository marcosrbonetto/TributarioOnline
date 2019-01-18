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
      tieneBeneficio: false
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
    //Seteamos las nuevas rows con sus nuevas configuraciones de acuerdo a los beneficios y la tabla
    this.setState({
      ...this.state,
      tableDisabled: result.tableDisabled || false,
      rowList: result.rowList
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

    //True o False de acuerdo si coinciden con un beneficio o no
    const tieneBeneficio = checkBeneficios(tipoTributo, seccion, allRows, selectedRows);

    this.setState({
      tieneBeneficio: tieneBeneficio
    }, () => {
      //Seguimos con la acción del boton
      callback();
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
        </Grid>
        <Grid item sm={6} className={classNames(classes.buttonActionsContent, "buttonActionsContent")}>

          <MisBeneficios
            tipoTributo={cedulonConfig.tipoTributo}
            seccion={cedulonConfig.tipoCedulon}
            rows={rowList}
            handleBeneficiosResult={this.handleBeneficiosResult} />

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
        <Grid item sm={7} className={"inputTotalPeriodos"}>
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
        <Grid item sm={5} className={classNames(classes.buttonActionsContent, "buttonActionsContent")}>
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

export default withStyles(styles)(MisPagos);

import React from "react";
import _ from "lodash";

//Styles
import { withStyles } from "@material-ui/core/styles";

//Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

//Custom Components
import MiTabla from "@Componentes/MiTabla";
import MiCedulon from "@Componentes/MiCedulon";
import MiMercadoPago from "@Componentes/MiMercadoPago";

//Funciones Útiles
import { stringToFloat, formatNumber, getIdTipoTributo } from "@Utils/functions"


class MisPagos extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      importeAPagar: '0,00'
    };
  }

  //Totalizador de importe de filas seleccionadas
  getFilasSeleccionadas = (filas, idFilasSeleccionadas) => {
    let registrosSeleccionados = []

    let importeTotal = 0;
    filas.map((item) => {
      importeTotal += parseFloat(idFilasSeleccionadas.indexOf(item.id) != -1 ? stringToFloat(item['importe']) : 0);

      if (idFilasSeleccionadas.indexOf(item.id) != -1)
        registrosSeleccionados.push(item['concepto']);
    });

    this.props.setRegistrosSeleccionados(this.props.menuItemSeleccionado, registrosSeleccionados);
    this.setState({ importeAPagar: formatNumber(importeTotal) });
  };

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
    const rowList = this.props.info ? this.props.info.rowList : [];
    const rowsPerPage = (rowList.length <= 5 && 5) || (rowList.length > 5 && rowList.length <= 10 && 10) || (rowList.length > 10 && 25);
    const columnas = this.props.data.labels.columnas || null;
    const order = this.props.data.order || 'asc';
    const orderBy = this.props.data.orderBy || 'concepto';
    const check = this.props.check;

    //Tributo y tipo de tributo para generar el cedulon
    const tributo = this.props.tributoActual;
    let tipoTributo = getIdTipoTributo(tributo);

    //Determinamos si el Cedulon tiene que estar deshabilitado
    let disabledCedulon = !(stringToFloat(this.state.importeAPagar) > 0);

    //En caso de ser juicio cambia cedulon siempre habilitado y 
    //el monto a pagar se setea el total (ya q la grilla no tiene checks)
    const esJuicio = this.props.menuItemSeleccionado == 'juicios';
    let auxImporteAPagar;
    if (esJuicio) {
      disabledCedulon = false;
      auxImporteAPagar = 0;
      rowList.map((item) => {
        auxImporteAPagar += stringToFloat(item['importe'], 2);
      });

      auxImporteAPagar = formatNumber(auxImporteAPagar);
    }

    return <div>
      <Grid container className={classes.containerDeudaAdm}>
        {/* Totalizadores */}
        <Typography className={classes.tituloDeudaAdm} variant="title" gutterBottom>Deuda {this.props.data.labels.totalesDeuda}</Typography>
        <Grid item sm={4}>
          <Grid container>
            <Grid item sm={6}>
              <Typography variant="subheading" gutterBottom>Total: </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography variant="subheading" gutterBottom><b>$ {formatNumber(valoresDeuda.valor1)}</b></Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4}>
          <Grid container>
            <Grid item sm={6}>
              <Typography variant="subheading" gutterBottom>{this.props.data.labels.vencida}: </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography variant="subheading" gutterBottom><b>$ {formatNumber(valoresDeuda.valor2)}</b></Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4}>
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
            value={auxImporteAPagar ? auxImporteAPagar : this.state.importeAPagar}
          />
        </Grid>
        <Grid item sm={5} className={classes.buttonActionsContent}>
          <MiCedulon
            registrosSeleccionados={this.props.registrosSeleccionados}
            subItemSeleccionado={this.props.info.identificador}
            tipoCedulon={this.props.tipoCedulon}
            tipoTributo={tipoTributo}
            identificador={this.props.identificadorActual}
            disabled={disabledCedulon}
            esJuicio={esJuicio}
          />

          <MiMercadoPago
            idBtnMercadoPago={this.props.menuItemSeleccionado+"1"}
            seccionDetalleTributo={this.props.menuItemSeleccionado}
            registrosSeleccionados={this.props.registrosSeleccionados}
            subItemSeleccionado={this.props.info.identificador}
            tipoCedulon={this.props.tipoCedulon}
            tipoTributo={tipoTributo}
            identificador={this.props.identificadorActual}
            disabled={disabledCedulon}
            esJuicio={esJuicio}
          />
        </Grid>
      </Grid>

      {/* Tabla de detalle del tributo */}
      <MiTabla
        columns={[
          { id: 'concepto', type: 'string', numeric: false, disablePadding: false, label: (columnas ? columnas[0] : 'Concepto') },
          { id: 'vencimiento', type: 'date', numeric: false, disablePadding: false, label: (columnas ? columnas[1] : 'Vencimiento') },
          { id: 'importe', type: 'string', numeric: false, disablePadding: false, label: (columnas ? columnas[2] : 'Importe ($)') },
          { id: 'detalle', type: 'custom', numeric: false, disablePadding: true, label: 'Detalle' },
        ]}
        rows={rowList || []}
        order={order}
        orderBy={orderBy}
        getFilasSeleccionadas={this.getFilasSeleccionadas}
        check={check}
        rowsPerPage={rowsPerPage}
      />

      <Grid container spacing={16}>
        {/* Totalizador de deudas seleccionadas y botones de pago */}
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
            value={auxImporteAPagar ? auxImporteAPagar : this.state.importeAPagar}
          />
        </Grid>
        <Grid item sm={5} className={classes.buttonActionsContent}>
          <MiCedulon
            registrosSeleccionados={this.props.registrosSeleccionados}
            subItemSeleccionado={this.props.info.identificador}
            tipoCedulon={this.props.tipoCedulon}
            tipoTributo={tipoTributo}
            identificador={this.props.identificadorActual}
            disabled={disabledCedulon}
            esJuicio={esJuicio}
          />

          <MiMercadoPago
            idBtnMercadoPago={this.props.menuItemSeleccionado+"2"}
            seccionDetalleTributo={this.props.menuItemSeleccionado}
            registrosSeleccionados={this.props.registrosSeleccionados}
            subItemSeleccionado={this.props.info.identificador}
            tipoCedulon={this.props.tipoCedulon}
            tipoTributo={tipoTributo}
            identificador={this.props.identificadorActual}
            disabled={disabledCedulon}
            esJuicio={esJuicio}
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
});

export default withStyles(styles)(MisPagos);

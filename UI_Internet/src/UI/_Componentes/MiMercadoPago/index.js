import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classNames from 'classnames';

//Alert
import { mostrarAlerta } from "@Utils/functions";

import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import MiControledDialog from "@Componentes/MiControledDialog";

import services from '@Rules/Rules_TributarioOnline';
import { mostrarCargando } from '@Redux/Actions/mainContent';

const mapStateToProps = state => {
  return {
    loggedUser: state.MainContent.loggedUser
  };
};

const mapDispatchToProps = dispatch => ({
  mostrarCargando: (cargar) => {
    dispatch(mostrarCargando(cargar));
  },
});

class MiMercadoPago extends React.PureComponent {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();

    this.state = {
      dialogoOpen: false,
      base64Cedulon: '',
      disabled: true
    };
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {

    if (JSON.stringify(this.props.disabled) != JSON.stringify(nextProps.disabled)) {
      this.setState({
        disabled: nextProps.disabled
      });
    }
  }

  onBotonCedulonClick = () => {

    this.props.mostrarCargando(true);

    const registros = this.props.registrosSeleccionados;
    const token = this.props.loggedUser.token;

    if (registros.length > 0) {
      
      /*services.getReporteMercadoPago(token,
        {
          "tipoTributo": parseInt(this.props.tipoTributo),
          "identificador": this.props.identificador,
          "periodos": registros
        })
        .then((datos) => {
          if (!datos.ok) { mostrarAlerta(datos.error); this.props.mostrarCargando(false); return false; }

          this.setState({
            base64Cedulon: datos.return ? 'data:application/pdf;base64,' + datos.return : '',
            dialogoOpen: true
          });

          this.props.mostrarCargando(false);
        })
        .catch((err) => { console.log(err); })
        .finally(() => {
          this.props.mostrarCargando(false);
        });*/
      this.setState({
        base64Cedulon: '',
        dialogoOpen: true
      });
    } else {
      this.setState({
        base64Cedulon: '',
        dialogoOpen: true
      });
      this.props.mostrarCargando(false);
    }
  }

  onDialogoOpen = () => {
    this.onBotonCedulonClick();
  }

  onDialogoClose = () => {
    this.setState({
      base64Cedulon: '',
      dialogoOpen: false
    });
  }

  loadModalMercadoLibre = (element) => {
    const script = document.createElement("script");

    script.src = "https://www.mercadopago.com.ar/integrations/v1/web-tokenize-checkout.js";
    script.setAttribute("data-public-key", "APP_USR-7f83f5ea-e10e-46a1-b862-3cbdc80e16c7");
    script.setAttribute("data-transaction-amount", "100.00");

    element && element.appendChild(script);
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

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
              onClick={this.onDialogoOpen}
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
            {this.state.base64Cedulon != '' && <iframe src={this.state.base64Cedulon} height="410px" width="856px"></iframe>}
            {this.state.base64Cedulon == '' && 'Debe seleccionar algún concepto'}
          </div>

          <div key="footerContent">
            <form id="form" onSubmit={this.handleSubmit} ref={this.loadModalMercadoLibre}>
              <input type="hidden"  value="true" name="mercadoPago" />
              <input type="hidden"  value="" name="nexom" />
            </form>
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
});

let componente = MiMercadoPago;
componente = withStyles(styles)(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;
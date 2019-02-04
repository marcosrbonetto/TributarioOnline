import React, { Component } from "react";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import classNames from 'classnames';
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { mostrarCargando } from '@Redux/Actions/mainContent'
import { mostrarAlerta } from "@Utils/functions";

import Button from "@material-ui/core/Button";
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import MiCard from "@Componentes/MiCard";
import MiControledDialog from "@Componentes/MiControledDialog";
import MiPDFPrinter from "@Componentes/MiPDFPrinter";

import servicesTributarioOnline from '@Rules/Rules_TributarioOnline';

const mapStateToProps = state => {
    return {
        loggedUser: state.Usuario.loggedUser,
        paraMobile: state.MainContent.paraMobile,
    };
};

const mapDispatchToProps = dispatch => ({
    mostrarCargando: (cargar) => {
        dispatch(mostrarCargando(cargar));
    },
    redireccionar: url => {
        dispatch(push(url));
    },
});

class MiInformacionDeudaCUIT extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogoOpen: false,
            arrayCuits: [],
            mensajeError: undefined,
            base64File: ''
        }
    }

    componentDidMount() {

        //Corroboramos Resultado importacion AFIP - BIENES por CUIT
        let statusAfipImportacion = localStorage.getItem('statusAfipImportacion');
        localStorage.removeItem('statusAfipImportacion');

        //CUITs a mostrar
        let cuitsInformeDeudas = localStorage.getItem('cuitsInformeDeudas');
        localStorage.removeItem('cuitsInformeDeudas');

        if (statusAfipImportacion && cuitsInformeDeudas) {
            if (statusAfipImportacion == 'OK') {
                //Quitamos al primer cuit ya que es el del log de afip
                cuitsInformeDeudas = cuitsInformeDeudas.split(',');
                cuitsInformeDeudas.shift();

                this.setState({
                    arrayCuits: cuitsInformeDeudas
                });
            } else {
                mostrarAlerta(statusAfipImportacion);
            }
        }
    }

    handleGetCUITAfip = () => {
        window.location.href = window.Config.BASE_URL_AFIP + "/afipInicio.html?urlRedirect=" + encodeURIComponent(window.Config.BASE_URL_SET_AFIP + '/importacionInformeDeudasAFIP?appUrlRedirect=' + window.location.hash.substring(1));
    }

    handleShowReport = (event) => {
        const token = this.props.loggedUser.token;
        const cuit = event.currentTarget.attributes.cuit.value;

        servicesTributarioOnline.getReporteInformeDeDeuda(token, cuit)
            .then((datos) => {
                this.props.mostrarCargando(false);

                if (!datos.ok) {
                    this.setState({
                        base64File: '',
                        dialogoOpen: false,
                        mensajeError: datos.error
                    });
                    return false;
                }

                const data = datos.return;

                this.setState({
                    base64File: data,
                    dialogoOpen: true,
                    mensajeError: undefined
                });

            }).catch(err => {
                console.warn("[Advertencia] Ocurrió un error al intentar comunicarse con el servidor.");
            });
    }

    onDialogoOpen = () => {
        this.setState({
            dialogoOpen: true
        });
    }

    onDialogoClose = () => {
        this.setState({
            base64File: '',
            dialogoOpen: false,
            mensajeError: undefined
        });
    }

    render() {
        const { classes, paraMobile } = this.props;
        const { arrayCuits, base64File, mensajeError } = this.state;

        return (
            <div>
                <MiCard
                    onClick={this.props.onClick}
                    onMouseLeave={this.onMouseLeave}
                    onMouseEnter={this.onMouseEnter}
                >
                    <CardHeader
                        className={classes.header}
                        avatar={
                            (this.props.icono && <Icon className={classNames(classes.icon, 'iconosTributarios')}>
                                {this.props.icono}
                            </Icon>)
                            ||
                            (!this.props.icono && <div className={classNames(classes.iconSvg, 'iconosTributarios')}>{this.props.iconoSvg}</div>)
                        }
                        action={
                            <Button
                                variant="outlined"
                                color="secondary"
                                className={classes.importButton}
                                onClick={this.handleGetCUITAfip}
                            >
                                Importar CUITs
                                </Button>
                        }
                        title={
                            <Typography className={classes.title} variant="title">{this.props.titulo}</Typography>
                        }
                    />
                    <div className={classes.sectionInputSpacing}>
                        {arrayCuits.length > 0 && arrayCuits.map((cuit) => {
                            return <Button
                                variant="outlined"
                                color="secondary"
                                onClick={this.handleShowReport}
                                cuit={cuit}
                                className={classes.buttonCUIT}
                            >
                                {cuit}
                            </Button>
                        }) ||
                            <Typography variant="body2">Importe los CUITs desde el botón "IMPORTAR CUITS"</Typography>}
                    </div>
                </MiCard>


                <MiControledDialog
                    paraMobile={paraMobile}
                    open={this.state.dialogoOpen}
                    onDialogoOpen={this.onDialogoOpen}
                    onDialogoClose={this.onDialogoClose}
                    titulo={'Informe Deuda'}
                    classMaxWidth={classes.maxWidth}
                >
                    <div key="mainContent">
                        <MiPDFPrinter
                            base64File={base64File}
                            textoLink={'Descargar Informe Deuda'}
                            textoFile={'Informe Deuda'}
                            callback={this.onDialogoClose}
                            mensajeError={mensajeError}
                        />
                    </div>
                </MiControledDialog>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MiInformacionDeudaCUIT));

import React from "react";
import _ from "lodash";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import './styles.css';
import classNames from 'classnames';
import { connect } from "react-redux";

//Router
import { withRouter } from "react-router-dom";
import { replace } from "connected-react-router";

//Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

//Custom Components
import MiCard from "@Componentes/MiCard";
import Divider from '@material-ui/core/Divider';

//Funciones Útiles
import { getIdTipoTributo, getTextoTipoTributo } from "@Utils/functions"

const mapDispatchToProps = dispatch => ({
    redireccionar: url => {
        dispatch(replace(url));
    },
});

class InformacionTributo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.idTipoTributo = getIdTipoTributo(this.props.match.params.tributo);
        this.tipoTributo = this.props.match.params.tributo;

        this.urlRedirect = decodeURIComponent(this.props.match.params.urlRedirect);
        
        this.state = {
            informacionTributo: this.infoTributo() || 'No hay información para este tributo'
        };
    }

    infoTributo = () => {
        switch (this.idTipoTributo) {
            case 1:
                return `Sr. Contribuyente de Automotores:
                Se encuentra vigente el decreto 3068/2018 que establece para el pago de contado hasta un 50% de rebaja en los recargos.
                Le recordamos que al contribuyente cumplidor 2017 se le descontó del total a abonar en 2018, el 14% (por pago anual oportuno) o el 10% (por pago bimestral oportuno de lo vencido hasta Noviembre de 2017) y se aplicó la rebaja distribuida en los periodos bimestrales de 2018.`;
            case 2:
                return `Sr. Contribuyente de Inmuebles:
                Se encuentra vigente el decreto 3068/2018 que establece para el pago de contado hasta un 50% de rebaja en los recargos.
                Le recordamos que al contribuyente cumplidor 2017 se le descontó del total a abonar en 2018, el 14% (por pago semestral oportuno) o el 10% (por pago mensual oportuno de lo vencido hasta Noviembre de 2017) y se aplicó la rebaja distribuida en los periodos mensuales de 2018.`;
            case 3:
                return `En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`;
            case 4:
                return `Sr. Contribuyente de Cementerios:
                Se encuentra vigente el decreto 3068/2018 que establece para el pago de contado hasta un 50% de rebaja en los recargos.`;
            case 5:
                return `En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`;
            case 6:
                return `En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`;
            case 7:
                return `En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`;
            case 8:
                return `En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`;
            case 9:
                return `En la tabla se listan las deudas que se deben pagar, puede seleccionar las que desee y proceder a pagarlas`;
        }
    }

    handleVovler = () => {
        this.props.redireccionar(this.urlRedirect);
    }

    render() {
        const { classes } = this.props;

        const { informacionTributo } = this.state;

        return (
            <div className={classNames(classes.mainContainer, "contentDetalleTributo", "mainContainer")}>
                <Grid container spacing={16} justify="center">
                    <Grid item xs={5} className={"container"} >
                        <MiCard>
                            <Button
                                onClick={this.handleVovler}
                                className={classes.btnVolver}
                                variant="outlined"
                                color="secondary">
                                Volver</Button>
                            <Typography className={classes.title} variant="title">Información de {this.tipoTributo}</Typography>
                            <Divider className={classes.divider} />
                            <Grid container spacing={16}>
                                <Grid item sm={12}>
                                    <Typography variant="subheading" gutterBottom>{informacionTributo}</Typography>
                                </Grid>
                            </Grid>
                        </MiCard>
                    </Grid>
                </Grid>
            </div >
        );
    }
}

let componente = InformacionTributo;
componente = withStyles(styles)(componente);
componente = connect(
    null,
    mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

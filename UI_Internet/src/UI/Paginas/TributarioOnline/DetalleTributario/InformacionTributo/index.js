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

//Informacion
import { infoExplicativaTributos } from '../infoExplicativaTributos.js';

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

        this.identificador = decodeURIComponent(this.props.match.params.identificador);

        this.state = {
            informacionTributo: this.infoTributo() || 'No hay información para este tributo'
        };
    }

    infoTributo = () => {
        return infoExplicativaTributos(this.idTipoTributo) || false;
    }

    handleVovler = () => {
        const tipoTributo = this.tipoTributo;
        const identificador = this.identificador;

        this.props.redireccionar('/DetalleTributario/'+tipoTributo+'/'+ encodeURIComponent(identificador));
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

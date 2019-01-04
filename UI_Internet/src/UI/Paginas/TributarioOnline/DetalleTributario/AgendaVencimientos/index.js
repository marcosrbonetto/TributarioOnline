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

//Custom Components
import MiTabla from "@Componentes/MiTabla";
import MiCard from "@Componentes/MiCard";
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button";

//Funciones Útiles
import { getIdTipoTributo, getTextoTipoTributo } from "@Utils/functions"

const mapDispatchToProps = dispatch => ({
    redireccionar: url => {
        dispatch(replace(url));
    },
});

class AgendaVencimientos extends React.PureComponent {
    constructor(props) {
        super(props);

        this.idTipoTributo = getIdTipoTributo(this.props.match.params.tributo);
        this.tipoTributo = this.props.match.params.tributo;

        this.urlRedirect = decodeURIComponent(this.props.match.params.urlRedirect);

        this.state = {
            vencimientosTributo: this.vencimientosTributo() || 'No hay vencimientos para este tributo'
        };
    }

    vencimientosTributo = () => {
        const { classes } = this.props;

        switch (this.idTipoTributo) {
            case 1:
                return <div>
                    <MiTabla
                        rowType={'Periodo'}
                        columns={[
                            { id: 'periodo', type: 'string', numeric: false, label: 'Período' },
                            { id: 'vencimiento', type: 'date', numeric: false, label: 'Vencimiento' },
                        ]}
                        rows={[
                            { 'periodo': '2018/01', 'vencimiento': '15/02/2018' },
                            { 'periodo': '2018/02', 'vencimiento': '12/04/2018' },
                            { 'periodo': '2018/03', 'vencimiento': '13/06/2018' },
                            { 'periodo': '2018/04', 'vencimiento': '14/08/2018' },
                            { 'periodo': '2018/05', 'vencimiento': '12/10/2018' },
                            { 'periodo': '2018/06', 'vencimiento': '12/12/2018' },
                        ]}
                        order={'asc'}
                        orderBy={'periodo'}
                        check={false}
                        pagination={false}
                    />
                    <MiTabla
                        rowType={'Cuotas'}
                        columns={[
                            { id: 'cuotas', type: 'string', numeric: false, label: 'Cuotas' },
                            { id: 'vencimiento', type: 'date', numeric: false, label: 'Vencimiento' },
                        ]}
                        rows={[
                            { 'cuotas': 'Cuota Única', 'vencimiento': '15/02/2018' },
                        ]}
                        order={'asc'}
                        orderBy={'cuotas'}
                        check={false}
                        pagination={false}
                    />
                </div>;
            case 2:
                return <div>
                    <MiTabla
                        rowType={'Periodo'}
                        columns={[
                            { id: 'periodo', type: 'string', numeric: false, label: 'Período' },
                            { id: 'vencimiento', type: 'date', numeric: false, label: 'Vencimiento' },
                        ]}
                        rows={[
                            { 'periodo': '2018/01', 'vencimiento': '14/02/2018' },
                            { 'periodo': '2018/02', 'vencimiento': '12/03/2018' },
                            { 'periodo': '2018/03', 'vencimiento': '10/04/2018' },
                            { 'periodo': '2018/04', 'vencimiento': '10/05/2018' },
                            { 'periodo': '2018/05', 'vencimiento': '11/06/2018' },
                            { 'periodo': '2018/06', 'vencimiento': '10/07/2018' },
                            { 'periodo': '2018/07', 'vencimiento': '10/08/2018' },
                            { 'periodo': '2018/08', 'vencimiento': '10/09/2018' },
                            { 'periodo': '2018/09', 'vencimiento': '10/10/2018' },
                            { 'periodo': '2018/10', 'vencimiento': '12/11/2018' },
                            { 'periodo': '2018/11', 'vencimiento': '10/12/2018' },
                            { 'periodo': '2018/12', 'vencimiento': '10/01/2019' },
                        ]}
                        order={'asc'}
                        orderBy={'periodo'}
                        check={false}
                        pagination={false}
                    />
                    <MiTabla
                        rowType={'Cuotas'}
                        columns={[
                            { id: 'cuotas', type: 'string', numeric: false, label: 'Cuotas' },
                            { id: 'vencimiento', type: 'date', numeric: false, label: 'Vencimiento' },
                        ]}
                        rows={[
                            { 'cuotas': '1° 1/2 Cuota', 'vencimiento': '14/02/2018' },
                            { 'cuotas': '2° 1/2 Cuota', 'vencimiento': '10/08/2018' },
                        ]}
                        order={'asc'}
                        orderBy={'cuotas'}
                        check={false}
                        pagination={false}
                    />
                </div>;
            case 3:
                return <div>
                    <Typography className={classes.titleTable} variant="headline" gutterBottom>
                        <b>Contribuyentes RSM</b>
                    </Typography>
                    <MiTabla
                        rowType={'Periodo'}
                        columns={[
                            { id: 'periodo', type: 'string', numeric: false, label: 'Período' },
                            { id: 'vencimiento', type: 'date', numeric: false, label: 'Vencimiento' },
                        ]}
                        rows={[
                            { 'periodo': '2018/01', 'vencimiento': '19/02/2018' },
                            { 'periodo': '2018/02', 'vencimiento': '16/03/2018' },
                            { 'periodo': '2018/03', 'vencimiento': '17/04/2018' },
                            { 'periodo': '2018/04', 'vencimiento': '16/05/2018' },
                            { 'periodo': '2018/05', 'vencimiento': '18/06/2018' },
                            { 'periodo': '2018/06', 'vencimiento': '18/07/2018' },
                            { 'periodo': '2018/07', 'vencimiento': '15/08/2018' },
                            { 'periodo': '2018/08', 'vencimiento': '18/09/2018' },
                            { 'periodo': '2018/09', 'vencimiento': '17/10/2018' },
                            { 'periodo': '2018/10', 'vencimiento': '16/11/2018' },
                            { 'periodo': '2018/11', 'vencimiento': '18/12/2018' },
                            { 'periodo': '2018/12', 'vencimiento': '17/01/2019' },
                        ]}
                        order={'asc'}
                        orderBy={'periodo'}
                        check={false}
                        pagination={false}
                    />
                    <Typography className={classes.titleTable} variant="headline" gutterBottom>
                        <b>Contribuyentes Tipo 2</b>
                    </Typography>
                    <MiTabla
                        rowType={'Periodo'}
                        columns={[
                            { id: 'periodo', type: 'string', numeric: false, label: 'Período' },
                            { id: 'vencimiento', type: 'date', numeric: false, label: 'Vencimiento' },
                        ]}
                        rows={[
                            { 'periodo': '2018/01', 'vencimiento': '09/03/2018' },
                            { 'periodo': '2018/02', 'vencimiento': '10/04/2018' },
                            { 'periodo': '2018/03', 'vencimiento': '10/05/2018' },
                            { 'periodo': '2018/04', 'vencimiento': '29/05/2018' },
                            { 'periodo': '2018/05', 'vencimiento': '28/06/2018' },
                            { 'periodo': '2018/06', 'vencimiento': '27/07/2018' },
                            { 'periodo': '2018/07', 'vencimiento': '29/08/2018' },
                            { 'periodo': '2018/08', 'vencimiento': '28/09/2018' },
                            { 'periodo': '2018/09', 'vencimiento': '29/10/2018' },
                            { 'periodo': '2018/10', 'vencimiento': '29/11/2018' },
                            { 'periodo': '2018/11', 'vencimiento': '28/12/2018' },
                            { 'periodo': '2018/12', 'vencimiento': '29/01/2019' },
                        ]}
                        order={'asc'}
                        orderBy={'periodo'}
                        check={false}
                        pagination={false}
                    />
                    <Typography className={classes.titleTable} variant="headline" gutterBottom>
                        <b>Grandes Contribuyentes y Tipo 4</b>
                    </Typography>
                    <MiTabla
                        rowType={'Periodo'}
                        columns={[
                            { id: 'periodo', type: 'string', numeric: false, label: 'Período' },
                            { id: 'vencimiento', type: 'date', numeric: false, label: 'Vencimiento' },
                        ]}
                        rows={[
                            { 'periodo': '2018/01', 'vencimiento': '23/02/2018' },
                            { 'periodo': '2018/02', 'vencimiento': '23/03/2018' },
                            { 'periodo': '2018/03', 'vencimiento': '23/04/2018' },
                            { 'periodo': '2018/04', 'vencimiento': '23/05/2018' },
                            { 'periodo': '2018/05', 'vencimiento': '22/06/2018' },
                            { 'periodo': '2018/06', 'vencimiento': '23/07/2018' },
                            { 'periodo': '2018/07', 'vencimiento': '23/08/2018' },
                            { 'periodo': '2018/08', 'vencimiento': '24/09/2018' },
                            { 'periodo': '2018/09', 'vencimiento': '24/10/2018' },
                            { 'periodo': '2018/10', 'vencimiento': '23/11/2018' },
                            { 'periodo': '2018/11', 'vencimiento': '21/12/2018' },
                            { 'periodo': '2018/12', 'vencimiento': '23/01/2019' },
                        ]}
                        order={'asc'}
                        orderBy={'periodo'}
                        check={false}
                        pagination={false}
                    />
                </div>;
            case 4:
                return <div>
                    <Typography className={classes.titleTable} variant="headline" gutterBottom>
                        <b>Cofradías</b>
                    </Typography>
                    <MiTabla
                        rowType={'Periodo'}
                        columns={[
                            { id: 'periodo', type: 'string', numeric: false, label: 'Período' },
                            { id: 'vencimiento', type: 'date', numeric: false, label: 'Vencimiento' },
                        ]}
                        rows={[
                            { 'periodo': '2018/01', 'vencimiento': '27/03/2018' },
                            { 'periodo': '2018/02', 'vencimiento': '27/06/2018' },
                            { 'periodo': '2018/03', 'vencimiento': '27/09/2018' },
                            { 'periodo': '2018/04', 'vencimiento': '27/12/2018' },
                        ]}
                        order={'asc'}
                        orderBy={'periodo'}
                        check={false}
                        pagination={false}
                    />

                    <Typography className={classes.titleTable} variant="headline" gutterBottom>
                        <b>Cementerios Privados</b>
                    </Typography>
                    <MiTabla
                        rowType={'Periodo'}
                        columns={[
                            { id: 'periodo', type: 'string', numeric: false, label: 'Período' },
                            { id: 'vencimiento', type: 'date', numeric: false, label: 'Vencimiento' },
                        ]}
                        rows={[
                            { 'periodo': '2018/01', 'vencimiento': '27/03/2018' },
                            { 'periodo': '2018/02', 'vencimiento': '27/06/2018' },
                            { 'periodo': '2018/03', 'vencimiento': '27/09/2018' },
                            { 'periodo': '2018/04', 'vencimiento': '27/12/2018' },
                        ]}
                        order={'asc'}
                        orderBy={'periodo'}
                        check={false}
                        pagination={false}
                    />

                    <Typography className={classes.titleTable} variant="headline" gutterBottom>
                        <b>Cementerio Municipal</b>
                    </Typography>
                    <MiTabla
                        rowType={'Periodo'}
                        columns={[
                            { id: 'periodo', type: 'string', numeric: false, label: 'Período' },
                            { id: 'vencimiento', type: 'date', numeric: false, label: 'Vencimiento' },
                        ]}
                        rows={[
                            { 'periodo': '2018/00', 'vencimiento': '27/03/2018' },
                        ]}
                        order={'asc'}
                        orderBy={'periodo'}
                        check={false}
                        pagination={false}
                    />
                </div>;
            case 5:
                return `No hay vencimientos para este tributo`;
            case 6:
                return <MiTabla
                    rowType={'Periodo'}
                    columns={[
                        { id: 'periodo', type: 'string', numeric: false, label: 'Período' },
                        { id: 'vencimiento', type: 'date', numeric: false, label: 'Vencimiento' },
                    ]}
                    rows={[
                        { 'periodo': '2018/01', 'vencimiento': '27/03/2018' },
                        { 'periodo': '2018/02', 'vencimiento': '27/06/2018' },
                        { 'periodo': '2018/03', 'vencimiento': '27/09/2018' },
                        { 'periodo': '2018/04', 'vencimiento': '27/12/2018' },
                    ]}
                    order={'asc'}
                    orderBy={'periodo'}
                    check={false}
                    pagination={false}
                />;
            case 7:
                return <MiTabla
                    rowType={'Periodo'}
                    columns={[
                        { id: 'periodo', type: 'string', numeric: false, label: 'Período' },
                        { id: 'vencimiento', type: 'date', numeric: false, label: 'Vencimiento' },
                    ]}
                    rows={[
                        { 'periodo': '2018/01', 'vencimiento': '07/02/2018' },
                        { 'periodo': '2018/02', 'vencimiento': '07/03/2018' },
                        { 'periodo': '2018/03', 'vencimiento': '06/04/2018' },
                        { 'periodo': '2018/04', 'vencimiento': '07/05/2018' },
                        { 'periodo': '2018/05', 'vencimiento': '07/06/2018' },
                        { 'periodo': '2018/06', 'vencimiento': '05/07/2018' },
                        { 'periodo': '2018/07', 'vencimiento': '06/08/2018' },
                        { 'periodo': '2018/08', 'vencimiento': '07/09/2018' },
                        { 'periodo': '2018/09', 'vencimiento': '05/10/2018' },
                        { 'periodo': '2018/10', 'vencimiento': '07/11/2018' },
                        { 'periodo': '2018/11', 'vencimiento': '07/12/2018' },
                        { 'periodo': '2018/12', 'vencimiento': '07/01/2019' },
                    ]}
                    order={'asc'}
                    orderBy={'periodo'}
                    check={false}
                    pagination={false}
                />;
            case 8:
                return `No hay vencimientos para este tributo`;
            case 9:
                return `No hay vencimientos para este tributo`;
        }
    }

    handleVovler = () => {
        this.props.redireccionar(this.urlRedirect);
    }

    render() {
        const { classes } = this.props;

        const { vencimientosTributo } = this.state;

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
                            <Typography className={classes.title} variant="title">Vencimientos 2018 de {this.tipoTributo}</Typography>
                            <Divider className={classes.divider} />
                            <Grid container spacing={16}>
                                <Grid item sm={12}>
                                    {vencimientosTributo}
                                </Grid>
                            </Grid>
                        </MiCard>
                    </Grid>
                </Grid>
            </div >
        );
    }
}

let componente = AgendaVencimientos;
componente = withStyles(styles)(componente);
componente = connect(
    null,
    mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;

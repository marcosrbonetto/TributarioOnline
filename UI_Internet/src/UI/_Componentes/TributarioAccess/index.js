import React from "react";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import classNames from 'classnames';
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Icon from '@material-ui/core/Icon';

import MiCard from "@Componentes/MiCard";

const mapStateToProps = state => {
    return { opciones: state.TributarioOnline.GET_ID_TRIBUTOS };
};

const mapDispatchToProps = dispatch => ({

});

class TributarioAccess extends React.PureComponent {
    constructor(props) {
        super(props);

        this.selectOnChange = this.selectOnChange.bind(this);

        this.onClickAgregar = this.onClickAgregar.bind(this);
        this.onClickBorrar = this.onClickBorrar.bind(this);

        this.updateInputIdentificador = this.updateInputIdentificador.bind(this);

        this.state = {
            opcionSeleccionada: '0',
            desdeSistema: true,
            nuevoIdentificador: '',
            errorInputNuevo: false,
            opcionesTributos: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.props.opciones[this.props.id])!=JSON.stringify(nextProps.opciones[this.props.id])){
            this.setState({
                opcionSeleccionada: nextProps.opciones[this.props.id][0].identificador,
                opcionesTributos: nextProps.opciones[this.props.id]
            });
        } else if(this.props.opciones[this.props.id]){
            this.setState({
                opcionSeleccionada: this.props.opciones[this.props.id][0].identificador,
                opcionesTributos: this.props.opciones[this.props.id]
            });
        }
    }

    selectOnChange = event => {
        if (event.target.value == '0')
            return false;

        this.setState({
            opcionSeleccionada: event.target.value,
            desdeSistema: (event.currentTarget.attributes.sistema.value == 'true' ? true : false)
        });
    };

    onClickAgregar = event => {
        let $state = this.state;

        // Valido que el lo ingresado pase el opcionTest seteado en props
        if ($state.nuevoIdentificador.toUpperCase() == '' ||
            !new RegExp(this.props.opcionTest).test($state.nuevoIdentificador.toUpperCase())) {

            this.setState({ errorInputNuevo: true });
            return false;
        }

        //Corroboro cuantos identificadores iguales hay existentes
        var itemsIdem = [...$state.opcionesTributos].filter(function (item) {
            return item.identificador == $state.nuevoIdentificador.toUpperCase();
        });

        //Ingreso el identificador
        this.setState({
            nuevoIdentificador: '',
            opcionSeleccionada: $state.nuevoIdentificador.toUpperCase(),
            desdeSistema: false,
            errorInputNuevo: false,
            opcionesTributos: itemsIdem.length != 0 ?
                $state.opcionesTributos
                :
                [
                    ...$state.opcionesTributos,
                    {
                        sistema: 'false',
                        identificador: $state.nuevoIdentificador.toUpperCase()
                    }
                ]
        });
    };

    onClickBorrar = event => {
        let $state = this.state;

        var items = [...$state.opcionesTributos].filter(function (item) {
            return item.identificador !== $state.opcionSeleccionada;
        });

        this.setState({
            opcionSeleccionada: items.length ? items[0].identificador : '0',
            desdeSistema: items.length ? items[0].sistema : true,
            opcionesTributos: items
        });
    };

    updateInputIdentificador = event => {
        this.setState({ nuevoIdentificador: event.target.value });
    };

    eventRedirect = () => {
        this.props.eventRedirect(this.state.opcionSeleccionada);
    };

    render() {
        const { classes } = this.props;

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
                            (this.props.icono && <Icon className={classes.icon}>
                                {this.props.icono}
                            </Icon>)
                            ||
                            (!this.props.icono && <div className={classes.iconSvg}>{this.props.iconoSvg}</div>)
                        }
                        title={
                            <Typography className={classes.title} variant="title">{this.props.tipo}</Typography>
                        }
                    />
                    <div className={classes.sectionInputSpacing}>
                        <InputLabel className={classes.labelInput}>{this.props.identificador}</InputLabel>
                        <Grid container spacing={0}>
                            <Grid item md={9}>
                                <Select
                                    className={classes.selectSpacing}
                                    value={this.state.opcionSeleccionada}
                                    onChange={this.selectOnChange}
                                    inputProps={{
                                        name: 'identificador',
                                        id: 'identificador',
                                    }}
                                >
                                    <MenuItem value="0">
                                        <em>Seleccione</em>
                                    </MenuItem>
                                    {Array.isArray(this.state.opcionesTributos) && this.state.opcionesTributos.map((data, index) => {
                                        return <MenuItem key={index} sistema={data.sistema} value={data.identificador}>{data.identificador}</MenuItem>
                                    })}
                                </Select>
                            </Grid>
                            <Grid item md={3} className={classes.contentRight}>
                                {
                                    this.state.opcionSeleccionada != '0' &&
                                    !this.state.desdeSistema && (
                                        <Button
                                            type="cancel"
                                            variant="contained"
                                            color="secondary"
                                            className={classNames(classes.buttonActions, classes.button)}
                                            onClick={this.onClickBorrar}
                                        >
                                            X
                                        </Button>
                                    )
                                }
                                {
                                    this.state.opcionSeleccionada != '0' && (
                                        <Button
                                            type="go"
                                            variant="contained"
                                            color="secondary"
                                            className={classNames(classes.buttonActions, classes.button)}
                                            onClick={this.eventRedirect}
                                        >
                                            ✓
                                        </Button>
                                    )
                                }
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.sectionInputSpacing}>
                        <InputLabel className={classes.labelInput} htmlFor="identificador">Ingresar nuevo {this.props.identificador.toLowerCase()}</InputLabel>
                        <Grid container spacing={0}>
                            <Grid item md={9}>
                                <TextField
                                    {...(this.state.errorInputNuevo ? { error: "true" } : {})}
                                    id="standard-bare"
                                    margin="normal"
                                    value={this.state.nuevoIdentificador}
                                    onChange={this.updateInputIdentificador}
                                />
                            </Grid>
                            <Grid item md={3} className={classes.contentRight}>
                                <Button
                                    type="add"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.buttonActions}
                                    onClick={this.onClickAgregar}
                                >
                                    Agregar
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </MiCard>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(TributarioAccess));

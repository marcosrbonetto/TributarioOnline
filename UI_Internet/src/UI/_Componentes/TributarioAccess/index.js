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

        this.state = {
            opcionSeleccionada: '0',
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
            opcionSeleccionada: event.target.value
        });
    };

    eventRedirect = () => {
        this.props.eventRedirect(this.props.tipo, this.state.opcionSeleccionada);
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
                                        return <MenuItem key={index} value={data.identificador}>{data.identificador}</MenuItem>
                                    })}
                                </Select>
                            </Grid>
                            <Grid item md={3} className={classes.contentRight}>
                                <Button
                                    type="enter"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.buttonActions}
                                    onClick={this.eventRedirect}
                                >
                                    Entrar
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

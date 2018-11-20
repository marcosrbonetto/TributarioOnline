import React from "react";

//Styles
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import classNames from 'classnames';
import { connect } from "react-redux";
import { push } from "connected-react-router";

import Button from "@material-ui/core/Button";
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import PlayArrow from '@material-ui/icons/PlayArrow';

import Icon from '@material-ui/core/Icon';

import MiCard from "@Componentes/MiCard";

const mapDispatchToProps = dispatch => ({
    redireccionar: url => {
        dispatch(push(url));
    },
});

class TributarioAccess extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            opcionesTributos: []
        }
    }

    componentDidMount() {
        const propsTributo = (this.props.opciones && this.props.opciones[this.props.id]) ? this.props.opciones[this.props.id] : null;
        if (propsTributo) {
            this.setState({
                opcionesTributos: propsTributo
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const nextPropsTributo = (nextProps.opciones && nextProps.opciones[this.props.id]) ? nextProps.opciones[this.props.id] : null;
        const propsTributo = (this.props.opciones && this.props.opciones[this.props.id]) ? this.props.opciones[this.props.id] : null;

        if (nextPropsTributo && JSON.stringify(propsTributo) != JSON.stringify(nextPropsTributo)) {
            this.setState({
                opcionesTributos: nextPropsTributo
            });
        } else if (propsTributo) {
            this.setState({
                opcionesTributos: propsTributo
            });
        }
    }

    handleOnClickAddTributo = (event) => {
        const tributo = event.currentTarget.attributes.tributo.value;
        this.props.redireccionar('/Inicio/Representantes/' + tributo + '?url=/Inicio');
    }

    eventRedirect = (event) => {
        const identificador = event.currentTarget.attributes.identificador.value;
        const tipoTributo = event.currentTarget.attributes.tipoTributo.value;
        this.props.eventRedirect(tipoTributo, identificador);
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
                        action={
                            <Button
                                variant="outlined"
                                color="secondary"
                                className={classNames(classes.buttonActions, classes.buttonAddTributo)}
                                tributo={this.props.tipo}
                                onClick={this.handleOnClickAddTributo}>
                                + Agregar
                            </Button>
                        }
                        title={
                            <Typography className={classes.title} variant="title">{this.props.tipo}</Typography>
                        }
                    />
                    <div className={classes.sectionInputSpacing}>
                        {/*<InputLabel className={classes.labelInput}>{this.props.identificador}</InputLabel>*/}
                        <Grid container spacing={0}>
                            <Grid item md={12}>
                                <List component="nav" className={classes.navList}>
                                    {Array.isArray(this.state.opcionesTributos) && this.state.opcionesTributos.length == 0 &&
                                        <ListItem button>
                                            <ListItemText primary={'No se encontraron ' + this.props.tipo} />
                                        </ListItem>
                                    }
                                    {Array.isArray(this.state.opcionesTributos) && this.state.opcionesTributos.map((data, index) => {
                                        return <ListItem button onClick={this.eventRedirect} identificador={data.identificador} tipoTributo={this.props.tipo}>
                                            <ListItemIcon>
                                                <PlayArrow className={classes.iconColor} />
                                            </ListItemIcon>
                                            <ListItemText primary={data.representado ? data.identificador + ' - ' + data.representado : data.identificador} />
                                        </ListItem>
                                    })}
                                </List>
                            </Grid>
                        </Grid>
                    </div>
                </MiCard>
            </div>
        );
    }
}

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(TributarioAccess));

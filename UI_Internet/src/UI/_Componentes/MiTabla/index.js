import React from "react";

//Styles
import { withStyles } from "@material-ui/core/styles";
import { styles, toolbarStyles } from './styles';
import classNames from 'classnames';
import { connect } from "react-redux";

import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

/*
Props esperadas:

->columns - (obligatorio) - Array columnas - Ej.: { id: 'concepto', type: 'string', numeric: false, disablePadding: true, label: 'Concepto' },
->rows - (obligatorio) - Array de objetos con respectivas columnas
->orderBy - (obligatorio) - id columna por la cual ordenar inicialmente
->order (defecto 'desc') - Sentido para ordenar
->getFilasSeleccionadas - Función que obtendrá las un array de filas y otro de los id de aquellas seleccionadas
->customCell - Funcion que retornara el contenido de la columna del tipo  type: 'customCell', y estará al último
->rowType - (defecto 'Concepto') - String que dice el tipo de filas que hay 
->noCheck - Boolean que determina si la grilla muestra los checks o no
*/

const mapDispatchToProps = dispatch => ({

});

function desc(a, b, orderBy, orderType) {
    switch (orderType) {
        case 'date':
            var dateB = b[orderBy].split('/');
            var dateA = a[orderBy].split('/');

            dateB = new Date(dateB[1] + '/' + dateB[0] + '/' + dateB[2]);
            dateA = new Date(dateA[1] + '/' + dateA[0] + '/' + dateA[2]);
            if (dateB < dateA) {
                return -1;
            }
            if (dateB > dateA) {
                return 1;
            }
            return 0;
        default:
            if (b[orderBy] < a[orderBy]) {
                return -1;
            }
            if (b[orderBy] > a[orderBy]) {
                return 1;
            }
            return 0;
    }
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy, orderType) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy, orderType) : (a, b) => -desc(a, b, orderBy, orderType);
}

class EnhancedTableHead extends React.Component {
    createSortHandler = (property, colType) => event => {
        this.props.onRequestSort(event, property, colType);
    };

    render() {
        const { classes } = this.props;
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
        const noCheck = this.props.noCheck;

        return (
            <TableHead className={classes.tableHead}>
                <TableRow>
                    {noCheck &&
                        <TableCell padding="checkbox">
                            <Checkbox
                                color='primary'
                                className={classes.tableCell}
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={numSelected === rowCount}
                                onChange={onSelectAllClick}
                            />
                        </TableCell>}
                    {this.props.columns.map((row, key) => {
                        return (
                            <TableCell
                                className={noCheck && key == 0 ? classes.tableCell : classNames(classes.tableCell, classes.paddingLeft)}
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <TableSortLabel
                                    className={classes.tableCell}
                                    active={orderBy === row.id}
                                    direction={order}
                                    onClick={this.createSortHandler(row.id, row.type)}
                                >
                                    {row.label}
                                </TableSortLabel>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

EnhancedTableHead = withStyles(toolbarStyles)(EnhancedTableHead)

class MiTabla extends React.PureComponent {
    constructor(props) {
        super(props);

        var data = (props.rows || []).map((row, key) => {
            row.id = key;
            return row;
        });

        this.state = {
            order: this.props.order || 'desc',
            orderBy: this.props.orderBy,
            orderType: 'string',
            selected: [],
            data: data,
            page: 0,
            rowsPerPage: this.props.rowsPerPage || 25,
        }
    }

    componentWillReceiveProps(nextProps) {
        var data = nextProps.rows.map((row, key) => {
            row.id = key;
            return row;
        });

        this.setState({
            data: data
        });
    }

    handleRequestSort = (event, property, colType) => {
        const orderBy = property;
        const orderType = colType;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy, orderType });
    };

    handleSelectAllClick = event => {
        let newSelected = [];
        if (event.target.checked) {
            newSelected = this.state.data.map(n => n.id);
            this.setState(state => ({ selected: newSelected }));
        } else {
            this.setState({ selected: newSelected });
        }

        if (this.props.getFilasSeleccionadas)
            this.props.getFilasSeleccionadas(this.state.data, newSelected);
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });

        if (this.props.getFilasSeleccionadas)
            this.props.getFilasSeleccionadas(this.state.data, newSelected);
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, orderType, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        const noCheck = !this.props.noCheck;

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            columns={this.props.columns}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            orderType={orderType}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                            noCheck={noCheck}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy, orderType))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((n,index) => {
                                    const isSelected = this.isSelected(n.id);

                                    return <MiRow
                                        key={index}
                                        noCheck={noCheck}
                                        data={n}
                                        classes={classes}
                                        onClick={this.handleClick}
                                        isSelected={isSelected}
                                        customCell={this.props.customCell}
                                    />
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Página Anterior',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Siguiente Página',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    labelRowsPerPage={(this.props.rowType ? this.props.rowType : 'Concepto') + ' por página'}
                    labelDisplayedRows={function labelDisplayedRows(_ref) {
                        var from = _ref.from,
                            to = _ref.to,
                            count = _ref.count;
                        return "".concat(from, "-").concat(to, " de ").concat(count);
                    }}
                />
            </Paper>
        );
    }


}

class MiRow extends React.PureComponent {

    onClick = (event) => {
        if (this.props.onClick == undefined) return;
        this.props.onClick(event, this.props.data.id);
    }

    render() {
        const noCheck = (this.props.noCheck || true);
        const classes = this.props.classes;

        return <TableRow
            hover
            onClick={this.onClick}
            role="checkbox"
            aria-checked={this.props.isSelected || false}
            tabIndex={-1}
            key={this.props.data.id}
            selected={this.props.isSelected || false}
        >
            {noCheck &&
                <TableCell padding="checkbox">
                    <Checkbox checked={this.props.isSelected || false} />
                </TableCell>}
            {Object.keys(this.props.data).map((cell, key) => {
                if(cell == 'data') return; //'data' son datos extras para utilizar
                return cell != 'id' && <TableCell className={noCheck && key == 0 ? '' : classes.paddingLeft} key={cell} padding="none">{this.props.data[cell]}</TableCell>
            })}
            {this.renderCustomCell()}
        </TableRow>
    }


    renderCustomCell = () => {
        return (
            <TableCell padding="none">{this.renderCustomCellContent()}</TableCell>
        );
    }

    renderCustomCellContent = () => {
        if (this.props.customCell == undefined) return null;
        return this.props.customCell(this.props.data);
    }

}


MiTabla.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(MiTabla));

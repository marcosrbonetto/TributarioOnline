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
import Tooltip from '@material-ui/core/Tooltip';

const mapDispatchToProps = dispatch => ({

});

let counter = 0;
function createData(periodo,vencimiento,importe) {
    counter += 1;
    return { id: counter, periodo,vencimiento,importe };
}

function desc(a, b, orderBy, orderType) {
    switch(orderType) {
        case 'date':
            var dateB = b[orderBy].split('/');
            var dateA = a[orderBy].split('/');

            dateB = new Date(dateB[1]+'/'+dateB[0]+'/'+dateB[2]);
            dateA = new Date(dateA[1]+'/'+dateA[0]+'/'+dateA[2]);
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

const rows = [
    { id: 'periodo', type: 'string', numeric: false, disablePadding: true, label: 'Periodo' },
    { id: 'vencimiento', type: 'date', numeric: false, disablePadding: true, label: 'Vencimiento' },
    { id: 'importe', type: 'string', numeric: false, disablePadding: true, label: 'Importe' },
];

class EnhancedTableHead extends React.Component {
    createSortHandler = (property, colType) => event => {
        this.props.onRequestSort(event, property, colType);
    };

    render() {
        const { classes } = this.props;
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead className={classes.tableHead}>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            color='primary'
                            className={classes.tableCell}
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                className={classes.tableCell}
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <TableSortLabel
                                    className={classes.tableCell}
                                    active={orderBy === row.id}
                                    direction={order}
                                    onClick={this.createSortHandler(row.id,row.type)}
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

        this.state = {
            order: 'desc',
            orderBy: 'periodo',
            orderType: 'string',
            selected: [],
            data: [
                createData('2018/002', '20/04/2018', '$1,00'),
                createData('2017/002', '19/05/2018', '$4,00'),
                createData('2016/002', '10/04/2016', '$3,00'),
                createData('2015/002', '10/04/2015', '$6,00'),
                createData('2014/002', '10/04/2014', '$5,00'),
                createData('2013/002', '10/04/2013', '$7,00'),
                createData('2012/002', '10/04/2012', '$6,00'),
                createData('2011/002', '10/04/2011', '$8,00'),
                createData('2012/002', '10/04/2012', '$6,00'),
                createData('2013/002', '10/04/2013', '$5,00'),
                createData('2014/002', '10/04/2014', '$4,00'),
            ],
            page: 0,
            rowsPerPage: 5,
        }
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
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
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

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            orderType={orderType}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy, orderType))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {n.periodo}
                                            </TableCell>
                                            <TableCell padding="none">{n.vencimiento}</TableCell>
                                            <TableCell padding="none">{n.importe}</TableCell>
                                        </TableRow>
                                    );
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
                    labelRowsPerPage='Filas por página'
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

MiTabla.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(MiTabla));

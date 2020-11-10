import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  header:{
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontFamily: theme.headerFont.fontFamily,
 },
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.test_name}
        </TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.created_at}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.header}>Category Name</TableCell>
                    <TableCell className={classes.header}>Range</TableCell>
                    <TableCell className={classes.header} align="right">Units</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.categories.map((maprow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {maprow.category_name}
                      </TableCell>
                      <TableCell>{maprow.range}</TableCell>
                      <TableCell align="right">{maprow.units}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    test_name: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    created_at: PropTypes.number.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        category_name: PropTypes.number.isRequired,
        range: PropTypes.string.isRequired,
        units: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const rows = [
  {
      "test_name": "Complete Blood Picture",
      "status": "active",
      "created_at" : "2020-01-01",
      "categories": [
        {category_name: "Hemoglobin", range: "11.5-15.5", units: "gms %"},
        {category_name: "Hematocrit", range: "35.0-45.0", units: "%"},
        {category_name: "Total R B C Count", range: "3.9-6.5", units: "millions/Cumm"},
        {category_name: "Total W B C Count", range: "4000-11,000", units: "Cells/Cumm"},
        {category_name: "Platelet Count", range: "25.0-33.0", units: "Lakhs/Cumm"},
        {category_name: "Neutrophils", range: "40-70", units: "%"},
        {units: "%", range: "20-45", category_name: "Lymphocytes"},
        {category_name: "Eosinophils", range: "01-06", units: "%"},
        {category_name: "Monocytes", range: "02-06", units: "%"},
        {category_name: "Basophils", range: "00-02", units: "%"},
      ]
  }
];


const useStyles = makeStyles((theme) => ({
    root: {
        width : '98%',
        marginTop: "10%",
        minHeight: '80vh',
    },
    header:{
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        fontFamily: theme.headerFont.fontFamily,
    }
}))

export default function AllTests() {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.header}/>
            <TableCell className={classes.header}>Test Name</TableCell>
            <TableCell className={classes.header} align="right">Status</TableCell>
            <TableCell className={classes.header} align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

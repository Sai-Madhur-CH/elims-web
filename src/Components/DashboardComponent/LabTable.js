import React,{ useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {auth} from '../../Api/Api.js';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 13,
    },
  }))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 500,
  },
  container: {
    flexGrow: 1,
    width : '99%',
    marginTop: "10%",
    maxHeight: "80vh",
  },
  headerFont: {
    fontFamily: theme.headerFont.fontFamily,
  },
  pagination:{
      height: theme.spacing(7),
  }
}));

export default function LabDetailsTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [labDetails, setLabDetails] = useState([]);
  const [totalLabDetails, setTotalLabDetails] = useState(0);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getLabDetails()
  },[rowsPerPage, page])

  const getLabDetails = async () => {
    const api = await auth;
    const params = {};
    params.page = page
    params.limit = rowsPerPage
    api
    .get('/labs', {params})
    .then(res=>{
        if (res.data.status === 'success' && res.data.rows !== null){
            setLabDetails(res.data.rows)
            setTotalLabDetails(res.data.total)
        }
    })
  }

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} stickyHeader aria-label="sticky table">
      <TableHead>
          <TableRow>
            {/* <StyledTableCell className={classes.headerFont}>CLIA</StyledTableCell> */}
            <StyledTableCell className={classes.headerFont}>Lab Name</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Address</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Type</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Phone</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">State</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">City</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Zip</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {labDetails.map((row) => (
            <StyledTableRow key={row.lab_id}>
              <StyledTableCell width="30%">{row.laboratory_name}</StyledTableCell>
              <StyledTableCell  align="right">{row.address}</StyledTableCell>
              <StyledTableCell  align="right">{row.certificate_type}</StyledTableCell>
              <StyledTableCell  align="right">{row.phone}</StyledTableCell>
              <StyledTableCell  align="right">{row.state}</StyledTableCell>
              <StyledTableCell  align="right">{row.city}</StyledTableCell>
              <StyledTableCell  align="right">{row.zip}</StyledTableCell>
            </StyledTableRow>
            
          ))}   
        </TableBody>
        <TableFooter>
          <TableRow className={classes.pagination}>
            <StyledTableCell align="right">
            <Pagination color="primary" shape="rounded"  count={Math.ceil(totalLabDetails / rowsPerPage)} onChange={handlePageChange}/>
            </StyledTableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

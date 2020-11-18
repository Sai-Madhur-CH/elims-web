import React,{ useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {auth} from '../../Api/Api.js';
import Pagination from '@material-ui/lab/Pagination';


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

export default function LabTestsTable() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [labTestsDetails, setLabDetails] = useState([]);
  const [totalLabTestsDetails, setTotalLabTestDetails] = useState(0);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getLabDetails()
  },[page])

  const getLabDetails = async () => {
    const api = await auth;
    const params = {};
    params.page = page
    params.limit = rowsPerPage
    api
    .get('/lab_tests', {params})
    .then(res=>{
        if (res.data.status === 'success' && res.data.rows !== null){
            setLabDetails(res.data.rows)
            setTotalLabTestDetails(res.data.total)
        }
    })
  }

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} stickyHeader aria-label="sticky table">
      <TableHead>
          <TableRow>
            <StyledTableCell className={classes.headerFont}>Test Name</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Loinc</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Short Name</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Method Type</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Scale Type</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Property</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {labTestsDetails.map((row) => (
            <StyledTableRow key={row.loinc_num}>
              <StyledTableCell width="35%">{row.component}</StyledTableCell>
              <StyledTableCell  align="right">{row.loinc_num}</StyledTableCell>
              <StyledTableCell  align="right">{row.shortname}</StyledTableCell>
              <StyledTableCell  align="right">{row.method_typ}</StyledTableCell>
              <StyledTableCell  align="right">{row.scale_typ}</StyledTableCell>
              <StyledTableCell  align="right">{row.property}</StyledTableCell>
              <StyledTableCell  align="right">{row.status}</StyledTableCell>
            </StyledTableRow>
            
          ))}   
        </TableBody>
        <TableFooter>
          <TableRow className={classes.pagination}>
            <StyledTableCell width="35%">
            <Pagination color="primary" shape="rounded"  count={Math.ceil(totalLabTestsDetails / rowsPerPage)} onChange={handlePageChange}/>
            </StyledTableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

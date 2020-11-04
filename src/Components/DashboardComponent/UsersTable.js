import React,{useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
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
    minWidth: 650,
  },
  container: {
    maxHeight: "70vh",
  },
  margin: {
    margin: theme.spacing(1),
    left: "30%",
  },
  searchButton: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    left: '30%',
    '&:hover': {
      backgroundColor: theme.hover.secondary.main,
      color: "white",
    },
  },
  headerFont: {
    fontFamily: theme.headerFont.fontFamily,
  },
}));

export const rows = [
  {
    "user_id": 1,
    "name": "Sai Madhur",
    "phone": 9553390695,
    "email": "ECLIMSAdmin@EISBIZ.NET",
    "role_name": "Admin",
    "status": "active"
  },
  {
    "user_id": 2,
    "name": "paitent1",
    "phone": 9555555555,
    "email": "paitent1@EISBIZ.NET",
    "role_name": "Patient",
    "status": "active"
  },
  {
    "user_id": 3,
    "name": "clinician1",
    "phone": 9553333333,
    "email": "clinician1@EISBIZ.NET",
    "role_name": "Clinician",
    "status": "active"
  },
  {
    "user_id": 4,
    "name": "physician1",
    "phone": 9000000031,
    "email": "physician1@EISBIZ.NET",
    "role_name": "Physician",
    "status": "active",
    "appointments":[
      { startDate: '2018-10-31T10:45', endDate: '2018-10-31T12:00', title: 'Meeting',roomId: 3 },
      { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting',roomId: 1 },
      { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Meeting',roomId: 1 },
    ],
  },
  {
    "user_id": 5,
    "name": "receptionist1",
    "phone": 9000000100,
    "email": "receptionist1@EISBIZ.NET",
    "role_name": "Receptionist",
    "status": "active"
  },
  {
    "user_id": 6,
    "name": "physician2",
    "phone": 9000000031,
    "email": "physician2@EISBIZ.NET",
    "role_name": "Physician",
    "status": "active",
    "appointments":[
      { startDate: '2018-10-30T10:45', endDate: '2018-10-30T12:00', title: 'Meeting',roomId: 1 },
      { startDate: '2018-11-02T09:45', endDate: '2018-11-02T11:00', title: 'Meeting',roomId: 1 },
      { startDate: '2018-11-03T12:00', endDate: '2018-11-03T13:30', title: 'Meeting',roomId: 2 },
    ],
  },
  {
    "user_id": 7,
    "name": "receptionist2",
    "phone": 9000000102,
    "email": "receptionist2@EISBIZ.NET",
    "role_name": "Receptionist",
    "status": "active"
  },
  {
    "user_id": 8,
    "name": "clinician2",
    "phone": 9553333332,
    "email": "clinician2@EISBIZ.NET",
    "role_name": "Clinician",
    "status": "active"
  },
  {
    "user_id": 9,
    "name": "paitent2",
    "phone": 9555555552,
    "email": "paitent2@EISBIZ.NET",
    "role_name": "Patient",
    "status": "active"
  },
  {
    "user_id": 10,
    "name": "admin2",
    "phone": 9000000005,
    "email": "admin2@EISBIZ.NET",
    "role_name": "Admin",
    "status": "active"
  },
];

export default function Userstable() {
  const classes = useStyles();
  const [filter, setfilter] =  useState('');
  const [data, setData] = useState(rows);


  const excludeColumns = ["status"];
  
  function filterData(value)  {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(rows);
    else {
      const filteredData = rows.filter(item => {
        return Object.keys(item).some(key =>
          excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setData(filteredData);
    }
  }

  const handleSearch = () => {
    if (filter !== null || filter !== '' || filter.length > 0){
      filterData(filter)
    }
  }

  return (
    <div>
    <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label="Search for user"
        onChange={(e) => {setfilter(e.target.value)}}
        // InputProps={{
        //   startAdornment: (
        //     <InputAdornment position='end'>
        //       <IconButton className={classes.searchbutton}>
        //         <SearchIcon />
        //       </IconButton>
        //     </InputAdornment>
        //   ),
        // }}
      />
    <Button className={classes.searchButton} onClick={handleSearch}>Search</Button>
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.headerFont}>User Name</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Email</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Role</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Phone</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.role_name}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

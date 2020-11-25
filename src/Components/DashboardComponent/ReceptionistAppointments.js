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
  root: {
    flexGrow: 1,
    width: "99%",
    marginTop: "7%",
  },
  table: {
    minWidth: 650,
  },
  container: {
    maxHeight: "70vh",
    width : '99%',
  },
  tableContainer: {
    flexGrow: 1,
    width : '99%',
    marginTop: "5%",
    maxHeight: "85vh",
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
  gridStyle:{
    marginTop: theme.spacing(5),
  },
  textFont:{
    fontFamily: theme.headerFont.fontFamily,
  },
  save:{
      marginTop: theme.spacing(6),
      marginRight: "10%",
  },
  topspacing:{
    marginTop: theme.spacing(3),
  },
  topspacingNewGrid:{
    marginTop: theme.spacing(10),
    maxHeight: "82vh",
    // marginRight: theme.spacing(5),
  },
  topSpacingMultiSelect:{
    marginTop: theme.spacing(6),
  },
  pdfReport:{
    marginTop: theme.spacing(4),
    width: '95%',
    height : '650px',
  },
  topSpacingBackButton:{
    marginTop: theme.spacing(10),
    marginRight: "88%"
  },
}));


const rows = {
    "user_id": 4,
    "name": "physician1",
    "phone": 9000000031,
    "email": "physician1@EISBIZ.NET",
    "role_name": "Physician",
    "status": "active",
    "appointments":[
      { id:1, patient_name: 'paitent1',startDate: '2018-10-31T10:45', endDate: '2018-10-31T12:00', title: 'Meeting',roomId: 3, phone:9553390682, report_status : 'Ready for Review', selectedTests : ["Complete Blood Picture", "X-Ray"] },
      { id:2, patient_name: 'paitent1',startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting',roomId: 1, phone:9553390692, report_status : 'In Progress' },
      { id:3, patient_name: 'paitent2',startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Meeting',roomId: 1, phone:9553390612, report_status : 'Completed', description:'Everything looks normal as per the test reports.', selectedTests : ["Complete Blood Picture", "X-Ray"] },
    ],
  }

export default function ReceptionistAppointmentsTable() {
  const classes = useStyles();
  const [filter, setfilter] =  useState('');
  const [data, setData] = useState(rows.appointments);
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

//   const handleAppointments = (row) =>{
//     setselectedAppointment(row)
//     if (row && row.selectedTests ){
//       setSelectedTests(row.selectedTests)
//     }
//   }

  function formatDate(string){
    var options = { year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric',
                    second: 'numeric' 
                };
    return new Date(string).toLocaleDateString([],options);
  }   

//   const handleSelectTests = (values) => {
//     setSelectedTests(values)
//   };

//   const handleDiscription = (e) => {
//     if (e.target.value){
//       const appointment = selectedAppointment
//       appointment['description'] = e.target.value
//       setselectedAppointment(appointment)
//     }
//   }


  return (
    <div className={classes.root}>
    <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label="Appointments"
        onChange={(e) => {setfilter(e.target.value)}}
      />
    <Button className={classes.searchButton} onClick={handleSearch}>Search</Button>
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.headerFont}>Appointment ID</StyledTableCell>
            <StyledTableCell className={classes.headerFont}>Patient Name</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Appointment Due Date</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Phone</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Report Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="left">{row.id}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.patient_name}
              </StyledTableCell>
              <StyledTableCell align="right">{formatDate(row.startDate)}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.report_status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
    </div>
  );
}

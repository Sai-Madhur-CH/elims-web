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
import { Button, Grid, Typography } from '@material-ui/core';
import  MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import XRay from "../../Assets/XRay.pdf";
import Report from "../../Assets/Lab_report.pdf";

const PointerStyledTableCell = withStyles((theme) => ({
    root: {
        '&:hover':{
            cursor:"pointer",
            textDecoration: 'underline',
            color: theme.status.danger,
        }
      },
    head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    },
    body: {
    fontSize: 14,
    },
}))(TableCell);


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
    // marginLeft: '10%',
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
  }
}));


const rows = {
    "user_id": 4,
    "name": "physician1",
    "phone": 9000000031,
    "email": "physician1@EISBIZ.NET",
    "role_name": "Physician",
    "status": "active",
    "appointments":[
      { id:1, patient_name: 'paitent1',startDate: '2018-10-31T10:45', endDate: '2018-10-31T12:00', title: 'Meeting',roomId: 3, phone:9553390682, status : 'In progress' },
      { id:2, patient_name: 'paitent1',startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting',roomId: 1, phone:9553390692, status : 'Inactive' },
      { id:3, patient_name: 'paitent2',startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Meeting',roomId: 1, phone:9553390612, status : 'Active' },
    ],
  }

const tests = ["Complete Blood Picture","Fasting Blood Suger"]

export default function AppointmentsTable() {
  const classes = useStyles();
  const [filter, setfilter] =  useState('');
  const [data, setData] = useState(rows.appointments);
  const [selectedAppointment, setselectedAppointment] = useState(null);
  const excludeColumns = ["status"];
  const [selectedLab, setSelectedLab] = useState('Report');
  
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

  const handleAppointments = (row) =>{
    setselectedAppointment(row)
  }

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

  return (
    selectedAppointment === null ? 
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
            <StyledTableCell className={classes.headerFont} align="right">Appointment Start Date</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Appointment End Date</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Phone</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="left">{row.id}</StyledTableCell>
              <PointerStyledTableCell component="th" scope="row"  onClick={() => handleAppointments(row)}>
                {row.patient_name}
              </PointerStyledTableCell>
              <StyledTableCell align="right">{row.startDate}</StyledTableCell>
              <StyledTableCell align="right">{row.endDate}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
    </div> : <div className={classes.root}>
    {/* <Grid container justify="left">
        <IconButton color="secondary" onClick={() => handleAppointments(null)}><KeyboardBackspaceIcon /></IconButton>
    </Grid> */}
    <Grid container justify="space-between" spacing={12}>
    <Grid container className={classes.gridStyle}  xs={5}>
        <Grid className={classes.topspacing} xs={5}>
        <Typography className={classes.textFont}>Patient Name :</Typography>
        </Grid>
        <Grid className={classes.topspacing} xs={5}>
        <Typography className={classes.textFont}>{selectedAppointment.patient_name}</Typography>
        </Grid>
        <Grid className={classes.topspacing} xs={5}>
        <Typography className={classes.textFont}>Patient phone :</Typography>
        </Grid>
        <Grid className={classes.topspacing} xs={5}>
        <Typography className={classes.textFont}>{selectedAppointment.phone}</Typography>
        </Grid>
        <Grid className={classes.topspacing} xs={5}>
        <Typography className={classes.textFont}>Start date : </Typography>
        </Grid>
        <Grid className={classes.topspacing} xs={7}>
        <Typography className={classes.textFont}>{formatDate(selectedAppointment.startDate)}</Typography>
        </Grid>
        <Grid className={classes.topspacing} xs={5}>
        <Typography className={classes.textFont}>End date : </Typography>
        </Grid>
        <Grid className={classes.topspacing} xs={7}>
        <Typography className={classes.textFont}>{formatDate(selectedAppointment.endDate)}</Typography>
        </Grid>
        <Grid className={classes.topspacing} xs={5}>
        <Typography className={classes.textFont}>Description : </Typography>
        </Grid>
        <Grid className={classes.topspacing} xs={7}>
        <TextField
              className={classes.gridStyle}
              id="outlined-multiline-static"
              multiline
              rows={6}
              rowsMax={6}
              variant="outlined"
              placeholder="Enter observations"
              fullWidth
            />
        </Grid>
        <Grid className={classes.topspacing} xs={5}>
        <Typography className={classes.textFont}>Select Tests : </Typography>
        </Grid>
        <Grid className={classes.topspacing} xs={7}>
        <Select 
        placeholder="Please select tests."  
        id="grouped-select"
        fullWidth
        className={classes.gridStyle}
        >
        {tests.map((test, index) => (
            <MenuItem key={index} value={test} >
                {test}
            </MenuItem>
        ))}
        </Select>
        </Grid>
        <Grid  xs={5}>
          <Button
            variant="contained"
            color="primary"
            className={classes.save}
            alignItems="center"
            onClick={() => handleAppointments(null)}
            >
              Back
          </Button>
        </Grid>
        <Grid  xs={5}>
          <Button
            variant="contained"
            color="primary"
            className={classes.save}
            alignItems="center"
            >
              Save
          </Button>
        </Grid>
    </Grid>
    <Grid className={classes.topspacing} xs={6}>
    <TableContainer className={classes.tableContainer} component={Paper} >
      <Table className={classes.table} stickyHeader aria-label="sticky table">
      <TableHead>
          <TableRow>
            <StyledTableCell className={classes.headerFont}>List of Reports</StyledTableCell>
          </TableRow>
      </TableHead>
      <TableBody>
      <StyledTableRow>
        <PointerStyledTableCell width="20%" onClick={() => setSelectedLab('Report')}>
          Complete Blood Picture
        </PointerStyledTableCell>
        </StyledTableRow>
      <StyledTableRow>
        <PointerStyledTableCell width="20%" onClick={() => setSelectedLab('XRay')}>
          X-Ray
        </PointerStyledTableCell>
        </StyledTableRow>
      </TableBody>
      </Table>
    </TableContainer>
    {selectedLab === 'XRay' ?
    <Grid className={classes.topspacing} xs={12}>
    <object width="100%" height="400" data={XRay} type="application/pdf" aria-label="this object has text" />
    </Grid> : null }
    {selectedLab === 'Report' ?
    <Grid className={classes.topspacing} xs={12}>
    <object width="100%" height="400" data={Report} type="application/pdf" aria-label="this object has text" />
    </Grid> : null }
    </Grid>
    </Grid>
    </div>
  );
}

import 'date-fns';
import React, {useState} from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  // KeyboardDatePicker,
} from '@material-ui/pickers';
// import { toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
// import { MultipleSelect } from "react-select-material-ui";
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



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
        marginTop: "8%",
    },
    inputWidth:{
      minWidth: "30%",
      minHeight: "65px",
      maxWidth: "30%",
    },
    formControl: {
      margin: theme.spacing(2),
      minWidth: "30%",
      minHeight: "65px",
    },
    add:{
      margin: theme.spacing(5),
    },
    margin:{
      marginTop: theme.spacing(5),
    },
    tableMargin:{
      marginTop: theme.spacing(2),
    },
    totalFeesInput:{
        minWidth: "30%" 
    },
    emptySpan:{
      minWidth: "48%",
      minHeight: "65px",
      maxWidth: "38%",
    },
    headerFont: {
      fontFamily: theme.headerFont.fontFamily,
    },
    formAddControl:{
      minWidth: "80%",
    }
}));

const options = [
  {
    id:1,
    name:'Complete Blood Picture',
    price:200
  },
  {
    id:2,
    name:'Fasting Blood Suger',
    price:250
  },
  {
    id:3,
    name:'X-Ray',
    price:500
  },
  {
    id:4,
    name:'Lipid Panel',
    price:350
  }
]

export default function Appointments() {
  const classes = useStyles();
  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const [fromTime, setFromTime] = useState(new Date());
  // const [toTime, setToTime] = useState(new Date());
  // const physicainsOptions = ["Physician 1", "Physician 2", "Physician 3", "Physician 4"];
  // const clinicianOptions = ["Clinician 1", "Clinician 2", "Clinician 3", "Clinician 4"];
  const [testOptions, setTestOptions] = useState(options);
  // const [selectedPhysician, setSelectedPhysician] = useState([]);
  // const [selectedClinician, setSelectedClinician] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [TotalFees, setTotalFees] = useState(0);
  // const [switchValue, setSwitchValue] = useState(false);
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  // const handleFromTimeChange = (date) => {
  //   setFromTime(date);
  //   setToTime(date);
  // }

  // const handleToTimeChange = (date) => {
  //   if (date < fromTime) {
  //       toast.error("To date should be greater than from date");
  //   }  
  //   else {
  //   setToTime(date);
  //   }
  // }

  // const handleSelectPhysicians = (values) => {
  //   setSelectedPhysician(values)
  // };

  // const handleSelectClinician = (values) => {
  //   setSelectedClinician(values)
  // };

  // const handleSelectTests = (values) => {
  //   setSelectedTests(values)
  // };

  const handleAddTests = (e) => {
      setSelectedTests(selectedTests.concat(e.target.value))
      setAdd(!add)
      setRemove(false)
      const newList = testOptions.filter((item) => item.id !== e.target.value.id);
      setTestOptions(newList)
      setTotalFees(TotalFees + e.target.value.price)
  }

  const handleRemoveTests = (e) => {
    const newList = selectedTests.filter((item) => item.id !== e.target.value.id);
    setSelectedTests(newList)
    setTestOptions(testOptions.concat(e.target.value))
    setAdd(false)
    setRemove(false)
    setTotalFees(TotalFees - e.target.value.price)
  }

  return (
    <div className={classes.root}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Grid container justify="space-around" >
        <TextField
          className={classes.inputWidth}
          id="standard-basic"
          label="Patient Name"
          helperText="Enter Patient Name"
        />
        <TextField
          className={classes.inputWidth}
          id="standard-basic"
          label="Patient Number"
          helperText="Enter Patient Number"
          type="number"
        />
        <TextField
          className={classes.inputWidth}
          id="standard-basic"
          label="Patient Email"
          helperText="Enter Patient Email"
        />
      </Grid>

      <Grid container justify="space-around" className={classes.margin}>
        <TextField
          className={classes.inputWidth}
          id="standard-basic"
          label="Patient Age"
          helperText="Enter Patient Age"
          type="number"
        />
        <TextField
          className={classes.inputWidth}
          id="standard-basic"
          label="Patient Sex"
          helperText="Enter Patient Sex"
        />
        <TextField
          className={classes.inputWidth}
          id="standard-basic"
          label="Patient Marital Status"
          helperText="Enter Marital Status"
        />
      </Grid>

      <Grid container justify="space-around" className={classes.margin}>
        <TextField
          className={classes.inputWidth}
          id="standard-basic"
          label="Patient SS Number"
          helperText="Enter Patient SS Number"
        />
        <TextField
          className={classes.inputWidth}
          id="standard-basic"
          label="Patient Address"
          helperText="Enter Patient Address"
        />
        <TextField
          className={classes.inputWidth}
          id="standard-basic"
          label="Patient Pincode"
          helperText="Enter Patient Pincode"
          type="number"
        />
      </Grid>

      {/* <Grid container justify="space-around" className={classes.margin}>
        <KeyboardDatePicker
          className={classes.inputWidth}
          margin="normal"
          id="date-picker-dialog"
          label="Select date"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          helperText="Select Date of Appointment"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          className={classes.inputWidth}
          margin="normal"
          id="time-picker"
          label="From time"
          value={fromTime}
          onChange={handleFromTimeChange}
          helperText="Select From Date of Appointment"
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <KeyboardTimePicker
          className={classes.inputWidth}
          margin="normal"
          id="time-picker"
          label="To time"
          value={toTime}
          onChange={handleToTimeChange}
          helperText="Select To Date of Appointment"
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid> */}
      
      <Grid container justify="inherit" className={classes.margin} >

        <Grid item sm={1}>
          <IconButton onClick={() => {setAdd(!add)}}><AddIcon /></IconButton>
        </Grid>

        <Grid item sm={1}>
        <IconButton color='primary' onClick={() => {setRemove(!remove)}}><RemoveIcon /></IconButton>
        </Grid>

        {add && testOptions && testOptions.length > 0 ? <Grid item sm={4}>
         <FormControl className={classes.formAddControl}>
                <InputLabel id="demo-simple-select-label">Select Tests</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleAddTests}
                >
                  {testOptions.map(test => (
                      <MenuItem key={test.id} value={test}>{test.name}</MenuItem>
                  ))}
                </Select>
              </FormControl></Grid> : null}
        
        {remove && selectedTests && selectedTests.length > 0 ? <Grid item sm={4}>
        <FormControl className={classes.formAddControl}>
          <InputLabel id="demo-simple-select-label">Remove Tests</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleRemoveTests}
          >
            {selectedTests.map(test => (
                <MenuItem key={test.id} value={test}>{test.name}</MenuItem>
            ))}
          </Select>
        </FormControl></Grid>: null }
      </Grid>
      
      <Grid container justify="space-around" className={classes.tableMargin}>
        <TableContainer className={classes.reportcontainer} component={Paper} >
          <Table className={classes.table} stickyHeader aria-label="sticky table">
            <TableHead>
                <StyledTableRow>
                  <StyledTableCell className={classes.headerFont} align='left'>S.No</StyledTableCell>
                  <StyledTableCell className={classes.headerFont} align='left'>Item Description</StyledTableCell>
                  <StyledTableCell className={classes.headerFont} align='right'>Price</StyledTableCell>
                </StyledTableRow>
            </TableHead>
            <TableBody>
                {selectedTests && selectedTests.length > 0 ? selectedTests.map((test,i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="left">{i + 1}</StyledTableCell>
                    <StyledTableCell align="left">{test.name}</StyledTableCell>
                    <StyledTableCell align="right">{test.price}</StyledTableCell>
                  </StyledTableRow>
                ))
                : <StyledTableRow>
                <StyledTableRow></StyledTableRow>
                <StyledTableCell align="center">Click on +,- to add or remove tests in table</StyledTableCell>
                <StyledTableRow></StyledTableRow>
                </StyledTableRow>
                }
                {selectedTests && selectedTests.length > 0 ? <StyledTableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell className={classes.headerFont} align="center">Total</StyledTableCell>
                  <StyledTableCell className={classes.headerFont} align="right">{TotalFees}</StyledTableCell>
                </StyledTableRow> : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      
      <Grid>
      <Button
        variant="contained"
        color="primary"
        className={classes.add}
        // onClick={handleAdd}
        alignItems="center"
        >
          create Appointment
        </Button>
      </Grid>
    </MuiPickersUtilsProvider>
    </div>
  );
}




/* <Grid container justify="space-around" className={classes.margin}>

      <MultipleSelect
        className={classes.inputWidth}
        label="Choose physicians"
        values={selectedPhysician}
        options={physicainsOptions}
        helperText="You can add a new physician by writing its name and pressing enter"
        onChange={handleSelectPhysicians}
        SelectProps={{
          msgNoOptionsAvailable: "All physician are selected",
          msgNoOptionsMatchFilter: "No physician matches the filter",
        }}
      />

      <MultipleSelect
        className={classes.inputWidth}
        label="Choose clinicians"
        values={selectedClinician}
        options={clinicianOptions}
        helperText="You can add a new clinician by writing its name and pressing enter"
        onChange={handleSelectClinician}
        SelectProps={{
          msgNoOptionsAvailable: "All Clinicians are selected",
          msgNoOptionsMatchFilter: "No Clinicians matches the filter",
        }}
      />


      <MultipleSelect
        className={classes.inputWidth}
        label="Choose tests"
        values={selectedTests}
        options={testOptions}
        helperText="You can add a new tests by writing its name and pressing enter"
        onChange={handleSelectTests}
        SelectProps={{
          msgNoOptionsAvailable: "All tests are selected",
          msgNoOptionsMatchFilter: "No tests matches the filter",
        }}
      />
      </Grid> */

      // <Grid className={classes.margin} container justify="space-around" >
      //   <TextField
      //     className={classes.totalFeesInput}
      //     id="standard-basic"
      //     label="Total Amount"
      //     helperText="Total Fee for tests"
      //     value={TotalFees}
      //   />

      //   <FormControlLabel
      //     control={
      //       <Switch
      //         checked={switchValue}
      //         onChange={() => {setSwitchValue(!switchValue)}}
      //         name="Fee Paid ?"
      //         inputProps={{ 'aria-label': 'secondary checkbox' }}
      //       />
      //     }
      //     label="Fee Paid ?"
      //   />

      //   <p className={classes.emptySpan}/>
        
      // </Grid>
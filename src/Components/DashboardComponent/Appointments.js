import 'date-fns';
import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { MultipleSelect } from "react-select-material-ui";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "99%",
        marginTop: "7%",
    },
    inputWidth:{
      minWidth: "20%",
      minHeight: "65px",
      maxWidth: "20%",
    },
    formControl: {
      margin: theme.spacing(2),
      minWidth: "20%",
      minHeight: "65px",
    },
    add:{
      margin: theme.spacing(5),
    },
    margin:{
      marginTop: theme.spacing(5),
    },
    totalFeesInput:{
        minWidth: "20%"
    },
    emptySpan:{
      minWidth: "28%",
      minHeight: "65px",
      maxWidth: "2*%",
    },
}));

export default function Appointments() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const physicainsOptions = ["Physician 1", "Physician 2", "Physician 3", "Physician 4"];
  const clinicianOptions = ["Clinician 1", "Clinician 2", "Clinician 3", "Clinician 4"];
  const testOptions = ["Complete Blood Picture", "X-Ray", "Lipid Panel", "Fasting Blood Suger"];
  const [selectedPhysician, setSelectedPhysician] = useState([]);
  const [selectedClinician, setSelectedClinician] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [TotalFees, setTotalFees] = useState(0);
  const [switchValue, setSwitchValue] = useState(false)

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFromTimeChange = (date) => {
    setFromTime(date);
    setToTime(date);
  }

  const handleToTimeChange = (date) => {
    if (date < fromTime) {
        toast.error("To date should be greater than from date");
    }  
    else {
    setToTime(date);
    }
  }

  const handleSelectPhysicians = (values) => {
    setSelectedPhysician(values)
  };

  const handleSelectClinician = (values) => {
    setSelectedClinician(values)
  };

  const handleSelectTests = (values) => {
    setSelectedTests(values)
  };

  useEffect(() => {
    if (selectedTests && selectedTests.length > 0){
      setTotalFees(selectedTests.length * 250)
    }
    else(
      setTotalFees(0)
    )
  }, [selectedTests])

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
          label="Patient Nationality"
          helperText="Enter Patient Nationality"
        />
      </Grid>

      <Grid container justify="space-around" className={classes.margin}>
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
      </Grid>
      
      <Grid container justify="space-around" className={classes.margin}>

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
      </Grid>

      <Grid className={classes.margin} container justify="space-around" >
        <TextField
          className={classes.totalFeesInput}
          id="standard-basic"
          label="Total Amount"
          helperText="Total Fee for tests"
          value={TotalFees}
        />

        <FormControlLabel
          control={
            <Switch
              checked={switchValue}
              onChange={() => {setSwitchValue(!switchValue)}}
              name="Fee Paid ?"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
          label="Fee Paid ?"
        />

        <p className={classes.emptySpan}/>
        
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

import 'date-fns';
import React, {useState} from 'react';
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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "99%",
        marginTop: "7%",
    },
    inputWidth:{
      minWidth: "20%",
      minHeight: "65px",
    },
    multiSelect:{
      chips: { background: "red" }, 
      searchBox: { border: "none", "border-bottom": "1px solid blue", "border-radius": "0px" }
    },
    formControl: {
      margin: theme.spacing(2),
      minWidth: "20%",
      minHeight: "65px",
    },
    add:{
      margin: theme.spacing(5),
    },
}));

export default function Appointments() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [selectPhy, setPhy] = useState(['Physician 1', 'Physician 2','Physician 3'])
  const [selectClinician, setClin] =  useState(['Clinician 1', 'Clinician 2','Clinician 3'])
  const [selectTest, setTest] = useState(['Test 1', 'Test 2','Test 3'])

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

  const handleMultiSelectChange  = (event) => {
    const name = event.target.name;
    setPhy({
      ...selectPhy,
      [name]: event.target.value,
    });
    console.log(selectPhy);
  };

  const handleClinicianMultiSelectChange  = (event) => {
    const name = event.target.name;
    setClin({
      ...selectPhy,
      [name]: event.target.value,
    });
    console.log(selectPhy);
  };

  const handleTestsMultiSelectChange  = (event) => {
    const name = event.target.name;
    setTest({
      ...selectPhy,
      [name]: event.target.value,
    });
    console.log(selectPhy);
  };

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
          type="number"
        />
      </Grid>

      <Grid container justify="space-around">
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
      
      <Grid container justify="space-around" >
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="native-simple">Select Physician</InputLabel>
        <Select
          native
          value={selectPhy.physician}
          onChange={handleMultiSelectChange}
          inputProps={{
            name: 'physician',
            id: 'native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={'Physician 1'}>Physician 1</option>
          <option value={'Physician 2'}>Physician 2</option>
          <option value={'Physician 3'}>Physician 3</option>
        </Select>
        <FormHelperText>Please Select Physician</FormHelperText>
      </FormControl>
      
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="native-simple">Select Clinician</InputLabel>
        <Select
          native
          value={selectClinician.clinician}
          onChange={handleClinicianMultiSelectChange}
          inputProps={{
            name: 'clinician',
            id: 'native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={'Clinician 1'}>Clinician 1</option>
          <option value={'Clinician 2'}>Clinician 2</option>
          <option value={'Clinician 3'}>Clinician 3</option>
        </Select>
        <FormHelperText>Please Select Clinician</FormHelperText>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="native-simple">Select Tests</InputLabel>
        <Select
          native
          value={selectTest.tests}
          onChange={handleTestsMultiSelectChange}
          inputProps={{
            name: 'tests',
            id: 'native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={'Test 1'}>Test 1</option>
          <option value={'Test 2'}>Test 2</option>
          <option value={'Test 3'}>Test 3</option>
        </Select>
        <FormHelperText>Please Select Tests</FormHelperText>
      </FormControl>

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

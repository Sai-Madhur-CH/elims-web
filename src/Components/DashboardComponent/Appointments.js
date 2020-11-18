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



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "99%",
        marginTop: "7%",
    },
}));

export default function Appointments() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());

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


  return (
    <div className={classes.root}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Select date"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="From time"
          value={fromTime}
          onChange={handleFromTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="To time"
          value={toTime}
          onChange={handleToTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
    </div>
  );
}

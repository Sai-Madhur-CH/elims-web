import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Adduser from './UserManagement';
import PhysicianDashbord from './PhysicianDashbord';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  indicator: {
    backgroundColor: theme.status.danger,
    height: "10px",
    top: "45px"
  },
  form:{
    '& .MuiTextField-root': {
        position: 'relative',
        display: 'flex',
        left: '35%',
        width: '25%',
        margin: theme.spacing(1),
        alignItem: "center",
       
    },
    padding: "60px 50px 40px 50px",
  },
  add:{
      margin: theme.spacing(5),
      right: '2%',
      width: '25%',
  },
  menu:{
    '$ .MuiPaper-root': {
        backgroundColor: "red",
    },
  },

}));

export default function Tabs() {
  const classes = useStyles();
  const [label, setlable] = useState([])
  const [value, setValue] = useState('');

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('User')) !== null && JSON.parse(localStorage.getItem('User')).role_name === "Admin"){
        setlable([
            {
                'label':'User Management',
                'value':'0',
                'component': <Adduser/>
            },
            {
                'label':'Physician',
                'value':'1',
                'component': <PhysicianDashbord/>,
            },]);
        setValue('0');
      }
  },[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example" TabIndicatorProps= {{ className: classes.indicator }}>
            {label.map((item, index) => (
                <Tab key={index} label={item.label} value={item.value} />
            ))}
          </TabList>
        </AppBar>
        {label.map((item, index) => (
            <TabPanel key={index} value={item.value}>{item.component}</TabPanel>
        ))}
      </TabContext>
    </div>
  );
}

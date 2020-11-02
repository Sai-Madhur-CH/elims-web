import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { Typography } from '@material-ui/core';

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
}));

export default function Tabs() {
  const classes = useStyles();
  const [label, setlable] = useState([])
  const [value, setValue] = useState('');

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('User')) !== null && JSON.parse(localStorage.getItem('User')).role_name === "Super Admin"){
        setlable([
            {'label':'Add Site',
                   'value':'0',
                   'component': <Addsite/>
            },
            {'label':'Add User',
                   'value':'1',
                   'component': <Adduser/>
            },
                ]);
        setValue('0');
      }
  },[])

  const handleChange = (event, newValue) => {
    console.log(newValue);
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


function Adduser() {
    return (
        <div>
            <Typography>
                Addition of Users.
            </Typography>
        </div>
    )
}

function Addsite() {
    return (
        <div>
            <Typography>
                Addition of Site.
            </Typography>
        </div>
    )
}
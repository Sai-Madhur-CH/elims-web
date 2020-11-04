import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Adduser from './UserManagement';
import PhysicianDashbord from './PhysicianDashbord';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  indicator: {
    backgroundColor: theme.status.danger,
    height: "10px",
    top: "45px",
    cursor: "pointer",
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
  selected: {
    color: "white",
    fontWeight: 600,
    fontFamily: theme.headerFont.fontFamily,
  },
  hovermenu: {
    "& .MuiPaper-root": {
        backgroundColor: theme.palette.primary.main,
        // marginLeft: 30,
        marginTop: 50,
        fontFamily: theme.headerFont.fontFamily,
        minWidth : '11%',
        // pointerEvents: 'none',
    },
  },
}));

export default function Tabs() {
  const classes = useStyles();
  const [label, setlable] = useState([])
  const [value, setValue] = useState('');
  const [hover, setHover] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

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
            },
            {
                'label':'Clinician',
                'value':'2',
                'component': '',
            }
        ]);
        setValue('0');
      }
  },[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
    if (event.target.dataset.info !== null || event.target.dataset.info !== undefined){
        var data = JSON.parse(event.target.dataset.info)
        setHover(data.label)
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleClinicianDropdown(component){
      setValue('2')
      handleClose()
      let clinician = label[2]
      clinician.component = component
      label[2] = clinician
      setlable(label)
  }

  useEffect(() => {
    if (hover !== 'Clinician'){
        handleClose()
    }
  },[anchorEl, hover]);

  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example" TabIndicatorProps= {{ className: classes.indicator }}>
            {label.map((item, index) => (
                <Tab key={index} label={item.label} value={item.value} data-info={JSON.stringify(item)} onMouseOver={handleClick}/>
            ))}
          </TabList>
        </AppBar>
            {console.log(hover, Boolean(anchorEl),'----------->')}
            {hover === 'Clinician' ? 
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onExit={handleClose}
            MenuListProps={{ onMouseLeave: handleClose }}
            className={classes.hovermenu}
            disableRestoreFocus={true}
            >
            <MenuItem className={classes.selected} onClick={() => handleClinicianDropdown(<AllClinician/>)}>All Clinician</MenuItem>
            <MenuItem className={classes.selected} onClick={() => handleClinicianDropdown(<AddClinician/>)}>Add Test</MenuItem>
            </Menu> : null}
        
        {label.map((item, index) => (
            <TabPanel key={index} value={item.value}>{item.component}</TabPanel>
        ))}
      </TabContext>
    </div>
  );
}


function AllClinician(){
    return(
        <h1>List of all Clinician</h1>
    )
}

function AddClinician(){
    return(
        <h1>Addition of Clinician</h1>
    )
}
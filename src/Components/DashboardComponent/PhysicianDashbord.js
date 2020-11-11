import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Resources,
  AppointmentTooltip,
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
} from '@devexpress/dx-react-scheduler-material-ui';
import {rows} from './UsersTable';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid, Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { FixedSizeList } from 'react-window';
import purple from '@material-ui/core/colors/purple';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "99%",
        marginTop: "7%",
    },
    heading: {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        padding: "1%",
        margin: "8px",
        fontFamily: theme.headerFont.fontFamily,
    },
    margin: {
        margin: theme.spacing(2),
    },
    fixedlist:{
        width: '100%',
        height: 400,
    },
    selected:{
        backgroundColor: theme.palette.primary.main,
        borderRight: "5px solid " + theme.status.danger,
        color:"white",
        '&:hover': {
            backgroundColor: theme.hover.primary.main,
            color: "white",
        },
        '& .MuiTypography-colorTextSecondary':{
            color: "white",
        },
    },
    calander:{
        objectFit:"cover",
        maxHeight:"90vh"
    },
    appointment:{
        backgroundColor: theme.palette.primary.main,
        color:"white",
    },
  }));


const currentDate = '2018-11-01';


function isEquivalent(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}

function filterData(list, value, excludeColumns)  {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") {
        return list
    }
    else {
      const filteredData = list.filter(item => {
        return Object.keys(item).some(key =>
          excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      return filteredData
    }
  }

const physicians_list = filterData(rows, 'physician',["status","name"]);

export default function PhysicianDashbord(props) {
    const classes = useStyles();
    const [filter, setfilter] =  useState('');
    const [gridXs, setGridXs] = useState(9);
    const [physicians, setPhysicians] = useState(physicians_list);
    const [selected, setSelected] = useState({});
    const [currentViewName, setViewName ] = useState('');

    useEffect(() => {
        if (filter !== null || filter !== ''){
            let data = physicians_list
            setPhysicians(filterData(data,filter, ["status"]))
        }
      },[filter]);

    useEffect(() => {
        if (props.roleName === 'Admin'){
            setGridXs(9)
            setPhysicians(physicians_list)
        }
        else {
            setGridXs(12)
            setPhysicians(filterData(rows, 'physician1',["name"]))
            setSelected(filterData(rows, 'physician1',["name"])[0])
        }
    }, [props.roleName, gridXs])

    const handleSearch = (e) => {
        setfilter(e.target.value)
      }

    const  renderListItem = ({data,index, style}) => {

        if (isEquivalent(selected,{}) || selected === null){
            setSelected(physicians[0])
        }

        return (
            physicians.map((physician) => (
            <ListItem button key={physician.user_id} className={selected.user_id === physician.user_id ? classes.selected:null} >
                <ListItemText 
                className={classes.listItem}
                primary={physician.name} 
                secondary={physician.email} 
                onClick={(e) => setSelected(physician)}/>
            </ListItem>
            ))
        );
    }
    
    return(
    <Paper>
        <Grid container className={classes.root} spacing={2}>
            {props.roleName === 'Admin' ?
            <Grid item xs={3}>
                <Typography  className={classes.heading}>All Physicians</Typography>
                <TextField
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    label="Search for Physician"
                    onChange={handleSearch}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <SearchIcon />
                        </InputAdornment>
                    ),
                    }}
                />
                <div className={classes.fixedlist}>
                    <FixedSizeList height={500} itemSize={physicians.length} itemCount={1}>
                        {renderListItem}
                    </FixedSizeList>
                </div>
                
            </Grid> : null} 
            
            <Grid className={classes.calander} item xs={gridXs}>
                <Scheduler 
                data={selected.appointments}
                >
                <ViewState
                    currentDate={currentDate}
                    currentViewName={currentViewName}
                    onCurrentViewNameChange={(e) => setViewName(e)}
                />
                
                <WeekView
                    startDayHour={9}
                    endDayHour={20}
                />
                <WeekView
                    name="work-week"
                    displayName="Work Week"
                    excludedDays={[0, 7]}
                    startDayHour={9}
                    endDayHour={20}
                />
                <MonthView />
                <DayView />
                <Toolbar />
                <ViewSwitcher />
                <Appointments palette={purple}  />
                <AppointmentTooltip />
                <Resources
                    data={rooms}
                    mainResourceName="roomId"
                />
                </Scheduler>
            </Grid>
        </Grid>
    </Paper>
    
);
}


export const rooms = [
    {
        fieldName: 'roomId',
        title: 'Room',
        instances: [
            {
                text: 'Room 001',
                id: 1,
                color: '#08436F'
            }, {
                text: 'Room 002',
                id: 2,
                color: '#031D31'
            }, {
                text: 'Room 003',
                id: 3,
                color: '#F64848'
            }
        ]
    }
]
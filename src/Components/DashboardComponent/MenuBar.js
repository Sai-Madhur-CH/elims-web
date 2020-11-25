import React, {  useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List, ListItem, Collapse, Button, Drawer } from '@material-ui/core';
import clsx from 'clsx';
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent : "left",
  },
  drawer : {
    paddingTop : "20px",
    marginTop: '65px',
    minWidth: '15%',
    backgroundColor: theme.palette.primary.main,
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  selected: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: 'white',
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
  },
  selectedbutton:{
    color: 'white',
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    borderRight: "5px solid " + theme.status.danger,
  },
  btnRoot : {
    paddingLeft : "10px",
    justifyContent : "left !important"
  },
  subMenu : {
    paddingLeft : "50px !important",
  }
}));


const AdminMenu = {
    "data" : [
      {
          "name": "User Management",
          "url": "/user_management"
      },
      {
        "name": "Physician",
        "url": "/physician_dashbord"
      },
      {
        "name": "Clinician",
        "children": [
          {
            "name": "All Clinicians",
            "url": "/clinicians"
          },
          {
            "name": "Add Tests",
            "url": "/add_tests"
          },
          // {
          //   "name": "All Tests",
          //   "url": "/tests"
          // }
        ]
      },
      {
        "name": "Receptionist",
        "children": [
          {
            "name": "Appointment",
            "url": "/add_appointment"
          },
        ]
      },
      {
        "name": "Lab Catalog",
        "children": [
          {
            "name": "Lab Details",
            "url": "/labs"
          },
          {
            "name": "Test Details",
            "url": "/lab_tests"
          },
        ]
      },
    ]
  }


  const PhysicianMenu = {
    "data" : [
      {
        "name": "Calendar",
        "url": "/calendar"
      },
      {
        "name": "Appointments",
        "url": "/physician_appointments"
      },
    ]
  }

  const DemoMenu = {
    "data" : [
      {
        "name": "Lab Details",
        "url": "/labs"
      },
      {
        "name": "Test Details",
        "url": "/lab_tests"
      },
    ]
  }

  const ClinicianMenu = {
    "data" : [
      {
        "name": "Calendar",
        "url": "/calendar"
      },
      {
        "name": "Appointments",
        "url": "/clinician_appointments"
      },
    ]
  }


  const ReceptionistMenu = {
    "data" : [
      {
        "name": "Create Appointment",
        "url": "/create_appointment"
      },
      {
        "name": "All Appointments",
        "url": "/clinician_appointments"
      },
    ]
  }


  export default function MenuBar(props) {
    const [ menu, setMenu ] = useState({});
    const { className, ...rest } = props;
    const classes  = useStyles();

    const handleClick = (item) => {
        let newData = {...menu, [item] : !menu[item]};
        setMenu(newData);
    }

    const handleMenu = ( children, level=0 ) => {
        return children.map(({children, name, url, links }) => {
            if ( !children ) {
              return (
                <List component="div" disablePadding key={ name }>
                  <ListItem
                    className={classes.item}
                    disableGutters
                    style={{padding:"0px"}}
                    key={name}
                  >
                    <Button
                      className={url === props.link ? 
                        clsx({
                            [classes.btnRoot] : true,
                            [classes.selectedbutton] : true,
                            [classes.subMenu] : level
                          })
                        :clsx({
                            [classes.btnRoot] : true,
                            [classes.button] : true,
                            [classes.subMenu] : level
                      })}
                     onClick={() => props.handleLinkChange(name, url)}
                    >
                      {name}
                    </Button>
                  </ListItem>
                </List>
              )
            }
            return (
              <div key={ name }>
              <ListItem
                className={classes.item}
                disableGutters
                key={name}
                onClick={() => handleClick(name)}
              >
                <Button
                className={clsx({
                  [classes.btnRoot] : true,
                  [classes.button] : true,
                  [classes.subMenu] : level
                })}>
                  { name } { menu[ name ] ? <ExpandLess /> : <ExpandMore />}
                  </Button>
                </ListItem>
                <Collapse
                  in={ (menu[name]) ? true : false }
                  timeout="auto"
                  unmountOnExit
                >
                  { handleMenu( children, 1) }
                </Collapse>
              </div>
            )
        })
    }
return (
      <Drawer
          anchor="left"
          classes={{ paper: classes.drawer }}
          open={true}
          variant="persistent"
        >
          <List {...rest} className={clsx(classes.root, className)} >
              {props.roleName === 'Admin' ? handleMenu(AdminMenu.data) : null }
              {props.roleName === 'Physician' ? handleMenu(PhysicianMenu.data) : null }
              {props.roleName === 'Demo' ? handleMenu(DemoMenu.data) : null}
              {props.roleName === 'Clinicians' ? handleMenu(ClinicianMenu.data) : null}
              {props.roleName === 'Receptionist' ? handleMenu(ReceptionistMenu.data) : null}
          </List>
      </Drawer>
   )
}

import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from "../../Assets/dashbord_logo.png";
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    header:{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dashbord_logo: {
        height: "5vh",
        objectFit: "contain",
        width: "15vh",
    },
    header_action: {
        display: "flex",
    },
    user_name: {
        marginLeft: 10,
        fontSize: 15,
    },
    selected: {
        color: "white",
        fontWeight: 600
    },
    menu: {
    "& .MuiPaper-root": {
        backgroundColor: theme.palette.primary.main,
        marginLeft: 30,
        marginTop: 30
    },
    },
  }));

export default function Header() {
    const classes = useStyles();
    const history = useHistory();
    const username = useState(JSON.parse(localStorage.getItem('User')).name );
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        history.push({
            pathname: '/',
          });
    }


    useEffect(() => {
        if (JSON.parse(localStorage.getItem('User')) === null){
          history.push({
            pathname: '/',
          });
        }
      });

    return (
        <div className={classes.header}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                <img className={classes.dashbord_logo} src={logo} alt="ECLIMS"/>
                <Typography variant="h6" className={classes.title}>
                    Dashbord
                </Typography>
                <div className={classes.header_action}>
                    <IconButton color="inherit" onClick={handleMenu}>
                    <AccountCircle className={classes.account_circle}/>
                    {(username !== null) ? <p className={classes.user_name}>{username}</p> : null}
                    </IconButton>
                    {open ? 
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        className={classes.menu}
                    >
                        <MenuItem className={classes.selected} onClick={handleClose}>Profile</MenuItem>
                        <MenuItem className={classes.selected} onClick={handleLogout}>Logout</MenuItem>
                    </Menu>: null }
                </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
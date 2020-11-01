import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from "../../Assets/dashbord_logo.png";
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

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
  }));

export default function Header() {
    const classes = useStyles();
    const history = useHistory();
    const username = useState(JSON.parse(localStorage.getItem('User')).name );

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
                    <IconButton color="inherit">
                    <AccountCircle className={classes.account_circle}/>
                    {(username !== null) ? <p className={classes.user_name}>{username}</p> : null}
                    </IconButton>
                </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
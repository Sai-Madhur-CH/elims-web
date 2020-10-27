import React,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
// import Box from '@material-ui/core/Box';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './Login.css';
import logo from '../../Assets/full_logo.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {auth} from '../../Api/Api.js';
// import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    logo: {
        height: 40,
        marginBottom: 10,
    },
  }));


export default function ChangePassword() {
    const classes = useStyles();
    const [newpassword, setnewpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const handleClick = () => {
        if (newpassword === null || newpassword === ''){
            toast.error('Please enter new password.')
        }
        else if (confirmpassword === null || confirmpassword === ''){
            toast.error('Please enter confirm password.')
        } 
        else if ((newpassword !== null || newpassword !== '') && 
                (confirmpassword !== null || confirmpassword !== '') &&
                (newpassword !== confirmpassword) ){
            toast.error('New password and Confirm Password must be same.')
        }
        else if (newpassword.length < 8 && confirmpassword.length < 8) {
            toast.error("Your password must be at least 8 characters"); 
        }
        else if (newpassword.search('[A-Z]') < 0) {
            toast.error("Your password must contain at least one capital letter.");
        }
        else if (newpassword.search('[0-9]') < 0) {
            toast.error("Your password must contain at least one digit.");
        }
        else if (newpassword.search('[!@#$&*_~]') < 0) {
            toast.error("Your password must contain at least of this !, @, #, $, &, *, _, ~ character.");
        }

  
    }
    return (
    <div className="login">
        <div className="login__bgimage" />
        <div className="login__contentdiv">
            <img className={classes.logo} src={logo} alt={'ECLIMS'} />
           <form className={classes.form} >
            <TextField
              color="primary"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="newpassword"
              label="New Password"
              type="password"
              name="new password"
              autoComplete="newpassword"
              autoFocus
              onChange = { (e) => setnewpassword(e.target.value)  }
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label="Confirm Password"
              type="password"
              id="confirmpassword"
              autoComplete="confirmpassword"
              onChange = { (e) => setconfirmpassword(e.target.value)  }
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {handleClick}
            >
              Change password
            </Button>
          </form>
        </div>
    </div>
    );
}
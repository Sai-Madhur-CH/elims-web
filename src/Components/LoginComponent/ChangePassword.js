import React,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './Login.css';
import logo from '../../Assets/full_logo.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../Api/Api';
import { useHistory } from "react-router-dom";
import { Typography } from '@material-ui/core';


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
    note: {
        fontSize:10,
        marginTop: theme.spacing(2),
        color: "red",
        fontFamily: "arial",
    }
  }));


export default function ChangePassword() {
    const classes = useStyles();
    const history = useHistory();
    const [newpassword, setnewpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [passwordnote] = useState('Password must contain at least one digit, one capital letter and one of this !, @, #, $, &, *, _, ~ characters and minimum of 8 characters.');
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
        else if ((newpassword !== null || newpassword !== '') && (confirmpassword !== null || confirmpassword !== '')){
            update_password()
        }
    };

    const update_password = async () => {
    const api = await auth;
    api.put('/change_password', {new_password:newpassword,confirm_password:confirmpassword})
    .then(res =>{
        if (res.data.status === 'success') {
            toast.success("Password updated.")
            history.push({
                pathname: '/dashboard',
            });
        }
    })
    }

    return (
    <div className="login">
        <div className="changepassword__bgimage" />
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
            <Typography className={classes.note}>
                {passwordnote}
            </Typography>
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
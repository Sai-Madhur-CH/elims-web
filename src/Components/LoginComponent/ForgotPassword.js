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
import Link from '@material-ui/core/Link';


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
      textTransform: "None",
    },
    logo: {
        height: 40,
        marginBottom: 10,
    },
    recover:{
        margin: theme.spacing(3),
        fontSize: 22,
    },
  }));


export default function ForgotPassword() {
    const classes = useStyles();
    const history = useHistory();
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');

    const send_email = async () => {
    const api = await auth;
    api.post('/forgot_password', {email:email,phone:phone,method:'forgot password'})
    .then(res =>{
        if (res.data.status === 'success') {
            toast.success("OTP is sent to the registered email.")
            history.push({
                pathname: '/',
            });
        }
        else if (res.data.status === 'unauthorized user') {
            toast.error("There is not user with provide email and phone number.")
        }
    })
    }

    const handleClick = () => {
        if (email === null || email === ''){
            console.log("ENTERED");
            toast.error('Please enter email.')
        }
        else if (phone === null || phone === ''){
            toast.error('Please enter phone number.')
        } 
        else if ((email !== null || email !== '') && 
                 (phone !== null || phone !== '')){
            send_email()
        }
    }

    const redirectlogin = () => {
        history.push({
            pathname: '/',
        });
    }

    return (
    <div className="login">
        <div className="forgotpassword__bgimage" />
        <div className="login__contentdiv">
            <img className={classes.logo} src={logo} alt={'ECLIMS'} />
            <Typography className={classes.recover} color="secondary">Recover Password</Typography>
            <form className={classes.form} >
            <TextField
              color="primary"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = { (e) => setemail(e.target.value)  }
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone"
              type="phone"
              id="phone"
              autoComplete="phone"
              onChange = { (e) => setphone(e.target.value)  }
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {handleClick}
            >
              Email me recovery password
            </Button>
            <Link color="primary" href="#" variant="body2" onClick={redirectlogin}>
                Back
            </Link>
          </form>
        </div>
    </div>
    );
}
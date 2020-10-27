import React,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './Login.css';
import logo from '../../Assets/full_logo.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {auth} from '../../Api/Api.js';
import { useHistory } from "react-router-dom";


function Copyright() {
  return (
    <Typography color="primary" variant="body2" align="center">
      {'Copyright © '}
      {/* <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '} */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

export default function LoginInSide() {
  const classes = useStyles();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const history = useHistory();
  const login = async () => {
    const api = await auth;
    const data = {
        email_phone: email,
        password: password,
        method: 'login',
    };
    api
        .post('/login', data)
        .then(res => {
            if (res.data.status === 'active') {
                localStorage.setItem('User', JSON.stringify(res.data));
                toast.success("Logged In Successfully.")
                if (res.data.login_count === 1){
                  history.push({
                    pathname: '/change_password',
                  });
                }
                if (res.data.login_count > 1){
                  history.push({
                    pathname: '/dashboard',
                  });
                }
                
            }
            if (res.data.status === 'wrong password'){
                toast.error(res.data.msg)
            }
            if (res.data.status === 'unauthorized user'){
                toast.error('Unauthorized user.')
            }
            if (res.data.status === 'inactive'){
                toast.error('User locaked for 24 hours.')
            }
        })
        
};
  const handleClick = () => {
      if (email === null || email === ''){
          toast.error('Please provide proper Email / Phone.')
      }
      if (password === null || password === ''){
          toast.error('Please provide proper Password.')
      } 
      if ((email !== null || email !== '') && (password !== null || password !== '')){
          login()
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
              id="email"
              label="Email / Phone"
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = { (e) => setpassword(e.target.value)  }
            />
            {/* <FormControlLabel
              color="primary"
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {handleClick}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link color="primary" href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
    </div>
  );
}
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { toast } from 'react-toastify';
import Userstable from '../DashboardComponent/UsersTable';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    form:{
      '& .MuiTextField-root': {
          margin: theme.spacing(1),
          alignItem: "center",
         
      },
      '& .MuiFormControl-root': {
          minWidth: "85%",
      },
      padding: "60px 0px 0px 0px",
    },
    add:{
        margin: theme.spacing(5),
    },
    menu:{
      '$ .MuiPaper-root': {
          backgroundColor: "red",
      },
    },
    table:{
        objectFit:"cover",
        maxHeight:"82vh",
    },
  
  }));

export default function Adduser() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [userrole, setRole] = useState('');
    const roles = ['Admin', 'Physician', 'Clinician', 'Receptionist', 'Patient' ];

    const handleAdd = () => {
        if (name === null || name === ''){
            toast.error('Please provide proper name.')
        }
        else if (email === null || email === ''){
            toast.error('Please provide proper email.')
        }
        else if (phone === null || phone === ''){
            toast.error('Please provide proper phone.')
        }
        else if (userrole === null || userrole === ''){
            toast.error('Please select User Role.')
        }
        else if ((email !== null || email !== '') && 
                 (name !== null || name !== '')   &&
                 (phone !== null || phone !== '') &&
                 (userrole !== null || userrole !== '')){
                let data = {
                    name:name,
                    email:email,
                    phone:phone,
                    role:userrole,
                }
            console.log('data---------->', data);
        }
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={3}>
                <form className={classes.form} noValidate autoComplete="off">
                    <div >
                        <TextField
                        id="outlined-multiline-flexible"
                        label="Name"
                        variant="outlined"
                        required
                        onChange = { (e) => setName(e.target.value)  }
                        />
                        <TextField
                        id="outlined-textarea"
                        label="Email"
                        variant="outlined"
                        required
                        onChange = { (e) => setEmail(e.target.value)  }
                        />
                        <TextField
                        id="outlined-multiline-static"
                        type="number"
                        label="Phone Number"
                        variant="outlined"
                        required
                        onChange = { (e) => setPhone(e.target.value)  }
                        />
                        <TextField
                        id="outlined-select"
                        select
                        label="Role"
                        helperText="Please select user role."
                        variant="outlined"
                        required
                        onChange={ (e) => setRole(e.target.value)  }
                        >
                            {roles.map((role, index) => (
                                <MenuItem key={index} value={role} >
                                    {role}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button
                        variant="contained"
                        color="primary"
                        className={classes.add}
                        onClick={handleAdd}
                        alignItems="center"
                        >
                            Add User
                        </Button>
                    </div>
                </form>
            </Grid>
            <Grid className={classes.table} item xs={9}>
                <Userstable/>
            </Grid>
        </Grid>
        
    )
}
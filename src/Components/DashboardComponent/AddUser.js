import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
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
        <form className={classes.form} noValidate autoComplete="off">
            <div >
                <TextField
                id="outlined-multiline-flexible"
                label="Name"
                variant="outlined"
                required
                onChange = { (e) => setName(e.target.value)  }
                alignItems="center"
                />
                <TextField
                id="outlined-textarea"
                label="Email"
                variant="outlined"
                required
                onChange = { (e) => setEmail(e.target.value)  }
                alignItems="center"
                />
                <TextField
                id="outlined-multiline-static"
                type="number"
                label="Phone Number"
                variant="outlined"
                required
                onChange = { (e) => setPhone(e.target.value)  }
                alignItems="center"
                />
                <TextField
                id="outlined-select"
                select
                label="Role"
                helperText="Please select user role."
                variant="outlined"
                required
                onChange={ (e) => setRole(e.target.value)  }
                alignItems="center"
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
                    Add
                </Button>
            </div>
        </form>
    )
}
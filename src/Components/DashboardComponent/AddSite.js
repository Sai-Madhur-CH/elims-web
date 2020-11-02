import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
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

export default function  Addsite() {
    const classes = useStyles();
    const [site, setSite] = useState('');

    const handleAdd = () => {
        if (site === null || site === ''){
            toast.error('Please provide site name.')
        }
        else if (site !== null || site !== ''){
           let data = {site:site} 
           console.log('SITE------>', data);
        } 
    }

    return (
        <form className={classes.form} noValidate autoComplete="off">
            <TextField
                id="outlined-multiline-flexible"
                label="Site Name"
                variant="outlined"
                required
                onChange = { (e) => setSite(e.target.value)  }
                alignItems="center"
                />
            <Button
                variant="contained"
                color="primary"
                className={classes.add}
                onClick={handleAdd}
                alignItems="center"
                >
                Add
            </Button>
        </form>
    
    )
}
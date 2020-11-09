import React,{useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width : '99%',
        marginTop: "3%",
        minHeight: '85vh',
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
    subform:{
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            alignItem: "center",
           
        },
        '& .MuiFormControl-root': {
            minWidth: "85%",
        },
        display: 'flex',
    },
    categoryDiv:{
        display: 'flex',
    },
    link:{
        marginTop: theme.spacing(2),
    },
    subcategoryDiv:{
        display: 'flex',
    },
    add:{
        margin: theme.spacing(5),
    },
}))

export default function SaveTests() {
    const classes = useStyles();
    const [addCategory, setAddCategory] = useState([{'value': false}]);
    const [testName, setTestName] = useState('');
    const [category, setcategory] = useState({});
    const [Categories, setCategories] = useState([{}]);

    const handleCategory = (data) => {
        setcategory({ ...category, ...data})
    }

    const handleCategories = (category,index) => {
        Categories[index] = category
        setCategories([...Categories, {}])
        addCategory[index]= {'value':true}
        addCategory[index+1] = {'value': false}
        setAddCategory(addCategory)

        let data = {'test_name': testName, 'categories':Categories}
        console.log('FINAL DATA------>', data);
    }

    const AddCategoryLink = (cat, i) => {
        return (
            <form key={i} className={classes.subform} noValidate autoComplete="off">
                <TextField
                id="outlined-multiline-flexible"
                label="Category Name"
                variant="outlined"
                required
                onChange = {(e) => handleCategory(cat['category_name']=e.target.value)  }
                />
                <TextField
                id="outlined-multiline-flexible"
                label="Range"
                variant="outlined"
                required
                onChange = {(e) => handleCategory(cat['range']=e.target.value)  }
                />
                <TextField
                id="outlined-multiline-flexible"
                label="Units"
                variant="outlined"
                required
                onChange = {(e) => handleCategory(cat['units']=e.target.value)  }
                />
                {
                    addCategory[i].value === false ? 
                        <Link 
                            className={classes.link} 
                            color="primary" 
                            href="#" 
                            variant="body2" 
                            onClick={(e) => handleCategories(cat, i)}
                        >
                            Add Category
                        </Link> : null 
                }
                
            </form>
        )
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={3}>
                <form className={classes.form} noValidate autoComplete="off">
                    <div className={classes.categoryDiv}>
                        <TextField
                        id="outlined-multiline-flexible"
                        label="Test name"
                        variant="outlined"
                        required
                        onChange = { (e) => setTestName(e.target.value)  }
                        />
                    </div>
                </form>
                {Categories.map((cat, i) => 
                    AddCategoryLink(cat,i)
                )}
                <Button
                variant="contained"
                color="primary"
                className={classes.add}
                // onClick={handleAdd}
                alignItems="center"
                >
                Save Test
            </Button>
            </Grid>
        </Grid>
    );
}
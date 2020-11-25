import React,{useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Typography } from '@material-ui/core';
import XRay from "../../Assets/XRay.pdf";
import Report from "../../Assets/Lab_report.pdf";
import Link from '@material-ui/core/Link';



const PointerStyledTableCell = withStyles((theme) => ({
    root: {
        '&:hover':{
            cursor:"pointer",
            textDecoration: 'underline',
            color: theme.status.danger,
        }
      },
    head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    },
    body: {
    fontSize: 14,
    },
}))(TableCell);


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "99%",
    marginTop: "7%",
  },
  testsroot: {
    flexGrow: 1,
    width: "99%",
  },
  table: {
    minWidth: 650,
  },
  container: {
    maxHeight: "70vh",
    width : '99%',
  },
  tableContainer: {
    flexGrow: 1,
    width : '99%',
    marginTop: "5%",
    maxHeight: "85vh",
  },
  margin: {
    margin: theme.spacing(1),
    left: "30%",
  },
  searchButton: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    left: '30%',
    '&:hover': {
      backgroundColor: theme.hover.secondary.main,
      color: "white",
    },
  },
  headerFont: {
    fontFamily: theme.headerFont.fontFamily,
  },
  gridStyle:{
    marginTop: theme.spacing(5),
  },
  textFont:{
    fontFamily: theme.headerFont.fontFamily,
  },
  save:{
      marginTop: theme.spacing(6),
      marginRight: "10%",
  },
  topspacing:{
    marginTop: theme.spacing(3),
  },
  upload:{
      marginLeft: '60%',
  },
  reportcontainer: {
    marginTop: theme.spacing(6),
    maxHeight: "35vh",
    width : '99%',
  },
  pdfReport:{
    marginTop: theme.spacing(4),
    width: '95%',
    height : '650px',
  },
  topSpacingBackButton:{
    marginTop: theme.spacing(10),
    marginRight: "88%"
  },
  topspacingNewGrid:{
    marginTop: theme.spacing(10),
    maxHeight: "82vh",
    // marginRight: theme.spacing(5),
  },
  topSpacingMultiSelect:{
    marginTop: theme.spacing(6),
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
}));


const rows = {
    "user_id": 3,
    "name": "clinician1",
    "phone": 9553333333,
    "email": "clinician1@EISBIZ.NET",
    "role_name": "Clinician",
    "status": "active",
    "appointments":[
        { id:1, patient_name: 'paitent1',startDate: '2018-10-30T10:45', endDate: '2018-10-30T12:00', title: 'Meeting',roomId: 2, phone:9553390682, status : 'In Progress', selectedTests : ["Complete Blood Picture", "X-Ray"] },
        { id:2, patient_name: 'paitent1',startDate: '2018-11-02T09:45', endDate: '2018-11-02T11:00', title: 'Meeting',roomId: 1, phone:9553390692, status : 'Not Started', selectedTests : ["Complete Blood Picture", "X-Ray"] },
        { id:3, patient_name: 'paitent2',startDate: '2018-11-03T12:00', endDate: '2018-11-03T13:30', title: 'Meeting',roomId: 2, phone:9553390612, status : 'Completed', selectedTests : ["Complete Blood Picture", "Fasting Blood Suger"], categories : [{category_name:'Haemoglobin', result:'12.5 gms'}] },
    ],
  }

export default function ClinicianAppointmentsTable() {
  const classes = useStyles();
  const [filter, setfilter] =  useState('');
  const [data, setData] = useState(rows.appointments);
  const [selectedAppointment, setselectedAppointment] = useState(null);
  const excludeColumns = ["status"];
  // const [tests, setTests] = useState(["Complete Blood Picture","Fasting Blood Suger"]);
  const [selectedLab, setSelectedLab] = useState(null);
  // const testOptions = [];
  const [selectedTests, setSelectedTests] = useState([]);
  
  function filterData(value)  {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(rows);
    else {
      const filteredData = rows.filter(item => {
        return Object.keys(item).some(key =>
          excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setData(filteredData);
    }
  }

  const handleSearch = () => {
    if (filter !== null || filter !== '' || filter.length > 0){
      filterData(filter)
    }
  }

  const handleAppointments = (row) =>{
    setselectedAppointment(row)
    if (row && row.selectedTests ){
      setSelectedTests(row.selectedTests)
    }
  }

  // const handleFileUpload = (e) => {
  //     if (e.target.files.length > 0 && e.target.files[0].name.split('.')[1].toLowerCase() === 'pdf') {
  //       setTests([ ...tests, e.target.files[0].name.split('.').[0] ]);
  //     }
  // }

  function formatDate(string){
    var options = { year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric',
                    second: 'numeric' 
                };
    return new Date(string).toLocaleDateString([],options);
  }  
  
  // const handleSelectTests = (values) => {
  //   setSelectedTests(values)
  // };

  // const handleDiscription = (e) => {
  //   if (e.target.value){
  //     const appointment = selectedAppointment
  //     appointment['description'] = e.target.value
  //     setselectedAppointment(appointment)
  //   }
  // }

  return (
    selectedAppointment === null ? 
    <div className={classes.root}>
    <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label="Appointments"
        onChange={(e) => {setfilter(e.target.value)}}
      />
    <Button className={classes.searchButton} onClick={handleSearch}>Search</Button>
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.headerFont}>Appointment ID</StyledTableCell>
            <StyledTableCell className={classes.headerFont}>Patient Name</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Appointment Start Date</StyledTableCell>
            {/* <StyledTableCell className={classes.headerFont} align="right">Appointment End Date</StyledTableCell> */}
            <StyledTableCell className={classes.headerFont} align="right">Phone</StyledTableCell>
            <StyledTableCell className={classes.headerFont} align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="left">{row.id}</StyledTableCell>
              <PointerStyledTableCell component="th" scope="row"  onClick={() => handleAppointments(row)}>
                {row.patient_name}
              </PointerStyledTableCell>
              <StyledTableCell align="right">{formatDate(row.startDate)}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.endDate}</StyledTableCell> */}
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
    </div> : selectedLab === null ? 
    <div className={classes.root}>
    <Grid container justify="space-between" spacing={12}>
    <Grid container className={classes.gridStyle}  xs={5}>
        <Grid className={classes.topspacing} xs={5}>
        <Typography className={classes.textFont}>Patient Name :</Typography>
        </Grid>
        <Grid className={classes.topspacing} xs={5}>
        <Typography className={classes.textFont}>{selectedAppointment.patient_name}</Typography>
        </Grid>
        <Grid className={classes.topspacing} xs={5}>
        <Typography className={classes.textFont}>Patient phone :</Typography>
        </Grid>
        <Grid className={classes.topspacing} xs={5}>
        <Typography className={classes.textFont}>{selectedAppointment.phone}</Typography>
        </Grid>
        <Grid className={classes.topspacing} xs={5}>
        <Typography className={classes.textFont}>Appointment date : </Typography>
        </Grid>
        <Grid className={classes.topspacing} xs={6}>
        <Typography className={classes.textFont}>{formatDate(selectedAppointment.startDate)}</Typography>
        </Grid>
    </Grid>
    <Grid  xs={6}>
    {/* <Grid className={classes.upload} xs={5}>
        <input
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            onChange={(e) => {handleFileUpload(e)}}
        />
        <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
            Upload Reports
            </Button>
        </label>
    </Grid> */}
    <TableContainer className={classes.reportcontainer} component={Paper} >
      <Table className={classes.table} stickyHeader aria-label="sticky table">
      <TableHead>
          <TableRow>
            <StyledTableCell className={classes.headerFont}>List of Reports</StyledTableCell>
          </TableRow>
      </TableHead>
      <TableBody>
        {/* { (tests|| []).map(test => (
            <StyledTableRow >
            <PointerStyledTableCell width="20%" onClick={() => setSelectedLab({test})}>
                {test}
            </PointerStyledTableCell>
            </StyledTableRow>
        ))} */}
        <StyledTableRow >
            <PointerStyledTableCell width="20%" onClick={() => setSelectedLab('Report')}>
            Complete Blood Picture
            </PointerStyledTableCell>
          </StyledTableRow>
        <StyledTableRow >
            <PointerStyledTableCell width="20%" onClick={() => setSelectedLab('Report')}>
                Fasting Blood Suger
            </PointerStyledTableCell>
          </StyledTableRow>
      </TableBody>
      </Table>
    </TableContainer>
    
    </Grid>
    <Grid container justify="space-evenly" spacing={12}>
    {/* <Grid className={classes.topspacing} xs={2}>
        <Typography className={classes.textFont}>Description : </Typography>
        </Grid> */}
        {/* <Grid className={classes.topspacing} xs={9}>
        <TextField
              className={classes.gridStyle}
              id="outlined-multiline-static"
              multiline
              rows={6}
              rowsMax={6}
              variant="outlined"
              placeholder="Enter observations"
              value={selectedAppointment.description ? selectedAppointment.description : null}
              onChange={handleDiscription}
              fullWidth
            />
        </Grid> */}
        {/* <Grid className={classes.topspacingNewGrid} xs={2}>
        <Typography className={classes.textFont}>Choosen Tests : </Typography>
        </Grid>
        <Grid className={classes.topSpacingMultiSelect} xs={9}>
          <MultipleSelect
            className={classes.inputWidth}
            label="Choosen tests"
            values={selectedTests}
            options={testOptions}
            helperText="You can add a new tests by writing its name and pressing enter"
            onChange={handleSelectTests}
            SelectProps={{
              msgNoOptionsAvailable: "All tests are selected",
              msgNoOptionsMatchFilter: "No tests matches the filter",
            }}
          />
        </Grid> */}
        <Grid xs={12}>
          {selectedTests.map(test => (
          <SaveTests testName={test} categories={selectedAppointment.categories}/>
          ))}
        </Grid>
        <Grid  xs={5}>
          <Button
            variant="contained"
            color="primary"
            className={classes.save}
            alignItems="center"
            onClick={() => handleAppointments(null)}
            >
              Back
          </Button>
        </Grid>
        <Grid  xs={5}>
          <Button
            variant="contained"
            color="primary"
            className={classes.save}
            alignItems="center"
            >
              Save
          </Button>
        </Grid>
        </Grid>
    </Grid>
    </div>:<div>
    <Button 
      variant="contained"
      color="primary"
      className={classes.topSpacingBackButton}
      onClick={() => setSelectedLab(null)}
      >Back</Button>
    {selectedLab === 'XRay' ?
    <object className={classes.pdfReport} data={XRay} type="application/pdf" aria-label="this object has text" />
    : null }
    {selectedLab === 'Report' ?
    <object className={classes.pdfReport} data={Report} type="application/pdf" aria-label="this object has text" />
    : null }
    </div>
  );
}


function SaveTests(props) {
  const classes = useStyles();
  const [addCategory, setAddCategory] = useState([{'value': false}]);
  const [testName] = useState(props.testName);
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
              {console.log(cat,i)}
              <TextField
              id="outlined-multiline-flexible"
              label="Category Name"
              variant="outlined"
              required
              // key={i}
              // value={cat && cat.category_name ? cat.category_name : ''}
              onChange = {(e) => handleCategory(cat['category_name']=e.target.value)  }
              />
              <TextField
              id="outlined-multiline-flexible"
              label="Result"
              variant="outlined"
              required
              // key={i}
              // value={cat && cat.result ? cat.result : ''}
              onChange = {(e) => handleCategory(cat['result']=e.target.value)  }
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
      <Grid container className={classes.testsroot} spacing={2}>
          <Grid item xs={12}>
              <TableContainer className={classes.reportcontainer} component={Paper} >
                <Table className={classes.table} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                      <StyledTableCell className={classes.headerFont}>Enter details of {testName}.</StyledTableCell>
                    </TableRow>
                </TableHead>
               </Table> 
              </TableContainer>
          </Grid>
          <Grid item xs={4}>
              {Categories.map((cat, i) => 
                  AddCategoryLink(cat,i)
              )}
              {/* <Button
              variant="contained"
              color="primary"
              className={classes.add}
              // onClick={handleAdd}
              alignItems="center"
              >
              Save Test
          </Button> */}
          </Grid>
      </Grid>
  );
}
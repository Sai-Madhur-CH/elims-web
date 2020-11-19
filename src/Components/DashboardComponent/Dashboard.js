import { Grid } from '@material-ui/core';
import React,{ useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Header from '../DashboardComponent/header';
import MenuBar from '../DashboardComponent/MenuBar';  
import UserManagement from '../DashboardComponent/UserManagement';
import PhysicianDashbord from '../DashboardComponent/PhysicianDashbord';
import ClinicianDashbord from '../DashboardComponent/ClinicianDashboard';
import SaveTests from './SaveTests';
// import AllTests from './AllTests';
import Appointments from './Appointments';
import AppointmentsTable from './PhysicianAppointments';
import LabDetailsTable from './LabTable';
import LabTestsTable from './LabTestsTable';

export default function Dashboard() {

  const history = useHistory();
  const [link, setLink] = useState('/user_management');
  const [headerName, setheaderName] = useState('User Management');
  const [roleName, setRoleName] = useState('');
  const [filters, setFilters] = useState(false);
  const [filterProps, setFilterProps] = useState({});

  function handleLinkChange(headername, newLink) {
    setheaderName(headername);
    setLink(newLink);
  }

  const handleFilters = (row, filters) => {
    console.log('DASHBORD handleFilters', row, filters);
    setFilters(filters)
    setFilterProps(row)
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('User')) === null){
      history.push({
        pathname: '/',
      });
    }
    else if (JSON.parse(localStorage.getItem('User')).role_name !== null){
      setRoleName(JSON.parse(localStorage.getItem('User')).role_name)
      if (roleName === 'Admin'){
        setLink('/user_management')
        setheaderName('User Management')
      }
      else if (roleName === 'Physician'){
        setLink('/calendar')
        setheaderName('Calendar')
      }
    } 

    
  }, [roleName, history]);

  useEffect(() => { 
    if (link === '/labs'){
      setFilters(false)
      setFilterProps({})
      setLink(link)
    }
    if (link === '/lab_tests'){
      setFilters(false)
      setFilterProps({})
      setLink(link)
    }

  }, [link])

    return (
    <div className='dashbord_div'>
      <Header headerName={headerName}/>
      <Grid container spacing={0}>
        <Grid xs={2}>
          <MenuBar link={link} roleName={roleName} handleLinkChange={handleLinkChange}/>
        </Grid>
        <Grid xs={10}>
          {roleName === 'Admin' ? 
          <div className="roleNameDiv">
          {link === '/user_management' ? <UserManagement/> : null}
          {link === '/physician_dashbord' ? <PhysicianDashbord roleName={roleName}/> : null}
          {link === '/clinicians' ? <ClinicianDashbord/> : null}
          {link === '/add_tests' ? <SaveTests/> : null}
          {/* {link === '/tests' ? <AllTests/> : null} */}
          {link === '/appointments' ? <Appointments/> : null}
          {link === '/labs' ? <LabDetailsTable handleFilters={handleFilters} setLink={setLink} filters={filters} filterProps={filterProps}/> : null}
          {link === '/lab_tests' ? <LabTestsTable handleFilters={handleFilters} setLink={setLink} filters={filters} filterProps={filterProps}/> : null}
          </div> : null}
          {roleName === 'Physician' ?
          <div className="roleNameDiv">
          {link === '/calendar' ? <PhysicianDashbord roleName={roleName}/> : null}
          {link === '/physician_appointments' ? <AppointmentsTable/> : null}
          </div> : null}
        </Grid>
        
      </Grid>
      
    </div>
    );
}
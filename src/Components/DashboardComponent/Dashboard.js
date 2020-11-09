import { Grid } from '@material-ui/core';
import React,{ useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Header from '../DashboardComponent/header';
// import Tabs from '../DashboardComponent/Tabs';
import MenuBar from '../DashboardComponent/MenuBar';  
import UserManagement from '../DashboardComponent/UserManagement';
import PhysicianDashbord from '../DashboardComponent/PhysicianDashbord';
import ClinicianDashbord from '../DashboardComponent/ClinicianDashboard';
import SaveTests from './SaveTests';

export default function Dashboard() {

  const history = useHistory();
  const [link, setLink] = useState('/user_management');
  const [headerName, setheaderName] = useState('User Management');

  function handleLinkChange(headername, newLink) {
    setheaderName(headername);
    setLink(newLink);
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('User')) === null){
      history.push({
        pathname: '/',
      });
    }
  });

    return (
    <div className='dashbord_div'>
      <Header headerName={headerName}/>
      <Grid container spacing={0}>
        <Grid xs={2}>
          <MenuBar link={link} handleLinkChange={handleLinkChange}/>
        </Grid>
        <Grid xs={10}>
          {link === '/user_management' ? <UserManagement/> : null}
          {link === '/physician_dashbord' ? <PhysicianDashbord/> : null}
          {link === '/clinicians' ? <ClinicianDashbord/> : null}
          {link === '/add_tests' ? <SaveTests/> : null}
        </Grid>
        
      </Grid>
      
    </div>
    );
}
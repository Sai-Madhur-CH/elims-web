import React,{ useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Header from '../DashboardComponent/header';
import Tabs from '../DashboardComponent/Tabs';

export default function Dashboard() {

  const history = useHistory();


  useEffect(() => {
    if (JSON.parse(localStorage.getItem('User')) === null){
      history.push({
        pathname: '/',
      });
    }
  });

    return (
    <div className='dashbord_div'>
      <Header/>
      <Tabs/>
    </div>
    );
}
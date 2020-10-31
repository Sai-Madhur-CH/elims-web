import React,{ useEffect } from 'react';
import { useHistory } from "react-router-dom";

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
    <div>
      <h1>
        Dashbord
      </h1>
    </div>
    );
}
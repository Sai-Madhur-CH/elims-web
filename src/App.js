import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import LoginInSlide from './Components/LoginComponent/Login';
import Dashboard from './Components/DashboardComponent/Dashboard';
import ChangePassword from './Components/LoginComponent/ChangePassword';

function App() {
  return (
    <div className="app">
      <ToastContainer autoClose={3000} newestOnTop={true} closeOnClick pauseOnHover />
      <Router>
        <Switch>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path='/change_password' component={ChangePassword}/>
          <Route path="/" component={LoginInSlide}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginInSlide from './Components/LoginComponent/Login';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginInSlide />
          </Route>
          <Route path="/dashbord">
            <h1>Dashbord Page</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

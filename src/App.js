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
          <Route path="/">
            <LoginInSlide />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

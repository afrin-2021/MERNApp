
import './App.css';
import LocationDetails from './components/LocationDetails';
import LocationListing from './components/LocationListing';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="main">
      <Router>
        <Switch>
          <Route exact path={"/"} component={LocationListing} />
          <Route exact path={"/location_details"} component={LocationDetails} />
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;

import './App.scss';
import {BrowserRouter , Route, Switch} from 'react-router-dom';
import Profil from './Components/Profil/Profil';
import Login from './Components/login';

import { ProtectedRoute } from './Components/Protected.route';

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login}/>
          <ProtectedRoute path="/Profil" exact component={Profil}/>
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
    </BrowserRouter>
  );

}

  
  
export default App;

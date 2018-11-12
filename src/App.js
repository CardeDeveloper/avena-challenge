import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css';

//router
import {Switch, Route} from 'react-router-dom';

/***  Components  ***/ 
import Login from './components/login/index';
import Home from './components/home/index';

/** Font Awesome ***/
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//add icons
library.add(faLock, faUser)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
        </Switch>
      </div>
    );
  }
}

export default App;

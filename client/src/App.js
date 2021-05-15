import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'

const App = () => {
 
  return (
    <Router>
    <Container maxWidth="lg">
      <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Auth" exact component={Auth} />
      </Switch>
      
    </Container>

    </Router>
  );
};

export default App;

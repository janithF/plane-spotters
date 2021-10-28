import React, { useContext } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.scss';
import FormModal from './components/FormModal';
import Home from './components/Home';
import AppContext from './store/app-context';


function App() {


  return (
    <>
      <Route path={`/home/new-spotter`}>
        <FormModal />
      </Route>
      <Route path={`/home/:spotterId/edit`}>
        <FormModal />
      </Route>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path='/home'>
        <Home />
      </Route>
    </>
  )
}

export default App;

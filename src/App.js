import React,{ Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './components/user-login';
import Home from './components/user-homepage';
import CollegeRegistration from './components/college-registration/college-registration';
import CollegeLogin from './components/college-registration/college-login';
import CollegeData from './components/college-registration/college-data';



export default class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <Route exact path='/' component={Login} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/college-registration' component={CollegeRegistration} />
        <Route exact path='/college' component={CollegeLogin} />
        <Route exact path='/college-data' component={CollegeData} />
      </BrowserRouter>
    )
  }

}

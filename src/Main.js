import React, { Component } from "react";
export default class Login extends Component{
    goToLogin=()=>{
        window.location.href="/login"
    }
  render(){
    return(
      <div>
        <div><h1>This Is Main</h1></div>
        <button onClick={this.goToLogin}>Login</button>
      </div>
    );
  }
}
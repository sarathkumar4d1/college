import React, { Component } from "react";
export default class Login extends Component{
    goToHome=()=>{
        window.location.href="/home"
    }
  render(){
    return(
      <div>
        <div><h1>This Is Login</h1></div>
        <button onClick={this.goToHome}>Home</button>
      </div>
    );
  }
}
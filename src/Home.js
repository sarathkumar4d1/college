import React, { Component } from "react";
export default class Login extends Component{
    goToMain=()=>{
        window.location.href="/"
    }
  render(){
    return(
      <div>
        <div><h1>This Is Home</h1></div>
        <button onClick={this.goToMain}>Logout</button>
      </div>
    );
  }
}


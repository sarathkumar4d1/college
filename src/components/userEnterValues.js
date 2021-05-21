import React, { Component } from "react";
export default class User extends Component{
    constructor(){
        super();
        this.state={
            enterValue:"",
            userArray:[],
        };
    }
    enterValue = (e) =>{
        this.setState({
            enterValue: e.target.value,
        });
    };
    userClick = (e) => {
        e.preventDefault();
        let userData = this.state.userArray;
        userData.push(this.state.enterValue);
        this.setState({
            userArray: userData,
            enterValue: "",
        });
    };
    render(){
        return(
            <div>
                <div>
                    <form onSubmit={this.userClick}>
                        <input type="text" value={this.state.enterValue} onChange={this.enterValue} name="enterValue" />
                    </form>
                </div>
                <button onClick={this.userClick}>Submit</button>
                {this.state.userArray.map((value) => (
                    <li>{value}</li>
                ))}
            </div>
        );
    }
}
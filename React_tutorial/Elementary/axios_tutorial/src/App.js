import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  getStudentData = () => {
    // port number is 3000 rather than 5000 because we use proxy!
    axios.get("http://localhost:3000/api1/students").then(
      (res) => {
        console.log(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  getCarData = () => {
    axios.get("http://localhost:3000/api2/cars").then(
      (res) => {
        console.log(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  render() {
    return (
      <div>
        <button onClick={this.getStudentData}>Click me to get student data</button>
        <button onClick={this.getCarData}>Click me to get car data</button>
      </div>
    );
  }
}

export default App;

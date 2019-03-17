import React, { Component } from "react";
import "./App.css";
//import axios from 'axios';

const Result = props => {
  if (props.result == null) {
    return <div className="Result">&nbsp;</div>;
  }
  return <div className="Result">{props.result}</div>;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      inputQty: "",
      inputUnit: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleQtyChange(event) {
    this.setState({ inputQty: event.target.value });
  }

  handleUnitChange(event) {
    this.setState({ inputUnit: event.target.value });
  }

  handleSubmit(event) {
    if (isNaN(this.state.inputQty) || this.state.inputQty === "") {
      alert("Please input a valid number for your quantity.");
    } else if (this.state.inputUnit === "") {
      alert("Select a unit to convert.");
    } else {
      //const query = this.state.inputQty + this.state.inputUnit;
      //fetch(`http://192.168.1.10:5000/api/convert?input=${query}`)
      const input = this.state.inputQty + this.state.inputUnit;
      fetch(`https://vo6hsgnzxc.execute-api.us-east-1.amazonaws.com/prod/convert?input=${input}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          let result = res.string;
          this.setState({
            result: result
          });
        });
    }
    event.preventDefault();
  }

  handleClear(event) {
    this.setState({
      result: null,
      inputQty: "",
      inputUnit: ""
    });
  }

  render() {
    return (
      <div className="App">
        <div className="About">
          <h1>Imperial/ Metric Converter</h1>
          <p>
            This is a simple project that takes a quantity and either a metric
            or imperial unit of measure, and then converts the input to the
            equivalent value in the opposite system. While this is a
            straightforward concept that could easily be done with entirely
            front-end logic, for the purposes of learning how to build an
            entirely standalone full stack web application I've only included
            input validation logic on the front end. The input values are sent
            to and evaluated by an API, which then returns a JSON object that is
            parsed and displayed as the result.{" "}
          </p>

          <p>
            The front end of this app was built using React. The back end was
            built using JavaScript, Node, and the Express web application
            framework.
          </p>
        </div>
        <div className="Input">
          <input
            type="text"
            name="input"
            value={this.state.inputQty}
            placeholder="Enter Unit Quantity"
            onChange={this.handleQtyChange}
          />
          <select value={this.state.inputUnit} onChange={this.handleUnitChange}>
            <option value="" disabled hidden>
              Select Unit to Convert
            </option>
            <option value="gal">gal to l</option>
            <option value="l">l to gal</option>
            <option value="lbs">lbs to kg</option>
            <option value="kg">kg to lbs</option>
            <option value="mi">mi to km</option>
            <option value="km">km to mi</option>
          </select>
          <button id="Submit" onClick={this.handleSubmit}>
            Submit
          </button>
          <button id="Clear" onClick={this.handleClear}>
            Clear
          </button>
        </div>
        <Result result={this.state.result} />
      </div>
    );
  }
}

export default App;

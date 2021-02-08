import React, { Component } from "react";
import { render } from "react-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isLoading: false,
      citydata: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.value) this.fetchData();
    event.preventDefault();
  }

  fetchData() {
    this.setState({
      isLoading: true
    });
    fetch(`http://localhost:8081/weather/` + this.state.value)
      .then(response => response.json())
      .then(data =>
        this.setState({
          citydata: data,
          isLoading: false
        })
      )
      .catch(error => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading, citydata } = this.state;
    return (
      <div>
        <h3>Weather Forecast</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Select City
            <select
              style={{ "marginLeft": "25px" }}
              value={this.state.value}
              onChange={this.handleChange}
            >
              <option value="">Select City</option>
              <option value="Mumbai">Mumbai</option>
              <option value="New Delhi">New Delhi</option>
              <option value="Kolkata">Kolkata</option>
              <option value="mango">Chennai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="London">London</option>
              <option value="Paris">Paris</option>
              <option value="New York City">New York City</option>
              <option value="Tokyo">Tokyo</option>
              <option value="Amsterdam">Amsterdam</option>
              <option value="Singapore">Singapore</option>
              <option value="Miami">Miami</option>
              <option value="Rio">Rio</option>
            </select>
          </label>
          <p>
            <input type="submit" value="Submit" />
          </p>
        </form>
        <React.Fragment>
          {!isLoading && citydata.length
            ? citydata.map(citydata => {
                const { date, highTemp, lowTemp, caution } = citydata;
                return (
                  <div key={date}>
                    <p>Date: {date}</p>
                    <p>High Temperature: {highTemp}</p>
                    <p>Low Temperature: {lowTemp}</p>
                    <p>Caution: {caution}</p>
                    <hr />
                  </div>
                );
              })
            : null}
          {isLoading ? <h3>Loading...</h3> : null}
        </React.Fragment>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));

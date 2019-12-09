import React from "react";
import { getAirports, createStop } from "./GetCityInfo";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

export default class CreateStop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      date: "",
      loading: true,
      searched: false,
      airports: {},
      cities: [],
      city: "",
      id: this.props.match.params.id
    };
  }

  async componentDidMount() {
    let airports = await getAirports();
    let cities = airports.map(city => {
      return (
        <option key={city.id} value={city.id}>
          {city.city}
        </option>
      );
    });

    this.setState({ airports, cities, loading: false });
  }

  handleStateChange = () => {
    console.log(this.target.value);
    this.setState({
      city: this.target.value
    });
  };

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    });
  };

  handleSubmit = event => {
    let data = { airport: this.id, date: this.state.date };
    console.log(data);
    createStop(data, this.state.id);

    event.preventDefault();
  };

  render() {
    return (
      <Container>
        <h1>Search for Cities</h1>
        <h2>{this.state.query}</h2>
        <h2>{this.state.city}</h2>
        <Form>
          <Row>
            <Form.Group as={Col} controlId="formDate">
              <Form.Label>Day of Departure</Form.Label>
              <Form.Control
                ref={input => (this.search = input)}
                onChange={this.handleInputChange}
              />
              <Form.Text className="text-muted">
                Enter in YYYY-MM-DD format
              </Form.Text>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formCity">
              <Form.Label>Destination City</Form.Label>
              <Form.Control
                as="select"
                onChange={this.handleStateChange}
                value={this.state.city}
              >
                <option>Choose...</option>
                {this.state.cities}
              </Form.Control>
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

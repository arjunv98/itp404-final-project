import React from "react";
import { getAirports } from "./GetCityInfo";
import { Container, Row, Col } from "react-bootstrap";

export default class CityDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      loading: true,
      city: {}
    };
  }

  async componentDidMount() {
    let cities = await getAirports();
    let city = cities.find(city => {
      return city.code === this.props.match.params.id;
    });
    this.setState({ city, loading: false });
  }

  render() {
    return (
      <Container style={{ textAlign: "center" }}>
        <Row>
          <Col>
            <h1>{this.state.city.city}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Located in {this.state.city.country}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Currency: {this.state.city.currency}</h4>
          </Col>
          <Col>
            <h4>Airport Code: {this.state.city.code}</h4>
          </Col>
        </Row>
        <Row>
          <Col>{this.state.city.description}</Col>
        </Row>
      </Container>
    );
  }
}

import React from "react";
import { createTrip } from "./GetCityInfo";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

export default class CreateTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    });
  };

  handleSubmit = () => {
    let data = { title: this.state.query, stops: [] };
    createTrip(data);
  };

  render() {
    return (
      <Container>
        <h1>Create a Trip</h1>
        <Form>
          <Row>
            <Col md="9">
              <Form.Control
                placeholder="Create a name for your trip..."
                ref={input => (this.search = input)}
                onChange={this.handleInputChange}
              />
            </Col>
            <Col md="auto">
              <Button href={`/`} onClick={this.handleSubmit}>
                Create
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

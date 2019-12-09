import React from "react";
import { getAirports } from "./GetCityInfo";
import { Form, Container, Row, Col, Button, Table, Nav } from "react-bootstrap";

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      loading: true,
      searched: false,
      airports: {},
      results: []
    };
  }

  async componentDidMount() {
    let airports = await getAirports();

    this.setState({ airports, loading: false });
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    });
  };

  handleSubmit = () => {
    console.log(this.state.query);
    let results = this.state.airports.filter(city => {
      return city.city.toUpperCase().includes(this.state.query.toUpperCase());
    });

    this.setState({ results, searched: true });
    console.log(this.state.results);
  };

  render() {
    return (
      <Container>
        <h1>Search for Cities</h1>
        <Form>
          <Row>
            <Col md="9">
              <Form.Control
                placeholder="Search for a city..."
                ref={input => (this.search = input)}
                onChange={this.handleInputChange}
              />
            </Col>
            <Col md="auto">
              <Button onClick={this.handleSubmit}>Search</Button>
            </Col>
          </Row>
        </Form>
        {this.state.results.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>City</th>
                <th>Details Page</th>
              </tr>
            </thead>
            <tbody>
              {this.state.results.map((city, i) => {
                return (
                  <tr key={i}>
                    <td>{city.city}</td>
                    <td>
                      <Nav.Link href={`/cities/${city.code}`}>Details</Nav.Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : this.state.searched ? (
          <h2>No results found</h2>
        ) : (
          <br />
        )}
      </Container>
    );
  }
}

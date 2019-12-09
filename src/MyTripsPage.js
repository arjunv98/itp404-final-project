import React from "react";
import { getTrips } from "./GetCityInfo";
import { Nav, Table, Container } from "react-bootstrap";

export default class MyTripsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      loading: true,
      trips: []
    };
  }

  async componentDidMount() {
    let trips = await getTrips();
    console.log(trips);

    this.setState({ trips, loading: false });
  }

  render() {
    return (
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Trip Title</th>
              <th>Stops</th>
              <th>Details Page</th>
            </tr>
          </thead>
          <tbody>
            {this.state.trips.map((trip, i) => {
              return (
                <tr key={i}>
                  <td>{trip.title}</td>
                  {trip.stops.length !== undefined ? (
                    <td>{trip.stops.length}</td>
                  ) : (
                    <td>0</td>
                  )}
                  <td>
                    <Nav.Link href={`/trips/${trip.id}`}>Details</Nav.Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  }
}

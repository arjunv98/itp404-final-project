import React from "react";
import { getTrips, getAirports, deleteTrip } from "./GetCityInfo";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import Timeline from "./Timeline";
import TimelineCard from "./TimelineCard";
import Loading from "./Loading";

export default class TripDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      loading: true,
      trip: {},
      airports: {},
      id: Number(this.props.match.params.id)
    };
  }

  async componentDidMount() {
    let trips = await getTrips();
    console.log(trips);
    let airports = await getAirports();
    let trip = trips.find(trip => {
      return trip.id === this.state.id;
    });

    this.setState({ trip, airports, loading: false });
  }

  handleTripDelete = () => {
    deleteTrip(this.state.id);
  };

  render() {
    return (
      <Container fluid="true">
        <Row>
          <Col md="9"></Col>
          <Col>
            <Button variant="danger" href={`/`} onClick={this.handleTripDelete}>
              Delete Trip
            </Button>
          </Col>
        </Row>
        <Row>
          <br />
        </Row>
        <Row>
          <Col md="9"></Col>
          <Col>
            <Button>Add stop</Button>
          </Col>
        </Row>
        {this.state.loading ? (
          <Loading />
        ) : (
          <Timeline lineColor="orange">
            {this.state.trip.stops.map((stop, i) => {
              let airport = this.state.airports.find(airport => {
                return airport.id === stop.airport;
              });
              return (
                <TimelineCard
                  key={i}
                  dateMarkerColor="orange"
                  dateText={stop.date}
                >
                  <Card style={{ width: "20rem" }}>
                    <Card.Body>
                      <Card.Title>{airport.city}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Airport: {airport.code}
                      </Card.Subtitle>
                      <Card.Text>Notes:</Card.Text>
                      <Card.Text>
                        A place for notes, such as things to do, places to
                        visit, etc. (NOT YET IMPLEMENTED)
                      </Card.Text>
                      <Card.Link href={`/cities/${airport.code}`}>
                        City Details
                      </Card.Link>
                      <Card.Link href="#">Edit Note</Card.Link>
                    </Card.Body>
                  </Card>
                </TimelineCard>
              );
            })}
          </Timeline>
        )}
      </Container>
    );
  }
}

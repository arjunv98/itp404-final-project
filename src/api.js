const express = require("express");
const cors = require("cors");
const app = express();

const { ENVIRONMENT, PORT } = process.env;

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

const db = {
  trips: [
    {
      id: 1,
      title: "Tour of Europe",
      stops: [
        {
          id: 1,
          airport: 1,
          date: "2020-01-02"
        },
        {
          id: 2,
          airport: 3,
          date: "2020-01-03"
        },
        {
          id: 3,
          airport: 5,
          date: "2020-01-04"
        },
        {
          id: 4,
          airport: 6,
          date: "2020-01-05"
        },
        {
          id: 5,
          airport: 1,
          date: "2020-01-06"
        }
      ]
    },
    {
      id: 2,
      title: "To India and Back",
      stops: [
        {
          id: 1,
          airport: 2,
          date: "2020-01-02"
        },
        {
          id: 2,
          airport: 4,
          date: "2020-01-03"
        },
        {
          id: 3,
          airport: 1,
          date: "2020-01-04"
        },
        {
          id: 4,
          airport: 2,
          date: "2020-01-05"
        }
      ]
    }
  ],
  airports: [
    {
      id: 1,
      code: "LAX",
      city: "Los Angeles",
      country: "The United States",
      currency: "USD",
      description:
        "Los Angeles is a sprawling Southern California city and the center of the nation’s film and television industry. Near its iconic Hollywood sign, studios such as Paramount Pictures, Universal and Warner Brothers offer behind-the-scenes tours. On Hollywood Boulevard, TCL Chinese Theatre displays celebrities’ hand- and footprints, the Walk of Fame honors thousands of luminaries and vendors sell maps to stars’ homes."
    },
    {
      id: 2,
      code: "ORD",
      city: "Chicago",
      country: "The United States",
      currency: "USD",
      description:
        "Chicago, on Lake Michigan in Illinois, is among the largest cities in the U.S. Famed for its bold architecture, it has a skyline punctuated by skyscrapers such as the iconic John Hancock Center, 1,451-ft. Willis Tower (formerly the Sears Tower) and the neo-Gothic Tribune Tower. The city is also renowned for its museums, including the Art Institute of Chicago with its noted Impressionist and Post-Impressionist works."
    },
    {
      id: 3,
      code: "BER",
      city: "Berlin",
      country: "Germany",
      currency: "EUR",
      description:
        "Berlin, Germany’s capital, dates to the 13th century. Reminders of the city's turbulent 20th-century history include its Holocaust memorial and the Berlin Wall's graffitied remains. Divided during the Cold War, its 18th-century Brandenburg Gate has become a symbol of reunification. The city's also known for its art scene and modern landmarks like the gold-colored, swoop-roofed Berliner Philharmonie, built in 1963."
    },
    {
      id: 4,
      code: "DEL",
      city: "Delhi",
      country: "India",
      currency: "RUP",
      description:
        "Delhi, India’s capital territory, is a massive metropolitan area in the country’s north. In Old Delhi, a neighborhood dating to the 1600s, stands the imposing Mughal-era Red Fort, a symbol of India, and the sprawling Jama Masjid mosque, whose courtyard accommodates 25,000 people. Nearby is Chandni Chowk, a vibrant bazaar filled with food carts, sweets shops and spice stalls."
    },
    {
      id: 5,
      code: "FCO",
      city: "Rome",
      country: "Italy",
      currency: "EUR",
      description:
        "Rome is the capital city and a special comune of Italy. Rome also serves as the capital of the Lazio region. With 2,872,800 residents in 1,285 km², it is also the country's most populated comune. It is the fourth most populous city in the European Union by population within city limits."
    },
    {
      id: 6,
      code: "ARN",
      city: "Stockholm",
      country: "Sweden",
      currency: "SEK",
      description:
        "Stockholm, the capital of Sweden, encompasses 14 islands and more than 50 bridges on an extensive Baltic Sea archipelago. The cobblestone streets and ochre-colored buildings of Gamla Stan (the old town) are home to the 13th-century Storkyrkan Cathedral, the Kungliga Slottet Royal Palace and the Nobel Museum, which focuses on the Nobel Prize. Ferries and sightseeing boats shuttle passengers between the islands."
    },
    {
      id: 7,
      code: "SAN",
      city: "San Diego",
      country: "The United States",
      currency: "USD",
      description:
        "San Diego is a city on the Pacific coast of California known for its beaches, parks and warm climate. Immense Balboa Park is the site of the renowned San Diego Zoo, as well as numerous art galleries, artist studios, museums and gardens. A deep harbor is home to a large active naval fleet, with the USS Midway, an aircraft-carrier-turned-museum, open to the public."
    },
    {
      id: 8,
      code: "SFO",
      city: "San Francisco",
      country: "The United States",
      currency: "USD",
      description:
        "San Francisco, officially City and County of San Francisco and colloquially known as SF, San Fran, or 'The City', is the cultural, commercial, and financial center of Northern California."
    },
    {
      id: 9,
      code: "SBA",
      city: "Santa Barbara",
      country: "The United States",
      currency: "USD",
      description:
        "Santa Barbara is a city on the central California coast, with the Santa Ynez Mountains as dramatic backdrop. Downtown, Mediterranean-style white stucco buildings with red-tile roofs reflect the city’s Spanish colonial heritage. Upscale boutiques and restaurants offering local wines and seasonal fare line State Street. On a nearby hill, Mission Santa Barbara, founded in 1786, houses Franciscan friars and a museum."
    },
    {
      id: 10,
      code: "SJC",
      city: "San Jose",
      country: "The United States",
      currency: "USD",
      description:
        "San Jose is a large city surrounded by rolling hills in Silicon Valley, a major technology hub in California's Bay Area. Architectural landmarks, from the 1883 Italianate-style Oddfellows building to Spanish Colonial Revival structures, make up the downtown historic district. The downtown area is also home to the Tech Museum of Innovation, devoted to the exploration of science and technology."
    }
  ]
};

/* Trips */
app.get("/api/trips", (request, response) => {
  response.json(db.trips);
});

app.post("/api/trips", (request, response) => {
  const trip = request.body;
  trip.id = db.trips.length + 1;
  db.trips.push(trip);
  response.json(trip);
});

app.get("/api/trips/:id", (request, response) => {
  const id = Number(request.params.id);
  const trip = db.trips.find(trip => {
    return trip.id === id;
  });

  if (trip) {
    response.json(trip);
  } else {
    response.status(404).send();
  }
});

app.delete("/api/trips/:id", (request, response) => {
  const id = Number(request.params.id);
  const trip = db.trips.find(trip => {
    return trip.id === id;
  });

  if (trip) {
    db.trips = db.trips.filter(trip => {
      return trip.id !== id;
    });
    response.status(204).send();
  } else {
    response.status(404).send();
  }
});

app.put("/api/trips/:id", (request, response) => {
  const id = Number(request.params.id);
  const trip = db.trips.find(trip => {
    return trip.id === id;
  });

  if (trip) {
    Object.assign(trip, request.body);
    response.json(trip);
  } else {
    response.status(404).send();
  }
});

app.post("/api/trips/:id/stops", (request, response) => {
  const tripID = Number(request.params.id);
  const stop = request.body;
  const airport = db.airports.find(airport => {
    return airport.id === stop.airport;
  });
  const trip = db.trips.find(trip => {
    return trip.id === tripID;
  });

  if (!airport) {
    response.status(404).send({
      errors: {
        post: "airport does not exist"
      }
    });
  } else if (!trip) {
    response.status(404).send({
      errors: {
        post: "trip does not exist"
      }
    });
  } else {
    stop.id = trip.stops.length + 1;
    trip.stops.push(stop);
    response.json(airport);
  }
});

app.get("/api/airports", (request, response) => {
  response.json(db.airports);
});

app.listen(8000 || PORT);

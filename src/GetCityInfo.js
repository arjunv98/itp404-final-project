const API = "http://localhost:8000";

export async function getTrips() {
  let response = await fetch(`${API}/api/trips`, { method: "GET" });
  let trips = await response.json();
  return trips;
}

export async function deleteTrip(id) {
  let response = await fetch(`${API}/api/trips/${id}`, { method: "DELETE" });
  let deleteConfirm = await response.json();
  return deleteConfirm;
}

export async function getAirports() {
  let response = await fetch(`${API}/api/airports`, { method: "GET" });
  let trips = await response.json();
  return trips;
}

const API = "http://localhost:8000";

export async function getTrips() {
  let response = await fetch(`${API}/api/trips`, { method: "GET" });
  return await response.json();
}

export async function deleteTrip(id) {
  let response = await fetch(`${API}/api/trips/${id}`, { method: "DELETE" });
  let deleteConfirm = await response.json();
  return deleteConfirm;
}

export async function createTrip(data) {
  console.log(data);
  let response = await fetch(`${API}/api/trips`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export async function createStop(data, id) {
  let response = await fetch(`${API}/api/trips/${id}/stops`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export async function getAirports() {
  let response = await fetch(`${API}/api/airports`, { method: "GET" });
  return await response.json();
}

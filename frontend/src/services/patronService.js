import sendRequest from "./sendRequest";

const BASE_URL = '/api/patrons';

export function getAllPatrons(){
  return sendRequest(BASE_URL);
}

export function getPatronById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export function createPatron(patronData) {
  return sendRequest(BASE_URL, 'POST', patronData);
}

export function updatePatron(id, PatronData) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', patronData);
}

export function deletePatron(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}
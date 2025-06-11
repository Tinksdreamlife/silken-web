import sendRequest from "./sendRequest";

export function createStrand(patronId, strandData) {
    return sendRequest(`/api/patrons/${patronId}/strands`, 'POST', strandData);
}

export function deleteStrand(patronId, strandId) {
    return sendRequest(`/api/patrons/${patronId}/strands/${strandId}`, 'DELETE');
}
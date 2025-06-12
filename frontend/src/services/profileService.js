import sendRequest from "./sendRequest";

const BASE_URL = '/api/profile';

export function getProfile() {
    return sendRequest(`${BASE_URL}/me`);
}

export function createProfile(profileData) {
    return sendRequest(BASE_URL, 'POST', profileData);
}

export function updateProfile(profileData) {
    return sendRequest(BASE_URL, 'PUT', profileData);
}
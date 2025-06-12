import sendRequest from "./sendRequest";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + '/api/profile';

export function getProfile() {
    return sendRequest(`${BASE_URL}/me`);
}

export function updateProfile(profileData) {
    return sendRequest(`${BASE_URL}/me`, 'PUT', profileData);
}
import sendRequest from "./sendRequest";

const BASE_URL = '/api/profile';

export async function getProfile() {
    try {
    return await sendRequest(`${BASE_URL}/me`);
    } catch (err) {
        if (err.message === 'Profile not found') {
            throw err;
        }
        console.error('Unexpected error fetching profile:', err);
        throw new Error('Something went wrong fetching profile');
    }
}

export function createProfile(profileData) {
    return sendRequest(BASE_URL, 'POST', profileData);
}

export function updateProfile(profileData) {
    return sendRequest(BASE_URL, 'PUT', profileData);
}
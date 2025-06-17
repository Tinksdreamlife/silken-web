import { useState, useEffect } from "react";
import { getProfile } from "../../services/profileService";
import { Link } from 'react-router-dom';

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await getProfile(); // now using service function
                setProfile(data);
            } catch (err) {
                if (err.message === "Profile not found") {
                    setNotFound(true);
                } else {
                    console.error('Error fetching profile:', err);
                }
            }
        }
        fetchProfile();
    }, []);

    if (notFound) {
        return (
            <div>
                <h1> No profile found</h1>
                <Link to="/profile/edit">Create Your Profile</Link>
            </div>
        );
    }

    if (!profile) return <p>Loading profile...</p>;

    return (
        <div className="main-wrapper">
            <h1>My Profile</h1>
            <p><strong>Stage Names:</strong> {profile?.stageNames.length ? profile.stageNames.map(name => name.trim()).join(', ') : 'N/A'}</p>
            <p><strong>Sites:</strong> {profile?.sites?.length ? profile.sites.map(site => site.trim()).join(', ') : 'None listed'}</p>
            <Link to="/profile/edit">Update Profile</Link>
        </div>
    );
}
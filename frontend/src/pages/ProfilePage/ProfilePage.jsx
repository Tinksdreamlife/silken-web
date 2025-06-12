import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../services/profileService";

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        stageName: '',
        sites: '',
    });

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await getProfile(); // now using service function
                setProfile(data);
                setFormData({
                    stageName: data.stageName || '',
                    sites: data.sites?.join(',') || '',
                });
            } catch (err) {
                console.error('Error fetching profile:', err);
            }
        }
        fetchProfile();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const updated = await updateProfile({
                stageName: formData.stageName,
                sites: formData.sites.split(',').map(site => site.trim()), // fixing the .mapsite error
            });
            setProfile(updated);
            alert('Profile saved!');
        } catch (err) {
            console.error('Error saving profile:', err);
            alert('Error saving profile');
        }
    }

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <h1>My Profile</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Stage Name:
                    <input
                        type="text"
                        name="stageName"
                        value={formData.stageName}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Sites (comma separated):
                    <input
                        type="text"
                        name="sites"
                        value={formData.sites}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Save Profile</button>
            </form>

            {profile && (
                <div>
                    <h2>Current Profile</h2>
                    <p>Stage Name: {profile.stageName}</p>
                    <p>Sites: {profile.sites?.join(',')}</p>
                </div>
            )}

        </div>
    );
}
import { useState, useEffect } from "react";

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        stageName: '',
        sites: '',
    });

    useEffect(() => {
        async function fetchProfile() {
            const res = await fetch('/api/profile/me');
            if (res.ok) {
                const data = await res.json();
                setProfile(data);
                setFormData({ stageName: data.stageName || '', sites: data.sites?.join(',') || '' });
            }
        }
        fetchProfile();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const res = await fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                stageName: formData.stageName,
                sites: formData.sites.split(',').map(site)
            }),
        });
        if (res.ok) {
            const data = await res.json();
            setProfile(data);
            alert('Profile saved!');
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
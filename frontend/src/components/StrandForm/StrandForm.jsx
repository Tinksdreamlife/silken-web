import { useState, useEffect } from "react";
import sendRequest from "../../services/sendRequest";

export default function AddStrandForm({ patronId, onStrandAdded }) {
    const [formData, setformData] = useState({
        site: "",
        stageName: "",
        notes: "",
        revenue: "",
    });

    const [profile, setProfile] = useState({ stageNames: [], sites: [] });

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await sendRequest('/api/profile/me');
                setProfile(data);
            } catch (err) {
                console.error("Failed to fetch profile for dropdowns:", err);
            }
        }
        fetchProfile();
    }, []);

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const res = await sendRequest(`/api/patrons/${patronId}/strands`, 'POST', formData);
            setFormData({ site: "", stagename: "", notes: "", revenue: "" });
            if (onStrandAdded) onStrandAdded(res); //updated Patron
        } catch (err) {
            console.error(err);
        }
    }

     return (
        <form onSubmit={handleSubmit}>
            <label>Site:</label>
            <select name="site" value={formData.site} onChange={handleChange} required>
                <option value="">Select a site</option>
                {profile.sites.map((site, idx) => (
                    <option key={idx} value={site}>{site}</option>
                ))}
            </select>

            <label>Stage Name:</label>
            <select name="stageName" value={formData.stageName} onChange={handleChange} required>
                <option value="">Select a stage name</option>
                {profile.stageNames.map((name, idx) => (
                    <option key={idx} value={name}>{name}</option>
                ))}
            </select>

            <label>Notes:</label>
            <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                required
            />

            <label>Revenue:</label>
            <input
                type="text"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                required
            />

            <button type="submit">Add Strand</button>
        </form>
    );
}
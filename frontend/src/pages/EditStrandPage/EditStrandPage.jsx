import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import sendRequest from '../../services/sendRequest';
import PageWrapper from '../../components/Layout/PageWrapper';

export default function EditStrandPage() {
    const { strandId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        site: "",
        stageName: "",
        notes: "",
        revenue: "",
    });

    const [profile, setProfile] = useState({ stageNames: [], sites: [] });

    useEffect(() => {
        async function fetchStrand() {
            try {
                const data = await sendRequest(`/api/strands/${strandId}`);
                setFormData(data);
            } catch (err) {
                console.error("Error fetching strand:", err);
            }
        }

        async function fetchProfile() {
            try {
                const data = await sendRequest("/api/profile/me");
                setProfile(data);
            } catch (err) {
                console.error("Error fetching profile for dropdowns:", err);
            }
        }

        fetchStrand();
        fetchProfile();
    }, [strandId]);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await sendRequest(`/api/strands/${strandId}`, 'PUT', formData);
            navigate(-1);
        } catch (err) {
            console.error("Error updating strand:", err);
        }
    }

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <PageWrapper>
            <h2>Edit Strand</h2>
            <form onSubmit={handleSubmit}>
                <label>Site:</label>
                <select
                    name="site"
                    value={formData.site}
                    onChange={handleChange}
                    required>
                    <option value="">Select a site</option>
                    {profile.sites.map((site, idx) => (
                        <option key={idx} value={site}>
                            {site}
                        </option>
                    ))}
                </select>

                <label>Stage Name:</label>
                <select
                    name="stageName"
                    value={formData.stageName}
                    onChange={handleChange}
                    required>
                    <option value="">Select a stage name</option>
                    {profile.stageNames.map((name, idx) => (
                        <option key={idx} value={name}>
                            {name}
                        </option>
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

                <label>Revenue ($):</label>
                <input
                    type="number"
                    name="revenue"
                    steps="0.01"
                    value={formData.revenue}
                    onChange={handleChange}
                    required
                />

                <button className="btn small" type="submit">Save Changes</button>
            </form>
        </PageWrapper>
    );
}
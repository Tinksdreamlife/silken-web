import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router';
import sendRequest from '../../services/sendRequest';

export default function EditPatronPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ patronName: '', generalNotes: '', strands: [] });

    useEffect(() => {
        async function fetchPatron() {
            try {
                const data = await sendRequest(`/api/patrons/${id}`);
                setFormData(data);
            } catch (err) {
                console.error('Error fetching patron:', err);
            }
        }
        fetchPatron();
    }, [id]);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await sendRequest(`/api/patrons/${id}`, 'PUT', formData);
            navigate('/patrons');
        } catch (err) {
            console.error('Error saving patron:', err);
        }
    }

    return (
        <div className="main-wrapper">
            <h2>Edit Patron</h2>
            <Link to={`/patrons/${formData._id}/strands/new`}>➕ Add Strand</Link>
            <form onSubmit={handleSubmit}>
                <label>Patron Name:</label>
                <input
                    value={formData.patronName}
                    onChange={(event) => setFormData({ ...formData, patronName: event.target.value })}
                    required
                />

                <label>Notes:</label>
                <textarea
                    value={formData.generalNotes}
                    onChange={(event) => setFormData({ ...formData, generalNotes: event.target.value })}
                />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}
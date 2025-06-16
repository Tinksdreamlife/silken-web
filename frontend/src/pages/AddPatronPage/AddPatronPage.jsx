import { useState } from "react";
import {useNavigate} from "react-router";
import sendRequest from "../../services/sendRequest";

export default function AddPatronPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        patronName: '',
        generalNotes: '',
        strands: [],
    });

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const data = {
                patronName: formData.patronName,
                generalNotes: formData.generalNotes,
            };
        await sendRequest('/api/patrons', 'POST', data); 
        navigate('/patrons');
        } catch (err) {
            console.error('Error adding patron:', err);
        }
    }
        return (
            <div>
                <h2>Add Patron</h2>
                <form onSubmit={handleSubmit}>
                    <label>Patron Name:</label>
                    <input 
                    value={formData.patronName}
                    onChange={(event) => setFormData({ ...formData, patronName: event.target.value})}
                    required
                    />

                    <label>Notes:</label>
                    <textarea 
                    value={formData.generalNotes}
                    onChange={(event) => setFormData({ ...formData, generalNotes: event.target.value})}
                    />

                    <button type="submit">Add Patron</button>
                </form>
            </div>
        );
    }
    

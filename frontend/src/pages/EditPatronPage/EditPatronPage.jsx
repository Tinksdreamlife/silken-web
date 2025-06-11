import {useState, useEffect} from 'react';
import {useParams, useNavigate } from 'react-router';
import { Link } from 'react-router';

export default function EditPatronPage() {
    const {id} =useParams();
    const navigate = useNavigate();
    const [formData, setFormData] =useState({ patronName: '', generalNotes: '', strands: []});

    useEffect(() => {
        async function fetchPatron() {
            const res = await fetch(`/api/patrons/${id}`);
            const data = await res.json();
            setFormData(data);
        }
        fetchPatron();
    }, [id]);
  
  async function handleSubmit(event) {
    event.preventDefault();
    await fetch(`/api/patrons/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
    });
    navigate('/patrons'); //go back to the patron list after editing
}

return (
    <div>
        <h2>Edit Patron</h2>
        <Link to={`/patrons/${patron._id}/strands/new`}>➕ Add Strand</Link>
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
            <button type="submit">Save Changes</button>
        </form>
    </div>
);
}
import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Link, useNavigate  } from 'react-router-dom';
import sendRequest from '../../services/sendRequest';

export default function PatronDetailPage() {
    const {id} = useParams(); //patron ID
    const navigate = useNavigate();
    const [patron, setPatron] = useState(null);

    useEffect(() => {
        async function fetchPatron() {
            try {
                const data = await sendRequest(`/api/patrons/${id}`);
                setPatron(data);
            } catch (err) {
                console.error('Error fetching patron:', err);
            }
        }
        fetchPatron();
    }, [id]);

    async function handleDeleteStrand(strandId) {
        const confirm = window.confirm('Delete this strand?');
        if (!confirm) return;
        try {
            const updatedPatron = await sendRequest(`/api/strands/${strandId}`, 'DELETE');
            setPatron(updatedPatron);
        } catch (err) {
            console.error ("Error deleting strand:", err);
        }
    }
    if (!patron) return <p>Loading...</p>

    return (
        <div>
            <h2>{patron.patronName}</h2>
            <p>{patron.generalNotes}</p>
            <Link to={`/patrons/${id}/strands/new`}>➕ Add New Strand</Link>
        
        <h3>Strands</h3>
        {patron.strands && patron.strands.length > 0 ? (
            <ul>
                {patron.strands.map((strand) => (
                    <li key={strand.id}>
                        <strong>{strand.site}</strong> ({strand.stageName})<br />
                        Notes: {strand.notes}<br />
                        Revenue: ${strand.revenue?.toFixed(2)}<br />
                        <Link to={`/strands/${strand._id}/edit`}>✏️ Edit</Link>{" "}
                        <button onClick={() => handleDeleteStrand._id}>🗑️ Delete</button>
                    </li>
                ))}
            </ul>
        ) :(
            <p>No strands added yet.</p>
        )}
        </div>
    );
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sendRequest from '../../services/sendRequest';
import PageWrapper from "../../components/Layout/PageWrapper";

export default function PatronListPage() {
    const [patrons, setPatrons] = useState([]);

    useEffect(() => {
        async function fetchPatrons() {
            try {
                const data = await sendRequest('/api/patrons');
                setPatrons(data);
            } catch (err) {
                console.error("Error fetching patrons:", err);
                setPatrons([]);
            }
        }
        fetchPatrons();
    }, []);

    async function handleDelete(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this patron?");
        if (!confirmDelete) return;

        try {
            await sendRequest(`/api/patrons/${id}`, 'DELETE');
            setPatrons(patrons.filter((patron) => patron._id !== id));
        } catch (err) {
            console.error('Error deleting patron:', err);
        }
    }

    return (
        <PageWrapper>
            <section>
                <h1>Patrons</h1>
                <Link to="/patrons/new" className="btn small">Add Patron</Link>
                <ul>
                    {Array.isArray(patrons) && patrons.length > 0 ? (
                        patrons.map((patron) => (
                            <li
                                key={patron._id}
                                style={{
                                    marginBottom: "1.5rem",
                                    padding: "1rem",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                }}
                            >
                                <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
                                    <Link to={`/patrons/${patron._id}`} className="btn small">{patron.patronName}</Link>
                                </p>
                                <p style={{ marginBottom: "0.75rem" }}>{patron.generalNotes}</p>
                                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                                    <Link to={`/patrons/${patron._id}/edit`} className="btn small">Edit</Link>
                                    <button className="btn small" onClick={() => handleDelete(patron._id)}>Delete</button>
                                    <Link to={`/patrons/${patron._id}/strands/new`} className="btn small">
                                        Add Strand
                                    </Link>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>No patrons found</li>
                    )}
                </ul>
            </section>
        </PageWrapper>
    );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sendRequest from '../../services/sendRequest';

export default function PatronListPage() {
    const [patrons, setPatrons] = useState([]);

    useEffect(() => {
        async function fetchPatrons() {
            try {
                const data = await sendRequest('/api/patrons');
                console.log("Fetched patrons:", data); // Debugging patrons issue
                setPatrons(data);
            } catch (err) {
                console.error("Error fetching patrons:", err);
                setPatrons([]); // To avoid .map crash
            }
        }
        fetchPatrons();
    }, []);

    async function handleDelete(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this patron?");
        if (!confirmDelete) return;

        await fetch(`/api/patrons/${id}`, { method: 'DELETE' });
        setPatrons(patrons.filter((patron) => patron._id !== id));
    }

    return (
        <section>
            <h1>Patrons</h1>
            <Link to="/patrons/new">Add Patron</Link>
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
                                {patron.patronName}
                            </p>
                            <p style={{ marginBottom: "0.75rem" }}>{patron.generalNotes}</p>
                            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                                <Link to={`/patrons/${patron._id}/edit`}>✏️ Edit</Link>
                                <button onClick={() => handleDelete(patron._id)}>🗑️ Delete</button>
                                <Link to={`/patrons/${patron._id}/strands/new`}>
                                    ➕ Add Strand
                                </Link>
                            </div>
                        </li>
                    ))
                    ) : (
                    <li>No patrons found</li>
                )}
            </ul>
        </section>
            );
        }

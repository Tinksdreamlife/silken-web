import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PatronListPage() {
    const [patrons, setPatrons] = useState([]);

    useEffect(() => {
        async function fetchPatrons() {
            const res = await fetch('/api/patrons');
            const data = await res.json();
            console.log("Fetched patrongs:", data); // Debugging patrons issue
            setPatrons(data);
        }
        fetchPatrons();
    }, []);

    async function handleDelete(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this patron?");
        if (!confirmDelete) return;

        await fetch(`/api/patrons/${id}`, {method: 'DELETE'});
        setPatrons(patrons.filter((patron) => patron._id !== id));
    }

    return (
        <section>
            <h1>Patrons</h1>
            <Link to="/patrons/new">Add Patron</Link>
            <ul>
                {patrons.map(patron => (
                    <li key={patron._id}>
                        {patron.patronName}
                        <Link to={`/patrons/${patron._id}/edit`}>Edit</Link>
                        <button onClick={() => handleDelete(patron._id)}>Delete</button>
                        <Link to={`/patrons/${patron._id}/strands/new`}>➕ Add Strand</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
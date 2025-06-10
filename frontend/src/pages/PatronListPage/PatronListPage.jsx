import { useEffect, useState } from "react";

export default function PatronListPage() {
    const [patrons, setPatrons] = useState([]);

    useEffect(() => {
        async function fetchPatrons() {
            const res = await fetch('/api/patrons');
            const data = await res.json();
            setPatrons(data);
        }
        fetchPatrons();
    }, []);

    return (
        <section>
            <h1>Patrons</h1>
            <ul>
                {patrons.map(patron => (
                    <li key={patron._id}>
                        {patron.patronName}
                        {/* Add edit/delete buttons here later */}
                    </li>
                ))}
            </ul>
        </section>
    );
}
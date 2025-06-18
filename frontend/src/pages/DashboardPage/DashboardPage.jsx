import { Link } from "react-router-dom";
import PageWrapper from "../../components/Layout/PageWrapper";
import { useEffect, useState } from "react";
import sendRequest from "../../services/sendRequest";

export default function DashboardPage() {
    const [patrons, setPatrons] = useState([]);

    useEffect(() => {
        async function fetchPatrons() {
            try {
                const data = await sendRequest('/api/patrons');
                setPatrons(data);
            } catch (err) {
                console.error('Failed to fetch patrons:', err);
            }
        }
        fetchPatrons();
    }, []);

    return (
        <PageWrapper>
            <h1>Welcome back to your Silken Web</h1>
            <p className="dashboard-sub">What would you like to focus on today?</p>
            <hr />

            <div className="dashboard-panels">
                <div className="dashboard-card">
                    <h2>Profile</h2>
                    <p>Update your stage names and linked platforms.</p>
                    <Link to="/profile" className="btn small">View/ Edit Profile</Link>
                    <hr />
                </div>

                <div className="dashboard-card">
                    <h2>Patrons</h2>
                    <p>Review or add to your list of patrons.</p>
                    <Link to="/patrons" className="btn small">View Patrons</Link>
                    <Link to="/patrons/new" className="btn small">Add Patron</Link>
                    <hr />
                </div>

                <div className="dashboard-card">
                    <h2>Strands</h2>
                    <p>View patron strands.</p>
                    {patrons.length > 0 ? (
                        <select
                            onChange={(event) => {
                                const id = event.target.value;
                                if (id) window.location.href = `/patrons/${id}`;
                            }}
                        >
                            <option value="">Select a Patron</option>
                            {patrons.map((pickPatron) => (
                                <option key={pickPatron._id} value={pickPatron._id}>
                                    {pickPatron.patronName}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p style={{ fontStyle: 'italic' }}>No patrons found.</p>
                    )}
                </div>
            </div>
        </PageWrapper>
    );
}
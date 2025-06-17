import { useEffect, useState } from "react";
import {useParams, useNavigate} from "react-router";
import StrandForm from "../../components/StrandForm/StrandForm";
import sendRequest from "../../services/sendRequest";

export default function AddStrandPage() {
    const { id } = useParams(); //Patron ID from the URL
    const navigate = useNavigate();
    const [patron, setPatron] = useState(null);

    useEffect(() => {
        async function fetchPatron() {
            try {
                const data = await sendRequest(`/api/patrons/${id}`);
                setPatron(data);
            } catch (err) {
                console.error("Error fetching patron:", err);
            }
        }
        fetchPatron();
    }, [id]);

    function handleStrandAdded(updatedPatron) {
        navigate(`/patrons/${id}`); // Go back to Patron Index
    }

    return (
        <div className="main-wrapper">
            <h1>Add New Strand</h1>
            {patron && (
                <>
                <p>For Patron: <strong>{patron.patronName}</strong></p>
                <StrandForm 
                patronId={id} 
                patronName={patron.patronName}
                onStrandAdded={handleStrandAdded} />
                </>
            )}
        </div>
    );
}

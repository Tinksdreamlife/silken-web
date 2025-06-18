import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import StrandForm from "../../components/StrandForm/StrandForm";
import sendRequest from "../../services/sendRequest";
import PageWrapper from "../../components/Layout/PageWrapper";

export default function AddStrandPage() {
    const { id } = useParams();
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
        navigate(`/patrons/${id}`);
    }

    return (
        <PageWrapper>
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
        </PageWrapper>
    );
}

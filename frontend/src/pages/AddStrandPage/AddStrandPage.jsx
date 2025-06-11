import {useParams, useNavigate} from "react-router";
import StrandForm from "../../components/StrandForm";

export default function AddStrandPage() {
    const { id } = useParams(); //Patron ID from the URL
    const navigate = useNavigate();

    function handleStrandAdded(updatedPatron) {
        navigate(`/patrons/${id}`); // Go back to Patron Index
    }

    return (
        <div>
            <h1>Add New Strand</h1>
            <StrandForm patronId={id} onStrandAdded={handleStrandAdded} />
        </div>
    );
}

import { useState } from "react";

// Add Patron function 

export default function PatronForm({ onAdd }) {
    const [formData, setFormData] = useState({
        patronName: '',
        generalNotes: '',
    });

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const res = await fetch('/api/patrons', {
            method: 'Post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        });
            const newPatron =await res.json();
            onAdd(newPatron);
            setFormData({ patronName: '', generalNotes: ''});
        }

        return(
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="patronName"
                value={formData.patronName}
                onChange={handleChange}
                placeholder="Patron Name"
                required
                />
                <textarea
                name="generalNotes"
                value={formData.generalNotes}
                onChange={handleChange}
                placeholder="General Notes"
                />
                <button className="btn small" type="submit">Add Patron</button>
                </form>
        );
    }

    
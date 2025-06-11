import { useState } from "react";

export default function AddStrandForm({ patronId, onStrandAdded }) {
    const [formData, setformData] = useState({
        site: "",
        link: "",
        notes: "",
    });

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const res = await fetch('/api/patrons/${patronId}/strands', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const updatedPatron = await res.json();
            setFormData({ site: "", link: "", notes: "", revenue: "" });
            if (onStrandAdded) onStrandAdded(updatedPatron);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Site:</label>
            <input type="text" name="site" value={formData.site} onChange={handleChange} required />
            <label>Link:</label>
            <input type="text" name="link" value={formData.link} onChange={handleChange} required />
            <label>Notes:</label>
            <input type="text" name="notes" value={formData.notes} onChange={handleChange} required />
            <label>Revenue:</label>
            <input type="text" name="revenue" value={formData.revenue} onChange={handleChange} required />
            <button type="submit">Add Strand</button>
        </form>
    );
}
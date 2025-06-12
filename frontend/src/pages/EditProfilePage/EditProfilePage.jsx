import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../services/profileService';
import { useNavigate } from 'react-router-dom';

export default function EditProfilePage() {
    const [formData, setFormData] = useState({ stageNames: '', sites: '' });
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await getProfile();
                setFormData({
                    stageNames: data.stageNames?.join(', ') || '',
                    sites: data.sites?.join(', ') || ''
                });
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        }
        fetchProfile();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await updateProfile({
                stageNames: formData.stageNames.split(',').map(s => s.trim())
            });
            navigate('/profile');
        } catch (err) {
            console.error("Error saving profile", err);
        }
    }

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Stage Names (comma separated):
                <input type="text" name="stageNames" value={formData.stageNames} onChange={handleChange} />
            </label><br />
            <label>
                Sites (comma separated):
                <input type="text" name="sites" value={formData.sites} onChange={handleChange} />
            </label><br />
            <button type="submit">Save Profile</button>
        </form>
    );
}
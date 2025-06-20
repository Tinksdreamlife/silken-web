import { useState, useEffect } from 'react';
import { getProfile, createProfile, updateProfile } from '../../services/profileService';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/Layout/PageWrapper';

export default function EditProfilePage() {
    const [formData, setFormData] = useState({ stageNames: '', sites: '' });
    const navigate = useNavigate();
    const [isNewProfile, setIsNewProfile] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await getProfile();
                setFormData({
                    stageNames: data.stageNames?.join(', ') || '',
                    sites: data.sites?.join(', ') || ''
                });
                setIsNewProfile(false);
            } catch (err) {
                if (err.message === 'Profile not found') {
                    setIsNewProfile(true);
                } else {
                    console.error("Error fetching profile:", err);
                }
            }
        }
        fetchProfile();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const payload = {
                stageNames: formData.stageNames.split(',').map(s => s.trim()),
                sites: formData.sites.split(',').map(s => s.trim())
            };

            if (isNewProfile) {
                await createProfile(payload);
            } else {
                await updateProfile(payload);
            }

            navigate('/profile');
        } catch (err) {
            console.error("Error saving profile", err);
        }
    }

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <PageWrapper>
            <form onSubmit={handleSubmit}>
                <label>
                    Stage Names (comma separated):
                    <input type="text" name="stageNames" value={formData.stageNames} onChange={handleChange} />
                </label><br />
                <label>
                    Sites (comma separated):
                    <input type="text" name="sites" value={formData.sites} onChange={handleChange} />
                </label><br />
                <button className="btn small" type="submit">Save Profile</button>
            </form>
        </PageWrapper>
    );
}
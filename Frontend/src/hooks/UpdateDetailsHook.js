import {useState} from 'react'
import { useUserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'
const useUpdateDetails = () =>{
    const [loading,setloading] = useState(false);
    const {setUser} = useUserContext();
    const navigate = useNavigate();
    const updateDetails = async({ inputdetails,skills,experience,education,image: profileImage}) =>{
        setloading(true);
        const formData = new FormData();
        formData.append('inputdetails', JSON.stringify(inputdetails));
        formData.append('skills', JSON.stringify(skills));
        formData.append('experience', JSON.stringify(experience));
        formData.append('education', JSON.stringify(education));
        if (profileImage) {
            formData.append('file', profileImage);
        }

        try {
            const response = await fetch('http://localhost:3000/api/uploads/updateDetails', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to update details');
            }

            const data = await response.json();
            console.log('Details updated successfully:', data);
            setUser(data.user);
            navigate('/profile');
            toast.success("Profile updated successfully");
            return data;
        } catch (error) {
            console.error('Error updating details:', error);
            throw error;
        } finally {
            setloading(false);
        }

    }

    return {loading,updateDetails} ;
}

export default useUpdateDetails;
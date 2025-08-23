import { useState } from 'react';
import toast from 'react-hot-toast';
import { useUserContext } from '../Context/UserContext';
import {useNavigate} from "react-router-dom"
const SignUpHook = () => {
    const [loading, setLoading] = useState(false);
    const { setUser } = useUserContext();
    const navigate = useNavigate();

    const signup = async ({fullname ,email,password,confirmpassword}) => {
        const isValid = validateForm(fullname, email, password, confirmpassword);
        if (!isValid) {
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullname, email, password ,confirmpassword}),
                credentials: 'include'
            });
            const data = await response.json();
           
            console.log(data);
            if (data.user) {
                setUser(data.user);
                toast.success('Sign up successful');
                navigate("/home")
                
            } else {
                toast.error('Sign up failed');
                navigate("/signup")
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return {
        signup, loading,}
}

const validateForm = (fullname, email, password, confirmpassword) => {
    if (!fullname || !email || !password || !confirmpassword) {
        alert('Please fill in all fields');
        return false;
    }
    if (password !== confirmpassword) {
        alert('Passwords do not match');
        return false;
    }
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }
    return true;
}

export default SignUpHook;
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {useUserContext} from '../Context/UserContext';

const SigninHook = () => {
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const { setUser,user } = useUserContext();   
    const signin = async ({email,password}) => {
        const isValid = validateForm(email, password);
        if (!isValid) {
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                 credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to sign up');
            }

            const data = await response.json();
            if (data.user) {
                setUser(data.user); // <-- Set user in context
                toast.success('Sign in successful');
                console.log("UserContext data:",user)
                navigate('/home');
            } else {
                toast.error('Sign in failed');
            }
            console.log(data);
        } catch (error) {
            navigate('/signin');
            toast.error('Invalid email or password');
            console.error("error im signin",error);
        } finally {
            setLoading(false);
        }
    }
    return {
        signin, loading,}
}

function validateForm(email, password) {
    if (!email || !password) {
       toast.error('Please fill in all fields');
        return false;
    }
    if (password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return false;
    }
    return true;
}

export default SigninHook ;
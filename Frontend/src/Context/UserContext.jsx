import { createContext ,useContext} from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const userContext = createContext();

export const UserContextProvider = ({children}) =>{
        const [user, setUser] = useState(null);

        useEffect(() => {
            // Fetch user data from the API
            const fetchUser = async () => {
                try {
                    const response = await axios.get("http://localhost:3000/api/profile", {
                        withCredentials: true,
                    });
                    console.log(response.data);
                    setUser(response.data.user);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchUser();
        }, []);

        return (
            <userContext.Provider value={{ user, setUser }}>
                {children}
            </userContext.Provider>
        );
}

export const useUserContext = () => {
    const context = useContext(userContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
};
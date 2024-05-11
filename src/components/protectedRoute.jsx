import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";


function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => 
            setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const token = localStorage.getItem(REFRESH_TOKEN);
        try {
            const { data } = await api.post("/auth/refresh-token/", { refresh: token});
            localStorage.setItem(ACCESS_TOKEN, data.access);
            setIsAuthorized(true);
        }
        catch (error) {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
            await refreshToken();
        }
        setIsAuthorized(true);
    }
  
    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
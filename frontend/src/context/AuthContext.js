import React, { createContext, useState, useEffect } from "react";

//Auth
import jwt_decode from "jwt-decode";

//Routing
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({children}) => {

    const [ authTokens, setAuthTokens ] = useState(() => //authToken state
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );

    const [ user, setUser ] = useState(() =>   //User State
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );

    const [ loading, setLoading ] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        const backendHost = process.env.REACT_APP_MASTERRECIPE_BACKEND_HOST || 'http://localhost';
        const backendPort = process.env.REACT_APP_MASTERRECIPE_BACKEND_PORT || 8000;
        const backendEndpoint = process.env.REACT_APP_MASTERRECIPE_BACKEND_ENDPOINT || 'api';

        const response = await fetch(`${backendHost}:${backendPort}/${backendEndpoint}/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate("/");
        } else {
            alert("Something went wrong");
        }
    };


    const registerUser = async(username, password, password2) => {
        const backendHost = process.env.REACT_APP_MASTERRECIPE_BACKEND_HOST || 'http://localhost';
        const backendPort = process.env.REACT_APP_MASTERRECIPE_BACKEND_PORT || 8000;
        const backendEndpoint = process.env.REACT_APP_MASTERRECIPE_BACKEND_ENDPOINT || 'api';

        const response = await fetch (`${backendHost}:${backendPort}/${backendEndpoint}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                password2
            })
        });
        const data = await response.json();
        if (response.status === 201) {
            navigate("/login");
        } else {
            let errorMessage = "";
            for (const key of Object.keys(data)) {
                errorMessage += `[${key}]\n`;
                for (const error of data[key]) {
                    errorMessage += `${error}\n`;
                }
            }
            alert(errorMessage);
        }
    };


    const logoutUser= () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/");
    }

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    };


    useEffect(() => {
        if(authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);


    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

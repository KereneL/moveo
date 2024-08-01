import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("jamoveo-user")) || null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("jamoveo-user"));
        if (storedUser && JSON.stringify(storedUser) !== JSON.stringify(authUser)) {
            setAuthUser(storedUser);
        }
    }, [authUser]); // Only run on mount

    const logout = () => {
        setAuthUser(null);

        localStorage.removeItem("jamoveo-user");
    };

    return <AuthContext.Provider value={{ authUser, setAuthUser, logout }}>{children}</AuthContext.Provider>;
};
import { useState, useContext, createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext();

const initialState = {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    accessToken: ''
};

export const AuthProvider = ({
    children
}) => {

    const [user, setUser] = useLocalStorage('user', initialState);

    const login = (authData) => {
        setUser(authData);
    }

    const logout = () => {
        setUser(initialState);
    };


    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: Boolean(user.email) }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authState = useContext(AuthContext);
    return authState;
}
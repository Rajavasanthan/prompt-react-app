import { createContext, useState, useEffect, useContext } from 'react';
import config from '../../config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(token ? { token, name: localStorage.getItem('userName') } : null);
    const [isLoading, setIsLoading] = useState(false); // Used for initial token check if needed, or login loading

    useEffect(() => {
        // Ideally verify token validity here if API supports it
        // For now, if token exists, we assume logged in.
        if (token) {
            // You might want to decode token to get user info if it's a JWT
            // or fetch user profile
            setUser((prev) => ({ ...prev, token, name: localStorage.getItem('userName') }));
        } else {
            setUser(null);
        }
    }, [token]);

    const register = async (name, email, password) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${config.api}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            return { success: true, message: 'Registration successful! Please login.' };
        } catch (error) {
            console.error("Registration error:", error);
            return { success: false, message: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            // Assuming standard JSON request body
            const response = await fetch(`${config.api}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Adjust based on actual API response structure
            // Assuming { token: "..." } or { data: { token: "..." } }
            const receivedToken = data.token || data?.data?.token;

            if (!receivedToken) {
                throw new Error('No token received from server');
            }

            setToken(receivedToken);
            localStorage.setItem('token', receivedToken);
            localStorage.setItem('userName', data.name);
            setUser({ token: receivedToken, name: data.name });

            return { success: true };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

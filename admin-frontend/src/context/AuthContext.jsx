import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing login session on app load
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const storedAdmin = localStorage.getItem('adminData');
        
        if (token && storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        }
        setLoading(false);
    }, []);

    const login = (token, adminData) => {
        // Ensure only admins can access this dashboard
        if (adminData.role !== 'admin') {
            throw new Error("Access denied: Not an admin");
        }
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminData', JSON.stringify(adminData));
        setAdmin(adminData);
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        setAdmin(null);
    };

    if (loading) return <div>Loading...</div>; // Simple loader while checking token

    return (
        <AuthContext.Provider value={{ admin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
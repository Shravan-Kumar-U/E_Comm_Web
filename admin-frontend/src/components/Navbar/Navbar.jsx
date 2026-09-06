import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';

const Navbar = () => {
    const { logout, admin } = useContext(AuthContext);

    // Extract first letter for the avatar fallback
    const initial = admin?.name ? admin.name.charAt(0).toUpperCase() : 'A';

    return (
        <div className="navbar">
            <div className="navbar-brand">
                Seller Control Center
            </div>
            
            <div className="navbar-profile">
                <div className="profile-info">
                    <div className="profile-avatar">
                        {initial}
                    </div>
                    <span className="profile-name">{admin?.name || 'Administrator'}</span>
                </div>
                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
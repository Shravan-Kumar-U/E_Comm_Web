import { Link } from 'react-router-dom';
import './sidebar.css'; // Explicitly importing CSS

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">Admin Panel</div>
            <div className="sidebar-links">
                <Link to="/" className="sidebar-link">Dashboard</Link>
                <Link to="/products" className="sidebar-link">Manage Products</Link>
                <Link to="/add-product" className="sidebar-link">Add Product</Link>
            </div>
        </div>
    );
};

export default Sidebar;
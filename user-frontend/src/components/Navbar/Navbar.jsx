import { Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import './navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    FlipStore
                    <span>Explore Plus</span>
                </Link>
                
                <div className="search-bar">
                    <input type="text" className="search-input" placeholder="Search for products, brands and more" />
                    <button className="search-btn"><FiSearch /></button>
                </div>

                <div className="nav-actions">
                    <button className="login-btn">Login</button>
                    <Link to="/" className="nav-btn">Become a Seller</Link>
                    <Link to="/" className="nav-btn">
                        <FiShoppingCart style={{ fontSize: '18px' }} />
                        Cart
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
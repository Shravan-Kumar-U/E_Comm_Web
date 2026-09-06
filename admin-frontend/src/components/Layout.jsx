import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';
import './layout.css'; // Explicitly importing CSS

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="page-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
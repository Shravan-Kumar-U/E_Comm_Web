import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Products from '../pages/Products/Products';
import AddProduct from '../pages/AddProduct/AddProduct';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/Layout';
import EditProduct from '../pages/EditProduct/EditProduct';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route 
                path="/*" 
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/products" element={<Products />} />
                                <Route path="/add-product" element={<AddProduct />} />
                                <Route path="/edit-product/:id" element={<EditProduct />} />
                            </Routes>
                        </Layout>
                    </ProtectedRoute>
                } 
            />
        </Routes>
    );
};

export default AppRoutes;
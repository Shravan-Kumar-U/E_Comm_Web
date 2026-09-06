import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getAllProducts } from '../../api/productApi';
import { FiBox, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';

const Dashboard = () => {
    const { admin } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalProducts: 0, lowStock: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getAllProducts();
                const lowStockCount = data.products.filter(p => p.stock < 5).length;
                setStats({ totalProducts: data.count, lowStock: lowStockCount });
            } catch (error) {
                console.error("Failed to fetch dashboard stats");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div style={{ color: 'var(--text-muted)' }}>Loading metrics...</div>;

    return (
        <div>
            <h2 style={{ marginBottom: '32px', fontSize: '32px', fontWeight: '700', color: 'white' }}>
                Overview
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                
                {/* Total Products Card */}
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '24px', borderTop: '2px solid var(--primary)' }}>
                    <div style={{ padding: '20px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', borderRadius: '16px', fontSize: '28px', boxShadow: '0 0 20px var(--primary-glow) inset' }}>
                        <FiBox />
                    </div>
                    <div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Products</p>
                        <h3 style={{ fontSize: '36px', color: 'white', marginTop: '4px', fontWeight: '700' }}>{stats.totalProducts}</h3>
                    </div>
                </div>

                {/* Low Stock Card */}
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '24px', borderTop: '2px solid #ef4444' }}>
                    <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '16px', fontSize: '28px', boxShadow: '0 0 20px rgba(239, 68, 68, 0.2) inset' }}>
                        <FiAlertCircle />
                    </div>
                    <div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Low Stock Alerts</p>
                        <h3 style={{ fontSize: '36px', color: 'white', marginTop: '4px', fontWeight: '700' }}>{stats.lowStock}</h3>
                    </div>
                </div>

                {/* System Status Card */}
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '24px', borderTop: '2px solid #10b981' }}>
                    <div style={{ padding: '20px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '16px', fontSize: '28px', boxShadow: '0 0 20px rgba(16, 185, 129, 0.2) inset' }}>
                        <FiTrendingUp />
                    </div>
                    <div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>System Status</p>
                        <h3 style={{ fontSize: '28px', color: 'white', marginTop: '8px', fontWeight: '700' }}>Optimal</h3>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById } from '../../api/productApi';
import { formatCurrency } from '../../utils/formatters';
import { FiStar, FiTag, FiArrowLeft } from 'react-icons/fi';
import ProductGallery from '../../components/ProductGallery/ProductGallery';
import './productDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data.product);
            } catch (error) {
                console.error("Failed to fetch details");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="container" style={{ padding: '40px' }}>Loading...</div>;
    if (!product) return <div className="container" style={{ padding: '40px' }}>Product not found</div>;

    // Parse the advanced JSON description safely
    let parsedData = { brand: '', mrp: null, about: product.description, highlights: [] };
    try {
        const desc = JSON.parse(product.description);
        parsedData = { ...parsedData, ...desc };
    } catch (e) {
        // Fallback applied if description is just plain text
    }

    const discount = parsedData.mrp && parsedData.mrp > product.price 
        ? Math.round(((parsedData.mrp - product.price) / parsedData.mrp) * 100) 
        : 0;

    return (
        <div className="container">
            {/* Added Back Navigation */}
            <div className="back-navigation">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <FiArrowLeft /> Back to Products
                </button>
            </div>

            <div className="details-page">
                {/* Left Side: Image Gallery */}
                <ProductGallery images={product.images} />

                {/* Right Side: Product Details */}
                <div className="details-content">
                    
                    {/* Made Home a clickable link */}
                    <div className="breadcrumb">
                        <Link to="/" style={{ color: 'var(--primary)' }}>Home</Link> {'>'} {product.category} {'>'} {parsedData.brand}
                    </div>
                    
                    <h1 className="product-title">{product.name}</h1>
                    
                    <div className="rating-row">
                        <span className="rating-badge" style={{ background: 'var(--accent-green)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            4.5 <FiStar style={{ fontSize: '12px' }} />
                        </span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>
                            2,451 Ratings & 189 Reviews
                        </span>
                    </div>

                    <div className="price-section">
                        <div className="special-price-tag">Special price</div>
                        <div className="price-row">
                            <span className="final-price">{formatCurrency(product.price)}</span>
                            {parsedData.mrp && <span className="mrp-price">{formatCurrency(parsedData.mrp)}</span>}
                            {discount > 0 && <span className="discount-text">{discount}% off</span>}
                        </div>
                    </div>

                    <div className="offers-list">
                        <div className="offers-title">Available offers</div>
                        <div className="offer-item"><FiTag color="var(--accent-green)" /> <strong>Bank Offer</strong> 5% Cashback on Flipkart Axis Bank Card</div>
                        <div className="offer-item"><FiTag color="var(--accent-green)" /> <strong>Special Price</strong> Get extra {discount}% off (price inclusive of cashback/coupon)</div>
                    </div>

                    {parsedData.highlights && parsedData.highlights.length > 0 && (
                        <div className="highlights-section">
                            <div className="section-label">Highlights</div>
                            <ul className="highlights-list">
                                {parsedData.highlights.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="highlights-section">
                        <div className="section-label">Description</div>
                        <div className="description-text">
                            {parsedData.about}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
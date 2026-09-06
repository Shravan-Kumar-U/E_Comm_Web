import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
import { FiStar } from 'react-icons/fi';
import './productCard.css';

const ProductCard = ({ product }) => {
    // Parse the JSON description to get MRP for discount calculation
    let mrp = null;
    try {
        const desc = JSON.parse(product.description);
        mrp = desc.mrp ? Number(desc.mrp) : null;
    } catch (e) {
        // Fallback if not JSON
    }

    const discountPercentage = mrp && mrp > product.price 
        ? Math.round(((mrp - product.price) / mrp) * 100) 
        : 0;

    const imageUrl = product.images && product.images.length > 0 
        ? product.images[0].url 
        : 'https://via.placeholder.com/200?text=No+Image';

    return (
        <Link to={`/product/${product._id}`} className="product-card">
            <div className="card-image-wrapper">
                <img src={imageUrl} alt={product.name} className="card-image" />
            </div>
            <div className="card-content">
                <h3 className="card-title">{product.name}</h3>
                <div className="card-rating">
                    <span className="rating-badge">4.4 <FiStar style={{ fontSize: '10px' }} /></span>
                    <span className="rating-count">(1,234)</span>
                </div>
                <div className="card-pricing">
                    <span className="price-current">{formatCurrency(product.price)}</span>
                    {mrp && <span className="price-original">{formatCurrency(mrp)}</span>}
                    {discountPercentage > 0 && <span className="price-discount">{discountPercentage}% off</span>}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
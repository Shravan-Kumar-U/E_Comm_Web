import { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { FaBolt } from 'react-icons/fa'; // install react-icons/fa if needed, or use a similar icon
import './productGallery.css';

const ProductGallery = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const safeImages = images && images.length > 0 ? images : [{ url: 'https://via.placeholder.com/400' }];

    return (
        <div>
            <div className="gallery-container">
                <div className="thumbnail-list">
                    {safeImages.map((img, idx) => (
                        <div 
                            key={idx} 
                            className={`thumbnail ${idx === activeIndex ? 'active' : ''}`}
                            onMouseEnter={() => setActiveIndex(idx)}
                        >
                            <img src={img.url} alt={`Thumbnail ${idx}`} />
                        </div>
                    ))}
                </div>
                <div className="main-image-container">
                    <img src={safeImages[activeIndex].url} alt="Main product" />
                </div>
            </div>
            
            <div className="action-buttons">
                <button className="btn-action btn-cart"><FiShoppingCart /> Add to Cart</button>
                <button className="btn-action btn-buy"><FaBolt /> Buy Now</button>
            </div>
        </div>
    );
};

export default ProductGallery;
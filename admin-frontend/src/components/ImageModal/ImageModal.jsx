import { useState } from 'react';
import './imageModal.css';

const ImageModal = ({ images, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;

    const handleNext = () => {
        if (currentIndex < images.length - 1) setCurrentIndex(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>
                
                <div className="modal-image-container">
                    <img 
                        src={images[currentIndex].url} 
                        alt={`Product View ${currentIndex + 1}`} 
                        className="modal-image" 
                    />
                </div>

                <div className="modal-controls">
                    <button className="modal-btn" onClick={handlePrev} disabled={currentIndex === 0}>
                        Previous
                    </button>
                    <span className="modal-indicator">
                        {currentIndex + 1} / {images.length}
                    </span>
                    <button className="modal-btn" onClick={handleNext} disabled={currentIndex === images.length - 1}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
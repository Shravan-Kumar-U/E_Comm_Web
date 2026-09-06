import { useState, useEffect } from 'react';
import { FiUploadCloud, FiPlus, FiTrash2 } from 'react-icons/fi';
import './productForm.css';

const ProductForm = ({ initialData, onSubmit, loading, isEdit }) => {
    // Core Backend Fields
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    
    // Extended Flipkart-style Fields (Stored inside Description)
    const [brand, setBrand] = useState('');
    const [mrp, setMrp] = useState('');
    const [about, setAbout] = useState('');
    const [highlights, setHighlights] = useState(['']);
    
    // Media
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setPrice(initialData.price);
            setStock(initialData.stock);
            setCategory(initialData.category);

            // Attempt to parse the advanced data from the description field
            try {
                const parsedDesc = JSON.parse(initialData.description);
                setBrand(parsedDesc.brand || '');
                setMrp(parsedDesc.mrp || '');
                setAbout(parsedDesc.about || '');
                setHighlights(parsedDesc.highlights && parsedDesc.highlights.length > 0 ? parsedDesc.highlights : ['']);
            } catch (e) {
                // Fallback for older products created before this UI upgrade
                setAbout(initialData.description || '');
            }

            if (initialData.images) {
                setPreviews(initialData.images.map(img => img.url));
            }
        }
    }, [initialData]);

    const handleHighlightChange = (index, value) => {
        const newHighlights = [...highlights];
        newHighlights[index] = value;
        setHighlights(newHighlights);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        setPreviews(files.map(file => URL.createObjectURL(file)));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // Package the advanced UI fields into a single JSON string for the backend
        const structuredDescription = JSON.stringify({
            brand,
            mrp,
            about,
            highlights: highlights.filter(h => h.trim() !== '')
        });

        const formData = {
            name,
            price,
            stock,
            category,
            description: structuredDescription
        };

        onSubmit(formData, images);
    };

    return (
        <form onSubmit={handleFormSubmit} className="seller-hub-form">
            
            {/* SECTION 1: Media */}
            {!isEdit && (
                <div className="form-section">
                    <h3 className="form-section-title">Product Media</h3>
                    <div className="image-upload-wrapper">
                        <FiUploadCloud style={{ fontSize: '40px', color: '#2874f0', marginBottom: '12px' }} />
                        <h4 style={{ color: '#212121', marginBottom: '8px' }}>Drag & Drop images here</h4>
                        <p style={{ color: '#878787', fontSize: '13px' }}>Add up to 5 high-quality images. The first image will be the display cover.</p>
                        <input type="file" multiple accept="image/*" onChange={handleImageChange} className="file-input" required={!isEdit} />
                    </div>

                    {previews.length > 0 && (
                        <div className="preview-grid">
                            {previews.map((src, index) => (
                                <div key={index} className="preview-card">
                                    <span style={{ position: 'absolute', top: 4, left: 4, background: 'rgba(0,0,0,0.7)', color: 'white', padding: '2px 8px', fontSize: '11px', borderRadius: '4px' }}>
                                        {index === 0 ? 'Primary' : `Img ${index + 1}`}
                                    </span>
                                    <img src={src} alt="preview" className="preview-image" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* SECTION 2: Basic Info */}
            <div className="form-section">
                <h3 className="form-section-title">Basic Information</h3>
                <div className="form-grid">
                    <div className="form-group full-width">
                        <label>Product Name</label>
                        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g., SAMSUNG Galaxy S23 Ultra 5G" />
                    </div>
                    <div className="form-group">
                        <label>Brand</label>
                        <input type="text" className="form-control" value={brand} onChange={e => setBrand(e.target.value)} required placeholder="e.g., SAMSUNG" />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select className="form-control" value={category} onChange={e => setCategory(e.target.value)} required>
                            <option value="">Select Category</option>
                            <option value="Mobiles">Mobiles & Accessories</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Home">Home & Furniture</option>
                            <option value="Appliances">Appliances</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* SECTION 3: Pricing & Inventory */}
            <div className="form-section">
                <h3 className="form-section-title">Pricing & Inventory</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Selling Price (₹)</label>
                        <input type="number" min="0" className="form-control" value={price} onChange={e => setPrice(e.target.value)} required placeholder="Final price for customer" />
                    </div>
                    <div className="form-group">
                        <label>Maximum Retail Price (MRP ₹)</label>
                        <input type="number" min="0" className="form-control" value={mrp} onChange={e => setMrp(e.target.value)} required placeholder="Original price before discount" />
                    </div>
                    <div className="form-group full-width">
                        <label>Available Stock</label>
                        <input type="number" min="0" className="form-control" value={stock} onChange={e => setStock(e.target.value)} required placeholder="Quantity in warehouse" />
                    </div>
                </div>
            </div>

            {/* SECTION 4: Detailed Description */}
            <div className="form-section" style={{ marginBottom: '60px' }}>
                <h3 className="form-section-title">Product Details</h3>
                <div className="form-grid">
                    <div className="form-group full-width">
                        <label>Key Highlights (Bullet Points)</label>
                        <div className="dynamic-list">
                            {highlights.map((item, index) => (
                                <div key={index} className="dynamic-row">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={item} 
                                        onChange={e => handleHighlightChange(index, e.target.value)} 
                                        placeholder="e.g., 12 GB RAM | 256 GB ROM" 
                                    />
                                    {highlights.length > 1 && (
                                        <button type="button" onClick={() => setHighlights(highlights.filter((_, i) => i !== index))} style={{ padding: '12px', color: '#ef4444', background: '#ffebee', borderRadius: '4px' }}>
                                            <FiTrash2 />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" className="btn-add" onClick={() => setHighlights([...highlights, ''])}>
                                <FiPlus style={{ marginRight: '4px' }}/> Add Highlight
                            </button>
                        </div>
                    </div>
                    
                    <div className="form-group full-width" style={{ marginTop: '16px' }}>
                        <label>Detailed Description</label>
                        <textarea className="form-control" rows="5" value={about} onChange={e => setAbout(e.target.value)} required placeholder="Provide an in-depth overview of the product features..." />
                    </div>
                </div>
            </div>
            
            <div className="submit-bar">
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '12px 32px', fontSize: '15px' }}>
                    {loading ? 'Processing...' : (isEdit ? 'Save Changes' : 'Publish Product')}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
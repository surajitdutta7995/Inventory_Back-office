import { ArrowLeft } from 'lucide-react';
import { Button, StatusBadge } from '../UI/index.jsx';
import './Products.css';
import './ProductDetailsNew.css';

const ProductDetails = ({ product, onBack, onEdit }) => {
  if (!product) {
    return (
      <div>
        <a href="#" onClick={onBack} className="back-button">
          <ArrowLeft size={16} />
          Back to Products
        </a>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Product not found
        </div>
      </div>
    );
  }

  return (
    <div>
      <a href="#" onClick={onBack} className="back-button">
        <ArrowLeft size={16} />
        Back to Products
      </a>

      <div className="product-details-header">
        <div>
          <h1 className="page-title">Product Details</h1>
          <p className="page-description">
            Complete information about {product.name}
          </p>
        </div>
      </div>

      <div className="product-details-card">
        <div className="product-info-header">
          <div className="product-info-main">
            <h2 className="product-name">{product.name}</h2>
            <StatusBadge status={product.status || 'active'} />
          </div>
          <div className="product-specs-inline">
            Category: {product.category} • RAM: {product.ram} • Storage: {product.storage}
          </div>
        </div>

        <div className="product-metrics-grid">
          <div className="metric-item">
            <div className="metric-value">€{product.avgBuyingPrice?.toFixed(2) || '499.00'}</div>
            <div className="metric-label">Average Buying Price</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">€{product.avgSellingPrice?.toFixed(2) || '699.00'}</div>
            <div className="metric-label">Average Selling Price</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">{product.inStock || 28}</div>
            <div className="metric-label">In Stock</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">€{((product.avgSellingPrice || 699) * (product.inStock || 28)).toFixed(2)}</div>
            <div className="metric-label">Total Value</div>
          </div>
        </div>

        {product.variantFeatures && product.variantFeatures.length > 0 && (
          <div className="variant-features-section">
            <h3 className="features-title">Variant Features</h3>
            <div className="variant-features-grid">
              {product.variantFeatures.map((feature, index) => (
                <div key={index} className="variant-feature-item">
                  <span className="feature-name">{feature.name}</span>
                  <span className="feature-value">{feature.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="stock-history-card">
        <h3 className="stock-history-title">Stock History</h3>
        <div className="stock-history-content">
          <div className="no-history-icon">📊</div>
          <div className="no-history-text">No stock history available for this product.</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
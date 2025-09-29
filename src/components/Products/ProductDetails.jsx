import { ArrowLeft } from 'lucide-react';
import { Button, StatusBadge } from '../UI/index.jsx';
import './Products.css';

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
          <h1 className="page-title">{product.name}</h1>
          <p className="page-description">
            Complete information about {product.name}
          </p>
        </div>
        <Button onClick={() => onEdit(product)}>
          + Add Product
        </Button>
      </div>

      <div className="product-details-content">
        <div className="product-details-main">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', marginBottom: '2rem' }}>
            <StatusBadge status={product.status} />
            <div>
              <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>{product.name}</h2>
              <p style={{ color: '#6b7280', margin: 0 }}>
                Category: {product.category} • RAM: {product.ram} • Storage: {product.storage}
              </p>
            </div>
          </div>

          <div className="price-grid">
            <div className="price-card">
              <div className="price-value" style={{ color: '#10b981' }}>
                €{product.avgBuyingPrice.toFixed(2)}
              </div>
              <div className="price-label">Average Buying Price</div>
            </div>
            <div className="price-card">
              <div className="price-value" style={{ color: '#3b82f6' }}>
                €{product.avgSellingPrice.toFixed(2)}
              </div>
              <div className="price-label">Average Selling Price</div>
            </div>
            <div className="price-card">
              <div className="price-value" style={{ color: '#f59e0b' }}>
                {product.inStock}
              </div>
              <div className="price-label">In Stock</div>
            </div>
            <div className="price-card">
              <div className="price-value" style={{ color: '#ef4444' }}>
                €{product.totalValue?.toFixed(2) || (product.avgSellingPrice * product.inStock).toFixed(2)}
              </div>
              <div className="price-label">Total Value</div>
            </div>
          </div>

          {product.variantFeatures && product.variantFeatures.length > 0 && (
            <div className="variant-features">
              <h3 className="features-title">Variant Features</h3>
              <div className="features-list">
                {product.variantFeatures.map((feature, index) => (
                  <span key={index} className="feature-tag">
                    {feature.name}: {feature.value}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="product-details-sidebar">
          <div className="stock-history">
            <h3 className="history-title">Stock History</h3>
            <div className="no-history">
              No stock history available for this product.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
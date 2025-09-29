import { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Button, StatusBadge } from '../UI/index.jsx';
import './Products.css';

const ProductsList = ({ products, onEdit, onDelete, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="products-header">
        <div className="search-container">
          <div style={{ position: 'relative' }}>
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="form-input search-input"
              placeholder="Search products by name, ID or category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="products-actions">
          <Button variant="secondary" className="filters-button">
            <Filter size={18} />
            Filters
          </Button>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>AVG. BUYING PRICE</th>
              <th>AVG. SELLING PRICE</th>
              <th>IN STOCK</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-info">
                    <img 
                      src={product.thumbnailImage} 
                      alt={product.name}
                      className="product-image"
                    />
                    <div>
                      <div className="product-name">{product.name}</div>
                      <div className="product-brand">{product.brandName}</div>
                    </div>
                  </div>
                </td>
                <td className="product-category">{product.category}</td>
                <td className="product-price">€{product.avgBuyingPrice.toFixed(2)}</td>
                <td className="product-price">€{product.avgSellingPrice.toFixed(2)}</td>
                <td className="product-stock">{product.inStock}</td>
                <td><StatusBadge status={product.status} /></td>
                <td>
                  <div className="product-actions">
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      onClick={() => onView(product)}
                      title="View"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      onClick={() => onEdit(product)}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="danger" 
                      size="icon" 
                      onClick={() => onDelete(product.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          <div className="pagination-controls">
            <Button 
              variant="secondary" 
              size="sm" 
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
            >
              Previous
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
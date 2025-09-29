import { useProducts } from '../../hooks/useProducts';
import Layout from '../Layout/index.jsx';
import StatisticsCards from './StatisticsCards.jsx';
import ProductsList from './ProductsList.jsx';
import ProductForm from './ProductForm.jsx';
import ProductDetails from './ProductDetails.jsx';
import './Products.css';

const ProductsPage = () => {
  const {
    products,
    currentView,
    selectedProduct,
    setCurrentView,
    setSelectedProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getStatistics
  } = useProducts();

  const statistics = getStatistics();

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setCurrentView('add');
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('edit');
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('details');
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const handleFormSubmit = (productData) => {
    if (selectedProduct) {
      updateProduct(selectedProduct.id, productData);
    } else {
      addProduct(productData);
    }
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedProduct(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'add':
        return (
          <ProductForm
            isOpen={true}
            onClose={handleBackToList}
            onSubmit={handleFormSubmit}
            title="Add New Product"
          />
        );
      
      case 'edit':
        return (
          <ProductForm
            isOpen={true}
            onClose={handleBackToList}
            onSubmit={handleFormSubmit}
            initialData={selectedProduct}
            title="Edit Product"
          />
        );
      
      case 'details':
        return (
          <ProductDetails
            product={selectedProduct}
            onBack={handleBackToList}
            onEdit={handleEditProduct}
          />
        );
      
      default:
        return (
          <>
            <StatisticsCards statistics={statistics} />
            <ProductsList
              products={products}
              onAdd={handleAddProduct}
              onEdit={handleEditProduct}
              onView={handleViewProduct}
              onDelete={handleDeleteProduct}
            />
          </>
        );
    }
  };

  const getPageTitle = () => {
    switch (currentView) {
      case 'details':
        return null; // ProductDetails handles its own title
      default:
        return 'Products';
    }
  };

  const getPageDescription = () => {
    switch (currentView) {
      case 'details':
        return null; // ProductDetails handles its own description
      default:
        return 'Manage your product catalog and inventory levels.';
    }
  };

  return (
    <Layout 
      pageTitle={getPageTitle()} 
      pageDescription={getPageDescription()}
    >
      {renderContent()}
    </Layout>
  );
};

export default ProductsPage;
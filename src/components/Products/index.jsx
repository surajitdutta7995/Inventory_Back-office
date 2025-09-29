import { useProducts } from '../../hooks/useProducts';
import Layout from '../Layout';
import StatisticsCards from './StatisticsCards';
import ProductsList from './ProductsList';
import ProductForm from './ProductForm';
import ProductDetails from './ProductDetails';
import { Button } from '../UI/index.jsx';
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
          <>
            <StatisticsCards statistics={statistics} />
            <ProductsList
              products={products}
              onEdit={handleEditProduct}
              onView={handleViewProduct}
              onDelete={handleDeleteProduct}
            />
            <ProductForm
              isOpen={true}
              onClose={handleBackToList}
              onSubmit={handleFormSubmit}
              title="Add New Product"
            />
          </>
        );
      
      case 'edit':
        return (
          <>
            <StatisticsCards statistics={statistics} />
            <ProductsList
              products={products}
              onEdit={handleEditProduct}
              onView={handleViewProduct}
              onDelete={handleDeleteProduct}
            />
            <ProductForm
              isOpen={true}
              onClose={handleBackToList}
              onSubmit={handleFormSubmit}
              initialData={selectedProduct}
              title="Edit Product"
            />
          </>
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
              onEdit={handleEditProduct}
              onView={handleViewProduct}
              onDelete={handleDeleteProduct}
            />
          </>
        );
    }
  };

  const getPageActions = () => {
    switch (currentView) {
      case 'details':
        return null;
      default:
        return (
          <Button onClick={handleAddProduct}>
            + Add Product
          </Button>
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
      pageActions={getPageActions()}
    >
      {renderContent()}
    </Layout>
  );
};

export default ProductsPage;
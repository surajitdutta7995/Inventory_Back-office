import { useState, useCallback } from 'react';
import { mockProducts } from '../data/mockData';

export const useProducts = () => {
  const [products, setProducts] = useState(mockProducts);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'edit', 'details'
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addProduct = useCallback((productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(), // Simple ID generation
      status: productData.inStock > 20 ? 'active' : productData.inStock > 10 ? 'warning' : 'critical'
    };
    setProducts(prev => [...prev, newProduct]);
    setCurrentView('list');
  }, []);

  const updateProduct = useCallback((id, productData) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { 
            ...product, 
            ...productData,
            status: productData.inStock > 20 ? 'active' : productData.inStock > 10 ? 'warning' : 'critical'
          }
        : product
    ));
    setCurrentView('list');
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  }, []);

  const getProductById = useCallback((id) => {
    return products.find(product => product.id === parseInt(id));
  }, [products]);

  const getStatistics = useCallback(() => {
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, product) => sum + product.inStock, 0);
    const totalInventoryValue = products.reduce((sum, product) => sum + (product.avgSellingPrice * product.inStock), 0);
    const lowStockCount = products.filter(product => product.inStock < 10).length;

    return {
      totalProducts,
      totalStock,
      totalInventoryValue,
      lowStockCount
    };
  }, [products]);

  return {
    products,
    currentView,
    selectedProduct,
    setCurrentView,
    setSelectedProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getStatistics
  };
};
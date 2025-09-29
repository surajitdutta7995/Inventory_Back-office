// Mock data for products
export const mockProducts = [
  {
    id: 1,
    name: "Apple iPhone 16 Pro",
    category: "Mobile",
    brandName: "Apple",
    modelName: "iPhone 16 Pro",
    ram: "8GB",
    storage: "256GB",
    avgBuyingPrice: 499.00,
    avgSellingPrice: 699.00,
    inStock: 28,
    status: "active",
    isNewDevice: true,
    isUsedDevice: false,
    thumbnailImage: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop&crop=center",
    variantFeatures: [
      { name: "Color", value: "Black" },
      { name: "Storage", value: "256GB" }
    ],
    totalValue: 8550.00
  },
  {
    id: 2,
    name: "Apple iPhone 15 Pro",
    category: "Mobile",
    brandName: "Apple", 
    modelName: "iPhone 15 Pro",
    ram: "8GB",
    storage: "128GB",
    avgBuyingPrice: 449.00,
    avgSellingPrice: 649.00,
    inStock: 25,
    status: "warning",
    isNewDevice: true,
    isUsedDevice: false,
    thumbnailImage: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop&crop=center",
    variantFeatures: [
      { name: "Color", value: "Blue" },
      { name: "Storage", value: "128GB" }
    ],
    totalValue: 7200.00
  },
  {
    id: 3,
    name: "Apple iPhone 14 Pro Max",
    category: "Mobile",
    brandName: "Apple",
    modelName: "iPhone 14 Pro Max", 
    ram: "6GB",
    storage: "512GB",
    avgBuyingPrice: 399.00,
    avgSellingPrice: 599.00,
    inStock: 30,
    status: "active",
    isNewDevice: true,
    isUsedDevice: false,
    thumbnailImage: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop&crop=center",
    variantFeatures: [
      { name: "Color", value: "Gold" },
      { name: "Storage", value: "512GB" }
    ],
    totalValue: 9600.00
  },
  {
    id: 4,
    name: "Apple iPhone 14 Pro",
    category: "Mobile",
    brandName: "Apple",
    modelName: "iPhone 14 Pro",
    ram: "6GB", 
    storage: "256GB",
    avgBuyingPrice: 349.00,
    avgSellingPrice: 549.00,
    inStock: 15,
    status: "warning",
    isNewDevice: false,
    isUsedDevice: true,
    thumbnailImage: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop&crop=center",
    variantFeatures: [
      { name: "Color", value: "Purple" },
      { name: "Storage", value: "256GB" }
    ],
    totalValue: 4200.00
  },
  {
    id: 5,
    name: "Apple iPhone 14 Pro",
    category: "Mobile",
    brandName: "Apple",
    modelName: "iPhone 14 Pro",
    ram: "6GB",
    storage: "128GB", 
    avgBuyingPrice: 299.00,
    avgSellingPrice: 499.00,
    inStock: 8,
    status: "critical",
    isNewDevice: false,
    isUsedDevice: true,
    thumbnailImage: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop&crop=center",
    variantFeatures: [
      { name: "Color", value: "Silver" },
      { name: "Storage", value: "128GB" }
    ],
    totalValue: 2400.00
  }
];

export const categories = [
  "Mobile",
  "Laptop", 
  "Tablet",
  "Accessories",
  "Audio",
  "Gaming"
];

export const brands = [
  "Apple",
  "Samsung", 
  "Google",
  "OnePlus",
  "Xiaomi",
  "Sony"
];
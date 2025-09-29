import { useState } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import { 
  Modal, 
  ModalBody, 
  ModalFooter, 
  Button, 
  FormGroup, 
  FormLabel, 
  Input, 
  Select 
} from '../UI/index.jsx';
import { categories, brands } from '../../data/mockData';
import './Products.css';

const ProductForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null, 
  title = 'Add New Product' 
}) => {
  const [formData, setFormData] = useState({
    category: initialData?.category || '',
    brandName: initialData?.brandName || '',
    modelName: initialData?.modelName || '',
    ram: initialData?.ram || '',
    storage: initialData?.storage || '',
    isNewDevice: initialData?.isNewDevice || false,
    isUsedDevice: initialData?.isUsedDevice || false,
    avgBuyingPrice: initialData?.avgBuyingPrice || '',
    avgSellingPrice: initialData?.avgSellingPrice || '',
    inStock: initialData?.inStock || '',
    thumbnailImage: initialData?.thumbnailImage || '',
    variantFeatures: initialData?.variantFeatures || [{ name: '', value: '' }]
  });

  const [imagePreview, setImagePreview] = useState(initialData?.thumbnailImage || '');

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        setImagePreview(result);
        handleChange('thumbnailImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addVariantFeature = () => {
    const newFeature = { name: '', value: '' };
    handleChange('variantFeatures', [...formData.variantFeatures, newFeature]);
  };

  const updateVariantFeature = (index, field, value) => {
    const updatedFeatures = formData.variantFeatures.map((feature, i) => 
      i === index ? { ...feature, [field]: value } : feature
    );
    handleChange('variantFeatures', updatedFeatures);
  };

  const removeVariantFeature = (index) => {
    const updatedFeatures = formData.variantFeatures.filter((_, i) => i !== index);
    handleChange('variantFeatures', updatedFeatures);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      name: `${formData.brandName} ${formData.modelName}`,
      avgBuyingPrice: parseFloat(formData.avgBuyingPrice),
      avgSellingPrice: parseFloat(formData.avgSellingPrice),
      inStock: parseInt(formData.inStock)
    };
    onSubmit(processedData);
  };

  const isEdit = !!initialData;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <div className="form-row">
            <FormGroup>
              <FormLabel required>Category</FormLabel>
              <Select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                options={categories}
                placeholder="Select Category"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Thumbnail Image</FormLabel>
              <div className={`image-upload ${imagePreview ? 'has-image' : ''}`}>
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Product thumbnail" 
                    className="uploaded-image"
                  />
                ) : (
                  <div className="upload-placeholder">
                    <Upload size={24} />
                    <div className="upload-text">
                      Drag image here, or click to browse
                    </div>
                    <div className="upload-hint">
                      The image should be JPG, PNG, WEBP format
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="image-upload-input"
                />
              </div>
            </FormGroup>
          </div>

          <div className="form-row">
            <FormGroup>
              <FormLabel required>Brand Name</FormLabel>
              <Select
                value={formData.brandName}
                onChange={(e) => handleChange('brandName', e.target.value)}
                options={brands}
                placeholder="e.g. Apple"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Suffix</FormLabel>
              <Input
                placeholder="e.g. Pro Max"
                value={formData.suffix || ''}
                onChange={(e) => handleChange('suffix', e.target.value)}
              />
            </FormGroup>
          </div>

          <FormGroup>
            <FormLabel required>Model Name</FormLabel>
            <Input
              placeholder="e.g. iPhone 16 Pro"
              value={formData.modelName}
              onChange={(e) => handleChange('modelName', e.target.value)}
              required
            />
          </FormGroup>

          <div className="form-row">
            <FormGroup>
              <FormLabel>RAM</FormLabel>
              <Input
                placeholder="e.g. 8GB"
                value={formData.ram}
                onChange={(e) => handleChange('ram', e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Storage</FormLabel>
              <Input
                placeholder="e.g. 256GB"
                value={formData.storage}
                onChange={(e) => handleChange('storage', e.target.value)}
              />
            </FormGroup>
          </div>

          <div className="device-type-section">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="newDevice"
                checked={formData.isNewDevice}
                onChange={(e) => handleChange('isNewDevice', e.target.checked)}
              />
              <label htmlFor="newDevice">New Device</label>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="usedDevice"
                checked={formData.isUsedDevice}
                onChange={(e) => handleChange('isUsedDevice', e.target.checked)}
              />
              <label htmlFor="usedDevice">Used Device</label>
            </div>
          </div>
          {/* 
          <div className="form-row">
            <FormGroup>
              <FormLabel>Average Buying Price</FormLabel>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.avgBuyingPrice}
                onChange={(e) => handleChange('avgBuyingPrice', e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Average Selling Price</FormLabel>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.avgSellingPrice}
                onChange={(e) => handleChange('avgSellingPrice', e.target.value)}
              />
            </FormGroup>
          </div>

          <FormGroup>
            <FormLabel>In Stock</FormLabel>
            <Input
              type="number"
              placeholder="0"
              value={formData.inStock}
              onChange={(e) => handleChange('inStock', e.target.value)}
            />
          </FormGroup>
           */}


          <div className="variant-section">
            <div className="variant-header">
              <h4 className="variant-title">Variant Features</h4>
              <Button 
                type="button" 
                variant="secondary" 
                size="sm" 
                onClick={addVariantFeature}
              >
                <Plus size={16} />
                Add Variant
              </Button>
            </div>

            <div className="variant-list">
              {formData.variantFeatures.map((feature, index) => (
                <div key={index} className="variant-item">
                  <Input
                    placeholder="Feature name (e.g. Color)"
                    value={feature.name}
                    onChange={(e) => updateVariantFeature(index, 'name', e.target.value)}
                  />
                  <Input
                    placeholder="Feature value (e.g. Black)"
                    value={feature.value}
                    onChange={(e) => updateVariantFeature(index, 'value', e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => removeVariantFeature(index)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {isEdit ? 'Update Product' : 'Add Product'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default ProductForm;
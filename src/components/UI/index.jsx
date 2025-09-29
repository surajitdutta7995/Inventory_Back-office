import { useEffect } from 'react';
import './UI.css';
import './ModalFix.css';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'default', 
  onClick, 
  disabled = false, 
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'default' ? `btn-${size}` : '';
  
  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`card ${className}`.trim()}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={`card-header ${className}`.trim()}>
      {children}
    </div>
  );
};

export const CardBody = ({ children, className = '' }) => {
  return (
    <div className={`card-body ${className}`.trim()}>
      {children}
    </div>
  );
};

export const Modal = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={handleContentClick}>
        {title && (
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <Button variant="secondary" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export const ModalBody = ({ children }) => {
  return <div className="modal-body">{children}</div>;
};

export const ModalFooter = ({ children }) => {
  return <div className="modal-footer">{children}</div>;
};

export const FormGroup = ({ children, className = '' }) => {
  return (
    <div className={`form-group ${className}`.trim()}>
      {children}
    </div>
  );
};

export const FormLabel = ({ children, required = false, htmlFor }) => {
  return (
    <label 
      className={`form-label ${required ? 'required' : ''}`.trim()}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false,
  className = '',
  ...props 
}) => {
  return (
    <input
      type={type}
      className={`form-input ${className}`.trim()}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      {...props}
    />
  );
};

export const Select = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select...',
  className = '',
  ...props 
}) => {
  return (
    <select
      className={`form-select ${className}`.trim()}
      value={value}
      onChange={onChange}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value || option} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
  );
};

export const StatusBadge = ({ status }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'warning':
        return 'status-warning';
      case 'critical':
        return 'status-critical';
      default:
        return 'status-active';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      {status}
    </span>
  );
};
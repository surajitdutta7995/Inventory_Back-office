import { useState } from 'react';
import { 
  Menu, 
  X, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  Bell,
  LogOut,
  CreditCard,
  TrendingUp,
  Archive,
  Truck,
  DollarSign
} from 'lucide-react';
import './Layout.css';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', active: false },
    { id: 'pos', icon: CreditCard, label: 'POS', active: false },
    { id: 'products', icon: Package, label: 'Products', active: true },
    { id: 'sales', icon: TrendingUp, label: 'Sales', active: false },
    { id: 'inventory', icon: Archive, label: 'Inventory', active: false },
    { id: 'customers', icon: Users, label: 'Customers', active: false },
    { id: 'vendors', icon: Truck, label: 'Vendors', active: false },
    { id: 'finance', icon: DollarSign, label: 'Finance', active: false },
    { id: 'settings', icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay show" onClick={onClose} />}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-header-content">
            <Package size={24} color="#3b82f6" />
            <span className="logo">Mr Phone</span>
          </div>
          <button className="sidebar-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="sidebar-user">
          <div className="user-avatar">FK</div>
          <div className="user-info">
            <div className="user-name">Faiz Khan</div>
            <div className="user-role">Admin</div>
          </div>
        </div>
        <nav className="nav-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className={`nav-item ${item.active ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <div className="nav-item logout-item">
            <LogOut size={20} />
            <span>Sign Out</span>
          </div>
        </div>
      </div>
    </>
  );
};

const Header = ({ onMenuToggle, currentPage = 'Products' }) => {
  const navTabs = [
    { id: 'product', label: 'Product', active: true },
    { id: 'brands', label: 'Brands', active: false },
    { id: 'category', label: 'Category', active: false },
    { id: 'batch', label: 'Batch', active: false },
    { id: 'purchases', label: 'Purchases', active: false },
    { id: 'lowstock', label: 'Low Stock', active: false },
  ];

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuToggle}>
          <Menu size={20} />
        </button>
        <nav className="header-nav">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab ${tab.active ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="header-right">
        <button className="btn btn-icon btn-secondary">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
};

const Layout = ({ children, pageTitle, pageDescription, pageActions }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onMenuToggle={toggleSidebar} />
        <main className="content">
          {(pageTitle || pageDescription || pageActions) && (
            <div className="page-header">
              <div className="page-header-content">
                <div className="page-header-text">
                  {pageTitle && <h1 className="page-title">{pageTitle}</h1>}
                  {pageDescription && <p className="page-description">{pageDescription}</p>}
                </div>
                {pageActions && (
                  <div className="page-header-actions">
                    {pageActions}
                  </div>
                )}
              </div>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
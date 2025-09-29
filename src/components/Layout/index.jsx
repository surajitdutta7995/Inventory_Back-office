import { useState } from 'react';
import { 
  Menu, 
  X, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  Bell
} from 'lucide-react';
import './Layout.css';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', active: false },
    { id: 'products', icon: Package, label: 'Products', active: true },
    { id: 'orders', icon: ShoppingCart, label: 'Orders', active: false },
    { id: 'customers', icon: Users, label: 'Customers', active: false },
    { id: 'settings', icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay show" onClick={onClose} />}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Package size={24} color="#3b82f6" />
          <span className="logo">Mr Phone</span>
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
      </div>
    </>
  );
};

const Header = ({ onMenuToggle, currentPage = 'Products' }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuToggle}>
          <Menu size={20} />
        </button>
        <div className="breadcrumb">
          <span>Product Management</span>
          <span className="breadcrumb-separator">/</span>
          <span>{currentPage}</span>
        </div>
      </div>
      <div className="header-right">
        <button className="btn btn-icon btn-secondary">
          <Bell size={18} />
        </button>
        <div className="user-profile">
          <div className="user-avatar">FK</div>
          <div className="user-info">
            <div className="user-name">Faiz Khan</div>
            <div className="user-role">Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Layout = ({ children, pageTitle, pageDescription }) => {
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
          {(pageTitle || pageDescription) && (
            <div className="page-header">
              {pageTitle && <h1 className="page-title">{pageTitle}</h1>}
              {pageDescription && <p className="page-description">{pageDescription}</p>}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
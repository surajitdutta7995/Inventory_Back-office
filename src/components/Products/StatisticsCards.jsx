import { Package, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import './Products.css';

const StatisticsCards = ({ statistics }) => {
  const stats = [
    {
      label: 'Total Products',
      value: statistics.totalProducts,
      icon: Package,
      color: 'primary'
    },
    {
      label: 'Total Stock',
      value: statistics.totalStock,
      icon: TrendingUp, 
      color: 'success'
    },
    {
      label: 'Total Inventory Value',
      value: `€${statistics.totalInventoryValue.toFixed(2)}`,
      icon: DollarSign,
      color: 'warning'
    },
    {
      label: 'Low Stock Count',
      value: statistics.lowStockCount,
      icon: AlertTriangle,
      color: 'danger'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">
              <Icon size={24} />
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StatisticsCards;
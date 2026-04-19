import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, CheckCircle, Dumbbell, BarChart3 } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: '主页' },
    { path: '/todos', icon: CheckCircle, label: '待办' },
    { path: '/workouts', icon: Dumbbell, label: '训练' },
    { path: '/stats', icon: BarChart3, label: '统计' },
  ];

  return (
    <div className="fixed bottom-6 left-6 right-6 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl">
      <div className="flex justify-around items-center py-4 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 px-6 py-3 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50 shadow-md' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;

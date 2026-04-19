import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const AddWorkoutModal = ({ onClose, onAdd, customCategories = [], onAddCategory }) => {
  const [workoutName, setWorkoutName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  const defaultCategories = [
    '肩腿日',
    '胸背日',
    '手臂日',
    '核心日',
    '有氧日',
    '全身训练',
    '未分类'
  ];

  const allCategories = [...defaultCategories, ...customCategories];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workoutName.trim()) {
      const category = showNewCategoryInput ? newCategory.trim() : selectedCategory;
      onAdd(workoutName.trim(), category || '未分类');
      
      // 如果是新分类，通知父组件
      if (showNewCategoryInput && newCategory.trim() && !allCategories.includes(newCategory.trim())) {
        onAddCategory(newCategory.trim());
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-800">添加训练动作</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder="输入动作名称"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 mb-4"
            autoFocus
          />
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              选择分类
            </label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {allCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowNewCategoryInput(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category && !showNewCategoryInput
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {!showNewCategoryInput ? (
              <button
                type="button"
                onClick={() => setShowNewCategoryInput(true)}
                className="flex items-center space-x-2 text-sm text-blue-500 hover:text-blue-600"
              >
                <Plus className="w-4 h-4" />
                <span>创建新分类</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="输入新分类名称"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowNewCategoryInput(false);
                    setNewCategory('');
                  }}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700"
                >
                  取消
                </button>
              </div>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!workoutName.trim() || (!selectedCategory && !newCategory.trim())}
              className={`flex-1 px-4 py-3 rounded-xl transition-colors ${
                workoutName.trim() && (selectedCategory || newCategory.trim())
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              添加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorkoutModal;

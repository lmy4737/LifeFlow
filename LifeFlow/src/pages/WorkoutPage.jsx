import { useWorkouts } from '../hooks/useWorkouts.js';
import WorkoutCard from '../components/WorkoutCard.jsx';
import { Trash2, ArrowLeft, Plus, X, Filter } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const WorkoutPage = () => {
  const navigate = useNavigate();
  const { workouts, addWorkout, addSet, updateSet, deleteSet, deleteWorkout } = useWorkouts();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [customCategories, setCustomCategories] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // 在初始化时直接从本地存储获取主题设置，避免闪烁
    const savedTheme = localStorage.getItem('lifeflow_theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [workoutName, setWorkoutName] = useState('');
  const [selectedCategoryModal, setSelectedCategoryModal] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  // 应用主题类到 documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 从本地存储加载自定义分类
  useEffect(() => {
    const storedCategories = localStorage.getItem('lifeflow_custom_categories');
    if (storedCategories) {
      setCustomCategories(JSON.parse(storedCategories));
    }
  }, []);

  // 保存自定义分类到本地存储
  const saveCustomCategories = (categories) => {
    localStorage.setItem('lifeflow_custom_categories', JSON.stringify(categories));
    setCustomCategories(categories);
  };

  // 删除分类
  const deleteCategory = (categoryToDelete) => {
    // 过滤掉要删除的分类
    const updatedCategories = customCategories.filter(cat => cat !== categoryToDelete);
    saveCustomCategories(updatedCategories);
    
    // 如果当前选中的分类是要删除的分类，重置选择
    if (selectedCategory === categoryToDelete) {
      setSelectedCategory('全部');
    }
  };

  const handleAddWorkout = (name, category) => {
    addWorkout(name, category);
    setShowAddModal(false);
    setWorkoutName('');
    setSelectedCategoryModal('');
    setNewCategory('');
    setShowNewCategoryInput(false);
  };

  const handleDeleteWorkout = (workoutId) => {
    deleteWorkout(workoutId);
  };

  // 获取所有分类（包括自定义分类）
  const allCategories = ['全部', ...new Set([
    ...workouts.map(w => w.category),
    ...customCategories
  ])];

  // 根据选择的分类筛选训练动作
  const filteredWorkouts = selectedCategory === '全部' 
    ? workouts 
    : workouts.filter(w => w.category === selectedCategory);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workoutName.trim()) {
      const category = showNewCategoryInput ? newCategory.trim() : selectedCategoryModal;
      handleAddWorkout(workoutName.trim(), category || '未分类');
      
      // 如果是新分类，通知父组件
      if (showNewCategoryInput && newCategory.trim() && !allCategories.includes(newCategory.trim())) {
        saveCustomCategories([...customCategories, newCategory.trim()]);
      }
    }
  };

  // 主题相关的样式类
  const bgClass = isDarkMode 
    ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
    : 'bg-gradient-to-br from-gray-50 to-white';
  
  const cardClass = isDarkMode 
    ? 'bg-gray-800/80 border-gray-700/50' 
    : 'bg-white/80 border-white/50';
  
  const textPrimaryClass = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const textSecondaryClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const textTertiaryClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`min-h-screen pb-24 transition-all duration-300 ease-in-out ${bgClass}`}>
      {/* 顶部导航 */}
      <div className="flex items-center justify-between p-6 pt-12">
        <button 
          onClick={() => navigate('/')}
          className={`p-2 rounded-xl hover:bg-gray-100 transition-colors ${
            isDarkMode ? 'hover:bg-gray-800' : ''
          }`}
        >
          <ArrowLeft className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>
        <h1 className={`text-xl font-medium ${textPrimaryClass}`}>今日训练记录</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="p-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* 分类筛选 */}
      <div className="px-6 mb-6">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <Filter className={`w-5 h-5 flex-shrink-0 ${textSecondaryClass}`} />
          {allCategories.map((category) => (
            <div key={category} className="relative flex items-center">
              <button
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : isDarkMode 
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
              {/* 删除按钮 - 只对自定义分类显示 */}
              {customCategories.includes(category) && (
                <button
                  onClick={() => deleteCategory(category)}
                  className={`absolute -top-1 -right-1 p-1 rounded-full ${
                    isDarkMode 
                      ? 'bg-gray-700 text-red-400 hover:bg-gray-600' 
                      : 'bg-white text-red-500 hover:bg-red-50'
                  } shadow-md`}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 训练记录列表 */}
      <div className="px-6">
        <div className="space-y-4">
          {filteredWorkouts.map((workout) => (
            <div key={workout.id} className={`rounded-2xl p-4 shadow-sm border transition-all duration-300 ease-in-out ${cardClass}`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className={`text-lg font-medium ${textPrimaryClass}`}>{workout.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                    isDarkMode 
                      ? 'bg-blue-900/30 text-blue-300' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {workout.category}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteWorkout(workout.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-red-900/30 hover:text-red-400' 
                      : 'hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2">
                {workout.sets.map((set) => (
                  <div key={set.id} className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ease-in-out ${
                    isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}>
                    <div className={`w-8 text-center text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {set.setNumber}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={set.weight}
                          onChange={(e) => updateSet(workout.id, set.id, { weight: parseFloat(e.target.value) || 0 })}
                          className={`w-16 px-2 py-1 text-sm border rounded-lg focus:outline-none focus:border-blue-400 transition-all duration-300 ease-in-out ${
                            isDarkMode 
                              ? 'bg-gray-800 border-gray-600 text-gray-200' 
                              : 'border-gray-200'
                          }`}
                          placeholder="重量"
                        />
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>kg</span>
                        <input
                          type="number"
                          value={set.reps}
                          onChange={(e) => updateSet(workout.id, set.id, { reps: parseInt(e.target.value) || 0 })}
                          className={`w-16 px-2 py-1 text-sm border rounded-lg focus:outline-none focus:border-blue-400 transition-all duration-300 ease-in-out ${
                            isDarkMode 
                              ? 'bg-gray-800 border-gray-600 text-gray-200' 
                              : 'border-gray-200'
                          }`}
                          placeholder="次数"
                        />
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>次</span>
                      </div>
                      <input
                        type="text"
                        value={set.note || ''}
                        onChange={(e) => updateSet(workout.id, set.id, { note: e.target.value })}
                        placeholder="备注 (如: RPE 8)"
                        className={`w-full mt-2 px-2 py-1 text-xs border rounded-lg focus:outline-none focus:border-blue-400 transition-all duration-300 ease-in-out ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-600 text-gray-200' 
                            : 'border-gray-200'
                        }`}
                      />
                    </div>
                    <button
                      onClick={() => deleteSet(workout.id, set.id)}
                      className={`p-1 rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'hover:bg-red-900/30 hover:text-red-400' 
                          : 'hover:bg-red-50 hover:text-red-500'
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={() => addSet(workout.id)}
                  className={`w-full py-2 border rounded-xl transition-colors flex items-center justify-center space-x-2 ${
                    isDarkMode 
                      ? 'border-gray-700 text-gray-400 hover:border-blue-500 hover:text-blue-400' 
                      : 'border-dashed border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-500'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">添加组数</span>
                </button>
              </div>
            </div>
          ))}
          
          {filteredWorkouts.length === 0 && (
            <div className="text-center py-12">
              <p className={`text-sm transition-all duration-300 ease-in-out ${textSecondaryClass}`}>
                {selectedCategory === '全部' ? '暂无训练记录' : `暂无${selectedCategory}训练记录`}
              </p>
              <p className={`text-xs mt-1 transition-all duration-300 ease-in-out ${textSecondaryClass}`}>点击右上角 + 添加训练动作</p>
            </div>
          )}
        </div>
      </div>

      {/* 添加训练动作模态框 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className={`rounded-2xl p-6 w-full max-w-sm transition-all duration-300 ease-in-out ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-medium ${textPrimaryClass}`}>添加训练动作</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="输入动作名称"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-400 mb-4 transition-all duration-300 ease-in-out ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200' 
                    : 'border-gray-200'
                }`}
                autoFocus
              />
              
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  选择分类
                </label>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {allCategories.filter(cat => cat !== '全部').map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setSelectedCategoryModal(category);
                        setShowNewCategoryInput(false);
                      }}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategoryModal === category && !showNewCategoryInput
                          ? 'bg-blue-500 text-white'
                          : isDarkMode 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
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
                      className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 transition-all duration-300 ease-in-out ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-200' 
                          : 'border-gray-200'
                      }`}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewCategoryInput(false);
                        setNewCategory('');
                      }}
                      className={`px-3 py-2 ${
                        isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      取消
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={`flex-1 px-4 py-3 border rounded-xl hover:bg-gray-50 transition-colors ${
                    isDarkMode 
                      ? 'border-gray-700 text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-600 border-gray-200'
                  }`}
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={!workoutName.trim() || (!selectedCategoryModal && !newCategory.trim())}
                  className={`flex-1 px-4 py-3 rounded-xl transition-colors ${
                    workoutName.trim() && (selectedCategoryModal || newCategory.trim())
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
      )}
    </div>
  );
};

export default WorkoutPage;

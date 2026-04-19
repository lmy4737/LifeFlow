import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TodoItem from '../components/TodoItem.jsx';
import AddTodoInput from '../components/AddTodoInput.jsx';
import { useTodos } from '../hooks/useTodos.js';
const TodoPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  
  const [newTodo, setNewTodo] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // 在初始化时直接从本地存储获取主题设置，避免闪烁
    const savedTheme = localStorage.getItem('lifeflow_theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // 应用主题类到 documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const pendingCount = totalCount - completedCount;

  const clearCompleted = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        deleteTodo(todo.id);
      }
    });
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
        <h1 className={`text-xl font-medium ${textPrimaryClass}`}>待办清单</h1>
        <button
          onClick={clearCompleted}
          className={`p-2 rounded-xl hover:bg-gray-100 transition-colors ${
            isDarkMode ? 'hover:bg-gray-800' : ''
          }`}
          disabled={completedCount === 0}
        >
          <Trash2 className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>
      </div>

      {/* 进度统计 */}
      <div className="px-6 mb-6">
        <div className={`rounded-2xl p-4 shadow-sm border transition-all duration-300 ease-in-out ${cardClass}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${textSecondaryClass}`}>今日进度</span>
            <span className={`text-sm font-medium ${textTertiaryClass}`}>
              {completedCount}/{totalCount}
            </span>
          </div>
          <div className={`w-full rounded-full h-2 transition-all duration-300 ease-in-out ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' }}
            ></div>
          </div>
          <div className={`text-xs mt-2 transition-all duration-300 ease-in-out ${textSecondaryClass}`}>
            {pendingCount > 0 ? `${pendingCount} 项待完成` : '所有任务已完成！'}
          </div>
        </div>
      </div>

      {/* 任务列表 */}
      <div className="px-6 mb-6">
        <div className="space-y-3">
          {todos.map((todo) => (
            <div key={todo.id} className={`rounded-2xl p-4 shadow-sm border transition-all duration-300 ease-in-out ${cardClass}`}>
              <div className="flex items-center space-x-3">
                {/* 自定义复选框 */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    todo.completed
                      ? 'bg-blue-500 border-blue-500'
                      : isDarkMode 
                        ? 'border-gray-600 hover:border-blue-400' 
                        : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {todo.completed && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                {/* 任务内容 */}
                <div className="flex-1">
                  <p className={`text-sm transition-all duration-200 ${
                    todo.completed 
                      ? isDarkMode ? 'text-gray-500 line-through' : 'text-gray-400 line-through' 
                      : textTertiaryClass
                  }`}>
                    {todo.text}
                  </p>
                  <p className={`text-xs mt-1 transition-all duration-300 ease-in-out ${textSecondaryClass}`}>
                    {new Date(todo.createdAt).toLocaleDateString('zh-CN')}
                  </p>
                </div>

                {/* 删除按钮 */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-red-900/30 hover:text-red-400' 
                      : 'hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {todos.length === 0 && (
            <div className="text-center py-12">
              <p className={`text-sm transition-all duration-300 ease-in-out ${textSecondaryClass}`}>暂无待办事项</p>
              <p className={`text-xs mt-1 transition-all duration-300 ease-in-out ${textSecondaryClass}`}>添加您的第一个任务吧</p>
            </div>
          )}
        </div>
      </div>

      {/* 添加任务输入框 */}
      <div className="fixed bottom-20 left-6 right-6">
        <div className={`rounded-2xl p-4 shadow-lg border transition-all duration-300 ease-in-out ${cardClass}`}>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="今天要迈出哪一步？"
              className={`flex-1 bg-transparent text-sm placeholder-gray-400 focus:outline-none transition-all duration-300 ease-in-out ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}
            />
            <button
              onClick={handleAddTodo}
              disabled={!newTodo.trim()}
              className={`p-2 rounded-xl transition-all duration-200 ${
                newTodo.trim()
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;

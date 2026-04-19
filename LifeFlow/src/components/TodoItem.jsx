import React from 'react';
import { Trash2 } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50 hover:shadow-md transition-all duration-300">
      <div className="flex items-center space-x-3">
        {/* 自定义复选框 */}
        <button
          onClick={onToggle}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? 'bg-blue-500 border-blue-500'
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
              ? 'text-gray-400 line-through' 
              : 'text-gray-800'
          }`}>
            {todo.text}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(todo.createdAt).toLocaleDateString('zh-CN')}
          </p>
        </div>

        {/* 删除按钮 */}
        <button
          onClick={onDelete}
          className="p-2 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

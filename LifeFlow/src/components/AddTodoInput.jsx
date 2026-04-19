import React from 'react';
import { Plus } from 'lucide-react';

const AddTodoInput = ({ value, onChange, onKeyPress, onAdd }) => {
  return (
    <div className="fixed bottom-20 left-6 right-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder="今天要迈出哪一步？"
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={onAdd}
            disabled={!value.trim()}
            className={`p-2 rounded-xl transition-all duration-200 ${
              value.trim()
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodoInput;

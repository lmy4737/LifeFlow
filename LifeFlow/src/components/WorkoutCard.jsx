import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';

const WorkoutCard = ({ workout, onAddSet, onUpdateSet, onDeleteSet }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalTonage = workout.sets.reduce((sum, set) => sum + (set.weight * set.reps), 0);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50">
      {/* 卡片头部 */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">
              {workout.name}
            </h3>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-500">
                总容量: {totalTonage.toFixed(1)} kg
              </p>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {workout.category}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddSet(workout.id);
              }}
              className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* 展开的训练组数 */}
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="space-y-2">
            {workout.sets.map((set) => (
              <div key={set.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 text-center text-sm font-medium text-gray-600">
                  {set.setNumber}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={set.weight}
                      onChange={(e) => onUpdateSet(workout.id, set.id, { weight: parseFloat(e.target.value) || 0 })}
                      className="w-16 px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                      placeholder="重量"
                    />
                    <span className="text-xs text-gray-500">kg</span>
                    <input
                      type="number"
                      value={set.reps}
                      onChange={(e) => onUpdateSet(workout.id, set.id, { reps: parseInt(e.target.value) || 0 })}
                      className="w-16 px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                      placeholder="次数"
                    />
                    <span className="text-xs text-gray-500">次</span>
                  </div>
                  <input
                    type="text"
                    value={set.note || ''}
                    onChange={(e) => onUpdateSet(workout.id, set.id, { note: e.target.value })}
                    placeholder="备注 (如: RPE 8)"
                    className="w-full mt-2 px-2 py-1 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                  />
                </div>
                <button
                  onClick={() => onDeleteSet(workout.id, set.id)}
                  className="p-1 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutCard;

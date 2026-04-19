import React from 'react';
import { BarChart3, Calendar, Target, Award, TrendingUp, Activity } from 'lucide-react';
import Navigation from '../components/Navigation.jsx';

const ProfilePage = () => {
  const stats = [
    { label: '完成任务', value: '12', icon: Target, color: 'from-blue-400 to-blue-600' },
    { label: '训练天数', value: '8', icon: Calendar, color: 'from-green-400 to-green-600' },
    { label: '坚持周数', value: '2', icon: Award, color: 'from-purple-400 to-purple-600' },
    { label: '本周容量', value: '1.2T', icon: TrendingUp, color: 'from-orange-400 to-orange-600' },
  ];

  const weeklyData = [
    { day: '周一', tasks: 3, workouts: 1 },
    { day: '周二', tasks: 5, workouts: 0 },
    { day: '周三', tasks: 2, workouts: 1 },
    { day: '周四', tasks: 4, workouts: 0 },
    { day: '周五', tasks: 6, workouts: 1 },
    { day: '周六', tasks: 1, workouts: 2 },
    { day: '周日', tasks: 0, workouts: 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-32">
      {/* 顶部标题 */}
      <div className="pt-16 pb-8 px-6">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-800 mb-2">本周统计</h1>
          <p className="text-sm text-gray-500 font-light">您的成长数据概览</p>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white/50">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-gray-800">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 本周活动图表 */}
      <div className="px-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white/50">
          <h3 className="text-lg font-medium text-gray-800 mb-6">本周活动</h3>
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                <div className="flex-1 mx-4">
                  <div className="flex space-x-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(day.tasks / 6) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(day.workouts / 2) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-6 mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-500">任务</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-500">训练</span>
            </div>
          </div>
        </div>
      </div>

      {/* 成就徽章 */}
      <div className="px-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">本周成就</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-4 text-center shadow-lg">
            <Activity className="w-8 h-8 text-white mx-auto mb-2" />
            <div className="text-white text-xs font-medium">连续训练</div>
          </div>
          <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl p-4 text-center shadow-lg">
            <Target className="w-8 h-8 text-white mx-auto mb-2" />
            <div className="text-white text-xs font-medium">任务达人</div>
          </div>
          <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl p-4 text-center shadow-lg">
            <TrendingUp className="w-8 h-8 text-white mx-auto mb-2" />
            <div className="text-white text-xs font-medium">稳步提升</div>
          </div>
        </div>
      </div>

      {/* 底部导航 */}
      <Navigation />
    </div>
  );
};

export default ProfilePage;

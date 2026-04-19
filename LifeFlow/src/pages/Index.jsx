import { useNavigate } from 'react-router-dom';
import { Moon, CheckCircle, Dumbbell, Target, Activity, BarChart3, Sun, Calendar, TrendingUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
const Index = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [activeCard, setActiveCard] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // 从本地存储获取主题设置，默认为false（亮色模式）
    const savedTheme = localStorage.getItem('lifeflow_theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // 从本地存储获取真实数据
  const [stats, setStats] = useState([
    { label: '完成任务', value: '0', icon: Target, color: 'from-blue-400 to-blue-600' },
    { label: '训练天数', value: '0', icon: Calendar, color: 'from-green-400 to-green-600' },
    { label: '坚持周数', value: '0', icon: Activity, color: 'from-purple-400 to-purple-600' },
  ]);

  const [weeklyData, setWeeklyData] = useState([
    { day: '周一', tasks: 0, workouts: 0 },
    { day: '周二', tasks: 0, workouts: 0 },
    { day: '周三', tasks: 0, workouts: 0 },
    { day: '周四', tasks: 0, workouts: 0 },
    { day: '周五', tasks: 0, workouts: 0 },
    { day: '周六', tasks: 0, workouts: 0 },
    { day: '周日', tasks: 0, workouts: 0 },
  ]);

  // 加载真实数据
  useEffect(() => {
    // 获取任务数据
    const todos = JSON.parse(localStorage.getItem('lifeflow_todos') || '[]');
    const completedTasks = todos.filter(todo => todo.completed).length;
    
    // 获取训练数据
    const workouts = JSON.parse(localStorage.getItem('lifeflow_workouts') || '[]');
    const workoutDays = workouts.length;
    
    // 计算坚持周数（简化逻辑）
    const weeks = Math.max(1, Math.ceil(workoutDays / 7));
    
    // 更新统计数据
    setStats([
      { label: '完成任务', value: completedTasks.toString(), icon: Target, color: 'from-blue-400 to-blue-600' },
      { label: '训练天数', value: workoutDays.toString(), icon: Calendar, color: 'from-green-400 to-green-600' },
      { label: '坚持周数', value: weeks.toString(), icon: Activity, color: 'from-purple-400 to-purple-600' },
    ]);
    
    // 模拟本周数据（实际应用中应从真实数据计算）
    const today = new Date().getDay();
    const dayMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const currentWeekData = dayMap.map((day, index) => {
      // 简单模拟：根据任务总数分配
      const tasks = Math.floor(Math.random() * (completedTasks / 3 + 1));
      const workouts = Math.floor(Math.random() * (workoutDays / 3 + 1));
      return { day, tasks, workouts };
    });
    
    setWeeklyData(currentWeekData);
  }, []);

  // 切换暗色模式并保存到本地存储
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // 保存主题设置到本地存储
    localStorage.setItem('lifeflow_theme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleCardClick = (cardType) => {
    setActiveCard(cardType);
    if (cardType === 'todos') {
      navigate('/todos');
    } else if (cardType === 'workouts') {
      navigate('/workouts');
    }
    // 本周统计保持在当前页面
  };

  // 名人名言数据
  const quotes = [
    // 中文名言
    { 
      text: "生活不是等待暴风雨过去，而是要学会在雨中跳舞。", 
      author: "维维安·格林", 
      language: "zh", 
      theme: "积极",
      translation: null
    },
    { 
      text: "人生最大的痛苦在于过于执着，学会放下才能获得真正的自由。", 
      author: "佚名", 
      language: "zh", 
      theme: "消极",
      translation: null
    },
    { 
      text: "千里之行，始于足下。", 
      author: "老子", 
      language: "zh", 
      theme: "积极",
      translation: null
    },
    { 
      text: "人生如梦，一尊还酹江月。", 
      author: "苏轼", 
      language: "zh", 
      theme: "消极",
      translation: null
    },
    { 
      text: "山重水复疑无路，柳暗花明又一村。", 
      author: "陆游", 
      language: "zh", 
      theme: "积极",
      translation: null
    },
    
    // 日文名言
    { 
      text: "七転び八起き。", 
      author: "日本谚语", 
      language: "ja", 
      theme: "积极",
      translation: "跌倒七次，爬起来八次。"
    },
    { 
      text: "人生は儚い夢のごとし。", 
      author: "鴨長明", 
      language: "ja", 
      theme: "消极",
      translation: "人生如同短暂的梦境。"
    },
    { 
      text: "石の上にも三年。", 
      author: "日本谚语", 
      language: "ja", 
      theme: "积极",
      translation: "在石头上坐三年（比喻坚持不懈）。"
    },
    { 
      text: "花は散り、月は雲に隠る。", 
      author: "西行", 
      language: "ja", 
      theme: "消极",
      translation: "花会凋谢，月会被云遮蔽。"
    },
    
    // 英文名言
    { 
      text: "The only way to do great work is to love what you do.", 
      author: "Steve Jobs", 
      language: "en", 
      theme: "积极",
      translation: "做出伟大工作的唯一方法就是热爱你所做的事情。"
    },
    { 
      text: "Life is what happens when you're busy making other plans.", 
      author: "John Lennon", 
      language: "en", 
      theme: "消极",
      translation: "生活就是当你忙于制定其他计划时发生的事情。"
    },
    { 
      text: "In the middle of difficulty lies opportunity.", 
      author: "Albert Einstein", 
      language: "en", 
      theme: "积极",
      translation: "困难中蕴藏着机遇。"
    },
    { 
      text: "The unexamined life is not worth living.", 
      author: "Socrates", 
      language: "en", 
      theme: "消极",
      translation: "未经审视的生活不值得过。"
    },
    { 
      text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", 
      author: "Winston Churchill", 
      language: "en", 
      theme: "积极",
      translation: "成功不是终点，失败不是致命的：重要的是继续前进的勇气。"
    }
  ];

  // 随机选择一条名言
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, []);

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
    <div className={`min-h-screen pb-12 transition-all duration-300 ease-in-out ${bgClass}`}>
      {/* 顶部日期区域 */}
      <div className="pt-16 pb-8 px-6 transition-all duration-300 ease-in-out">
        <div className="text-center">
          <div className={`text-sm mb-2 transition-all duration-300 ease-in-out ${textSecondaryClass}`}>
            {format(today, 'M月dd日', { locale: zhCN })}
          </div>
          <div className={`text-lg font-light transition-all duration-300 ease-in-out ${textTertiaryClass}`}>
            {format(today, 'EEEE', { locale: zhCN })}
          </div>
        </div>
      </div>

      {/* 核心标题区域 - 移动到名人名言上方 */}
      <div className="px-6 mb-8 transition-all duration-300 ease-in-out">
        <div className="text-center">
          <h1 className={`text-3xl font-light mb-2 tracking-wide transition-all duration-300 ease-in-out ${textPrimaryClass}`}>
            管理您的人生
          </h1>
          <p className={`text-sm font-light transition-all duration-300 ease-in-out ${textSecondaryClass}`}>
            A Moment of Clarity
          </p>
        </div>
      </div>

      {/* 名人名言区域 - 最显眼位置 */}
      <div className="px-6 mb-12 transition-all duration-300 ease-in-out">
        <div className={`rounded-3xl p-8 shadow-lg border transition-all duration-300 ease-in-out ${cardClass}`}>
          <div className="text-center">
            <blockquote className={`text-xl md:text-2xl font-serif italic mb-4 transition-all duration-300 ease-in-out ${textPrimaryClass}`}>
              "{currentQuote.text}"
            </blockquote>
            
            {/* 添加翻译 */}
            {currentQuote.translation && (
              <blockquote className={`text-lg md:text-xl font-serif italic mb-4 transition-all duration-300 ease-in-out ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                "{currentQuote.translation}"
              </blockquote>
            )}
            
            <cite className={`text-sm font-light not-italic transition-all duration-300 ease-in-out ${textSecondaryClass}`}>
              — {currentQuote.author}
            </cite>
            <div className="mt-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs transition-all duration-300 ease-in-out ${
                currentQuote.theme === '积极' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {currentQuote.theme}
              </span>
              <span className={`ml-2 text-xs transition-all duration-300 ease-in-out ${textSecondaryClass}`}>
                {currentQuote.language === 'zh' ? '中文' : currentQuote.language === 'ja' ? '日文' : '英文'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 功能卡片区域 */}
      <div className="px-6 mb-12 transition-all duration-300 ease-in-out">
        <div className="space-y-6">
          {/* 每日必修卡片 */}
          <div 
            onClick={() => handleCardClick('todos')}
            className={`rounded-3xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 cursor-pointer transform ${cardClass} ${
              activeCard === 'todos' ? 'scale-105 -translate-y-2' : 'hover:scale-105 hover:-translate-y-1'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-medium mb-1 transition-all duration-300 ease-in-out ${textPrimaryClass}`}>
                  每日必修
                </h3>
                <p className={`text-sm transition-all duration-300 ease-in-out ${textSecondaryClass}`}>
                  经典待办 · 日清日高
                </p>
              </div>
            </div>
          </div>

          {/* 力量修行卡片 */}
          <div 
            onClick={() => handleCardClick('workouts')}
            className={`rounded-3xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 cursor-pointer transform ${cardClass} ${
              activeCard === 'workouts' ? 'scale-105 -translate-y-2' : 'hover:scale-105 hover:-translate-y-1'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Dumbbell className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-medium mb-1 transition-all duration-300 ease-in-out ${textPrimaryClass}`}>
                  力量修行
                </h3>
                <p className={`text-sm transition-all duration-300 ease-in-out ${textSecondaryClass}`}>
                  容量追踪 · 渐进负荷
                </p>
              </div>
            </div>
          </div>

          {/* 本周统计卡片 */}
          <div 
            onClick={() => handleCardClick('stats')}
            className={`rounded-3xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 cursor-pointer transform ${cardClass} ${
              activeCard === 'stats' ? 'scale-105 -translate-y-2' : 'hover:scale-105 hover:-translate-y-1'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-medium mb-1 transition-all duration-300 ease-in-out ${textPrimaryClass}`}>
                  本周统计
                </h3>
                <p className={`text-sm transition-all duration-300 ease-in-out ${textSecondaryClass}`}>
                  成长数据 · 一目了然
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 统计卡片区域 */}
      {activeCard === 'stats' && (
        <div className="px-6 mb-8 animate-fadeIn transition-all duration-300 ease-in-out">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className={`rounded-3xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${cardClass}`}>
                  <div className="flex flex-col items-center space-y-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-semibold transition-all duration-300 ease-in-out ${textPrimaryClass}`}>{stat.value}</div>
                      <div className={`text-sm transition-all duration-300 ease-in-out ${textSecondaryClass}`}>{stat.label}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 本周活动图表 */}
      {activeCard === 'stats' && (
        <div className="px-6 animate-fadeIn transition-all duration-300 ease-in-out">
          <div className={`rounded-3xl p-6 shadow-lg border transition-all duration-300 ease-in-out ${cardClass}`}>
            <h3 className={`text-lg font-medium mb-6 transition-all duration-300 ease-in-out ${textPrimaryClass}`}>本周活动</h3>
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className={`w-12 text-sm font-medium transition-all duration-300 ease-in-out ${textTertiaryClass}`}>{day.day}</div>
                  <div className="flex-1 mx-4">
                    <div className="flex space-x-2">
                      <div className={`flex-1 rounded-full h-2 transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(day.tasks / 6) * 100}%` }}
                        ></div>
                      </div>
                      <div className={`flex-1 rounded-full h-2 transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(day.workouts / 2) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className={`text-xs transition-all duration-300 ease-in-out ${textSecondaryClass}`}>任务</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className={`text-xs transition-all duration-300 ease-in-out ${textSecondaryClass}`}>训练</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 暗色模式切换按钮 */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out ${
          isDarkMode 
            ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default Index;

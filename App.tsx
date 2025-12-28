
import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  Sparkles, BrainCircuit, RefreshCw
} from 'lucide-react';
import { INITIAL_DATA, PRIMARY_GREEN } from './constants';
import { WeeklyData } from './types';
import HabitTracker from './components/HabitTracker';
import DailyTaskCard from './components/DailyTaskCard';
import { getProductivityInsights } from './services/geminiService';

const App: React.FC = () => {
  const [data, setData] = useState<WeeklyData>(INITIAL_DATA);
  const [insights, setInsights] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  // Calculate chart data
  const lineChartData = useMemo(() => {
    return data.days.map(d => ({
      name: d.name,
      tasks: d.tasks.filter(t => t.completed).length,
    }));
  }, [data]);

  const overallProgress = useMemo(() => {
    const totalTasks = data.days.reduce((acc, d) => acc + d.tasks.length, 0);
    const completedTasks = data.days.reduce((acc, d) => acc + d.tasks.filter(t => t.completed).length, 0);
    const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    return [
      { name: 'Completed', value: percentage },
      { name: 'Remaining', value: 100 - percentage },
    ];
  }, [data]);

  // Handlers
  const handleToggleTask = (dayIndex: number, taskId: string) => {
    setData(prev => {
      const nextDays = [...prev.days];
      const day = { ...nextDays[dayIndex] };
      const nextTasks = day.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
      
      const completedCount = nextTasks.filter(t => t.completed).length;
      day.tasks = nextTasks;
      day.progress = Math.round((completedCount / nextTasks.length) * 100);
      
      nextDays[dayIndex] = day;
      return { ...prev, days: nextDays };
    });
  };

  const handleToggleHabit = (habitId: string, dayIndex: number) => {
    setData(prev => {
      const nextHabits = prev.habits.map(h => {
        if (h.id === habitId) {
          const nextHistory = [...h.history];
          nextHistory[dayIndex] = !nextHistory[dayIndex];
          return { ...h, history: nextHistory };
        }
        return h;
      });
      return { ...prev, habits: nextHabits };
    });
  };

  const fetchInsights = async () => {
    setLoadingInsights(true);
    const result = await getProductivityInsights(data);
    setInsights(result);
    setLoadingInsights(false);
  };

  return (
    <div className="max-w-full mx-auto p-4 md:p-6 space-y-6">
      {/* Top Section */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left: Branding & Week Info */}
        <div className="col-span-12 lg:col-span-2 space-y-4">
          <div className="bg-white border-2 border-gray-800 p-6 flex flex-col items-center justify-center shadow-sm h-[120px] rounded-none">
            <h1 className="text-3xl font-extrabold italic tracking-tight text-gray-900 leading-none">Stay</h1>
            <h1 className="text-3xl font-extrabold italic tracking-tight text-gray-900 leading-none">Focus</h1>
          </div>
          <div className="flex items-center overflow-hidden border border-gray-300 rounded-none shadow-sm">
            <div className="bg-[#6ea55a] text-white px-3 py-3 text-xs font-bold w-1/2 text-center flex items-center justify-center rounded-none">
              Inicio de la semana:
            </div>
            <div className="bg-white px-3 py-3 text-sm font-bold w-1/2 text-center border-l border-gray-300 rounded-none">
              {data.weekStart}
            </div>
          </div>
          {/* AI Insights Button */}
          <button 
            onClick={fetchInsights}
            disabled={loadingInsights}
            className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-gray-900 font-bold py-3 rounded-none shadow-sm transition-all"
          >
            {loadingInsights ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
            {loadingInsights ? "Analizando..." : "Obtener Insights AI"}
          </button>
        </div>

        {/* Center: General Progress Chart */}
        <div className="col-span-12 lg:col-span-6 bg-white border border-gray-200 rounded-none shadow-sm overflow-hidden flex flex-col">
          <div className="bg-[#6ea55a] text-white text-center py-1 font-bold text-sm rounded-none">
            Progreso General
          </div>
          <div className="p-4 flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-[200px]">
              <h4 className="text-gray-500 font-bold mb-2 text-sm">Tareas por Día</h4>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" tick={{fontSize: 10}} stroke="#9ca3af" axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize: 10}} stroke="#9ca3af" axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{borderRadius: '0px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                    itemStyle={{color: PRIMARY_GREEN}}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="tasks" 
                    stroke={PRIMARY_GREEN} 
                    strokeWidth={3} 
                    dot={{fill: PRIMARY_GREEN, strokeWidth: 2, r: 4}} 
                    activeDot={{r: 6}}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="md:col-span-1 flex flex-col items-center justify-center">
              <h4 className="text-gray-500 font-bold mb-2 text-sm">Progreso Semanal</h4>
              <div className="relative w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={overallProgress}
                      innerRadius={45}
                      outerRadius={60}
                      paddingAngle={0}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      <Cell fill={PRIMARY_GREEN} />
                      <Cell fill="#e5e7eb" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-xl font-bold text-gray-700">{overallProgress[0].value}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Habit Tracker */}
        <div className="col-span-12 lg:col-span-4">
          <HabitTracker habits={data.habits} onToggle={handleToggleHabit} />
        </div>
      </div>

      {/* AI Insights Display */}
      {insights && (
        <div className="bg-white border-l-4 border-yellow-400 p-4 shadow-sm rounded-none flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-yellow-100 p-2 rounded-none text-yellow-600">
            <BrainCircuit size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 mb-1">Stay Focus AI Insights</h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{insights}</p>
          </div>
          <button onClick={() => setInsights(null)} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
      )}

      {/* Expanded Daily Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {data.days.map((day, index) => (
          <DailyTaskCard 
            key={day.name} 
            day={day} 
            dayIndex={index}
            onToggleTask={handleToggleTask} 
          />
        ))}
      </div>
    </div>
  );
};

export default App;


import React from 'react';
import { Habit } from '../types';
import { PRIMARY_GREEN } from '../constants';

interface HabitTrackerProps {
  habits: Habit[];
  onToggle: (habitId: string, dayIndex: number) => void;
}

const HabitTracker: React.FC<HabitTrackerProps> = ({ habits, onToggle }) => {
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  return (
    <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="bg-[#6ea55a] text-white text-center py-1 font-bold text-sm">
        Habit Tracker
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-2 font-bold min-w-[120px]">Hábito</th>
              {days.map(d => (
                <th key={d} className="p-1 text-center">{d}</th>
              ))}
              <th className="p-2 text-right">Progreso</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {habits.map((habit) => {
              const completedCount = habit.history.filter(Boolean).length;
              const progressPercentage = Math.round((completedCount / 7) * 100);
              
              return (
                <tr key={habit.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 truncate font-medium">{habit.name}</td>
                  {habit.history.map((done, idx) => (
                    <td key={idx} className="p-1 text-center">
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() => onToggle(habit.id, idx)}
                        className="rounded-none text-[#6ea55a] focus:ring-[#6ea55a] w-3.5 h-3.5 cursor-pointer"
                      />
                    </td>
                  ))}
                  <td className={`p-2 text-right font-bold text-white transition-all`}
                      style={{ 
                        backgroundColor: progressPercentage === 0 ? '#e5e7eb' : `rgba(110, 165, 90, ${0.4 + (progressPercentage / 100) * 0.6})`,
                        color: progressPercentage === 0 ? '#9ca3af' : 'white'
                      }}>
                    {progressPercentage}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HabitTracker;

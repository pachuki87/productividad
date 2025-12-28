
import React from 'react';
import { DayData } from '../types';
import CircularProgress from './CircularProgress';
import { PRIMARY_GREEN } from '../constants';

interface DailyTaskCardProps {
  day: DayData;
  onToggleTask: (dayIndex: number, taskId: string) => void;
  dayIndex: number;
}

const DailyTaskCard: React.FC<DailyTaskCardProps> = ({ day, onToggleTask, dayIndex }) => {
  // Pad task list to keep heights consistent
  const minTasks = 10;
  const displayTasks = [...day.tasks];
  while (displayTasks.length < minTasks) {
    displayTasks.push({ id: `empty-${displayTasks.length}`, text: '', completed: false });
  }

  return (
    <div className="w-full bg-white rounded-none shadow-sm border border-gray-200 flex flex-col transition-all hover:shadow-md">
      {/* Header */}
      <div className="bg-[#6ea55a] text-white text-center py-2 px-4 rounded-none">
        <div className="font-bold uppercase text-sm">{day.name}</div>
        <div className="text-xs opacity-90">{day.date}</div>
      </div>

      {/* Progress Section */}
      <div className="p-4 flex justify-center">
        <CircularProgress percentage={day.progress} size={110} />
      </div>

      {/* Tasks Title */}
      <div className="bg-[#6ea55a] text-white text-center py-1 font-bold text-sm">
        Tareas
      </div>

      {/* Task List */}
      <div className="flex-1 p-2 space-y-1 text-sm bg-gray-50 overflow-y-auto no-scrollbar">
        {displayTasks.map((task, idx) => {
          const isEmpty = !task.text;
          
          if (isEmpty) {
            return (
              <div key={task.id} className="h-8 bg-white rounded-none border border-gray-100"></div>
            );
          }

          return (
            <div 
              key={task.id} 
              onClick={() => onToggleTask(dayIndex, task.id)}
              className={`flex items-center justify-between p-1.5 rounded-none border cursor-pointer transition-all group
                ${task.completed 
                  ? 'bg-[#6ea55a]/15 border-[#6ea55a]/30' 
                  : 'bg-white border-gray-100 hover:border-gray-300'}`}
            >
              <span className={`truncate ml-1 transition-all ${task.completed ? 'line-through text-gray-500' : 'text-gray-700 font-medium'}`}>
                {task.text}
              </span>
              <input
                type="checkbox"
                checked={task.completed}
                readOnly
                className="rounded-none text-[#6ea55a] focus:ring-[#6ea55a] w-4 h-4 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyTaskCard;


export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface DayData {
  name: string;
  date: string;
  tasks: Task[];
  progress: number;
}

export interface Habit {
  id: string;
  name: string;
  icon?: string;
  history: boolean[]; // 7 days: Mon to Sun
}

export interface WeeklyData {
  days: DayData[];
  habits: Habit[];
  weekStart: string;
}

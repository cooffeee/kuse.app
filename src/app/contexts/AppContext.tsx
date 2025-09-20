'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 癖のデータ型定義
export interface Habit {
  id: string;
  name: string;
  color: string;
  dailyGoal: number;
  createdAt: string;
}

// アプリの設定型定義
export interface AppSettings {
  habits: Habit[];
  activeHabitId: string;
  notifications: boolean;
  theme: 'light' | 'dark';
}

// デフォルトの癖データ
const defaultHabit: Habit = {
  id: 'default-habit',
  name: '癖',
  color: '#8B5CF6', // 紫色
  dailyGoal: 0,
  createdAt: new Date().toISOString()
};

// デフォルト設定
const defaultSettings: AppSettings = {
  habits: [defaultHabit],
  activeHabitId: 'default-habit',
  notifications: true,
  theme: 'light'
};

// Context型定義
interface AppContextType {
  settings: AppSettings;
  updateHabitName: (habitId: string, name: string) => void;
  updateHabitGoal: (habitId: string, goal: number) => void;
  updateNotifications: (enabled: boolean) => void;
  updateTheme: (theme: 'light' | 'dark') => void;
  getActiveHabit: () => Habit | null;
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt'>) => void;
  removeHabit: (habitId: string) => void;
  setActiveHabit: (habitId: string) => void;
}

// Context作成
const AppContext = createContext<AppContextType | undefined>(undefined);

// プロバイダーコンポーネント
export function AppProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  // ローカルストレージから設定を読み込み
  useEffect(() => {
    const savedSettings = localStorage.getItem('app-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        // 設定の読み込みに失敗した場合はデフォルト設定を使用
      }
    }
  }, []);

  // 設定をローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(settings));
  }, [settings]);

  // 癖の名前を更新
  const updateHabitName = (habitId: string, name: string) => {
    setSettings(prev => ({
      ...prev,
      habits: prev.habits.map(habit =>
        habit.id === habitId ? { ...habit, name } : habit
      )
    }));
  };

  // 癖の目標を更新
  const updateHabitGoal = (habitId: string, goal: number) => {
    setSettings(prev => ({
      ...prev,
      habits: prev.habits.map(habit =>
        habit.id === habitId ? { ...habit, dailyGoal: goal } : habit
      )
    }));
  };

  // 通知設定を更新
  const updateNotifications = (enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: enabled
    }));
  };

  // テーマを更新
  const updateTheme = (theme: 'light' | 'dark') => {
    setSettings(prev => ({
      ...prev,
      theme
    }));
  };

  // アクティブな癖を取得
  const getActiveHabit = () => {
    return settings.habits.find(habit => habit.id === settings.activeHabitId) || null;
  };

  // 新しい癖を追加
  const addHabit = (habitData: Omit<Habit, 'id' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: `habit-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    setSettings(prev => ({
      ...prev,
      habits: [...prev.habits, newHabit]
    }));
  };

  // 癖を削除
  const removeHabit = (habitId: string) => {
    setSettings(prev => {
      const newHabits = prev.habits.filter(habit => habit.id !== habitId);
      const newActiveHabitId = prev.activeHabitId === habitId 
        ? (newHabits[0]?.id || '') 
        : prev.activeHabitId;
      
      return {
        ...prev,
        habits: newHabits,
        activeHabitId: newActiveHabitId
      };
    });
  };

  // アクティブな癖を設定
  const setActiveHabit = (habitId: string) => {
    setSettings(prev => ({
      ...prev,
      activeHabitId: habitId
    }));
  };

  const value: AppContextType = {
    settings,
    updateHabitName,
    updateHabitGoal,
    updateNotifications,
    updateTheme,
    getActiveHabit,
    addHabit,
    removeHabit,
    setActiveHabit
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// カスタムフック
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../contexts/AppContext';
import Character from './Character';
import CounterCard from './CounterCard';

interface MainScreenProps {
  onCountChange: () => void;
  onNavigateToGraph: (habitId: string) => void;
}

export default function MainScreen({ onCountChange, onNavigateToGraph }: MainScreenProps) {
  const [habitCounts, setHabitCounts] = useState<Record<string, number>>({});
  const { settings } = useApp();

  // 今日の日付を取得
  const today = new Date().toDateString();

  // 各癖のカウントを管理する関数
  const getHabitCount = (habitId: string) => {
    return habitCounts[habitId] || 0;
  };

  const setHabitCount = (habitId: string, count: number) => {
    setHabitCounts(prev => ({
      ...prev,
      [habitId]: count
    }));
    localStorage.setItem(`habit-count-${habitId}-${today}`, count.toString());
    onCountChange();
  };

  // ローカルストレージから各癖のカウントを読み込み
  useEffect(() => {
    const counts: Record<string, number> = {};
    settings.habits.forEach(habit => {
      const savedCount = localStorage.getItem(`habit-count-${habit.id}-${today}`);
      if (savedCount) {
        const count = parseInt(savedCount, 10);
        if (!isNaN(count)) {
          counts[habit.id] = count;
        }
      }
    });
    setHabitCounts(counts);
  }, [today, settings.habits]);

  // カウント操作のハンドラー
  const handleIncrement = (habitId: string) => {
    const currentCount = getHabitCount(habitId);
    setHabitCount(habitId, currentCount + 1);
  };

  const handleDecrement = (habitId: string) => {
    const currentCount = getHabitCount(habitId);
    if (currentCount > 0) {
      setHabitCount(habitId, currentCount - 1);
    }
  };

  const handleReset = (habitId: string) => {
    setHabitCount(habitId, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* アプリタイトル */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-400 rounded-2xl mb-6 shadow-2xl">
          <span className="text-white text-2xl font-black">クセ</span>
        </div>
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6">
          クセナンカイ➕
        </h1>
      </div>

      {/* カウンターグリッド */}
      {settings.habits.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          {settings.habits.map((habit) => (
            <CounterCard
              key={habit.id}
              habit={habit}
              count={getHabitCount(habit.id)}
              onIncrement={() => handleIncrement(habit.id)}
              onDecrement={() => handleDecrement(habit.id)}
              onReset={() => handleReset(habit.id)}
              onViewGraph={() => onNavigateToGraph(habit.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <div className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl border border-yellow-400/30 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">⚠️</span>
              </div>
              <p className="text-yellow-200 font-semibold text-lg">
                癖が登録されていません
              </p>
            </div>
            <p className="text-yellow-300 text-sm">
              設定画面で癖を追加してください
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../contexts/AppContext';
import Character from './Character';

interface MainScreenProps {
  onCountChange: () => void;
}

export default function MainScreen({ onCountChange }: MainScreenProps) {
  const [todayCount, setTodayCount] = useState(0);
  const [continuationDays, setContinuationDays] = useState(0);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const { settings, getActiveHabit, setActiveHabit } = useApp();
  const activeHabit = getActiveHabit();

  // 今日の日付を取得
  const today = new Date().toDateString();

  // 継続日数を計算する関数（useCallbackでメモ化）
  const calculateContinuationDays = useCallback((habitId: string) => {
    if (!habitId) return 0;
    
    const habit = settings.habits.find(h => h.id === habitId);
    if (!habit) return 0;
    
    const habitCreatedDate = new Date(habit.createdAt);
    const today = new Date();
    const diffTime = today.getTime() - habitCreatedDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 最低1日は表示
    return Math.max(1, diffDays);
  }, [settings.habits]);

  // ローカルストレージから今日のカウントを読み込み
  useEffect(() => {
    if (activeHabit) {
      const savedCount = localStorage.getItem(`habit-count-${activeHabit.id}-${today}`);
      if (savedCount) {
        const count = parseInt(savedCount, 10);
        // NaNチェックを追加
        if (!isNaN(count)) {
          setTodayCount(count);
          onCountChange();
        }
      } else {
        setTodayCount(0);
        onCountChange();
      }
      
      // 継続日数を計算
      const days = calculateContinuationDays(activeHabit.id);
      setContinuationDays(days);
    }
  }, [today, onCountChange, activeHabit, settings.habits, calculateContinuationDays]);

  // カウントボタンが押された時の処理
  const handleCountClick = () => {
    if (activeHabit) {
      const newCount = todayCount + 1;
      setTodayCount(newCount);
      
      // ローカルストレージに保存（癖IDベース）
      localStorage.setItem(`habit-count-${activeHabit.id}-${today}`, newCount.toString());
      onCountChange();
    }
  };

  // リセットボタン（デバッグ用）
  const handleReset = () => {
    if (activeHabit) {
      setTodayCount(0);
      localStorage.removeItem(`habit-count-${activeHabit.id}-${today}`);
      onCountChange();
    }
  };

  // 癖の切り替えハンドラー
  const handleHabitChange = (habitId: string) => {
    setActiveHabit(habitId);
  };

  // 色を調整するヘルパー関数
  const adjustColor = (color: string, amount: number) => {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* アプリタイトル */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-400 rounded-2xl mb-6 shadow-2xl">
            <span className="text-white text-2xl font-black">クセ</span>
          </div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6">
            クセナンカイ➕
          </h1>
        </div>

        {/* 癖の切り替えアコーディオン */}
        {settings.habits.length > 0 ? (
          <div className="mb-8">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative hover:shadow-3xl transition-all duration-300">
              {/* 装飾的なグラデーション */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"></div>
              {/* アコーディオンヘッダー */}
              <button
                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                className="w-full px-6 py-6 flex items-center justify-between hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: activeHabit?.color || '#8B5CF6' }}
                  >
                    {activeHabit?.name?.charAt(0) || '癖'}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white text-xl">
                      {activeHabit?.name || '癖を選択'}
                    </div>
                    <div className="text-sm text-gray-300 flex items-center gap-2">
                      <span className="text-pink-400">✨</span>
                      {continuationDays}日目継続中
                    </div>
                  </div>
                </div>
                <div className={`transform transition-all duration-300 ${isAccordionOpen ? 'rotate-180 scale-110' : 'scale-100'}`}>
                  <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* アコーディオンコンテンツ */}
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isAccordionOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="border-t border-white/20 bg-gradient-to-b from-white/10 to-white/5">
                  {settings.habits.map((habit, index) => (
                    <button
                      key={habit.id}
                      onClick={() => {
                        handleHabitChange(habit.id);
                        setIsAccordionOpen(false);
                      }}
                      className={`w-full px-6 py-5 flex items-center justify-between hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 transition-all duration-200 group ${
                        habit.id === activeHabit?.id ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-l-4' : ''
                      } ${index !== settings.habits.length - 1 ? 'border-b border-white/20' : ''}`}
                      style={habit.id === activeHabit?.id ? { borderLeftColor: habit.color } : {}}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-lg font-bold shadow-md transform group-hover:scale-110 transition-transform duration-200"
                          style={{ backgroundColor: habit.color }}
                        >
                          {habit.name.charAt(0)}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-white group-hover:text-blue-200 text-lg">
                            {habit.name}
                          </div>
                          <div className="text-sm text-gray-300 flex items-center gap-2">
                            <span className="text-blue-400">🎯</span>
                            目標: {habit.dailyGoal}回/日
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div 
                          className="text-xl font-bold group-hover:scale-105 transition-transform duration-200"
                          style={{ color: habit.color }}
                        >
                          {calculateContinuationDays(habit.id)}日目
                        </div>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <span className="text-green-400">🔥</span>
                          継続中
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8 text-center">
            <div className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl border border-yellow-400/30">
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


        {/* メインカウントボタン */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleCountClick}
            disabled={!activeHabit}
            className={`w-56 h-56 rounded-3xl shadow-2xl transition-all duration-300 flex items-center justify-center group ${
              activeHabit 
                ? 'hover:shadow-3xl transform hover:scale-105 active:scale-95' 
                : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              background: activeHabit 
                ? `linear-gradient(135deg, ${activeHabit.color}, ${adjustColor(activeHabit.color, -20)})`
                : 'linear-gradient(135deg, #9CA3AF, #6B7280)'
            }}
          >
            <div className="text-center text-white">
              <div className="text-7xl font-black mb-3 group-hover:animate-bounce">
                {todayCount}
              </div>
              <div className="text-xl font-semibold">
                {activeHabit?.name || '癖'}をカウント
              </div>
            </div>
          </button>
        </div>

        {/* キャラクター */}
        {activeHabit && (
          <Character 
            count={todayCount} 
            maxCount={activeHabit.dailyGoal} 
          />
        )}

        {/* 継続日数表示 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">🔥</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white" style={{ color: activeHabit?.color || '#8B5CF6' }}>
                {continuationDays}日目
              </p>
              <p className="text-sm text-gray-300">継続中</p>
            </div>
          </div>
        </div>

        {/* デバッグ用リセットボタン */}
        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            リセット
          </button>
        </div>
      </div>
    </div>
  );
}

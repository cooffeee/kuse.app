'use client';

import { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';

interface DayData {
  date: string;
  count: number;
}

interface HabitData {
  habit: {
    id: string;
    name: string;
    color: string;
    dailyGoal: number;
  };
  dayData: DayData[];
  totalCount: number;
  averageCount: number;
  activeDays: number;
}

interface GraphScreenProps {
  selectedHabitId?: string | null;
}

export default function GraphScreen({ selectedHabitId }: GraphScreenProps) {
  const [habitsData, setHabitsData] = useState<HabitData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');
  const { settings } = useApp();

  // ローカルストレージから過去のデータを読み込み
  useEffect(() => {
    const loadHistoricalData = () => {
      const habitsDataArray: HabitData[] = [];
      const today = new Date();
      const daysToShow = selectedPeriod === 'week' ? 7 : 30;
      
      const habitsToShow = selectedHabitId 
        ? settings.habits.filter(habit => habit.id === selectedHabitId)
        : settings.habits;
        
      habitsToShow.forEach((habit) => {
        const dayData: DayData[] = [];
        
        for (let i = daysToShow - 1; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateString = date.toDateString();
          
          const savedCount = localStorage.getItem(`habit-count-${habit.id}-${dateString}`);
          const count = savedCount ? parseInt(savedCount, 10) : 0;
          
          dayData.push({
            date: dateString,
            count: count
          });
        }
        
        // 統計計算
        const totalCount = dayData.reduce((sum, day) => sum + day.count, 0);
        const averageCount = dayData.length > 0 ? Math.round((totalCount / dayData.length) * 10) / 10 : 0;
        const activeDays = dayData.filter(day => day.count > 0).length;
        
        habitsDataArray.push({
          habit: habit,
          dayData: dayData,
          totalCount: totalCount,
          averageCount: averageCount,
          activeDays: activeDays
        });
      });
      
      setHabitsData(habitsDataArray);
    };

    loadHistoricalData();
  }, [selectedPeriod, settings.habits, selectedHabitId]);

  // 最大カウント数を取得（グラフのスケール用）
  const getMaxCount = (dayData: DayData[]) => {
    return Math.max(...dayData.map(d => d.count), 1);
  };

  // 色を調整するヘルパー関数
  const adjustColor = (color: string, amount: number) => {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // 棒グラフの高さを計算
  const getBarHeight = (count: number, maxCount: number) => {
    return (count / maxCount) * 200; // 最大200px
  };

  // 日付を短縮形式で表示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });
  };

  // 今日かどうかを判定
  const isToday = (dateString: string) => {
    return new Date(dateString).toDateString() === new Date().toDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-400 rounded-2xl mb-6 shadow-2xl">
            <span className="text-white text-2xl font-black">クセ</span>
          </div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
            グラフ
          </h1>
        </div>

        {/* 期間選択ボタン */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              selectedPeriod === 'week'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl transform scale-105'
                : 'bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            過去7日間
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              selectedPeriod === 'month'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl transform scale-105'
                : 'bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            過去30日間
          </button>
        </div>

        {/* 癖ごとのグラフエリア */}
        {habitsData.map((habitData) => {
          const maxCount = getMaxCount(habitData.dayData);
          return (
            <div key={habitData.habit.id} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 hover:shadow-3xl transition-all duration-300">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: habitData.habit.color }}
                  >
                    {habitData.habit.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {habitData.habit.name}
                    </h2>
                    <p className="text-gray-300 text-sm">
                      {selectedPeriod === 'week' ? '過去7日間の推移' : '過去30日間の推移'}
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/20">
                  <span className="text-white text-sm font-semibold">最大カウント:</span>
                  <span className="text-white font-bold" style={{ color: habitData.habit.color }}>
                    {maxCount}回
                  </span>
                </div>
              </div>

              {/* 棒グラフ */}
              <div className="h-64 flex items-end justify-between gap-2 mb-4">
                 {habitData.dayData.map((day) => (
                   <div key={day.date} className="flex flex-col items-center flex-1">
                    <div className="w-full flex flex-col items-center">
                      {/* カウント数表示 */}
                      <div className="text-xs font-semibold text-gray-600 mb-1">
                        {day.count}
                      </div>
                      
                      {/* 棒グラフ */}
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                          isToday(day.date)
                            ? 'bg-gradient-to-t'
                            : 'bg-gradient-to-t'
                        }`}
                        style={{ 
                          height: `${getBarHeight(day.count, maxCount)}px`,
                          background: isToday(day.date)
                            ? `linear-gradient(to top, ${habitData.habit.color}, ${adjustColor(habitData.habit.color, -20)})`
                            : `linear-gradient(to top, ${habitData.habit.color}80, ${habitData.habit.color}40)`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* X軸ラベル */}
               <div className="flex justify-between text-sm text-gray-300">
                 {habitData.dayData.map((day) => (
                   <div key={day.date} className="flex-1 text-center">
                    <div className="font-semibold">{formatDate(day.date)}</div>
                    {isToday(day.date) && (
                      <div className="text-xs font-bold mt-1 px-2 py-1 bg-white/20 rounded-lg" style={{ color: habitData.habit.color }}>
                        今日
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* 癖ごとの統計情報 */}
        {habitsData.map((habitData) => (
          <div key={`stats-${habitData.habit.id}`} className="mb-8">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-2xl shadow-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: habitData.habit.color }}
                >
                  {habitData.habit.name.charAt(0)}
                </div>
                {habitData.habit.name} の統計
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 text-center border border-white/20 hover:scale-105 transition-transform duration-300">
                  <div 
                    className="text-4xl font-black mb-3"
                    style={{ color: habitData.habit.color }}
                  >
                    {habitData.totalCount}
                  </div>
                  <div className="text-gray-300 font-semibold">総カウント数</div>
                </div>
                
                <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 text-center border border-white/20 hover:scale-105 transition-transform duration-300">
                  <div 
                    className="text-4xl font-black mb-3"
                    style={{ color: habitData.habit.color }}
                  >
                    {habitData.averageCount}
                  </div>
                  <div className="text-gray-300 font-semibold">平均カウント数</div>
                </div>
                
                <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 text-center border border-white/20 hover:scale-105 transition-transform duration-300">
                  <div 
                    className="text-4xl font-black mb-3"
                    style={{ color: habitData.habit.color }}
                  >
                    {habitData.activeDays}
                  </div>
                  <div className="text-gray-300 font-semibold">カウントした日数</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* データがない場合のメッセージ */}
        {habitsData.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-500 to-gray-600 rounded-3xl mb-6 shadow-2xl">
              <span className="text-white text-4xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">まだ癖が登録されていません</h3>
            <p className="text-gray-300 text-lg">設定画面で癖を追加してください</p>
          </div>
        )}
      </div>
    </div>
  );
}

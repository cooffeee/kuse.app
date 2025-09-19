'use client';

import { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';

export default function SettingsScreen() {
  const { settings, updateHabitName, updateHabitGoal, updateNotifications, getActiveHabit, addHabit, setActiveHabit, removeHabit } = useApp();
  const activeHabit = getActiveHabit();
  
  // 入力フィールドのローカル状態
  const [habitNameInput, setHabitNameInput] = useState('');
  const [goalInput, setGoalInput] = useState(0);
  
  // 新しい癖の追加フォームの状態
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitColor, setNewHabitColor] = useState('#8B5CF6');
  const [newHabitGoal, setNewHabitGoal] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // 削除確認の状態
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    habitId: string;
    habitName: string;
    step: 1 | 2;
  }>({
    show: false,
    habitId: '',
    habitName: '',
    step: 1
  });

  // アクティブな癖が変更された時にローカル状態を更新
  useEffect(() => {
    if (activeHabit) {
      setHabitNameInput(activeHabit.name);
      setGoalInput(activeHabit.dailyGoal);
    }
  }, [activeHabit]);

  // 癖の名前変更ハンドラー
  const handleHabitNameChange = (value: string) => {
    setHabitNameInput(value);
    if (activeHabit) {
      updateHabitName(activeHabit.id, value);
    }
  };

  // 目標変更ハンドラー
  const handleGoalChange = (value: number) => {
    setGoalInput(value);
    if (activeHabit) {
      updateHabitGoal(activeHabit.id, value);
    }
  };

  // 新しい癖の追加ハンドラー
  const handleAddHabit = () => {
    if (newHabitName.trim()) {
      addHabit({
        name: newHabitName.trim(),
        color: newHabitColor,
        dailyGoal: newHabitGoal
      });
      
      // フォームをリセット
      setNewHabitName('');
      setNewHabitColor('#8B5CF6');
      setNewHabitGoal(0);
      setShowAddForm(false);
    }
  };

  // 癖の切り替えハンドラー
  const handleHabitSwitch = (habitId: string) => {
    setActiveHabit(habitId);
  };

  // 今日のカウントを取得する関数
  const getTodayCount = (habitId: string) => {
    const today = new Date().toDateString();
    const savedCount = localStorage.getItem(`habit-count-${habitId}-${today}`);
    return savedCount ? parseInt(savedCount, 10) : 0;
  };

  // 継続日数を計算する関数
  const calculateContinuationDays = (habitId: string) => {
    if (!habitId) return 0;
    
    const habit = settings.habits.find(h => h.id === habitId);
    if (!habit) return 0;
    
    const habitCreatedDate = new Date(habit.createdAt);
    const today = new Date();
    const diffTime = today.getTime() - habitCreatedDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 最低1日は表示
    return Math.max(1, diffDays);
  };

  // 削除確認の開始
  const handleDeleteStart = (habitId: string, habitName: string) => {
    setDeleteConfirm({
      show: true,
      habitId,
      habitName,
      step: 1
    });
  };

  // 削除確認の第2段階
  const handleDeleteConfirm = () => {
    setDeleteConfirm(prev => ({
      ...prev,
      step: 2
    }));
  };

  // 削除の実行
  const handleDeleteExecute = () => {
    removeHabit(deleteConfirm.habitId);
    setDeleteConfirm({
      show: false,
      habitId: '',
      habitName: '',
      step: 1
    });
  };

  // 削除のキャンセル
  const handleDeleteCancel = () => {
    setDeleteConfirm({
      show: false,
      habitId: '',
      habitName: '',
      step: 1
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-400 rounded-2xl mb-6 shadow-2xl">
            <span className="text-white text-2xl font-black">クセ</span>
          </div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-3">
            設定
          </h1>
          <p className="text-gray-300 text-lg">アプリの設定をカスタマイズできます</p>
        </div>

        {/* 設定項目 */}
        <div className="space-y-8">
          {/* 癖の管理 */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">癖の管理</h3>
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {showAddForm ? 'キャンセル' : '+ 癖を追加'}
              </button>
            </div>

            {/* 新しい癖の追加フォーム */}
            {showAddForm && (
              <div className="mb-8 p-6 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl">
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  新しい癖を追加
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      癖の名前
                    </label>
                    <input
                      type="text"
                      value={newHabitName}
                      onChange={(e) => setNewHabitName(e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-300"
                      placeholder="例: 爪を噛む、髪を触る"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        色
                      </label>
                      <input
                        type="color"
                        value={newHabitColor}
                        onChange={(e) => setNewHabitColor(e.target.value)}
                        className="w-full h-12 border-2 border-white/30 rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        目標（回/日）
                      </label>
                      <input
                        type="number"
                        value={newHabitGoal}
                        onChange={(e) => setNewHabitGoal(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-300"
                        min="0"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleAddHabit}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      ✨ 追加
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 癖の一覧 */}
            <div className="space-y-4">
              {settings.habits.map((habit) => (
                <div
                  key={habit.id}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                    habit.id === settings.activeHabitId
                      ? 'border-blue-400/50 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm shadow-xl'
                      : 'border-white/20 bg-white/10 backdrop-blur-sm hover:border-white/40 hover:bg-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div 
                      className="flex items-center gap-4 flex-1 cursor-pointer group"
                      onClick={() => handleHabitSwitch(habit.id)}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: habit.color }}
                      >
                        {habit.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg group-hover:text-blue-200 transition-colors duration-300">
                          {habit.name}
                        </div>
                        <div className="text-sm text-gray-300 flex items-center gap-2">
                          <span className="text-blue-400">🎯</span>
                          目標: {habit.dailyGoal}回/日
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div 
                          className="text-2xl font-black group-hover:scale-110 transition-transform duration-300"
                          style={{ color: habit.color }}
                        >
                          {calculateContinuationDays(habit.id)}日目
                        </div>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <span className="text-green-400">🔥</span>
                          継続中
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteStart(habit.id, habit.name);
                        }}
                        className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-300 hover:scale-110"
                        title="癖を削除"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {habit.id === settings.activeHabitId && (
                    <div className="mt-4 flex items-center gap-2 text-blue-300 font-semibold text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      現在選択中
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 癖の名前設定 */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">基本設定</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-3">
                  癖の名前
                </label>
                <input
                  type="text"
                  value={habitNameInput}
                  onChange={(e) => handleHabitNameChange(e.target.value)}
                  className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-300 text-lg"
                  placeholder="例: 爪を噛む、髪を触る"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-3">
                  1日の目標カウント数
                </label>
                <input
                  type="number"
                  value={goalInput}
                  onChange={(e) => handleGoalChange(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-300 text-lg"
                  min="0"
                  placeholder="0 = 目標なし"
                />
                <p className="text-sm text-gray-300 mt-2 flex items-center gap-2">
                  <span className="text-emerald-400">💡</span>
                  目標を設定すると、達成状況を確認できます
                </p>
              </div>
            </div>
          </div>

          {/* 通知設定 */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L16 7l-5.586-5.586a2 2 0 00-2.828 0L4.828 7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">通知設定</h3>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L16 7l-5.586-5.586a2 2 0 00-2.828 0L4.828 7z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-white text-lg">リマインダー通知</div>
                  <div className="text-sm text-gray-300">
                    定期的にカウントを促す通知を送信
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => updateNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300/50 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-red-500 shadow-lg group-hover:scale-105 transition-transform duration-300"></div>
              </label>
            </div>
          </div>



          {/* アプリ情報 */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">アプリ情報</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">v</span>
                  </div>
                  <span className="text-white font-semibold">バージョン</span>
                </div>
                <span className="text-gray-300 font-mono">1.0.0</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">👨‍💻</span>
                  </div>
                  <span className="text-white font-semibold">開発者</span>
                </div>
                <span className="text-gray-300">Kuse App Team</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">📅</span>
                  </div>
                  <span className="text-white font-semibold">最終更新</span>
                </div>
                <span className="text-gray-300">{new Date().toLocaleDateString('ja-JP')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl border border-white/20">
            <span className="text-2xl">✨</span>
            <p className="text-gray-300 font-medium">癖をカウントして、より良い習慣を身につけましょう！</p>
            <span className="text-2xl">✨</span>
          </div>
        </div>
      </div>

      {/* 削除確認ポップアップ */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl max-w-md w-full p-8 border border-white/20">
            {deleteConfirm.step === 1 ? (
              // 第1段階：削除の確認
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">癖を削除しますか？</h3>
                </div>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  「<span className="font-bold text-red-400">{deleteConfirm.habitName}</span>」を削除しようとしています。
                  <br />
                  この操作は取り消せません。
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    削除を続行
                  </button>
                  <button
                    onClick={handleDeleteCancel}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            ) : (
              // 第2段階：最終確認
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-xl">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">最終確認</h3>
                </div>
                <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30 rounded-2xl p-6 mb-8">
                  <p className="text-red-300 font-bold mb-3 text-lg flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    本当に削除しますか？
                  </p>
                  <p className="text-red-200 text-base leading-relaxed">
                    「<span className="font-bold text-red-300">{deleteConfirm.habitName}</span>」とそのすべてのカウントデータが完全に削除されます。
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleDeleteExecute}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    はい、削除します
                  </button>
                  <button
                    onClick={handleDeleteCancel}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

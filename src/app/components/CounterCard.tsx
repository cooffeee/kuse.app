'use client';

import React from 'react';

interface CounterCardProps {
  habit: {
    id: string;
    name: string;
    color: string;
    dailyGoal: number;
  };
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  onViewGraph: () => void;
}

const CounterCard: React.FC<CounterCardProps> = ({
  habit,
  count,
  onIncrement,
  onDecrement,
  onReset,
  onViewGraph
}) => {
  return (
    <div 
      className="bg-black rounded-2xl p-4 shadow-lg border border-gray-700 relative"
      style={{ backgroundColor: habit.color === '#000000' ? '#1a1a1a' : habit.color }}
    >
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white text-sm font-medium truncate flex-1 mr-2">
          {habit.name}
        </h3>
        <div className="flex gap-2">
          {/* リセットボタン */}
          <button
            onClick={onReset}
            className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
          >
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          {/* オプションボタン */}
          <button 
            onClick={onViewGraph}
            className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
          >
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* カウント表示 */}
      <div className="text-center mb-4">
        <div className="text-3xl font-bold text-white">
          {count}
        </div>
      </div>

      {/* コントロールボタン */}
      <div className="flex items-center justify-center gap-1">
        {/* マイナスボタン */}
        <button
          onClick={onDecrement}
          className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
        >
          <span className="text-white text-lg font-bold">-</span>
        </button>
        
        {/* 区切り線 */}
        <div className="w-px h-6 bg-gray-500 mx-2"></div>
        
        {/* プラスボタン */}
        <button
          onClick={onIncrement}
          className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
        >
          <span className="text-white text-lg font-bold">+</span>
        </button>
      </div>
    </div>
  );
};

export default CounterCard;

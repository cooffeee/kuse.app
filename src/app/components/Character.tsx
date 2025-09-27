'use client';

import React, { useState } from 'react';

interface CharacterProps {
  count: number;
  maxCount: number;
}

const Character: React.FC<CharacterProps> = ({ count, maxCount }) => {
  // カウント数に基づいて表情を決定（5段階）
  const getExpression = () => {
    if (count === 0) return 'neutral'; // 0回: 普通
    if (count <= maxCount * 0.2) return 'happy'; // 20%以下: 嬉しい
    if (count <= maxCount * 0.4) return 'excited'; // 40%以下: 興奮
    if (count <= maxCount * 0.6) return 'very-happy'; // 60%以下: とても嬉しい
    return 'ecstatic'; // 60%以上: 最高に嬉しい
  };

  const expression = getExpression();
  
  // カウント数に基づいてメッセージを決定
  const getMessage = () => {
    if (count === 0) return '今日も頑張ろう！';
    if (count <= maxCount * 0.2) return 'いい調子だね！';
    if (count <= maxCount * 0.4) return 'すごいね！';
    if (count <= maxCount * 0.6) return '最高だよ！';
    return '君は本当にすごい！';
  };

  const message = getMessage();

  // オリジナルカモノハシキャラクターのSVG
  const renderCharacter = () => {
    return (
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className="drop-shadow-lg"
        style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' }}
      >
        {/* カモノハシの体 */}
        <ellipse
          cx="40"
          cy="45"
          rx="25"
          ry="20"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="1"
        />
        
        {/* カモノハシの頭 */}
        <ellipse
          cx="40"
          cy="30"
          rx="18"
          ry="15"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="1"
        />
        
        {/* くちばし */}
        <ellipse
          cx="40"
          cy="25"
          rx="8"
          ry="4"
          fill="#FFB6C1"
          stroke="#FF69B4"
          strokeWidth="1"
        />
        
        {/* 目 */}
        <circle
          cx="35"
          cy="28"
          r="3"
          fill="white"
        />
        <circle
          cx="45"
          cy="28"
          r="3"
          fill="white"
        />
        
        {/* 瞳 */}
        <circle
          cx="35"
          cy="28"
          r="2"
          fill={expression === 'neutral' ? '#333' : expression === 'happy' ? '#0066CC' : expression === 'excited' ? '#00AA00' : expression === 'very-happy' ? '#FF6600' : '#FF0000'}
        />
        <circle
          cx="45"
          cy="28"
          r="2"
          fill={expression === 'neutral' ? '#333' : expression === 'happy' ? '#0066CC' : expression === 'excited' ? '#00AA00' : expression === 'very-happy' ? '#FF6600' : '#FF0000'}
        />
        
        {/* 目のハイライト */}
        <circle
          cx="35.5"
          cy="27.5"
          r="0.8"
          fill="white"
        />
        <circle
          cx="45.5"
          cy="27.5"
          r="0.8"
          fill="white"
        />
        
        {/* 眉毛（表情に応じて変化） */}
        {expression === 'happy' || expression === 'excited' || expression === 'very-happy' || expression === 'ecstatic' ? (
          <>
            <path
              d="M 30 25 Q 35 22 40 25"
              stroke="#654321"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 50 25 Q 45 22 40 25"
              stroke="#654321"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <path
              d="M 30 25 Q 35 25 40 25"
              stroke="#654321"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 50 25 Q 45 25 40 25"
              stroke="#654321"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </>
        )}
        
        {/* 口（表情に応じて変化） */}
        {expression === 'neutral' ? (
          <path
            d="M 35 32 Q 40 34 45 32"
            stroke="#654321"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        ) : expression === 'happy' ? (
          <path
            d="M 35 32 Q 40 35 45 32"
            stroke="#654321"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        ) : expression === 'excited' ? (
          <ellipse
            cx="40"
            cy="33"
            rx="4"
            ry="2"
            fill="#FF69B4"
            stroke="#FF1493"
            strokeWidth="1"
          />
        ) : expression === 'very-happy' ? (
          <ellipse
            cx="40"
            cy="33"
            rx="5"
            ry="3"
            fill="#FF69B4"
            stroke="#FF1493"
            strokeWidth="1"
          />
        ) : (
          <ellipse
            cx="40"
            cy="33"
            rx="6"
            ry="4"
            fill="#FF69B4"
            stroke="#FF1493"
            strokeWidth="1"
          />
        )}
        
        {/* 足 */}
        <ellipse
          cx="30"
          cy="60"
          rx="6"
          ry="8"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="1"
        />
        <ellipse
          cx="50"
          cy="60"
          rx="6"
          ry="8"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="1"
        />
        
        {/* 尻尾 */}
        <ellipse
          cx="15"
          cy="50"
          rx="8"
          ry="15"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="1"
          transform="rotate(-30 15 50)"
        />
        
        {/* 尻尾の模様 */}
        <ellipse
          cx="12"
          cy="45"
          rx="3"
          ry="6"
          fill="#654321"
          transform="rotate(-30 12 45)"
        />
        <ellipse
          cx="18"
          cy="55"
          rx="3"
          ry="6"
          fill="#654321"
          transform="rotate(-30 18 55)"
        />
        
        {/* 手 */}
        <ellipse
          cx="20"
          cy="40"
          rx="4"
          ry="6"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="1"
          transform="rotate(-20 20 40)"
        />
        <ellipse
          cx="60"
          cy="40"
          rx="4"
          ry="6"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="1"
          transform="rotate(20 60 40)"
        />
        
        {/* 水かき */}
        <path
          d="M 18 38 Q 20 42 22 38"
          stroke="#654321"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 58 38 Q 60 42 62 38"
          stroke="#654321"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      {/* オリジナルカモノハシキャラクター */}
      <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
        {renderCharacter()}
      </div>
      
      {/* キャラクターのメッセージ */}
      <div className="text-center">
        <p className="text-white text-lg font-medium bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-pink-300/30">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Character;
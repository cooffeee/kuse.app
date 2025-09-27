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

  // オリジナル猫キャラクターのSVG
  const renderCharacter = () => {
    return (
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className="drop-shadow-lg"
        style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' }}
      >
        {/* 猫の頭 */}
        <ellipse
          cx="40"
          cy="40"
          rx="22"
          ry="20"
          fill="#FFA500"
          stroke="#FF8C00"
          strokeWidth="1.5"
        />
        
        {/* 猫の耳（左） */}
        <polygon
          points="25,25 20,15 30,20"
          fill="#FFA500"
          stroke="#FF8C00"
          strokeWidth="1.5"
        />
        <polygon
          points="27,22 22,17 30,20"
          fill="#FFB6C1"
          stroke="#FF69B4"
          strokeWidth="1"
        />
        
        {/* 猫の耳（右） */}
        <polygon
          points="55,25 60,15 50,20"
          fill="#FFA500"
          stroke="#FF8C00"
          strokeWidth="1.5"
        />
        <polygon
          points="53,22 58,17 50,20"
          fill="#FFB6C1"
          stroke="#FF69B4"
          strokeWidth="1"
        />
        
        {/* 猫の目（左） */}
        <ellipse
          cx="32"
          cy="35"
          rx="4"
          ry="5"
          fill="white"
          stroke="#333"
          strokeWidth="1"
        />
        <ellipse
          cx="48"
          cy="35"
          rx="4"
          ry="5"
          fill="white"
          stroke="#333"
          strokeWidth="1"
        />
        
        {/* 猫の瞳（左） */}
        <ellipse
          cx="32"
          cy="35"
          rx="2.5"
          ry="3.5"
          fill={expression === 'neutral' ? '#333' : expression === 'happy' ? '#0066CC' : expression === 'excited' ? '#00AA00' : expression === 'very-happy' ? '#FF6600' : '#FF0000'}
        />
        <ellipse
          cx="48"
          cy="35"
          rx="2.5"
          ry="3.5"
          fill={expression === 'neutral' ? '#333' : expression === 'happy' ? '#0066CC' : expression === 'excited' ? '#00AA00' : expression === 'very-happy' ? '#FF6600' : '#FF0000'}
        />
        
        {/* 目のハイライト */}
        <ellipse
          cx="33"
          cy="33"
          rx="1"
          ry="1.5"
          fill="white"
        />
        <ellipse
          cx="49"
          cy="33"
          rx="1"
          ry="1.5"
          fill="white"
        />
        
        {/* 猫の鼻 */}
        <polygon
          points="40,42 38,45 42,45"
          fill="#FFB6C1"
          stroke="#FF69B4"
          strokeWidth="1"
        />
        
        {/* 猫の口（表情に応じて変化） */}
        {expression === 'excited' ? (
          <ellipse
            cx="40"
            cy="48"
            rx="3"
            ry="2"
            fill="#FF69B4"
            stroke="#FF1493"
            strokeWidth="1"
          />
        ) : expression === 'very-happy' ? (
          <ellipse
            cx="40"
            cy="48"
            rx="4"
            ry="3"
            fill="#FF69B4"
            stroke="#FF1493"
            strokeWidth="1"
          />
        ) : expression === 'ecstatic' ? (
          <ellipse
            cx="40"
            cy="48"
            rx="5"
            ry="4"
            fill="#FF69B4"
            stroke="#FF1493"
            strokeWidth="1"
          />
        ) : null}
        
        {/* 猫のひげ（左） */}
        <path
          d="M 20 40 Q 15 40 10 38"
          stroke="#333"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 20 42 Q 15 42 10 40"
          stroke="#333"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 20 44 Q 15 44 10 42"
          stroke="#333"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* 猫のひげ（右） */}
        <path
          d="M 60 40 Q 65 40 70 38"
          stroke="#333"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 60 42 Q 65 42 70 40"
          stroke="#333"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 60 44 Q 65 44 70 42"
          stroke="#333"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* 猫の模様（額） */}
        <ellipse
          cx="40"
          cy="28"
          rx="3"
          ry="2"
          fill="#FF8C00"
        />
        
        {/* 猫の模様（頬） */}
        <ellipse
          cx="25"
          cy="45"
          rx="2"
          ry="3"
          fill="#FF8C00"
        />
        <ellipse
          cx="55"
          cy="45"
          rx="2"
          ry="3"
          fill="#FF8C00"
        />
        
        {/* 眉毛（表情に応じて変化） */}
        {expression === 'happy' || expression === 'excited' || expression === 'very-happy' || expression === 'ecstatic' ? (
          <>
            <path
              d="M 28 30 Q 32 27 36 30"
              stroke="#FF8C00"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 52 30 Q 48 27 44 30"
              stroke="#FF8C00"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <path
              d="M 28 30 Q 32 30 36 30"
              stroke="#FF8C00"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 52 30 Q 48 30 44 30"
              stroke="#FF8C00"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      {/* オリジナル猫キャラクター */}
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
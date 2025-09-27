'use client';

import React, { useState } from 'react';

interface CharacterProps {
  count: number;
  maxCount: number;
}

const Character: React.FC<CharacterProps> = ({ count, maxCount }) => {
  // カウント数に基づいて表情を決定（5段階）- 癖をなくすためのアプリ
  const getExpression = () => {
    if (count === 0) return 'neutral'; // 0回: 普通
    if (count <= 3) return 'worried'; // 1-3回: 心配
    if (count <= 6) return 'sad'; // 4-6回: 悲しい
    if (count <= 12) return 'very-sad'; // 7-12回: とても悲しい
    if (count <= 20) return 'desperate'; // 13-20回: 絶望的
    return 'crying'; // 20回以上: 涙を流す
  };

  const expression = getExpression();
  
  // カウント数に基づいてメッセージを決定（癖をなくすためのアプリ）
  const getMessage = () => {
    if (count === 0) return '今日も頑張ろう！';
    if (count <= 3) return 'よく耐えてるね...';
    if (count <= 6) return '応援してるよ！';
    if (count <= 12) return '心配で仕方ないよ...';
    if (count <= 20) return 'あきらめないで！';
    return '一緒に頑張ろう...';
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
          fill={expression === 'neutral' ? '#333' : expression === 'worried' ? '#FFA500' : expression === 'sad' ? '#FF6B6B' : expression === 'very-sad' ? '#8B0000' : expression === 'desperate' ? '#4B0000' : '#2B0000'}
        />
        <ellipse
          cx="48"
          cy="35"
          rx="2.5"
          ry="3.5"
          fill={expression === 'neutral' ? '#333' : expression === 'worried' ? '#FFA500' : expression === 'sad' ? '#FF6B6B' : expression === 'very-sad' ? '#8B0000' : expression === 'desperate' ? '#4B0000' : '#2B0000'}
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
        {expression === 'sad' ? (
          <path
            d="M 35 48 Q 40 45 45 48"
            stroke="#333"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        ) : expression === 'very-sad' ? (
          <path
            d="M 35 48 Q 40 44 45 48"
            stroke="#333"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        ) : expression === 'desperate' ? (
          <path
            d="M 35 48 Q 40 42 45 48"
            stroke="#333"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        ) : expression === 'crying' ? (
          <path
            d="M 35 48 Q 40 40 45 48"
            stroke="#333"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
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
        {expression === 'worried' ? (
          <>
            <path
              d="M 28 30 Q 32 32 36 30"
              stroke="#FF8C00"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 52 30 Q 48 32 44 30"
              stroke="#FF8C00"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </>
        ) : expression === 'sad' || expression === 'very-sad' || expression === 'desperate' || expression === 'crying' ? (
          <>
            <path
              d="M 28 30 Q 32 33 36 30"
              stroke="#FF8C00"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 52 30 Q 48 33 44 30"
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
        
        {/* 涙（涙を流す表情の時のみ） */}
        {expression === 'crying' && (
          <>
            {/* 左目の涙 */}
            <ellipse
              cx="30"
              cy="42"
              rx="1.5"
              ry="3"
              fill="#87CEEB"
              stroke="#4682B4"
              strokeWidth="0.5"
            />
            <ellipse
              cx="30"
              cy="45"
              rx="1"
              ry="2"
              fill="#87CEEB"
              stroke="#4682B4"
              strokeWidth="0.5"
            />
            {/* 右目の涙 */}
            <ellipse
              cx="50"
              cy="42"
              rx="1.5"
              ry="3"
              fill="#87CEEB"
              stroke="#4682B4"
              strokeWidth="0.5"
            />
            <ellipse
              cx="50"
              cy="45"
              rx="1"
              ry="2"
              fill="#87CEEB"
              stroke="#4682B4"
              strokeWidth="0.5"
            />
          </>
        )}
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      {/* オリジナル猫キャラクター */}
      <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
        {renderCharacter()}
      </div>
      
      {/* キャラクターのメッセージ */}
      <div className="text-center mt-2">
        <p className="text-white text-lg font-medium bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-pink-300/30">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Character;
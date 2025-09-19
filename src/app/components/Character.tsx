'use client';

import { useState, useEffect } from 'react';

interface CharacterProps {
  count: number;
}

export default function Character({ count }: CharacterProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  // countがNaNまたは無効な値の場合の処理
  const safeCount = isNaN(count) || count < 0 ? 0 : count;

  // カウントに応じてキャラクターの表情を決定
  const getCharacterState = (count: number) => {
    if (count === 0) return 'happy';
    if (count <= 3) return 'neutral';
    if (count <= 7) return 'worried';
    if (count <= 12) return 'sad';
    return 'very-sad';
  };

  const characterState = getCharacterState(safeCount);

  // カウントが変更された時にアニメーションを実行
  useEffect(() => {
    if (safeCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [safeCount]);

  // キャラクターの表情に応じたSVG
  const renderCharacter = () => {
    const baseSize = 120;
    const animationClass = isAnimating ? 'animate-pulse' : '';

    switch (characterState) {
      case 'happy':
        return (
          <div className={`${animationClass} transition-all duration-500`}>
            <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" className="drop-shadow-lg">
              {/* 顔の輪郭 */}
              <circle cx="60" cy="60" r="50" fill="#FFE4B5" stroke="#D4AF8C" strokeWidth="2"/>
              
              {/* 目（嬉しい） */}
              <ellipse cx="45" cy="50" rx="8" ry="12" fill="#333"/>
              <ellipse cx="75" cy="50" rx="8" ry="12" fill="#333"/>
              
              {/* 口（笑顔） */}
              <path d="M 40 75 Q 60 90 80 75" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round"/>
              
              {/* 頬の赤み */}
              <circle cx="35" cy="65" r="4" fill="#FFB6C1" opacity="0.6"/>
              <circle cx="85" cy="65" r="4" fill="#FFB6C1" opacity="0.6"/>
            </svg>
          </div>
        );

      case 'neutral':
        return (
          <div className={`${animationClass} transition-all duration-500`}>
            <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" className="drop-shadow-lg">
              {/* 顔の輪郭 */}
              <circle cx="60" cy="60" r="50" fill="#FFE4B5" stroke="#D4AF8C" strokeWidth="2"/>
              
              {/* 目（普通） */}
              <circle cx="45" cy="50" r="6" fill="#333"/>
              <circle cx="75" cy="50" r="6" fill="#333"/>
              
              {/* 口（普通） */}
              <line x1="45" y1="75" x2="75" y2="75" stroke="#333" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
        );

      case 'worried':
        return (
          <div className={`${animationClass} transition-all duration-500`}>
            <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" className="drop-shadow-lg">
              {/* 顔の輪郭 */}
              <circle cx="60" cy="60" r="50" fill="#FFE4B5" stroke="#D4AF8C" strokeWidth="2"/>
              
              {/* 目（心配） */}
              <ellipse cx="45" cy="48" rx="6" ry="8" fill="#333"/>
              <ellipse cx="75" cy="48" rx="6" ry="8" fill="#333"/>
              
              {/* 眉（心配） */}
              <path d="M 40 40 Q 45 35 50 40" stroke="#333" strokeWidth="2" fill="none"/>
              <path d="M 70 40 Q 75 35 80 40" stroke="#333" strokeWidth="2" fill="none"/>
              
              {/* 口（心配） */}
              <path d="M 45 75 Q 60 70 75 75" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        );

      case 'sad':
        return (
          <div className={`${animationClass} transition-all duration-500`}>
            <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" className="drop-shadow-lg">
              {/* 顔の輪郭 */}
              <circle cx="60" cy="60" r="50" fill="#FFE4B5" stroke="#D4AF8C" strokeWidth="2"/>
              
              {/* 目（悲しい） */}
              <ellipse cx="45" cy="50" rx="6" ry="8" fill="#333"/>
              <ellipse cx="75" cy="50" rx="6" ry="8" fill="#333"/>
              
              {/* 眉（悲しい） */}
              <path d="M 40 40 Q 45 45 50 40" stroke="#333" strokeWidth="2" fill="none"/>
              <path d="M 70 40 Q 75 45 80 40" stroke="#333" strokeWidth="2" fill="none"/>
              
              {/* 口（悲しい） */}
              <path d="M 45 75 Q 60 85 75 75" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        );

      case 'very-sad':
        return (
          <div className={`${animationClass} transition-all duration-500`}>
            <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" className="drop-shadow-lg">
              {/* 顔の輪郭 */}
              <circle cx="60" cy="60" r="50" fill="#FFE4B5" stroke="#D4AF8C" strokeWidth="2"/>
              
              {/* 目（とても悲しい） */}
              <ellipse cx="45" cy="50" rx="6" ry="8" fill="#333"/>
              <ellipse cx="75" cy="50" rx="6" ry="8" fill="#333"/>
              
              {/* 涙 */}
              <ellipse cx="45" cy="65" rx="2" ry="4" fill="#87CEEB" opacity="0.8"/>
              <ellipse cx="75" cy="65" rx="2" ry="4" fill="#87CEEB" opacity="0.8"/>
              
              {/* 眉（とても悲しい） */}
              <path d="M 40 40 Q 45 45 50 40" stroke="#333" strokeWidth="2" fill="none"/>
              <path d="M 70 40 Q 75 45 80 40" stroke="#333" strokeWidth="2" fill="none"/>
              
              {/* 口（とても悲しい） */}
              <path d="M 45 80 Q 60 90 75 80" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        );

      default:
        return null;
    }
  };

  // キャラクターの状態に応じたメッセージ
  const getMessage = (state: string) => {
    switch (state) {
      case 'happy':
        return '今日は調子がいいね！';
      case 'neutral':
        return 'まあまあかな？';
      case 'worried':
        return '少し心配だよ...';
      case 'sad':
        return '大丈夫？';
      case 'very-sad':
        return '心配で仕方ないよ...';
      default:
        return '';
    }
  };

          return (
            <div className="text-center flex flex-col items-center">
              <div className="mb-4 flex justify-center">
                {renderCharacter()}
              </div>
              <div className="text-lg font-medium text-white mb-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                {getMessage(characterState)}
              </div>
            </div>
          );
}

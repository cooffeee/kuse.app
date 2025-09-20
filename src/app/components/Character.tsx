'use client';

import { useState, useEffect } from 'react';

interface CharacterProps {
  count: number;
}

export default function Character({ count }: CharacterProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  // countがNaNまたは無効な値の場合の処理
  const safeCount = isNaN(count) || count < 0 ? 0 : count;

  // カウントに応じてキャラクターの表情を決定（5段階）
  const getCharacterState = (count: number) => {
    if (count === 0) return 'very-happy';      // 0回：とても嬉しい
    if (count <= 2) return 'happy';            // 1-2回：嬉しい
    if (count <= 5) return 'neutral';          // 3-5回：普通
    if (count <= 8) return 'worried';          // 6-8回：心配
    return 'sad';                              // 9回以上：悲しい
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

  // キャラクターの表情に応じた画像（カモノハシ）
  const renderCharacter = () => {
    const baseSize = 224; // カウントボタンと同じサイズ（w-56 h-56 = 224px）
    const animationClass = isAnimating ? 'animate-pulse' : '';

    switch (characterState) {
      case 'very-happy':
        return (
          <div className={`${animationClass} transition-all duration-500`} style={{ backgroundColor: 'transparent' }}>
            {/* 背景透過を確実にするためのSVGラッパー */}
            <svg width={baseSize} height={baseSize} viewBox="0 0 224 224" style={{ backgroundColor: 'transparent' }}>
              <defs>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,0.3)"/>
                </filter>
              </defs>
              <image 
                href="/images/platypus-very-happy.png" 
                x="0" 
                y="0" 
                width="224" 
                height="224"
                filter="url(#shadow)"
                style={{ backgroundColor: 'transparent' }}
              />
            </svg>
          </div>
        );

      case 'happy':
        return (
          <div className={`${animationClass} transition-all duration-500`}>
            <img 
              src="/images/platypus-happy.png" 
              alt="嬉しいカモノハシ" 
              width={baseSize} 
              height={baseSize}
              className="drop-shadow-2xl"
              style={{ 
                backgroundColor: 'transparent',
                backgroundImage: 'none'
              }}
            />
          </div>
        );

      case 'neutral':
        return (
          <div className={`${animationClass} transition-all duration-500`}>
            <img 
              src="/images/platypus-neutral.png" 
              alt="普通のカモノハシ" 
              width={baseSize} 
              height={baseSize}
              className="drop-shadow-2xl"
              style={{ 
                backgroundColor: 'transparent',
                backgroundImage: 'none'
              }}
            />
          </div>
        );

      case 'worried':
        return (
          <div className={`${animationClass} transition-all duration-500`}>
            <img 
              src="/images/platypus-worried.png" 
              alt="心配なカモノハシ" 
              width={baseSize} 
              height={baseSize}
              className="drop-shadow-2xl"
              style={{ 
                backgroundColor: 'transparent',
                backgroundImage: 'none'
              }}
            />
          </div>
        );

      case 'sad':
        return (
          <div className={`${animationClass} transition-all duration-500`}>
            <img 
              src="/images/platypus-sad.png" 
              alt="悲しいカモノハシ" 
              width={baseSize} 
              height={baseSize}
              className="drop-shadow-2xl"
              style={{ 
                backgroundColor: 'transparent',
                backgroundImage: 'none'
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // キャラクターの状態に応じたメッセージ（5段階）
  const getMessage = (state: string) => {
    switch (state) {
      case 'very-happy':
        return 'やったー！最高だよ！✨';
      case 'happy':
        return '今日は調子がいいね！';
      case 'neutral':
        return 'まあまあかな？';
      case 'worried':
        return '少し心配だよ...';
      case 'sad':
        return '大丈夫？';
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

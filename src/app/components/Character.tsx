'use client';

import React, { useState } from 'react';

interface CharacterProps {
  count: number;
  maxCount: number;
}

const Character: React.FC<CharacterProps> = ({ count, maxCount }) => {
  const [imageError, setImageError] = useState(false);

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

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      {/* カモノハシキャラクター */}
      <div className="relative w-20 h-20 mb-4">
        {!imageError ? (
          <div className="relative w-full h-full">
            {/* SVGマスクで背景を完全に除去 */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              <defs>
                <mask id="characterMask">
                  <rect width="100%" height="100%" fill="white" />
                  <image
                    href="/images/platypus-very-happy.png"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                  />
                </mask>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="transparent"
                mask="url(#characterMask)"
              />
            </svg>
            {/* フォールバック用の画像 */}
            <img
              src="/images/platypus-very-happy.png"
              alt="カモノハシキャラクター"
              className="absolute inset-0 w-full h-full object-contain"
              onError={() => setImageError(true)}
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                backgroundColor: 'transparent !important',
                backgroundImage: 'none !important',
                background: 'transparent !important',
                mixBlendMode: 'multiply',
                isolation: 'isolate',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                zIndex: 2,
                WebkitMask: 'url(/images/platypus-very-happy.png) no-repeat center/contain',
                mask: 'url(/images/platypus-very-happy.png) no-repeat center/contain',
                WebkitMaskComposite: 'source-in',
                maskComposite: 'intersect'
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">🦆</span>
          </div>
        )}
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
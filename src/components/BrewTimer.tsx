import React, { useState, useEffect } from 'react';

interface BrewTimerProps {
  onClose: () => void;
}

const BrewTimer: React.FC<BrewTimerProps> = ({ onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('pourover');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  const methods = {
    pourover: { name: 'Pour Over', time: 240, steps: ['Bloom (30s)', 'Pour 1 (60s)', 'Pour 2 (60s)', 'Drain (90s)'] },
    frenchpress: { name: 'French Press', time: 240, steps: ['Bloom (30s)', 'Steep (210s)', 'Press (30s)'] },
    espresso: { name: 'Espresso', time: 30, steps: ['Prep (5s)', 'Extract (25s)'] },
    aeropress: { name: 'AeroPress', time: 120, steps: ['Bloom (10s)', 'Steep (60s)', 'Press (30s)', 'Dilute (20s)'] },
    coldbrew: { name: 'Cold Brew', time: 43200, steps: ['Steep (12-24h)', 'Strain'] },
  };

  useEffect(() => {
    let interval: number;
    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => window.clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = (seconds: number) => {
    setTimeLeft(seconds);
    setTotalTime(seconds);
    setIsRunning(true);
  };

  const resetTimer = () => {
    setTimeLeft(methods[selectedMethod as keyof typeof methods].time);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-stone-900 border border-stone-700/50 rounded-2xl max-w-lg w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-amber-100">Brew Timer</h2>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-amber-300 hover:bg-stone-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Method Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
          {Object.entries(methods).map(([key, method]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedMethod(key);
                setTimeLeft(0);
                setIsRunning(false);
              }}
              className={`p-3 rounded-xl text-sm font-medium transition-all ${
                selectedMethod === key
                  ? 'bg-amber-700 text-white'
                  : 'bg-stone-800 text-stone-400 hover:bg-stone-700 border border-stone-700/50'
              }`}
            >
              {method.name}
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div className="text-center mb-6">
          <div className="relative w-48 h-48 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-stone-700"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                className="text-amber-500 transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-amber-100">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3 justify-center">
            {!isRunning ? (
              <button
                onClick={() => startTimer(methods[selectedMethod as keyof typeof methods].time)}
                className="px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
              >
                {timeLeft > 0 ? 'Tiếp tục' : 'Bắt đầu'}
              </button>
            ) : (
              <button
                onClick={() => setIsRunning(false)}
                className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-amber-200 font-semibold rounded-xl border border-stone-700 transition-colors"
              >
                Tạm dừng
              </button>
            )}
            <button
              onClick={resetTimer}
              className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold rounded-xl border border-stone-700 transition-colors"
            >
              Đặt lại
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-stone-800/30 border border-stone-700/30 rounded-xl p-4">
          <h3 className="text-amber-200 font-medium mb-3 text-sm">Các bước pha chế</h3>
          <div className="space-y-2">
            {methods[selectedMethod as keyof typeof methods].steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 bg-amber-700 rounded-full flex items-center justify-center text-xs text-white font-bold">
                  {i + 1}
                </span>
                <span className="text-stone-300">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrewTimer;

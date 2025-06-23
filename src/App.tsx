import React, { useState, useEffect, useCallback } from 'react';
import { Volume2 } from 'lucide-react';

interface DrumPad {
  key: string;
  id: string;
  name: string;
  src: string;
}

const drumPads: DrumPad[] = [
  { key: 'Q', id: 'Heater-1', name: 'Heater 1', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', id: 'Heater-2', name: 'Heater 2', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', id: 'Heater-3', name: 'Heater 3', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', id: 'Heater-4', name: 'Heater 4', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', id: 'Clap', name: 'Clap', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', id: 'Open-HH', name: 'Open HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', id: 'Kick-n-Hat', name: "Kick n' Hat", src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', id: 'Kick', name: 'Kick', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', id: 'Closed-HH', name: 'Closed HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
];

function App() {
  const [display, setDisplay] = useState<string>('');
  const [activePad, setActivePad] = useState<string>('');

  const playSound = useCallback((padData: DrumPad) => {
    const audio = document.getElementById(padData.key) as HTMLAudioElement;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setDisplay(padData.name);
      setActivePad(padData.key);
      
      // Remove active state after animation
      setTimeout(() => setActivePad(''), 150);
    }
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const key = event.key.toUpperCase();
    const padData = drumPads.find(pad => pad.key === key);
    if (padData) {
      playSound(padData);
    }
  }, [playSound]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Volume2 className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Drum Machine
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Click the pads or use your keyboard
          </p>
        </div>

        {/* Main Drum Machine Container */}
        <div 
          id="drum-machine" 
          className="bg-black/40 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10"
        >
          {/* Display */}
          <div className="mb-8">
            <div 
              id="display" 
              className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl p-6 text-center border border-cyan-500/30"
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                {display || 'Ready to play'}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Sound Display
              </div>
            </div>
          </div>

          {/* Drum Pads Grid */}
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {drumPads.map((pad) => (
              <button
                key={pad.key}
                id={pad.id}
                className={`drum-pad group relative overflow-hidden rounded-xl aspect-square flex items-center justify-center text-2xl md:text-3xl font-bold transition-all duration-150 transform ${
                  activePad === pad.key
                    ? 'scale-95 bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg shadow-cyan-500/50'
                    : 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30'
                } border border-white/20 hover:border-cyan-400/50 active:scale-95`}
                onClick={() => playSound(pad)}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-purple-500/0 group-hover:from-cyan-400/20 group-hover:to-purple-500/20 transition-all duration-300" />
                
                {/* Key letter */}
                <span className={`relative z-10 transition-colors duration-150 ${
                  activePad === pad.key ? 'text-white' : 'text-gray-200 group-hover:text-white'
                }`}>
                  {pad.key}
                </span>

                {/* Audio element */}
                <audio
                  className="clip"
                  id={pad.key}
                  src={pad.src}
                  preload="auto"
                />

                {/* Ripple effect */}
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-active:opacity-100 group-active:animate-ping" />
              </button>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-8 text-center">
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-4">
              {drumPads.map((pad, index) => (
                <div key={pad.key} className="flex flex-col items-center">
                  <div className="font-mono font-bold text-cyan-400">{pad.key}</div>
                  <div className="truncate w-full text-center">{pad.name}</div>
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              Press the corresponding keys on your keyboard or click the pads above
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          Built with React & Tailwind CSS
        <p className="text-purple-400 font-medium">Designed and Coded by Ayokanmi Adejola</p>
        </div>
      </div>
    </div>
  );
}

export default App;
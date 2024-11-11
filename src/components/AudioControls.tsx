import React from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface AudioControlsProps {
  isMuted: boolean;
  isDeafened: boolean;
  onToggleMute: () => void;
  onToggleDeafen: () => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  isMuted,
  isDeafened,
  onToggleMute,
  onToggleDeafen
}) => {
  return (
    <div className="flex items-center space-x-4 bg-racing-black p-4 border-t border-racing-gray border-opacity-20">
      <button
        onClick={onToggleMute}
        className={`p-2 rounded-full transition-all ${
          isMuted ? 'bg-racing-red bg-opacity-20 text-racing-red' : 'hover:bg-racing-red hover:bg-opacity-10'
        }`}
      >
        {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
      </button>
      <button
        onClick={onToggleDeafen}
        className={`p-2 rounded-full transition-all ${
          isDeafened ? 'bg-racing-red bg-opacity-20 text-racing-red' : 'hover:bg-racing-red hover:bg-opacity-10'
        }`}
      >
        {isDeafened ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
};

export default AudioControls;
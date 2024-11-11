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
    <div className="flex items-center justify-center md:justify-start space-x-4 bg-racing-black p-4 border-t border-racing-gray border-opacity-20">
      <button
        onClick={onToggleMute}
        className={`p-3 md:p-2 rounded-full transition-all ${
          isMuted ? 'bg-racing-green bg-opacity-20 text-racing-green' : 'hover:bg-racing-green hover:bg-opacity-10'
        }`}
        title={isMuted ? "Ativar microfone" : "Desativar microfone"}
      >
        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
      </button>
      <button
        onClick={onToggleDeafen}
        className={`p-3 md:p-2 rounded-full transition-all ${
          isDeafened ? 'bg-racing-green bg-opacity-20 text-racing-green' : 'hover:bg-racing-green hover:bg-opacity-10'
        }`}
        title={isDeafened ? "Ativar áudio" : "Desativar áudio"}
      >
        {isDeafened ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
};

export default AudioControls;
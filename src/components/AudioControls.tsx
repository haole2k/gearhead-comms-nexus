import React from 'react';
import { Mic, MicOff, Volume2, VolumeX, Radio, Shield, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface AudioControlsProps {
  isMuted: boolean;
  isDeafened: boolean;
  isPTTActive?: boolean;
  isEmergencyChannel?: boolean;
  volume?: number;
  onToggleMute: () => void;
  onToggleDeafen: () => void;
  onPTT?: (active: boolean) => void;
  onVolumeChange?: (value: number) => void;
  onEmergencyAlert?: () => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  isMuted,
  isDeafened,
  isPTTActive,
  isEmergencyChannel,
  volume = 100,
  onToggleMute,
  onToggleDeafen,
  onPTT,
  onVolumeChange,
  onEmergencyAlert
}) => {
  return (
    <div className="flex items-center justify-between md:justify-start space-x-4 bg-racing-black p-4 border-t border-racing-gray border-opacity-20">
      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleMute}
          className={cn(
            "p-3 md:p-2 rounded-full transition-all",
            isMuted ? "bg-racing-green bg-opacity-20 text-racing-green" : "hover:bg-racing-green hover:bg-opacity-10"
          )}
          title={isMuted ? "Ativar microfone" : "Desativar microfone"}
        >
          {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
        </button>
        <button
          onClick={onToggleDeafen}
          className={cn(
            "p-3 md:p-2 rounded-full transition-all",
            isDeafened ? "bg-racing-green bg-opacity-20 text-racing-green" : "hover:bg-racing-green hover:bg-opacity-10"
          )}
          title={isDeafened ? "Ativar áudio" : "Desativar áudio"}
        >
          {isDeafened ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>

      {onVolumeChange && (
        <div className="hidden md:flex items-center space-x-2 flex-1 max-w-xs">
          <Volume2 size={16} />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={(value) => onVolumeChange(value[0])}
          />
        </div>
      )}

      <div className="flex items-center space-x-2">
        {onPTT && (
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "transition-all",
              isPTTActive && "bg-racing-green text-white"
            )}
            onMouseDown={() => onPTT(true)}
            onMouseUp={() => onPTT(false)}
            onTouchStart={() => onPTT(true)}
            onTouchEnd={() => onPTT(false)}
          >
            <Radio size={16} className="mr-2" />
            PTT
          </Button>
        )}

        {isEmergencyChannel && onEmergencyAlert && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onEmergencyAlert}
            className="bg-racing-red hover:bg-racing-red/90"
          >
            <Shield size={16} className="mr-2" />
            Emergência
          </Button>
        )}
      </div>
    </div>
  );
};

export default AudioControls;
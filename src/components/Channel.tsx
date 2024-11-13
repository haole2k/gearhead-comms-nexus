import React from 'react';
import { MessageSquare, Radio, Users, Gauge, AlertTriangle, Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ChannelType = 'general' | 'pit_stop' | 'strategy' | 'telemetry' | 'emergency';

interface ChannelProps {
  name: string;
  type: ChannelType;
  isActive: boolean;
  onClick: () => void;
  memberCount: number;
  isPriority?: boolean;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

const getChannelIcon = (type: ChannelType) => {
  switch (type) {
    case 'general':
      return <MessageSquare size={16} />;
    case 'pit_stop':
      return <Users size={16} />;
    case 'strategy':
      return <Radio size={16} />;
    case 'telemetry':
      return <Gauge size={16} />;
    case 'emergency':
      return <AlertTriangle size={16} className="text-racing-red" />;
    default:
      return <MessageSquare size={16} />;
  }
};

const Channel: React.FC<ChannelProps> = ({ 
  name, 
  type,
  isActive, 
  onClick, 
  memberCount,
  isPriority,
  isMuted,
  onToggleMute 
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 cursor-pointer transition-all hover:bg-racing-green hover:bg-opacity-10",
        isActive && "bg-racing-green bg-opacity-5",
        isPriority && "border-l-4 border-racing-red"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getChannelIcon(type)}
          <span className="font-medium">{name}</span>
          {isPriority && (
            <span className="text-xs bg-racing-red text-white px-2 py-0.5 rounded-full">
              Prioritário
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm opacity-75">{memberCount} membros</span>
          {onToggleMute && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleMute();
              }}
              className="p-1 hover:bg-racing-green hover:bg-opacity-10"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Channel;
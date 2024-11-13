import React from 'react';
import { MessageSquare, Radio, Users, Gauge, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChannelType } from './Channel';

interface CompactChannelProps {
  name: string;
  type: ChannelType;
  isActive: boolean;
  onClick: () => void;
  memberCount: number;
  hasUnread?: boolean;
}

const CompactChannel: React.FC<CompactChannelProps> = ({
  name,
  type,
  isActive,
  onClick,
  memberCount,
  hasUnread
}) => {
  const getIcon = () => {
    switch (type) {
      case 'general': return <MessageSquare size={16} />;
      case 'pit_stop': return <Users size={16} />;
      case 'strategy': return <Radio size={16} />;
      case 'telemetry': return <Gauge size={16} />;
      case 'emergency': return <AlertTriangle size={16} className="text-racing-red" />;
      default: return <MessageSquare size={16} />;
    }
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start px-2 py-1",
        isActive && "bg-racing-green bg-opacity-10",
        hasUnread && "font-bold"
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-2">
        {getIcon()}
        <span className="truncate">{name}</span>
        <span className="text-xs opacity-75">({memberCount})</span>
      </div>
    </Button>
  );
};

export default CompactChannel;
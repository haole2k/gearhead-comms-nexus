import React from 'react';
import { MessageSquare, Radio, Users, Gauge, AlertTriangle } from 'lucide-react';

interface ChannelProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
  memberCount: number;
}

const getChannelIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'geral':
      return <MessageSquare size={16} />;
    case 'pit stop':
      return <Users size={16} />;
    case 'estratégia':
      return <Radio size={16} />;
    case 'telemetria':
      return <Gauge size={16} />;
    case 'emergência':
      return <AlertTriangle size={16} />;
    default:
      return <MessageSquare size={16} />;
  }
};

const Channel: React.FC<ChannelProps> = ({ name, isActive, onClick, memberCount }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 cursor-pointer transition-all hover:bg-racing-green hover:bg-opacity-10 ${
        isActive ? 'channel-active' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getChannelIcon(name)}
          <span className="font-medium">{name}</span>
        </div>
        <span className="text-sm opacity-75">{memberCount} membros</span>
      </div>
    </div>
  );
};

export default Channel;
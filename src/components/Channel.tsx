import React from 'react';
import { Radio } from 'lucide-react';

interface ChannelProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
  memberCount: number;
}

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
          <Radio size={16} className={isActive ? 'text-racing-green' : ''} />
          <span className="font-medium">{name}</span>
        </div>
        <span className="text-sm opacity-75">{memberCount} membros</span>
      </div>
    </div>
  );
};

export default Channel;
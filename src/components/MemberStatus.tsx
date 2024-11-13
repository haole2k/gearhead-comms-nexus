import React from 'react';
import { UserRound, Signal, SignalHigh } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Member {
  id: string;
  name: string;
  role: string;
  isOnline: boolean;
  isSpeaking: boolean;
}

interface MemberStatusProps {
  member: Member;
}

const MemberStatus: React.FC<MemberStatusProps> = ({ member }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-racing-green hover:bg-opacity-5 transition-all
            ${member.isOnline ? 'member-online' : 'opacity-50'} 
            ${member.isSpeaking ? 'member-speaking' : ''}`}
          >
            <div className="flex-shrink-0">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-racing-gray bg-opacity-10 flex items-center justify-center">
                <UserRound className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{member.name}</p>
              <p className="text-sm text-racing-gray opacity-75 truncate">{member.role}</p>
            </div>
            <div className="flex-shrink-0">
              {member.isSpeaking ? (
                <SignalHigh className="w-4 h-4 text-racing-green animate-pulse" />
              ) : (
                member.isOnline && <Signal className="w-4 h-4" />
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{member.isOnline ? 'Online' : 'Offline'}</p>
          <p className="text-xs opacity-75">{member.role}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MemberStatus;
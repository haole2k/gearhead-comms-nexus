import React from 'react';
import { UserRound, Signal, SignalHigh, Crown, Timer, Flag, Car, Gauge } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Member {
  id: string;
  name: string;
  role: string;
  isOnline: boolean;
  isSpeaking: boolean;
  lastActive?: string;
  isTeamLead?: boolean;
  lapTime?: string;
  telemetryData?: {
    speed?: number;
    fuel?: number;
    tireWear?: number;
  };
}

interface MemberStatusProps {
  member: Member;
}

const MemberStatus: React.FC<MemberStatusProps> = ({ member }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn(
            "flex items-center space-x-3 p-2 rounded-lg transition-all",
            "hover:bg-racing-green hover:bg-opacity-5",
            member.isOnline ? "opacity-100" : "opacity-50",
            member.isSpeaking && "animate-pulse border border-racing-green"
          )}>
            <div className="flex-shrink-0 relative">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-racing-gray bg-opacity-10 flex items-center justify-center">
                {member.role.includes('DRIVER') ? (
                  <Car className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <UserRound className="w-5 h-5 md:w-6 md:h-6" />
                )}
              </div>
              {member.isTeamLead && (
                <Crown className="w-4 h-4 text-racing-green absolute -top-1 -right-1" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{member.name}</p>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-racing-gray opacity-75 truncate">{member.role}</p>
                {member.lapTime && (
                  <div className="flex items-center text-xs text-racing-green">
                    <Timer className="w-3 h-3 mr-1" />
                    {member.lapTime}
                  </div>
                )}
                {member.telemetryData && (
                  <div className="flex items-center text-xs text-racing-blue">
                    <Gauge className="w-3 h-3 mr-1" />
                    {member.telemetryData.speed}km/h
                  </div>
                )}
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center space-x-2">
              {member.isSpeaking ? (
                <SignalHigh className="w-4 h-4 text-racing-green animate-pulse" />
              ) : (
                member.isOnline && <Signal className="w-4 h-4" />
              )}
              {member.lastActive && (
                <Flag className="w-4 h-4 text-racing-red" />
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{member.isOnline ? 'Online' : 'Offline'}</p>
          <p className="text-xs opacity-75">{member.role}</p>
          {member.lastActive && (
            <p className="text-xs text-racing-red">Última atividade: {member.lastActive}</p>
          )}
          {member.lapTime && (
            <p className="text-xs text-racing-green">Melhor volta: {member.lapTime}</p>
          )}
          {member.telemetryData && (
            <>
              <p className="text-xs text-racing-blue">Velocidade: {member.telemetryData.speed}km/h</p>
              <p className="text-xs text-racing-orange">Combustível: {member.telemetryData.fuel}%</p>
              <p className="text-xs text-racing-purple">Desgaste dos pneus: {member.telemetryData.tireWear}%</p>
            </>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MemberStatus;
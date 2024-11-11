import React from 'react';

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
    <div className={`flex items-center space-x-3 p-2 ${member.isOnline ? 'member-online' : 'opacity-50'} ${member.isSpeaking ? 'member-speaking' : ''}`}>
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-racing-gray flex items-center justify-center">
          {member.name[0].toUpperCase()}
        </div>
      </div>
      <div>
        <p className="font-medium">{member.name}</p>
        <p className="text-sm text-racing-gray opacity-75">{member.role}</p>
      </div>
    </div>
  );
};

export default MemberStatus;
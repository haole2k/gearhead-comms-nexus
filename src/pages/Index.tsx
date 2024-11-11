import React, { useState } from 'react';
import Channel from '../components/Channel';
import MemberStatus from '../components/MemberStatus';
import AudioControls from '../components/AudioControls';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [activeChannel, setActiveChannel] = useState('geral');
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  const channels = [
    { id: 'geral', name: 'Geral', memberCount: 8 },
    { id: 'pit-stop', name: 'Pit Stop', memberCount: 4 },
    { id: 'estrategia', name: 'Estratégia', memberCount: 3 },
    { id: 'mecanicos', name: 'Mecânicos', memberCount: 5 },
  ];

  const members = [
    { id: '1', name: 'João Silva', role: 'Chefe de Equipe', isOnline: true, isSpeaking: false },
    { id: '2', name: 'Maria Santos', role: 'Piloto Principal', isOnline: true, isSpeaking: true },
    { id: '3', name: 'Pedro Costa', role: 'Engenheiro Chefe', isOnline: true, isSpeaking: false },
    { id: '4', name: 'Ana Oliveira', role: 'Estrategista', isOnline: false, isSpeaking: false },
  ];

  const handleChannelChange = (channelId: string) => {
    setActiveChannel(channelId);
    toast({
      title: "Canal alterado",
      description: `Você entrou no canal ${channels.find(c => c.id === channelId)?.name}`,
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar com canais */}
      <div className="w-64 bg-racing-black border-r border-racing-gray border-opacity-20">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-racing-red mb-6">Gearhead Racing</h1>
          <div className="space-y-1">
            {channels.map((channel) => (
              <Channel
                key={channel.id}
                name={channel.name}
                isActive={activeChannel === channel.id}
                onClick={() => handleChannelChange(channel.id)}
                memberCount={channel.memberCount}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Área principal */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <h2 className="text-xl font-bold mb-4">
            {channels.find(c => c.id === activeChannel)?.name}
          </h2>
          <div className="space-y-2">
            {members.map((member) => (
              <MemberStatus key={member.id} member={member} />
            ))}
          </div>
        </div>
        <AudioControls
          isMuted={isMuted}
          isDeafened={isDeafened}
          onToggleMute={() => setIsMuted(!isMuted)}
          onToggleDeafen={() => setIsDeafened(!isDeafened)}
        />
      </div>
    </div>
  );
};

export default Index;
import React, { useState } from 'react';
import Channel from '../components/Channel';
import MemberStatus from '../components/MemberStatus';
import AudioControls from '../components/AudioControls';
import { useToast } from '@/components/ui/use-toast';
import { Menu, X, Radio } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const [activeChannel, setActiveChannel] = useState('geral');
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const channels = [
    { id: 'geral', name: 'Geral', memberCount: 8 },
    { id: 'pit-stop', name: 'Pit Stop', memberCount: 4 },
    { id: 'estrategia', name: 'Estratégia', memberCount: 3 },
    { id: 'mecanicos', name: 'Mecânicos', memberCount: 5 },
    { id: 'telemetria', name: 'Telemetria', memberCount: 2 },
    { id: 'emergencia', name: 'Emergência', memberCount: 1 },
  ];

  const members = [
    { 
      id: '1', 
      name: 'João Silva', 
      role: 'Chefe de Equipe', 
      isOnline: true, 
      isSpeaking: false,
      isTeamLead: true 
    },
    { 
      id: '2', 
      name: 'Maria Santos', 
      role: 'Piloto Principal', 
      isOnline: true, 
      isSpeaking: true,
      lapTime: '1:32.456' 
    },
    { 
      id: '3', 
      name: 'Pedro Costa', 
      role: 'Engenheiro Chefe', 
      isOnline: true, 
      isSpeaking: false,
      lastActive: '2 min atrás' 
    },
    { 
      id: '4', 
      name: 'Ana Oliveira', 
      role: 'Estrategista', 
      isOnline: false, 
      isSpeaking: false,
      lastActive: '15 min atrás' 
    },
  ];

  const handleChannelChange = (channelId: string) => {
    setActiveChannel(channelId);
    setIsMobileMenuOpen(false);
    toast({
      title: "Canal alterado",
      description: `Você entrou no canal ${channels.find(c => c.id === channelId)?.name}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-racing-black p-4 flex items-center justify-between border-b border-racing-gray border-opacity-20">
        <div className="flex items-center space-x-2">
          <Radio className="text-racing-green" size={24} />
          <h1 className="text-xl font-bold text-racing-green">Bacarin Racing</h1>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-racing-green hover:bg-opacity-10 rounded-md transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        ${isMobileMenuOpen ? 'mobile-menu' : 'hidden'} 
        md:block w-full md:w-64 bg-racing-black border-r border-racing-gray border-opacity-20
      `}>
        <div className="p-4">
          <div className="hidden md:block">
            <div className="flex items-center space-x-2 mb-6">
              <Radio className="text-racing-green" size={24} />
              <h1 className="text-2xl font-bold text-racing-green">Bacarin Racing</h1>
            </div>
          </div>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 md:p-6">
          <h2 className="text-xl font-bold mb-4 slide-in">
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
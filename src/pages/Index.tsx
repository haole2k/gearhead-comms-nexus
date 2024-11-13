import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Channel, { ChannelType } from '../components/Channel';
import MemberStatus from '../components/MemberStatus';
import AudioControls from '../components/AudioControls';
import TelemetryChart from '../components/TelemetryChart';
import { useToast } from '@/components/ui/use-toast';
import { Menu, X, Radio, UserRound, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import CompactChannel from '../components/CompactChannel';

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeChannel, setActiveChannel] = useState('geral');
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompactMode, setIsCompactMode] = useState(false);
  const [showTelemetry, setShowTelemetry] = useState(false);

  const channels = [
    { id: 'geral', name: 'Geral', type: 'general' as ChannelType, memberCount: 8 },
    { id: 'pit-stop', name: 'Pit Stop', type: 'pit_stop' as ChannelType, memberCount: 4 },
    { id: 'estrategia', name: 'Estratégia', type: 'strategy' as ChannelType, memberCount: 3 },
    { id: 'telemetria', name: 'Telemetria', type: 'telemetry' as ChannelType, memberCount: 2 },
    { id: 'emergencia', name: 'Emergência', type: 'emergency' as ChannelType, memberCount: 1 },
  ];

  const members = [
    { 
      id: '1', 
      name: 'Eduardo Bacarin', 
      role: 'Piloto Principal', 
      isOnline: true, 
      isSpeaking: true,
      lapTime: '1:32.456',
      isTeamLead: true
    },
    { 
      id: '2', 
      name: 'Flavio Bacarin', 
      role: 'Piloto', 
      isOnline: true, 
      isSpeaking: false,
      lapTime: '1:33.128'
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

  // Adicionar handler para atalhos de teclado
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Alt + M para mutar/desmutar
      if (e.altKey && e.key === 'm') {
        setIsMuted(!isMuted);
      }
      // Alt + V para alternar modo compacto
      if (e.altKey && e.key === 'v') {
        setIsCompactMode(!isCompactMode);
      }
      // Alt + T para mostrar/esconder telemetria
      if (e.altKey && e.key === 't') {
        setShowTelemetry(!showTelemetry);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isMuted, isCompactMode, showTelemetry]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-racing-black p-4 flex items-center justify-between border-b border-racing-gray border-opacity-20">
        <div className="flex items-center space-x-2">
          <Radio className="text-racing-green" size={24} />
          <h1 className="text-xl font-bold text-racing-green">Bacarin Racing</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/profile')}
            className="hover:bg-racing-green/10"
          >
            <UserRound className="h-5 w-5" />
          </Button>
          {user?.role === 'ADMIN' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin')}
              className="hover:bg-racing-green/10"
            >
              <LayoutDashboard className="h-5 w-5" />
            </Button>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-racing-green hover:bg-opacity-10 rounded-md transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`
        ${isMobileMenuOpen ? 'mobile-menu' : 'hidden'} 
        md:block w-full md:w-64 bg-racing-black border-r border-racing-gray border-opacity-20
      `}>
        <div className="p-4">
          <div className="hidden md:block">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Radio className="text-racing-green" size={24} />
                <h1 className="text-2xl font-bold text-racing-green">Bacarin Racing</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/profile')}
                  className="hover:bg-racing-green/10"
                >
                  <UserRound className="h-5 w-5" />
                </Button>
                {user?.role === 'ADMIN' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate('/admin')}
                    className="hover:bg-racing-green/10"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-1">
            {channels.map((channel) => (
              isCompactMode ? (
                <CompactChannel
                  key={channel.id}
                  name={channel.name}
                  type={channel.type}
                  isActive={activeChannel === channel.id}
                  onClick={() => handleChannelChange(channel.id)}
                  memberCount={channel.memberCount}
                />
              ) : (
                <Channel
                  key={channel.id}
                  name={channel.name}
                  type={channel.type}
                  isActive={activeChannel === channel.id}
                  onClick={() => handleChannelChange(channel.id)}
                  memberCount={channel.memberCount}
                />
              )
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

          {showTelemetry && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <TelemetryChart
                data={[]} // Adicionar dados reais aqui
                title="Velocidade"
                dataKey="speed"
              />
              <TelemetryChart
                data={[]} // Adicionar dados reais aqui
                title="Combustível"
                dataKey="fuel"
                color="#FF9900"
              />
            </div>
          )}
        </div>
        <AudioControls
          isMuted={isMuted}
          isDeafened={isDeafened}
          onToggleMute={() => setIsMuted(!isMuted)}
          onToggleDeafen={() => setIsDeafened(!isDeafened)}
          shortcuts={{
            mute: 'Alt + M',
            viewMode: 'Alt + V',
            telemetry: 'Alt + T'
          }}
        />
      </div>
    </div>
  );
};

export default Index;

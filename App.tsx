
import React, { useState, useEffect, useCallback } from 'react';
import { AppView, User, VoiceState, NLUResponse } from './types';
import AuthScreen from './components/AuthScreen';
import FeedScreen from './components/FeedScreen';
import CreatePostScreen from './components/CreatePostScreen';
import VoiceCommandInput from './components/VoiceCommandInput';
import Icon from './components/Icon';
import { geminiService } from './services/geminiService';
import { TTS_PROMPTS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.AUTH);
  const [user, setUser] = useState<User | null>(null);
  const [voiceState, setVoiceState] = useState<VoiceState>(VoiceState.IDLE);
  const [ttsMessage, setTtsMessage] = useState<string>(TTS_PROMPTS.welcome);
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  
  // States specific to FeedScreen to be controlled from App
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);


  const handleAuthSuccess = (authedUser: User) => {
    setUser(authedUser);
    setView(AppView.FEED);
    setTtsMessage(TTS_PROMPTS.login_success(authedUser.name));
  };

  const handlePostCreated = () => {
    setView(AppView.FEED);
    setTtsMessage("Returning to your feed.");
  };

  const handleCommand = useCallback(async (command: string) => {
    setLastCommand(command);
    setVoiceState(VoiceState.PROCESSING);

    if (view === AppView.AUTH) {
        // AuthScreen handles its own logic via lastCommand prop
        setVoiceState(VoiceState.IDLE);
        return;
    }
    
    if (view === AppView.CREATE_POST) {
        // CreatePostScreen handles its own logic via lastCommand prop
        setVoiceState(VoiceState.IDLE);
        return;
    }

    const intentResponse = await geminiService.processIntent(command);
    
    switch (intentResponse.intent) {
      case 'intent_next_post':
        // This would be handled inside FeedScreen now, but we can keep a global handler
        // For simplicity, let's assume we need to trigger a re-render or pass a prop
        // to FeedScreen. The current implementation passes the command down.
        setTtsMessage("Next post.");
        break;
      case 'intent_create_post':
        setView(AppView.CREATE_POST);
        break;
      // Add more global commands here
      default:
        setTtsMessage(`Command received: ${command}`);
        break;
    }

    setVoiceState(VoiceState.IDLE);
  }, [view]);

  const renderView = () => {
    switch (view) {
      case AppView.AUTH:
        return (
            <AuthScreen 
                onAuthSuccess={handleAuthSuccess}
                ttsMessage={ttsMessage}
                onSetTtsMessage={setTtsMessage}
                lastCommand={lastCommand}
            />
        );
      case AppView.FEED:
        return <FeedScreen onSetTtsMessage={setTtsMessage} currentCommand={lastCommand || ''} />;
      case AppView.CREATE_POST:
        return user ? (
            <CreatePostScreen 
                user={user} 
                onPostCreated={handlePostCreated} 
                onSetTtsMessage={setTtsMessage}
                lastCommand={lastCommand}
            />
        ) : null;
      default:
        return <div className="text-white">Unknown view</div>;
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-900 flex flex-col font-sans">
      <header className="flex-shrink-0 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 p-4 flex justify-between items-center text-slate-100">
        <div className="flex items-center gap-2">
            <Icon name="logo" className="w-8 h-8 text-rose-500" />
            <h1 className="text-xl font-bold">VoiceBook</h1>
        </div>
        {user && (
            <div className="flex items-center gap-3">
                <span className="text-slate-300 hidden sm:inline">{user.name}</span>
                <img src={user.avatarUrl} alt={user.name} className="w-9 h-9 rounded-full border-2 border-slate-600" />
            </div>
        )}
      </header>

      <main className="flex-grow overflow-hidden">
        {renderView()}
      </main>

      <footer className="flex-shrink-0">
        <div className="bg-slate-800 p-3 text-center text-rose-300/80 text-sm border-t border-slate-700 min-h-[48px]">
            {ttsMessage}
        </div>
        <VoiceCommandInput onSendCommand={handleCommand} voiceState={voiceState} />
      </footer>
    </div>
  );
};

export default App;

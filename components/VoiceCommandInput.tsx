
import React, { useState } from 'react';
import Icon from './Icon';
import { VoiceState } from '../types';

interface VoiceCommandInputProps {
  onSendCommand: (command: string) => void;
  voiceState: VoiceState;
}

const VoiceCommandInput: React.FC<VoiceCommandInputProps> = ({ onSendCommand, voiceState }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendCommand(inputValue.trim());
      setInputValue('');
    }
  };

  const getIndicatorColor = () => {
    switch (voiceState) {
      case VoiceState.LISTENING:
        return 'text-rose-500 animate-pulse';
      case VoiceState.PROCESSING:
        return 'text-yellow-500';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-slate-800 p-4 border-t border-slate-700">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon name="mic" className={`w-6 h-6 ${getIndicatorColor()}`} />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Simulate voice command... (e.g., 'next post', 'record', 'search for sumi')"
          className="bg-slate-900 border border-slate-700 text-slate-100 text-lg rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full pl-12 p-3.5 transition"
        />
        <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-rose-500 transition">
            Send
        </button>
      </div>
    </form>
  );
};

export default VoiceCommandInput;

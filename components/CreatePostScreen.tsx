
import React, { useState, useEffect } from 'react';
import { RecordingState, User } from '../types';
import { TTS_PROMPTS } from '../constants';
import Waveform from './Waveform';
import Icon from './Icon';
import { geminiService } from '../services/geminiService';

interface CreatePostScreenProps {
  user: User;
  onPostCreated: () => void;
  onSetTtsMessage: (message: string) => void;
  lastCommand: string | null;
}

const CreatePostScreen: React.FC<CreatePostScreenProps> = ({ user, onPostCreated, onSetTtsMessage, lastCommand }) => {
  const [recordingState, setRecordingState] = useState<RecordingState>(RecordingState.RECORDING);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    onSetTtsMessage(TTS_PROMPTS.record_start);
    setRecordingState(RecordingState.RECORDING);
    const timer = setInterval(() => {
      setDuration(d => d + 1);
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!lastCommand) return;
    
    const processCommand = async () => {
        const intentResponse = await geminiService.processIntent(lastCommand);
        if (recordingState === RecordingState.RECORDING && intentResponse.intent === 'intent_stop_recording') {
            setRecordingState(RecordingState.PREVIEW);
            onSetTtsMessage(TTS_PROMPTS.record_stopped(duration));
        } else if (recordingState === RecordingState.PREVIEW) {
            if (intentResponse.intent === 'intent_post_confirm') {
                setRecordingState(RecordingState.UPLOADING);
                await geminiService.createPost(user, duration, "This is a new voice post caption.");
                setRecordingState(RecordingState.POSTED);
                onSetTtsMessage(TTS_PROMPTS.post_success);
                setTimeout(onPostCreated, 1500);
            } else if (intentResponse.intent === 'intent_re_record') {
                setDuration(0);
                setRecordingState(RecordingState.RECORDING);
                onSetTtsMessage(TTS_PROMPTS.record_start);
            }
        }
    };
    
    processCommand();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastCommand]);


  const getStatusText = () => {
    switch (recordingState) {
      case RecordingState.RECORDING:
        return 'Recording...';
      case RecordingState.PREVIEW:
        return 'Preview';
      case RecordingState.UPLOADING:
        return 'Publishing...';
      case RecordingState.POSTED:
        return 'Posted!';
      default:
        return 'Ready';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-100 p-8">
      <h2 className="text-3xl font-bold mb-4">{getStatusText()}</h2>
      <p className="text-rose-400 text-lg mb-8 min-h-[3em]">{onSetTtsMessage && TTS_PROMPTS.record_start}</p>
      
      <div className="w-full max-w-lg h-48 bg-slate-800 rounded-2xl flex items-center justify-center p-4 mb-8">
        <Waveform isPlaying={false} isRecording={recordingState === RecordingState.RECORDING} />
      </div>

      <div className="text-4xl font-mono mb-8">
        00:{duration.toString().padStart(2, '0')}
      </div>
      
      {recordingState === RecordingState.PREVIEW && (
        <div className="flex gap-4">
             <p className="text-slate-400">Say "post" or "re-record".</p>
        </div>
      )}
    </div>
  );
};

export default CreatePostScreen;

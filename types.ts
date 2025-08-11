
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
}

export interface Post {
  id: string;
  author: User;
  audioUrl: string;
  caption: string;
  duration: number; // in seconds
  createdAt: string; // ISO 8601 string
  likeCount: number;
  commentCount: number;
}

export interface Comment {
    id: string;
    post: Post;
    author: User;
    audioUrl: string;
    duration: number;
    createdAt: string;
}

export enum AppView {
  AUTH,
  FEED,
  CREATE_POST,
  SEARCH_RESULTS,
  PROFILE,
}

export enum RecordingState {
    IDLE,
    RECORDING,
    PREVIEW,
    UPLOADING,
    POSTED,
}

export enum AuthMode {
    LOGIN,
    SIGNUP_NAME,
    SIGNUP_PASSWORD,
    SIGNUP_CONFIRM_PASSWORD,
}

export enum VoiceState {
    IDLE,
    LISTENING,
    PROCESSING
}

// NLU Intent Types from Gemini
export type Intent = 
  | 'intent_signup' | 'intent_login' | 'intent_play_post' | 'intent_pause_post'
  | 'intent_next_post' | 'intent_previous_post' | 'intent_create_post' | 'intent_stop_recording'
  | 'intent_post_confirm' | 'intent_re_record' | 'intent_comment' | 'intent_search_user'
  | 'intent_select_result' | 'intent_like' | 'intent_share' | 'intent_open_profile'
  | 'intent_change_avatar' | 'intent_help' | 'unknown';

export interface NLUResponse {
  intent: Intent;
  slots?: {
    [key: string]: string | number;
  };
}

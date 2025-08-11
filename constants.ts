
import type { User, Post } from './types';

export const DEFAULT_USER: User = {
    id: 'u_001',
    name: 'Default User',
    avatarUrl: 'https://picsum.photos/seed/default/100/100',
    bio: 'Exploring the world through sound.'
};

export const MOCK_USERS: User[] = [
    { id: 'u_1', name: 'Sumi Ahmed', avatarUrl: 'https://picsum.photos/seed/sumi/100/100', bio: "Designer and dreamer." },
    { id: 'u_2', name: 'Shajib Khan', avatarUrl: 'https://picsum.photos/seed/shajib/100/100', bio: "Engineer building the future." },
    { id: 'u_3', name: 'Sharmin Chowdhury', avatarUrl: 'https://picsum.photos/seed/sharmin/100/100', bio: "Musician and artist." },
];

export const MOCK_POSTS: Post[] = [
    {
        id: 'p_1',
        author: MOCK_USERS[0],
        audioUrl: '#',
        caption: 'Just had some amazing coffee this morning. Feeling energized! ☕️',
        duration: 12,
        createdAt: '2024-05-21T08:00:00Z',
        likeCount: 42,
        commentCount: 8,
    },
    {
        id: 'p_2',
        author: MOCK_USERS[1],
        audioUrl: '#',
        caption: 'Working on a new feature for VoiceBook. I think you are all going to love it.',
        duration: 25,
        createdAt: '2024-05-21T07:30:00Z',
        likeCount: 128,
        commentCount: 23,
    },
    {
        id: 'p_3',
        author: MOCK_USERS[2],
        audioUrl: '#',
        caption: 'A short melody I came up with today. Let me know what you think!',
        duration: 35,
        createdAt: '2024-05-20T18:45:00Z',
        likeCount: 256,
        commentCount: 54,
    },
];

export const TTS_PROMPTS = {
    welcome: "Welcome to VoiceBook. Say 'sign up' to create an account or 'log in' to continue.",
    signup_name: "Please say your name.",
    signup_password: "Now say a secure password. I will not display it.",
    signup_confirm_password: "Repeat the password to confirm.",
    signup_password_mismatch: "Passwords do not match. Say the password again.",
    signup_success: "Account created. Say 'take me to my feed' or 'play my feed'.",
    login_name: "Say your name.",
    login_password: "Say your password.",
    login_fail: "Sorry, I couldn't log you in. Please check your details and try again.",
    login_success: (name: string) => `Welcome back, ${name}. Loading your feed.`,
    feed_loaded: "Playing feed. Say 'play', 'pause', 'next', 'previous', 'comment', 'like', 'share', or 'search' at any time.",
    record_start: "Recording will start after the beep. Say 'stop' to finish.",
    record_stopped: (duration: number) => `You recorded ${duration} seconds. Say 'post' to publish, 're-record' to redo, or 'save draft'.`,
    post_success: "Posted. Your voice is live.",
    comment_start: "Record your comment after the beep. Say 'end' to finish.",
    comment_success: "Your comment has been posted.",
    like_success: (author: string) => `You liked ${author}'s post.`,
    error_generic: "Sorry, I didn't catch that. Could you say it again, please?",
    help: "You can say commands like 'next post', 'record a new voice', or 'search for a friend'.",
};

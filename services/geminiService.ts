
import { GoogleGenAI, Type } from "@google/genai";
import { NLUResponse, Intent, Post, User } from '../types';
import { MOCK_POSTS, MOCK_USERS } from '../constants';

// IMPORTANT: This service uses a mock implementation for demonstration.
// A real application would have robust API calls to a secure backend.

// Ensure the API key is available, but do not handle its input in the UI.
if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Gemini API calls will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const NLU_SYSTEM_INSTRUCTION = `
You are an NLU engine for a voice-controlled app called VoiceBook. Your task is to identify the user's intent and extract any relevant entities from their command. 
Respond ONLY with a valid JSON object with the shape: { "intent": "INTENT_NAME", "slots": { "slot_name": "value" } }.
If the intent cannot be determined, use "unknown".

Available intents: 
- intent_signup
- intent_login
- intent_play_post
- intent_pause_post
- intent_next_post
- intent_previous_post
- intent_create_post
- intent_stop_recording
- intent_post_confirm
- intent_re_record
- intent_comment
- intent_search_user (extracts 'target_name')
- intent_select_result (extracts 'index')
- intent_like
- intent_share
- intent_open_profile
- intent_help
- unknown

Example:
User command: "search for shajib khan"
Your response:
{"intent": "intent_search_user", "slots": {"target_name": "shajib khan"}}

User command: "go to number two"
Your response:
{"intent": "intent_select_result", "slots": {"index": 2}}
`;

export const geminiService = {
    // Simulates NLU by calling Gemini
    async processIntent(command: string): Promise<NLUResponse> {
        if (!process.env.API_KEY) {
            // Fallback for when API key is not available
            const lowerCommand = command.toLowerCase();
            if (lowerCommand.includes('login') || lowerCommand.includes('sign in')) return { intent: 'intent_login' };
            if (lowerCommand.includes('signup') || lowerCommand.includes('sign up')) return { intent: 'intent_signup' };
            if (lowerCommand.includes('next')) return { intent: 'intent_next_post' };
            if (lowerCommand.includes('previous') || lowerCommand.includes('back')) return { intent: 'intent_previous_post' };
            if (lowerCommand.includes('play')) return { intent: 'intent_play_post' };
            if (lowerCommand.includes('pause') || lowerCommand.includes('stop')) return { intent: 'intent_pause_post' };
            if (lowerCommand.includes('record') || lowerCommand.includes('post')) return { intent: 'intent_create_post' };
            if (lowerCommand.includes('search')) return { intent: 'intent_search_user', slots: { target_name: lowerCommand.replace('search for', '').trim() }};
            return { intent: 'unknown' };
        }

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `User command: "${command}"`,
                config: {
                  systemInstruction: NLU_SYSTEM_INSTRUCTION,
                  responseMimeType: "application/json",
                  responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                      intent: { type: Type.STRING },
                      slots: {
                        type: Type.OBJECT,
                        nullable: true,
                        properties: {
                            target_name: { type: Type.STRING, nullable: true },
                            index: { type: Type.INTEGER, nullable: true }
                        }
                      }
                    }
                  }
                },
            });
            
            const text = response.text.trim();
            const parsed = JSON.parse(text);
            return parsed as NLUResponse;

        } catch (error) {
            console.error("Error processing intent with Gemini:", error);
            return { intent: 'unknown' };
        }
    },

    // Mock Backend Functions
    async login(name: string, pass: string): Promise<User | null> {
        console.log(`Attempting login for ${name} with password ${pass}`);
        // In a real app, this would be a fetch call to POST /api/auth/login
        const foundUser = MOCK_USERS.find(u => u.name.toLowerCase() === name.toLowerCase());
        return new Promise(resolve => setTimeout(() => resolve(foundUser || null), 500));
    },

    async signup(name: string, pass: string): Promise<User | null> {
        console.log(`Attempting signup for ${name} with password ${pass}`);
        const newUser: User = {
            id: `u_${Date.now()}`,
            name: name,
            avatarUrl: `https://picsum.photos/seed/${name}/100/100`,
            bio: 'Just joined VoiceBook!'
        };
        MOCK_USERS.push(newUser);
        return new Promise(resolve => setTimeout(() => resolve(newUser), 500));
    },

    async getFeed(): Promise<Post[]> {
        return new Promise(resolve => setTimeout(() => resolve(MOCK_POSTS), 800));
    },

    async createPost(user: User, duration: number, caption: string = ''): Promise<Post> {
        const newPost: Post = {
            id: `p_${Date.now()}`,
            author: user,
            audioUrl: '#',
            caption: caption || 'A new voice post.',
            duration: duration,
            createdAt: new Date().toISOString(),
            likeCount: 0,
            commentCount: 0,
        };
        MOCK_POSTS.unshift(newPost); // Add to the top of the feed
        return new Promise(resolve => setTimeout(() => resolve(newPost), 1000));
    },

    async searchUsers(query: string): Promise<User[]> {
        const lowerQuery = query.toLowerCase();
        const results = MOCK_USERS.filter(u => u.name.toLowerCase().includes(lowerQuery));
        return new Promise(resolve => setTimeout(() => resolve(results), 500));
    },
};

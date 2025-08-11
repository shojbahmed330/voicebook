
import React from 'react';

type IconName = 'mic' | 'like' | 'comment' | 'share' | 'play' | 'pause' | 'logo';

interface IconProps {
  name: IconName;
  className?: string;
}

const ICONS: Record<IconName, React.ReactNode> = {
  mic: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m12 0v-1.5a6 6 0 00-12 0v1.5m12 0v-1.5a6 6 0 00-12 0v1.5" />
    </svg>
  ),
  like: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  comment: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.158 2.075.34 3.074.493a51.697 51.697 0 01-1.222 3.65C6.517 20.65 6.22 21 5.922 21c-.3 0-.596-.35-1.02-.918l-1.42-1.42a1.5 1.5 0 010-2.12z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.76c0 1.6-1.123 2.994-2.707 3.227-1.068.158-2.075.34-3.074.493a51.697 51.697 0 001.222 3.65c.498.81.795 1.35.997 1.35.3 0 .596-.35 1.02-.918l1.42-1.42a1.5 1.5 0 000-2.12z" />
       <path strokeLinecap="round" strokeLinejoin="round" d="M15.585 17.585a3 3 0 01-4.242 0L10.5 16.75l-1.085 1.085a3 3 0 01-4.242 0l-.375-.375a3 3 0 010-4.242l4.5-4.5a3 3 0 014.242 0l1.085 1.085.375.375a3 3 0 010 4.242z" />
    </svg>
  ),
  share: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 100-2.186m0 2.186c-.18-.324-.283-.696-.283-1.093s.103-.77.283-1.093m0 2.186l-9.566-5.314" />
    </svg>
  ),
  play: (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
     </svg>
  ),
  pause: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
    </svg>
  ),
  logo: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m12 0v-1.5a6 6 0 00-12 0v1.5m12 0v-1.5a6 6 0 00-12 0v1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21a2.25 2.25 0 01-2.25-2.25v-8.25a2.25 2.25 0 012.25-2.25h.5a2.25 2.25 0 012.25 2.25v8.25a2.25 2.25 0 01-2.25 2.25h-.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 21a2.25 2.25 0 002.25-2.25v-8.25a2.25 2.25 0 00-2.25-2.25h-.5a2.25 2.25 0 00-2.25 2.25v8.25a2.25 2.25 0 002.25 2.25h.5z" />
    </svg>
  )
};

const Icon: React.FC<IconProps> = ({ name, className }) => {
  return (
    <div className={className}>
      {ICONS[name]}
    </div>
  );
};

export default Icon;

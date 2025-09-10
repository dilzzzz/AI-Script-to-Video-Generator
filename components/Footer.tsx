
import React from 'react';

const VercelLogo: React.FC = () => (
  <svg
    aria-label="Vercel Logo"
    fill="white"
    height="20"
    viewBox="0 0 283 64"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.64 0 12.56-2.64 16.16-7.2l-4.88-3.92c-2.96 2.64-7.44 4.24-11.28 4.24-6.32 0-10.56-3.2-11.68-7.92H160v-4.96c0-10.8-8.16-18.16-18.96-18.16zM132.08 42c1.2-4.16 4.56-6.88 9.44-6.88 4.64 0 8.08 2.72 9.44 6.88h-18.88zM219.2 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.64 0 12.56-2.64 16.16-7.2l-4.88-3.92c-2.96 2.64-7.44 4.24-11.28 4.24-6.32 0-10.56-3.2-11.68-7.92H240v-4.96c0-10.8-8.16-18.16-18.96-18.16zM210.24 42c1.2-4.16 4.56-6.88 9.44-6.88 4.64 0 8.08 2.72 9.44 6.88h-18.88zM248.72 16l-5.84 29.12H232l5.84-29.12h10.88zM259.36 16v30h10.24v-30h-10.24zM282.24 16l-5.84 29.12H265.6l5.84-29.12h10.8zM192.96 21.28l5.52-5.28h10.24l-9.36 9.28 9.2 10.72h-10.24l-5.36-6.16-5.36 6.16h-10.24l9.2-10.72-9.36-9.28h10.24l5.52 5.28zM102.56 16v30h10.24v-30h-10.24zM85.44 16v30h10.24v-30h-10.24zM72.32 16l-5.84 29.12H55.68l5.84-29.12h10.8zM24.96 16l-5.84 29.12H8.32l5.84-29.12h10.8zM0 16v30h10.24v-30H0z"></path>
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-4xl mt-12 mb-6">
      <div className="flex justify-center items-center">
        <a
          href="https://vercel.com?utm_source=ai-video-generator"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Powered by Vercel"
        >
          <span className="text-sm">Powered by</span>
          <VercelLogo />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

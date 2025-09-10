
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center w-full">
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        AI Script to Video Generator
      </h1>
      <p className="mt-2 text-lg text-gray-400">
        Transform your text prompts into stunning videos with the power of VEO 2.0.
      </p>
    </header>
  );
};

export default Header;

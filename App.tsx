
import React from 'react';
import Header from './components/Header.tsx';
import VideoGenerator from './components/VideoGenerator.tsx';
import Footer from './components/Footer.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="w-full max-w-4xl mt-8">
        <VideoGenerator />
      </main>
      <Footer />
    </div>
  );
};

export default App;
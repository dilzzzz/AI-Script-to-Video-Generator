import React, { useState, useCallback, useEffect } from 'react';
import { generateVideoFromPrompt } from '../services/geminiService.ts';
import Loader from './Loader.tsx';
import ErrorMessage from './ErrorMessage.tsx';
import ExamplePrompts from './ExamplePrompts.tsx';
import ImageUploader from './ImageUploader.tsx';
import type { UploadedImage } from './ImageUploader.tsx';

const VideoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<string>('16:9');
  const [style, setStyle] = useState<string>('Cinematic');
  const [model, setModel] = useState<string>('veo-3.0-generate-001');
  const [image, setImage] = useState<UploadedImage | null>(null);
  const [durationSecs, setDurationSecs] = useState<number>(10);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cleanup function to revoke the object URL and prevent memory leaks
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
      if (image?.url) {
        URL.revokeObjectURL(image.url);
      }
    };
  }, [videoUrl, image]);

  const handleGenerateVideo = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a script or prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setVideoUrl(null);

    const onProgress = (message: string) => {
      setLoadingMessage(message);
    };

    try {
      const imageData = image ? { data: image.data, mimeType: image.mimeType } : null;
      const url = await generateVideoFromPrompt(prompt, aspectRatio, style, model, onProgress, durationSecs, imageData);
      setVideoUrl(url);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred during video generation.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [prompt, aspectRatio, style, model, image, durationSecs]);

  const handleSelectPrompt = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  const handleClear = () => {
    setPrompt('');
    setError(null);
    setVideoUrl(null); 
    setImage(null);
    setDurationSecs(10);
    setIsLoading(false);
    setLoadingMessage('');
  };

  const aspectRatioClasses: { [key: string]: string } = {
    '16:9': 'aspect-video w-full',
    '1:1': 'aspect-square w-full max-w-lg mx-auto',
    '9:16': 'aspect-[9/16] w-full max-w-sm mx-auto'
  };

  const videoStyles = ['Cinematic', 'Animated', 'Documentary'];


  return (
    <div className="w-full bg-gray-800/50 rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-700 backdrop-blur-sm">
      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="prompt" className="block text-lg font-medium text-gray-300 mb-2">
            Your Video Script
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A cinematic shot of a futuristic city at night, with flying cars and neon signs."
            className="w-full h-32 p-4 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none"
            disabled={isLoading}
          />
        </div>
        
        <ImageUploader 
            image={image}
            onImageSelect={setImage}
            onImageRemove={() => setImage(null)}
            disabled={isLoading}
        />

        <div>
          <label htmlFor="duration" className="block text-lg font-medium text-gray-300 mb-2">
            Video Length ({durationSecs}s)
          </label>
          <div className="flex items-center gap-4">
            <input
              id="duration"
              type="range"
              min="5"
              max="60"
              value={durationSecs}
              onChange={(e) => setDurationSecs(Number(e.target.value))}
              disabled={isLoading}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="text-gray-300 font-semibold w-12 text-center">{durationSecs}s</span>
          </div>
        </div>

        <div>
            <label htmlFor="model" className="block text-lg font-medium text-gray-300 mb-2">
                AI Model
            </label>
            <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={isLoading}
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                <option value="veo-3.0-generate-001">Veo 3 (Latest)</option>
                <option value="veo-2.0-generate-001">Veo 2.0</option>
            </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">
              Aspect Ratio
            </label>
            <div className="flex flex-wrap gap-2">
              {['16:9', '1:1', '9:16'].map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base ${
                    aspectRatio === ratio
                      ? 'bg-purple-600 text-white shadow-md cursor-default'
                      : 'bg-gray-700/60 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">
              Video Style
            </label>
            <div className="flex flex-wrap gap-2">
              {videoStyles.map((styleName) => (
                <button
                  key={styleName}
                  onClick={() => setStyle(styleName)}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base ${
                    style === styleName
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-700/60 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  {styleName}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ExamplePrompts onSelectPrompt={handleSelectPrompt} disabled={isLoading} />

        <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleGenerateVideo}
              disabled={isLoading}
              className="flex-grow py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 transform transition-transform duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-600"
            >
              {isLoading ? 'Generating...' : 'Generate Video'}
            </button>
            <button
                onClick={handleClear}
                disabled={isLoading || (!prompt && !videoUrl && !error && !image)}
                className="py-3 px-6 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500/50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Clear
            </button>
        </div>
      </div>

      <div className="mt-8">
        {isLoading && <Loader message={loadingMessage} />}
        {error && <ErrorMessage message={error} />}
        {videoUrl && !isLoading && (
          <div className={`bg-black rounded-lg overflow-hidden border-2 border-purple-500 ${aspectRatioClasses[aspectRatio]}`}>
            <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain">
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {!isLoading && !videoUrl && !error && (
            <div className={`bg-gray-900/50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600 ${aspectRatioClasses[aspectRatio]}`}>
                <p className="text-gray-500">Your generated video will appear here.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default VideoGenerator;

import React from 'react';

interface ExamplePromptsProps {
    onSelectPrompt: (prompt: string) => void;
    disabled: boolean;
}

const prompts = [
    "A majestic lion surveying its kingdom from a rocky outcrop at sunrise.",
    "A futuristic drone delivering a package in a bustling cyberpunk city.",
    "A time-lapse of a flower blooming, from bud to full blossom.",
    "An astronaut floating in space, looking back at Earth.",
];

const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onSelectPrompt, disabled }) => {
    return (
        <div>
            <p className="text-sm text-gray-400 mb-2">Or try an example:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {prompts.map((prompt) => (
                    <button
                        key={prompt}
                        onClick={() => onSelectPrompt(prompt)}
                        disabled={disabled}
                        className="text-left text-sm p-3 bg-gray-700/50 rounded-md hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {prompt}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ExamplePrompts;

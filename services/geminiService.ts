import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const LOADING_MESSAGES = [
    "Sending your vision to the AI director...",
    "The digital crew is setting up the scene...",
    "Warming up the virtual cameras...",
    "Rendering the first few frames...",
    "Applying special effects and color grading...",
    "Composing the soundtrack...",
    "Finalizing the edit, this can take a few minutes...",
    "Almost there, preparing the final cut..."
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface ImageData {
    data: string;
    mimeType: string;
}

export const generateVideoFromPrompt = async (
    prompt: string, 
    aspectRatio: string, 
    style: string, 
    model: string,
    onProgress: (message: string) => void,
    durationSecs: number,
    image: ImageData | null = null
): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
    }
    
    try {
        onProgress(LOADING_MESSAGES[0]);

        // Prepend the style to the prompt to guide the model
        const finalPrompt = `${style} style video of: ${prompt}`;

        const params: any = {
            model: model,
            prompt: finalPrompt,
            config: {
                numberOfVideos: 1,
                aspectRatio: aspectRatio,
                durationSecs: durationSecs,
            }
        };

        if (image) {
            params.image = {
                imageBytes: image.data,
                mimeType: image.mimeType
            };
        }

        let operation = await ai.models.generateVideos(params);

        let messageIndex = 1;

        while (!operation.done) {
            onProgress(LOADING_MESSAGES[messageIndex % LOADING_MESSAGES.length]);
            messageIndex++;
            await sleep(10000); // Poll every 10 seconds
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

        if (!downloadLink) {
            throw new Error("Video generation completed, but no download link was found.");
        }
        
        onProgress("Downloading generated video...");

        // The download link requires the API key to be appended
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`Failed to download video. Status: ${response.statusText}`);
        }

        const videoBlob = await response.blob();
        const videoUrl = URL.createObjectURL(videoBlob);

        return videoUrl;

    } catch (error: any) {
        console.error("Error generating video:", error);
        if (error.message.includes("API_KEY")) {
             throw new Error("API Key is invalid or missing. Please check your setup.");
        }
        throw new Error(error.message || "An unexpected error occurred while communicating with the AI.");
    }
};
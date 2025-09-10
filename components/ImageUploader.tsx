import React, { useCallback, useRef } from 'react';

export interface UploadedImage {
    name: string;
    url: string;
    data: string; // base64 encoded
    mimeType: string;
}

interface ImageUploaderProps {
    onImageSelect: (image: UploadedImage) => void;
    onImageRemove: () => void;
    image: UploadedImage | null;
    disabled: boolean;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = (reader.result as string).split(',')[1];
            resolve(result);
        };
        reader.onerror = error => reject(error);
    });
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, onImageRemove, image, disabled }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                alert('Please select a valid image file (JPG, PNG, WebP).');
                return;
            }
            try {
                const base64Data = await fileToBase64(file);
                const imageUrl = URL.createObjectURL(file);
                onImageSelect({
                    name: file.name,
                    url: imageUrl,
                    data: base64Data,
                    mimeType: file.type
                });
            } catch (error) {
                console.error("Error converting file to base64:", error);
                alert("Could not process the image file.");
            }
        }
    }, [onImageSelect]);

    const handleRemoveImage = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the file input click
        onImageRemove();
        // Reset the file input so the same file can be re-uploaded
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUploaderClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">
                Inspiration Image (Optional)
            </label>
            {image ? (
                <div className="p-3 bg-gray-900 border border-gray-600 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={image.url} alt="Preview" className="w-12 h-12 rounded-md object-cover" />
                        <span className="text-sm text-gray-300 truncate">{image.name}</span>
                    </div>
                    <button
                        onClick={handleRemoveImage}
                        disabled={disabled}
                        className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200 disabled:opacity-50"
                        aria-label="Remove image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            ) : (
                <div
                    onClick={handleUploaderClick}
                    className={`flex justify-center items-center w-full p-6 border-2 border-dashed border-gray-600 rounded-lg transition-colors duration-300 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-purple-500 hover:bg-gray-800/60'}`}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        disabled={disabled}
                        className="hidden"
                        accept="image/png, image/jpeg, image/webp"
                    />
                    <div className="text-center">
                         <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-400">
                            <span className="font-semibold text-purple-400">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
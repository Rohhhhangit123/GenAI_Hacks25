import React, { useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { LanguageStrings } from '../types';

interface ContentInputProps {
  content: string;
  onContentChange: (content: string) => void;
  selectedImage: File | null;
  onImageSelect: (file: File | null) => void;
  strings: LanguageStrings;
  disabled?: boolean;
}

export function ContentInput({
  content,
  onContentChange,
  selectedImage,
  onImageSelect,
  strings,
  disabled = false
}: ContentInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder={strings.textPlaceholder}
          disabled={disabled}
          className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 placeholder-gray-400 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
        />
      </div>

      <div className="space-y-3">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
            selectedImage 
              ? 'border-green-300 bg-green-50' 
              : 'border-gray-300 hover:border-gray-400 bg-gray-50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled}
          />
          
          {selectedImage ? (
            <div className="flex items-center justify-center gap-3">
              <Image className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-green-700 font-medium">{strings.imageSelected}</p>
                <p className="text-sm text-green-600">{selectedImage.name}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onImageSelect(null);
                }}
                className="ml-2 p-1 text-red-500 hover:text-red-700 transition-colors"
                disabled={disabled}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="w-8 h-8 text-gray-400 mx-auto" />
              <div>
                <p className="text-gray-600">{strings.dragDropText}</p>
                <p className="text-sm text-gray-500">
                  {strings.or} <span className="text-blue-600 underline">{strings.selectImage}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useRef, useState } from 'react';
import { Upload, X, Image, FileText, Camera, Sparkles } from 'lucide-react';
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
  const [isDragOver, setIsDragOver] = useState(false);
  const [isTextFocused, setIsTextFocused] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const getImagePreview = (file: File) => {
    return URL.createObjectURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Text Input Section */}
      <div className="relative group">
        <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-all duration-300 ${isTextFocused ? 'opacity-30' : ''}`}></div>
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-black">Content Analysis</h3>
              <p className="text-sm text-black/70">Enter text or paste content to analyze</p>
            </div>
          </div>

          {/* Text Area */}
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              onFocus={() => setIsTextFocused(true)}
              onBlur={() => setIsTextFocused(false)}
              placeholder={strings.textPlaceholder}
              disabled={disabled}
              className={`w-full h-40 p-6 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl border-2 rounded-2xl resize-none transition-all duration-300 shadow-lg hover:shadow-xl ${
                isTextFocused 
                  ? 'border-blue-400 ring-4 ring-blue-400/20 shadow-2xl' 
                  : 'border-white/30 hover:border-white/50'
              } ${
                disabled 
                  ? 'opacity-50 cursor-not-allowed bg-gray-100' 
                  : 'text-gray-800 placeholder-gray-500'
              } focus:outline-none`}
            />
            
            {/* Character Count */}
            <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded-full backdrop-blur-sm">
              {content.length} characters
            </div>
          </div>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="relative group">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-black">Image Analysis</h3>
            <p className="text-sm text-black/70">Upload an image for visual content analysis</p>
          </div>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 overflow-hidden ${
            selectedImage 
              ? 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-50' 
              : isDragOver 
                ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 scale-[1.02]'
                : 'border-white/40 bg-gradient-to-br from-white/20 to-white/10 hover:border-white/60 hover:bg-gradient-to-br hover:from-white/30 hover:to-white/20'
          } ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          } backdrop-blur-sm shadow-lg hover:shadow-xl`}
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
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500 rounded-full shadow-lg">
                    <Image className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-emerald-800 font-bold text-lg">{strings.imageSelected}</p>
                    <p className="text-emerald-600 font-medium">{selectedImage.name}</p>
                    <p className="text-emerald-600 text-sm">
                      {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageSelect(null);
                  }}
                  className="group/btn p-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110"
                  disabled={disabled}
                >
                  <X className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-200" />
                </button>
              </div>

              {/* Image Preview */}
              <div className="relative rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm border border-emerald-200">
                <img
                  src={getImagePreview(selectedImage)}
                  alt="Preview"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent"></div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              {/* Animated Upload Icon */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-xl mx-auto w-fit">
                  <Upload className={`w-8 h-8 text-white transition-transform duration-300 ${isDragOver ? 'scale-110 rotate-12' : ''}`} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-white/60" />
                  <p className="text-white font-bold text-lg">
                    {isDragOver ? 'Drop your image here!' : strings.dragDropText}
                  </p>
                  <Sparkles className="w-4 h-4 text-white/60" />
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1"></div>
                  <span className="text-white/70 text-sm font-medium px-3">{strings.or}</span>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1"></div>
                </div>
                
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/30 text-white font-medium rounded-xl hover:from-white/30 hover:to-white/20 hover:border-white/50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                  disabled={disabled}
                >
                  <Image className="w-4 h-4" />
                  {strings.selectImage}
                </button>
                
                <p className="text-white/50 text-xs">
                  Supports JPG, PNG, GIF up to 10MB
                </p>
              </div>
            </div>
          )}

          {/* Drag Overlay */}
          {isDragOver && !selectedImage && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="p-4 bg-blue-500 rounded-full shadow-2xl mb-4 animate-bounce">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <p className="text-blue-800 font-bold text-xl">Release to upload!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      {(content || selectedImage) && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              onContentChange('');
              onImageSelect(null);
            }}
            className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
            disabled={disabled}
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import { uploadFile } from '../../services/uploadService';
import toast from 'react-hot-toast';

const ImageUpload = ({ currentImage, onUpload, label = 'Cover Image', hint = 'Recommended: Landscape (e.g. 1200x630px)' }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = await uploadFile(file);
      onUpload(data.url);
      toast.success('File uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-navy mb-2">{label}</label>
      <div className="relative group">
        <label className="block border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-emerald hover:bg-emerald/5 transition-all cursor-pointer">
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-emerald/30 border-t-emerald rounded-full animate-spin" />
              <span className="text-sm text-emerald font-medium">Uploading...</span>
            </div>
          ) : currentImage ? (
            <div className="relative w-fit mx-auto">
              {currentImage.endsWith('.pdf') ? (
                <div className="flex flex-col items-center py-4">
                  <span className="text-4xl mb-2">📄</span>
                  <span className="text-sm font-medium text-navy break-all">{currentImage.split('/').pop()}</span>
                </div>
              ) : (
                <img src={currentImage} alt="Upload" className="max-h-64 rounded-xl shadow-sm object-cover" />
              )}
              <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">Click to change</span>
              </div>
            </div>
          ) : (
            <>
              <FiUpload className="text-2xl text-slate-custom mx-auto mb-2" />
              <span className="block text-sm font-medium text-slate-custom mb-1">Click to upload</span>
              <span className="block text-[10px] text-gray-400">Allowed: JPG, PNG, WEBP, PDF</span>
              <span className="block text-[10px] text-emerald mt-1">{hint}</span>
            </>
          )}
          <input type="file" accept="image/*,.pdf" onChange={handleUpload} className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;

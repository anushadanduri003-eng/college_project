import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Upload, Image, Check, RefreshCw, Sparkles, Building2 } from 'lucide-react';

const PRESET_IMAGES = [
  {
    name: 'Modern Tiered Auditorium',
    url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'High-Tech Seminar Hall',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Executive Conference Hall',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Academic Lecture Theatre',
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Smart Presentation Room',
    url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Grand University Hall',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'
  }
];

export const ChangeHallImageModal: React.FC = () => {
  const {
    isChangeImageModalOpen,
    editingHallForImage,
    closeChangeImageModal,
    updateHallImage,
    showToast
  } = useApp();

  const [imageUrl, setImageUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    if (editingHallForImage) {
      setImageUrl(editingHallForImage.image);
      setFileError('');
    }
  }, [editingHallForImage, isChangeImageModalOpen]);

  if (!isChangeImageModalOpen || !editingHallForImage) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFileError('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError('Image size exceeds 5MB. Please choose a smaller photo.');
      return;
    }

    setFileError('');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!imageUrl.trim()) {
      showToast('Please provide an image URL or upload a file.', 'error');
      return;
    }

    updateHallImage(editingHallForImage.id, imageUrl.trim());
    closeChangeImageModal();
  };

  const handleResetDefault = () => {
    const defaultPreset = PRESET_IMAGES[
      editingHallForImage.block === 'Block-2' ? 0 :
      editingHallForImage.block === 'Block-3' ? 1 : 2
    ];
    setImageUrl(defaultPreset.url);
    showToast('Reset to default seminar hall image.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <Image className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                <span>Personalize Seminar Hall Photo</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/30 text-blue-100 text-xs font-bold uppercase border border-blue-400/30">
                  {editingHallForImage.block}
                </span>
              </h3>
              <p className="text-xs text-blue-200">
                {editingHallForImage.hall_name} • Ground Floor (Capacity: 180 Seats)
              </p>
            </div>
          </div>
          <button
            onClick={closeChangeImageModal}
            className="p-1.5 rounded-full hover:bg-white/10 text-blue-200 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Live Preview Container */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Current Live Preview
            </label>
            <div className="relative w-full h-52 rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-100 group shadow-inner">
              <img
                src={imageUrl || editingHallForImage.image}
                alt="Hall Preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-blue-600 shadow-xs">
                  {editingHallForImage.block}
                </span>
                <div className="text-sm font-bold mt-1 drop-shadow-md">
                  {editingHallForImage.hall_name}
                </div>
                <div className="text-xs text-slate-200 drop-shadow-xs">
                  Ground Floor • Capacity 180
                </div>
              </div>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="flex border-b border-slate-200 gap-2">
            <button
              onClick={() => setActiveTab('upload')}
              className={`pb-2.5 px-3 text-xs font-bold flex items-center space-x-1.5 border-b-2 transition-all cursor-pointer ${
                activeTab === 'upload'
                  ? 'border-blue-700 text-blue-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload from Device</span>
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`pb-2.5 px-3 text-xs font-bold flex items-center space-x-1.5 border-b-2 transition-all cursor-pointer ${
                activeTab === 'url'
                  ? 'border-blue-700 text-blue-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              <span>Image URL Link</span>
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`pb-2.5 px-3 text-xs font-bold flex items-center space-x-1.5 border-b-2 transition-all cursor-pointer ${
                activeTab === 'presets'
                  ? 'border-blue-700 text-blue-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Presets</span>
            </button>
          </div>

          {/* Tab 1: File Upload */}
          {activeTab === 'upload' && (
            <div className="space-y-3">
              <label className="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/40 hover:bg-blue-50/80 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
                <Upload className="w-8 h-8 text-blue-600 mb-2 animate-bounce" />
                <span className="text-xs font-bold text-blue-900">
                  Click to select photo or drag &amp; drop
                </span>
                <span className="text-[11px] text-slate-500 mt-1">
                  Supports JPG, PNG, WebP (Max 5MB)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {fileError && (
                <p className="text-xs text-red-600 font-semibold">{fileError}</p>
              )}
            </div>
          )}

          {/* Tab 2: URL */}
          {activeTab === 'url' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">
                Direct Web Image Link (HTTPS URL)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/images/hall-photo.jpg"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <p className="text-[11px] text-slate-500">
                Paste any publicly accessible seminar hall image link.
              </p>
            </div>
          )}

          {/* Tab 3: Presets */}
          {activeTab === 'presets' && (
            <div className="grid grid-cols-3 gap-2.5">
              {PRESET_IMAGES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className={`group relative rounded-lg overflow-hidden border-2 text-left transition-all cursor-pointer ${
                    imageUrl === preset.url
                      ? 'border-blue-600 ring-2 ring-blue-600/30'
                      : 'border-slate-200 hover:border-blue-400'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-16 object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-1 bg-white">
                    <span className="text-[10px] font-bold text-slate-800 line-clamp-1">
                      {preset.name}
                    </span>
                  </div>
                  {imageUrl === preset.url && (
                    <div className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetDefault}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={closeChangeImageModal}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save &amp; Apply Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

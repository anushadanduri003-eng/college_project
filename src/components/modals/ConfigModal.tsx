import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Upload, 
  RefreshCw, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Check, 
  Image as ImageIcon,
  Award
} from 'lucide-react';

export const ConfigModal: React.FC = () => {
  const { 
    isConfigModalOpen, 
    closeConfigModal, 
    config, 
    updateConfig, 
    uploadLogo, 
    resetLogo 
  } = useApp();

  const [collegeName, setCollegeName] = useState(config.collegeName);
  const [portalTitle, setPortalTitle] = useState(config.portalTitle);
  const [email, setEmail] = useState(config.officialEmail);
  const [phone, setPhone] = useState(config.officialPhone);
  const [address, setAddress] = useState(config.officialAddress);
  const [logoUrl, setLogoUrl] = useState(config.collegeLogoUrl || '');

  if (!isConfigModalOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        uploadLogo(result);
        setLogoUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      collegeName: collegeName.trim(),
      portalTitle: portalTitle.trim(),
      officialEmail: email.trim(),
      officialPhone: phone.trim(),
      officialAddress: address.trim(),
      collegeLogoUrl: logoUrl.trim() ? logoUrl.trim() : null
    });
    closeConfigModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-in fade-in duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-blue-700" />
            <h3 className="text-base font-bold text-slate-900">
              Institution & Logo Settings
            </h3>
          </div>
          <button
            onClick={closeConfigModal}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4 text-xs">
          {/* Logo Upload Section */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block font-bold text-slate-900 mb-2">
              Official NEC Logo Placeholder
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg bg-white border-2 border-dashed border-blue-400 flex items-center justify-center p-1 relative overflow-hidden">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Logo preview"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-[11px] font-black text-blue-900">[ NEC ]</div>
                    <div className="text-[9px] font-bold text-blue-600">LOGO</div>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <label className="inline-flex items-center space-x-2 px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold cursor-pointer transition-colors text-xs">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Custom Logo File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {logoUrl && (
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        resetLogo();
                        setLogoUrl('');
                      }}
                      className="text-[11px] text-red-600 hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Reset to Empty [ NEC LOGO ] Placeholder</span>
                    </button>
                  </div>
                )}
                <p className="text-[10px] text-slate-400">
                  Accepts PNG, JPG, or SVG. Fits seamlessly without breaking layout.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Details Placeholders */}
          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                College Name Placeholder
              </label>
              <input
                type="text"
                value={collegeName}
                onChange={e => setCollegeName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Portal Subtitle
              </label>
              <input
                type="text"
                value={portalTitle}
                onChange={e => setPortalTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Official Email Placeholder
              </label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Official Phone Placeholder
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Campus Address Placeholder
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2 border-t border-slate-200">
            <button
              type="button"
              onClick={closeConfigModal}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-sm"
            >
              Save Placeholders
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

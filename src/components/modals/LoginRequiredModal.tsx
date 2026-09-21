import React from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, LogIn, UserPlus, X, ShieldAlert } from 'lucide-react';

export const LoginRequiredModal: React.FC = () => {
  const { 
    isLoginRequiredOpen, 
    closeLoginRequired, 
    loginRequiredReason, 
    openAuthModal 
  } = useApp();

  if (!isLoginRequiredOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={closeLoginRequired}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Icon & Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 border border-blue-200">
            <Lock className="h-7 w-7 text-blue-700" />
          </div>

          <h3 className="mt-4 text-xl font-bold text-slate-900 tracking-tight">
            Login required
          </h3>

          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Please login or create an account to continue.
          </p>

          {loginRequiredReason && (
            <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-left">{loginRequiredReason}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            id="btn-modal-login"
            onClick={() => {
              closeLoginRequired();
              openAuthModal('login');
            }}
            className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 shadow-sm transition-colors cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </button>

          <button
            id="btn-modal-create-account"
            onClick={() => {
              closeLoginRequired();
              openAuthModal('signup');
            }}
            className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Account</span>
          </button>
        </div>

        <p className="mt-4 text-center text-[11px] text-slate-400">
          Faculty, Coordinators, Staff and Students of Narasaraopeta Engineering College can sign in using their institutional ID.
        </p>
      </div>
    </div>
  );
};

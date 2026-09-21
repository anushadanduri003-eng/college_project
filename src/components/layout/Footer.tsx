import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Phone, Mail, Award, ExternalLink, ShieldCheck, Edit3 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { config, setActiveTab, openAuthModal, openConfigModal, currentUser } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Institutional Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-md bg-blue-700/80 border border-blue-400 flex items-center justify-center text-white font-bold text-xs">
                NEC
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">
                  {config.collegeName}
                </h3>
                <p className="text-xs text-blue-400 font-medium">
                  {config.portalTitle}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Centralized platform for booking seminar halls, managing technical symposia & college events, inter-department coordinator approvals, and coordinating external faculty examiner logistics.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>NAAC 'A+' Grade & NBA Accredited</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('halls')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Seminar Halls
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('events')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('slots')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Available Slots
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Portal & Guidelines
                </button>
              </li>
              {!currentUser && (
                <li>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer font-medium"
                  >
                    Staff & Faculty Login
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Seminar Halls & Coordinators */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Seminar Halls & Incharges
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="bg-slate-800/60 p-2 rounded border border-slate-800">
                <div className="font-semibold text-slate-200">BLOCK-2 SEMINAR HALL</div>
                <div className="text-[11px] text-blue-400">Coordinator: Tirumala Rao</div>
              </li>
              <li className="bg-slate-800/60 p-2 rounded border border-slate-800">
                <div className="font-semibold text-slate-200">BLOCK-3 SEMINAR HALL</div>
                <div className="text-[11px] text-blue-400">Coordinator: Venkat Rao</div>
              </li>
              <li className="bg-slate-800/60 p-2 rounded border border-slate-800">
                <div className="font-semibold text-slate-200">BLOCK-4 SEMINAR HALL</div>
                <div className="text-[11px] text-blue-400">Coordinator: Suneel Sir</div>
              </li>
            </ul>
          </div>

          {/* Contact Placeholders */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Campus Contact (Placeholders)
              </h4>
              <button
                onClick={openConfigModal}
                className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center space-x-1 cursor-pointer"
                title="Edit placeholders"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{config.officialAddress}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{config.officialPhone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{config.officialEmail}</span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-slate-500 italic">
                * Note: Official college contact data and logos are editable placeholders for administrative setup.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© 2026 Narasaraopeta Engineering College. All Rights Reserved.</p>
          <div className="mt-2 sm:mt-0 flex items-center space-x-4 text-slate-400">
            <span>Seminar Hall & Event Coordination Portal</span>
            <span>•</span>
            <button 
              onClick={openConfigModal} 
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Upload NEC Logo
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

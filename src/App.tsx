import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { AvailableSlotsPage } from './components/slots/AvailableSlotsPage';
import { EventManagementPage } from './components/events/EventManagementPage';
import { ExternalFacultyPage } from './components/examiner/ExternalFacultyPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { ArrowLeft, X, Home, ChevronRight } from 'lucide-react';

// Modals
import { BookingModal } from './components/modals/BookingModal';
import { ExternalFacultyModal } from './components/modals/ExternalFacultyModal';
import { TimetableViewModal } from './components/modals/TimetableViewModal';
import { ConfigModal } from './components/modals/ConfigModal';
import { AuthModal } from './components/modals/AuthModal';
import { LoginRequiredModal } from './components/modals/LoginRequiredModal';
import { ChangeHallImageModal } from './components/modals/ChangeHallImageModal';
import { UploadEventModal } from './components/modals/UploadEventModal';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, goBack, closePage } = useApp();

  const getPageTitle = (tab: string) => {
    switch (tab) {
      case 'slots':
        return 'Available Slots Matrix';
      case 'events':
        return 'Event Management & Schedules';
      case 'examiner':
        return 'External Faculty & Examiners';
      case 'hostel':
        return 'Hostel Accommodation';
      case 'dashboard':
        return 'Faculty / Coordinator Dashboard';
      case 'coordinator':
        return 'Hall Coordinator Console';
      case 'admin':
        return 'Institutional Administration';
      case 'about':
        return 'About NEC Seminar Portal';
      default:
        return 'Seminar Hall Portal';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white relative">
      {/* Top Navigation */}
      <Navbar />

      {/* Global Page Header Bar with Back and Close (Wrong Symbol ✕) Option */}
      {activeTab !== 'home' && (
        <aside aria-label="Page navigation" className="bg-white border-b border-slate-200 shadow-2xs sticky top-[72px] sm:top-20 z-30 transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-2">
            {/* Left: Back Button & Breadcrumbs */}
            <div className="flex items-center space-x-3">
              <button
                id="btn-global-page-back"
                onClick={goBack}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-slate-300 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-2xs"
                title="Go back to previous page"
              >
                <ArrowLeft className="w-4 h-4 text-blue-700" />
                <span>← Back</span>
              </button>

              {/* Breadcrumbs */}
              <div className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </button>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-900 font-bold">
                  {getPageTitle(activeTab)}
                </span>
              </div>
            </div>

            {/* Right: Wrong Symbol / Close Page Button */}
            <div className="flex items-center space-x-2">
              <button
                id="btn-global-page-close"
                onClick={closePage}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-2xs group"
                title="Close this page and return to Home (Wrong / Close Symbol ✕)"
                aria-label="Close page"
              >
                <span>Close Page</span>
                <span className="w-5 h-5 rounded-full bg-red-200 group-hover:bg-red-300 flex items-center justify-center text-red-900 font-black text-xs">
                  <X className="w-3.5 h-3.5 text-red-700 stroke-[3]" />
                </span>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Routed Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'halls' && <HomePage />}
        {activeTab === 'slots' && <AvailableSlotsPage />}
        {activeTab === 'events' && <EventManagementPage />}
        {activeTab === 'examiner' && <ExternalFacultyPage />}
        {activeTab === 'hostel' && <ExternalFacultyPage />}
        {(activeTab === 'dashboard' || activeTab === 'coordinator' || activeTab === 'admin') && <DashboardPage />}
        {activeTab === 'about' && <HomePage />}
      </main>

      {/* Floating Quick Back & Close helper button for easy access on mobile and scrolled views */}
      {activeTab !== 'home' && (
        <div className="fixed bottom-5 right-5 z-40 flex items-center space-x-2 bg-white/95 backdrop-blur-md p-1.5 rounded-full shadow-xl border border-slate-300">
          <button
            id="btn-floating-back"
            onClick={goBack}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-800 hover:text-blue-900 font-bold text-xs transition-colors cursor-pointer shadow-xs"
            title="Go Back"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-blue-700" />
            <span>Back</span>
          </button>
          <button
            id="btn-floating-close"
            onClick={closePage}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
            title="Close this page (Wrong symbol ✕)"
            aria-label="Close page"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5 text-white stroke-[3]" />
          </button>
        </div>
      )}

      {/* Site Footer */}
      <Footer />

      {/* Interactive Global Application Modals */}
      <BookingModal />
      <ExternalFacultyModal />
      <TimetableViewModal />
      <ConfigModal />
      <AuthModal />
      <LoginRequiredModal />
      <ChangeHallImageModal />
      <UploadEventModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

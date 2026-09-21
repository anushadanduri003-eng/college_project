import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import { 
  X, 
  LogIn, 
  UserPlus, 
  Lock, 
  Mail, 
  User as UserIcon, 
  Phone, 
  Briefcase, 
  Building, 
  AlertCircle,
  KeyRound,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    openAuthModal, 
    login, 
    signUp,
    users,
    loginAs 
  } = useApp();

  // Login form state
  const [loginEmailOrId, setLoginEmailOrId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');

  // Signup form state
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [designation, setDesignation] = useState('Assistant Professor');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<Role>('FACULTY');
  const [assignedBlock, setAssignedBlock] = useState<'Block-2' | 'Block-3' | 'Block-4'>('Block-2');
  const [signupError, setSignupError] = useState('');

  // Forgot password mock
  const [forgotSent, setForgotSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmailOrId.trim()) {
      setLoginError('Please enter your Institutional Email or Employee/Student ID.');
      return;
    }

    const success = login(loginEmailOrId, loginPassword);
    if (!success) {
      setLoginError('Invalid credentials. Please verify your Email/ID or select a demo account below.');
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!name.trim() || !employeeId.trim() || !email.trim() || !phone.trim() || !password) {
      setSignupError('All fields marked with * are required.');
      return;
    }

    if (password.length < 6) {
      setSignupError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setSignupError('Passwords do not match. Please re-check.');
      return;
    }

    const success = signUp({
      name: name.trim(),
      employee_id: employeeId.trim().toUpperCase(),
      department,
      designation: designation.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role,
      assignedBlock: role === 'COORDINATOR' ? assignedBlock : undefined
    });

    if (!success) {
      setSignupError('Registration failed. An account with this Email or ID already exists.');
    }
  };

  const departmentsList = [
    'Computer Science & Engineering',
    'Electronics & Communication Engg.',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical & Electronics Engg.',
    'Information Technology',
    'Artificial Intelligence & Data Science',
    'MBA & MCA Department',
    'Basic Sciences & Humanities',
    'Student Affairs'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-in fade-in duration-150 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab switch header */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            id="tab-auth-login"
            onClick={() => {
              setLoginError('');
              openAuthModal('login');
            }}
            className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${
              authModalMode === 'login'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Institutional Login
          </button>
          <button
            id="tab-auth-signup"
            onClick={() => {
              setSignupError('');
              openAuthModal('signup');
            }}
            className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${
              authModalMode === 'signup'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Create New Account
          </button>
        </div>

        {authModalMode === 'login' ? (
          /* ================= LOGIN FORM ================= */
          <div>
            <div className="mb-5 text-center">
              <h3 className="text-lg font-bold text-slate-900">
                Welcome to NEC Event Portal
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your registered institutional credentials to access seminar halls and coordination tools.
              </p>
            </div>

            {loginError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            {forgotSent && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-700 flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>A password reset link has been dispatched to your institutional mail.</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email or Employee / Student ID *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="input-login-id"
                    type="text"
                    value={loginEmailOrId}
                    onChange={e => setLoginEmailOrId(e.target.value)}
                    placeholder="e.g. suneelsir@nec.edu.in or EMP-CSE-104"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotSent(true)}
                    className="text-xs text-blue-700 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="input-login-password"
                    type="password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-blue-700 focus:ring-blue-500"
                  />
                  <span>Remember me on this browser</span>
                </label>
              </div>

              <button
                id="btn-submit-login"
                type="submit"
                className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-sm text-sm transition-colors cursor-pointer flex items-center justify-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Login to Portal</span>
              </button>
            </form>

            {/* 1-Click Demo Profiles for Rapid Testing & Review */}
            <div className="mt-6 pt-5 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Quick Demo Logins (1-Click Switch)
                </span>
                <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-medium">
                  Instant Test
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {/* Block-4 Coordinator (Suneel Sir) */}
                <button
                  onClick={() => {
                    const user = users.find(u => u.name.includes('Suneel'));
                    if (user) loginAs(user);
                  }}
                  className="p-2 text-left rounded border border-amber-200 bg-amber-50/70 hover:bg-amber-100 transition-colors"
                >
                  <div className="font-bold text-amber-950 flex items-center justify-between">
                    <span>Suneel Sir</span>
                    <span className="text-[9px] bg-amber-200 text-amber-900 px-1 rounded">Coord B-4</span>
                  </div>
                  <div className="text-[10px] text-amber-800">Pending Inter-Dept Request Receiver</div>
                </button>

                {/* Block-3 Coordinator (Venkat Rao) */}
                <button
                  onClick={() => {
                    const user = users.find(u => u.name.includes('Venkat'));
                    if (user) loginAs(user);
                  }}
                  className="p-2 text-left rounded border border-blue-200 bg-blue-50/70 hover:bg-blue-100 transition-colors"
                >
                  <div className="font-bold text-blue-950 flex items-center justify-between">
                    <span>Venkat Rao</span>
                    <span className="text-[9px] bg-blue-200 text-blue-900 px-1 rounded">Coord B-3</span>
                  </div>
                  <div className="text-[10px] text-blue-800">Block-3 Incharge / Requester</div>
                </button>

                {/* Block-2 Coordinator (Tirumala Rao) */}
                <button
                  onClick={() => {
                    const user = users.find(u => u.name.includes('Tirumala'));
                    if (user) loginAs(user);
                  }}
                  className="p-2 text-left rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>Tirumala Rao</span>
                    <span className="text-[9px] bg-slate-200 text-slate-800 px-1 rounded">Coord B-2</span>
                  </div>
                  <div className="text-[10px] text-slate-600">Block-2 Incharge</div>
                </button>

                {/* Faculty: Venkat */}
                <button
                  onClick={() => {
                    const user = users.find(u => u.name === 'Venkat' && u.role === 'FACULTY') || users.find(u => u.name === 'Venkat');
                    if (user) loginAs(user);
                  }}
                  className="p-2 text-left rounded border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 transition-colors"
                >
                  <div className="font-bold text-emerald-950 flex items-center justify-between">
                    <span>Venkat</span>
                    <span className="text-[9px] bg-emerald-200 text-emerald-900 px-1 rounded">Faculty</span>
                  </div>
                  <div className="text-[10px] text-emerald-800">CSE Faculty Requester</div>
                </button>

                {/* Faculty: Sireesha */}
                <button
                  onClick={() => {
                    const user = users.find(u => u.name === 'Sireesha');
                    if (user) loginAs(user);
                  }}
                  className="p-2 text-left rounded border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 transition-colors"
                >
                  <div className="font-bold text-indigo-950 flex items-center justify-between">
                    <span>Sireesha</span>
                    <span className="text-[9px] bg-indigo-200 text-indigo-900 px-1 rounded">Faculty</span>
                  </div>
                  <div className="text-[10px] text-indigo-800">ECE Faculty</div>
                </button>

                {/* Faculty: Ramakrishna */}
                <button
                  onClick={() => {
                    const user = users.find(u => u.name === 'Ramakrishna');
                    if (user) loginAs(user);
                  }}
                  className="p-2 text-left rounded border border-blue-200 bg-blue-50/70 hover:bg-blue-100 transition-colors"
                >
                  <div className="font-bold text-blue-950 flex items-center justify-between">
                    <span>Ramakrishna</span>
                    <span className="text-[9px] bg-blue-200 text-blue-900 px-1 rounded">Faculty</span>
                  </div>
                  <div className="text-[10px] text-blue-800">Mechanical Faculty</div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ================= SIGN UP FORM ================= */
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                Register Institutional Account
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Access seminar halls, slot reservations, and external examiner arrangements.
              </p>
            </div>

            {signupError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{signupError}</span>
              </div>
            )}

            <form onSubmit={handleSignupSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full Name */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Dr. B. Nageswara Rao"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    required
                  />
                </div>

                {/* Employee / Student ID */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Employee / Student ID *
                  </label>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={e => setEmployeeId(e.target.value)}
                    placeholder="e.g. EMP-CSE-220 or 22711A0501"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:bg-white uppercase"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Department */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Department *
                  </label>
                  <select
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  >
                    {departmentsList.map(dep => (
                      <option key={dep} value={dep}>{dep}</option>
                    ))}
                  </select>
                </div>

                {/* Designation */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Designation *
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={e => setDesignation(e.target.value)}
                    placeholder="e.g. Associate Professor / Student Lead"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Email */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Institutional Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@nec.edu.in"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98480 00000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Account Type */}
              <div className="p-2.5 bg-blue-50/50 rounded-lg border border-blue-100">
                <label className="block font-semibold text-blue-900 mb-1">
                  Account Type / Role *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {(['FACULTY', 'STAFF', 'STUDENT', 'COORDINATOR'] as Role[]).map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-1.5 px-2 rounded text-center font-bold text-[11px] transition-colors ${
                        role === r
                          ? 'bg-blue-700 text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                {role === 'COORDINATOR' && (
                  <div className="mt-2.5 pt-2 border-t border-blue-200 flex items-center space-x-2">
                    <span className="font-semibold text-blue-950">Assigned Hall Block:</span>
                    <select
                      value={assignedBlock}
                      onChange={e => setAssignedBlock(e.target.value as any)}
                      className="px-2 py-1 bg-white border border-blue-300 rounded text-xs font-semibold text-blue-900"
                    >
                      <option value="Block-2">Block-2 (Tirumala Rao)</option>
                      <option value="Block-3">Block-3 (Venkat Rao)</option>
                      <option value="Block-4">Block-4 (Suneel Sir)</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Password */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="btn-submit-signup"
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-sm text-sm transition-colors cursor-pointer flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

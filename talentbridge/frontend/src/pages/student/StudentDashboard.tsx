import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  FileText,
  Heart,
  Settings,
  LogOut,
  Bell,
  MapPin,
  Building2,
  TrendingUp,
  User,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'success');
    navigate('/');
  };

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard', icon: TrendingUp },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'saved', label: 'Saved Jobs', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">TalentBridge</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex gap-6 lg:gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-24">
              <div className="text-center pb-4 border-b border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="mt-3 font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">Job Seeker</p>
              </div>
              <nav className="mt-4 space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Sidebar - Mobile */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-30 lg:hidden">
              <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
              <aside className="fixed left-0 top-16 bottom-0 w-72 bg-white shadow-xl overflow-y-auto">
                <div className="p-4">
                  <div className="text-center pb-4 border-b border-gray-100">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="mt-3 font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">Job Seeker</p>
                  </div>
                  <nav className="mt-4 space-y-1">
                    {sidebarItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setSidebarOpen(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === item.id
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </aside>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
                    <p className="text-gray-500 mt-1">Track your job applications and find new opportunities</p>
                  </div>
                  <Link
                    to="/jobs"
                    className="inline-flex px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 text-center"
                  >
                    Browse Jobs
                  </Link>
                </div>

                {/* Empty State */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full mx-auto flex items-center justify-center mb-4">
                      <Briefcase className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Start Your Job Search</h2>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      Browse available jobs and apply to positions that match your skills. Your applications will appear here.
                    </p>
                    <Link
                      to="/jobs"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                    >
                      <span>Find Jobs</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link
                    to="/jobs"
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all"
                  >
                    <Briefcase className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-gray-900">Browse Jobs</h3>
                    <p className="text-sm text-gray-500 mt-1">Explore available opportunities</p>
                  </Link>
                  <Link
                    to="/companies"
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all"
                  >
                    <Building2 className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="font-semibold text-gray-900">Discover Companies</h3>
                    <p className="text-sm text-gray-500 mt-1">Find your ideal employer</p>
                  </Link>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all text-left"
                  >
                    <User className="w-8 h-8 text-purple-600 mb-3" />
                    <h3 className="font-semibold text-gray-900">Complete Profile</h3>
                    <p className="text-sm text-gray-500 mt-1">Add your skills and experience</p>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Applications</h1>

                <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">No Applications Yet</h2>
                    <p className="text-gray-500 mb-6">
                      When you apply for jobs, your applications will be tracked here.
                    </p>
                    <Link
                      to="/jobs"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                    >
                      <span>Browse Jobs</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Saved Jobs</h1>

                <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12">
                  <div className="text-center">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">No Saved Jobs</h2>
                    <p className="text-gray-500 mb-6">
                      Save jobs you're interested in to review them later.
                    </p>
                    <Link
                      to="/jobs"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                    >
                      <span>Find Jobs</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h1>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="text-center pb-6 border-b border-gray-100">
                    <div className="relative inline-block">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-gray-900">{user.name}</h2>
                    <p className="text-gray-500">Job Seeker</p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={user.name}
                        readOnly
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          placeholder="Not added"
                          readOnly
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Not added"
                            readOnly
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Email notifications for new jobs', checked: true },
                      { label: 'Application status updates', checked: true },
                      { label: 'Weekly job recommendations', checked: false },
                    ].map((pref) => (
                      <label key={pref.label} className="flex items-center justify-between">
                        <span className="text-gray-700">{pref.label}</span>
                        <input
                          type="checkbox"
                          defaultChecked={pref.checked}
                          className="w-5 h-5 text-blue-600 rounded"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-gray-700 font-medium">
                      Change Password
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 bg-red-50 rounded-lg hover:bg-red-100 text-red-600 font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

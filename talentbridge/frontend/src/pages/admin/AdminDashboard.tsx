import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Users,
  Building2,
  Shield,
  Settings,
  LogOut,
  Bell,
  TrendingUp,
  Menu,
  X,
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const adminLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';

  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged_in');
    showToast('Logged out successfully', 'success');
    navigate('/');
  };

  if (!adminLoggedIn) {
    navigate('/admin/login');
    return null;
  }

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard', icon: TrendingUp },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'jobs', label: 'Job Moderation', icon: Briefcase },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TalentBridge</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">Admin</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
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
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full mx-auto flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="mt-3 font-semibold text-gray-900">Admin</h3>
                <p className="text-sm text-gray-500">System Administrator</p>
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
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full mx-auto flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="mt-3 font-semibold text-gray-900">Admin</h3>
                    <p className="text-sm text-gray-500">System Administrator</p>
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
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>

                <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full mx-auto flex items-center justify-center mb-4">
                      <TrendingUp className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Admin Panel</h2>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Monitor platform activity, manage users, and moderate job listings from this dashboard.
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Users', icon: Users },
                    { label: 'Active Jobs', icon: Briefcase },
                    { label: 'Companies', icon: Building2 },
                    { label: 'Pending Reviews', icon: Shield },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-5">
                        <Icon className="w-8 h-8 text-gray-400 mb-3" />
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="text-sm text-gray-400 mt-1">No data available</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Management</h1>

                <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12">
                  <div className="text-center">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">No Users to Display</h2>
                    <p className="text-gray-500">User data will appear here once registered.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'jobs' && (
              <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Job Moderation</h1>

                <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12">
                  <div className="text-center">
                    <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">No Jobs to Review</h2>
                    <p className="text-gray-500">Jobs pending moderation will appear here.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'companies' && (
              <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Company Management</h1>

                <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12">
                  <div className="text-center">
                    <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">No Companies to Display</h2>
                    <p className="text-gray-500">Registered companies will appear here.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Settings</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Email verification required', checked: true },
                      { label: 'Manual job review required', checked: true },
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

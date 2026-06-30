import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase, Users, Building2, Shield, Settings,
  LogOut, Bell, TrendingUp, Menu, X, Trash2,
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const API = 'http://localhost:5000/api';

interface Stats {
  totalStudents: number;
  totalCompanies: number;
}

interface Student {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface Company {
  _id: string;
  companyName: string;
  email: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<Stats>({ totalStudents: 0, totalCompanies: 0 });
  const [students, setStudents] = useState<Student[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('tb_token');
  const adminLoggedIn = !!token && JSON.parse(localStorage.getItem('tb_user') || '{}')?.role === 'admin';

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    if (!adminLoggedIn) { navigate('/admin/login'); return; }
    fetchStats();
  }, []);

  useEffect(() => {
    if (activeTab === 'users') fetchStudents();
    if (activeTab === 'companies') fetchCompanies();
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API}/admin/stats`, { headers });
      const data = await res.json();
      if (data.success) setStats(data.stats);
    } catch (err) { console.error(err); }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/students`, { headers });
      const data = await res.json();
      if (data.success) setStudents(data.students);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/companies`, { headers });
      const data = await res.json();
      if (data.success) setCompanies(data.companies);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const deleteStudent = async (id: string) => {
    if (!confirm('Delete this student?')) return;
    try {
      const res = await fetch(`${API}/admin/students/${id}`, { method: 'DELETE', headers });
      const data = await res.json();
      if (data.success) { showToast('Student deleted!', 'success'); fetchStudents(); fetchStats(); }
    } catch (err) { showToast('Error deleting student', 'error'); }
  };

  const deleteCompany = async (id: string) => {
    if (!confirm('Delete this company?')) return;
    try {
      const res = await fetch(`${API}/admin/companies/${id}`, { method: 'DELETE', headers });
      const data = await res.json();
      if (data.success) { showToast('Company deleted!', 'success'); fetchCompanies(); fetchStats(); }
    } catch (err) { showToast('Error deleting company', 'error'); }
  };

  const handleLogout = () => {
    localStorage.removeItem('tb_token');
    localStorage.removeItem('tb_user');
    showToast('Logged out successfully', 'success');
    navigate('/');
  };

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard', icon: TrendingUp },
    { id: 'users', label: 'Students', icon: Users },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-900 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TalentBridge</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">Admin</span>
              </div>
              <button onClick={handleLogout} className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
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
                    <button key={item.id} onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {sidebarOpen && (
            <div className="fixed inset-0 z-30 lg:hidden">
              <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
              <aside className="fixed left-0 top-16 bottom-0 w-72 bg-white shadow-xl overflow-y-auto">
                <div className="p-4">
                  <nav className="mt-4 space-y-1">
                    {sidebarItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
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

          <main className="flex-1 min-w-0">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <Users className="w-8 h-8 text-blue-500 mb-3" />
                    <p className="text-sm text-gray-500">Total Students</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <Building2 className="w-8 h-8 text-green-500 mb-3" />
                    <p className="text-sm text-gray-500">Total Companies</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalCompanies}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <Briefcase className="w-8 h-8 text-purple-500 mb-3" />
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalStudents + stats.totalCompanies}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Students ({students.length})</h1>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                  ) : students.length === 0 ? (
                    <div className="p-8 text-center">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No students registered yet</p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Joined</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {students.map((s) => (
                          <tr key={s._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{s.name}</td>
                            <td className="px-6 py-4 text-gray-500">{s.email}</td>
                            <td className="px-6 py-4 text-gray-500">{new Date(s.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                              <button onClick={() => deleteStudent(s._id)} className="text-red-500 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'companies' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Companies ({companies.length})</h1>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                  ) : companies.length === 0 ? (
                    <div className="p-8 text-center">
                      <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No companies registered yet</p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Company</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Joined</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {companies.map((c) => (
                          <tr key={c._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{c.companyName}</td>
                            <td className="px-6 py-4 text-gray-500">{c.email}</td>
                            <td className="px-6 py-4 text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                              <button onClick={() => deleteCompany(c._id)} className="text-red-500 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 bg-red-50 rounded-lg hover:bg-red-100 text-red-600 font-medium">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
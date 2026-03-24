import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Music, Calendar, Users, LogOut, Lock } from 'lucide-react';

import AdminMixes from '../components/AdminMixes';
import AdminEvents from '../components/AdminEvents';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Check if already authenticated in this session
  useEffect(() => {
    const authState = sessionStorage.getItem('admin_auth');
    if (authState === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (password === '39271927') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      setLoginError('Incorrect password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Admin Access</h2>
          <p className="text-zinc-400 mb-8">Enter your secret password to continue.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 text-center tracking-widest"
              />
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const NAV_ITEMS = [
    { path: '/admin', label: 'Mixes', icon: Music },
    { path: '/admin/events', label: 'Events', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <Link to="/" className="text-2xl font-black tracking-tighter text-white uppercase flex items-center gap-2">
            <span className="text-orange-500">DJ</span>
            <span>Harry254</span>
          </Link>
          <div className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">Admin Dashboard</div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive ? 'bg-orange-500/10 text-orange-500' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <div className="overflow-hidden text-left">
              <div className="text-sm font-bold text-white truncate">Admin</div>
              <div className="text-xs text-zinc-500 truncate">Solo Admin</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Routes>
          <Route path="/" element={<AdminMixes />} />
          <Route path="/events" element={<AdminEvents />} />
        </Routes>
      </main>
    </div>
  );
}

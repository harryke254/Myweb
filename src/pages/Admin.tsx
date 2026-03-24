import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { LayoutDashboard, Music, Calendar, Users, LogOut } from 'lucide-react';

import AdminMixes from '../components/AdminMixes';
import AdminEvents from '../components/AdminEvents';
import AdminBookings from '../components/AdminBookings';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error', error);
      alert('Failed to login');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (loading) {
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 max-w-md w-full text-center">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Admin Access</h2>
          <p className="text-zinc-400 mb-8">Login to manage your website content.</p>
          <button
            onClick={handleLogin}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  const NAV_ITEMS = [
    { path: '/admin', label: 'Mixes', icon: Music },
    { path: '/admin/events', label: 'Events', icon: Calendar },
    { path: '/admin/bookings', label: 'Bookings', icon: Users },
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
            <img src={user.photoURL || 'https://via.placeholder.com/40'} alt="Profile" className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
            <div className="overflow-hidden">
              <div className="text-sm font-bold text-white truncate">{user.displayName}</div>
              <div className="text-xs text-zinc-500 truncate">{user.email}</div>
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
          <Route path="/bookings" element={<AdminBookings />} />
        </Routes>
      </main>
    </div>
  );
}

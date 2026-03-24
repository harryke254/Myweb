import { Instagram, Youtube, Twitter, Facebook, Music2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <a href="#home" className="text-3xl font-black tracking-tighter text-white uppercase flex items-center gap-2 mb-6">
              <span className="text-orange-500">DJ</span>
              <span>Harry254</span>
            </a>
            <p className="text-zinc-400 font-light leading-relaxed max-w-md mb-8">
              Mr Street Sensation. Africa's premier DJ bringing the ultimate vibe to your events, clubs, and festivals worldwide.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-orange-500 hover:text-white transition-all">
                <Youtube size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-orange-500 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-orange-500 hover:text-white transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-orange-500 hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-orange-500 hover:text-white transition-all">
                <Music2 size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><a href="#mixes" className="text-zinc-400 hover:text-orange-500 transition-colors">Latest Mixes</a></li>
              <li><a href="#events" className="text-zinc-400 hover:text-orange-500 transition-colors">Upcoming Events</a></li>
              <li><a href="#about" className="text-zinc-400 hover:text-orange-500 transition-colors">About DJ Harry254</a></li>
              <li><a href="#contact" className="text-zinc-400 hover:text-orange-500 transition-colors">Bookings</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">DMCA Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} DJ Harry254. All rights reserved.</p>
          <p>Designed for the Streets.</p>
        </div>
      </div>
    </footer>
  );
}

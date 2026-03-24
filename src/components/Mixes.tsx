import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Download, Headphones } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Mixes() {
  const [mixes, setMixes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMixes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'mixes'));
        const mixesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMixes(mixesData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch (error) {
        console.error("Error fetching mixes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMixes();
  }, []);

  return (
    <section id="mixes" className="py-24 bg-zinc-950 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-orange-500 font-bold tracking-[0.2em] uppercase text-sm mb-2">
              Latest Releases
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Featured Mixes
            </h3>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-orange-500 font-bold uppercase tracking-wider text-sm transition-colors"
          >
            <Headphones size={18} />
            View All Mixes
          </a>
        </div>

        {loading ? (
          <div className="text-center text-zinc-500 py-12">Loading mixes...</div>
        ) : mixes.length === 0 ? (
          <div className="text-center text-zinc-500 py-12">No mixes available yet. Check back soon!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mixes.map((mix, index) => (
              <motion.div
                key={mix.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500/50 transition-colors"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={mix.imageUrl}
                    alt={mix.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href={mix.audioUrl} target="_blank" rel="noreferrer" className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/30 hover:scale-110 transition-transform">
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </a>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs font-mono px-2 py-1 rounded">
                    {mix.duration}
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">
                    {mix.genre}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-4 line-clamp-1 group-hover:text-orange-400 transition-colors">
                    {mix.title}
                  </h4>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                    <span className="text-sm text-zinc-500 font-medium">{mix.plays} Plays</span>
                    <a href={mix.audioUrl} download className="text-zinc-400 hover:text-white transition-colors">
                      <Download size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

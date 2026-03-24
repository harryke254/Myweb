import { motion } from 'motion/react';
import { Play, Calendar, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950 z-10" />
        <img
          src="https://images.unsplash.com/photo-1516280440502-a2fc1946edcb?q=80&w=2070&auto=format&fit=crop"
          alt="DJ Performance"
          className="w-full h-full object-cover object-center opacity-40"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-orange-500 font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-4 md:mb-6">
            Mr Street Sensation
          </h2>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
            DJ <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Harry254</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Bringing the ultimate street sensation to the world. Africa's premier DJ for Afrobeat, Amapiano, Hip-Hop, and high-energy live experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="#mixes"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            >
              <Play size={20} fill="currentColor" />
              Listen to Mixes
            </a>
            <a
              href="#events"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border-2 border-zinc-700 hover:border-white text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all hover:bg-white/5"
            >
              <Calendar size={20} />
              Upcoming Events
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-0.5 h-12 bg-gradient-to-b from-orange-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}

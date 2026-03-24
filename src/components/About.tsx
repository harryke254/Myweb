import { motion } from 'motion/react';
import { Music, Globe, Users, Award } from 'lucide-react';

const STATS = [
  { label: 'Years Active', value: '10+', icon: Award },
  { label: 'Live Shows', value: '500+', icon: Users },
  { label: 'Mixes Released', value: '100+', icon: Music },
  { label: 'Countries Played', value: '15+', icon: Globe },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=2071&auto=format&fit=crop"
                alt="DJ Harry254 Performing"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-orange-500 text-white p-6 md:p-8 rounded-full border-8 border-zinc-950 shadow-2xl flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40">
              <span className="text-3xl md:text-4xl font-black tracking-tighter">#1</span>
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-center mt-1">Street<br/>DJ</span>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-orange-500 font-bold tracking-[0.2em] uppercase text-sm mb-2">
              The Journey
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-8">
              Mr Street Sensation
            </h3>
            
            <div className="space-y-6 text-zinc-400 font-light leading-relaxed text-lg mb-12">
              <p>
                DJ Harry254, widely known as "Mr Street Sensation," has revolutionized the urban music scene. With a unique blend of Afrobeat, Amapiano, Gengetone, and Hip-Hop, he creates an electrifying atmosphere that keeps crowds moving until dawn.
              </p>
              <p>
                Starting from the vibrant streets of Nairobi, his unparalleled ability to read the crowd and seamlessly transition between genres has earned him a spot among the most sought-after DJs in Africa and beyond.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {STATS.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-zinc-900 rounded-lg text-orange-500">
                      <Icon size={24} />
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                        {stat.value}
                      </div>
                      <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

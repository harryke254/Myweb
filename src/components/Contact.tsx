import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-zinc-900 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-orange-500 font-bold tracking-[0.2em] uppercase text-sm mb-2">
            Get in Touch
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Contact DJ Harry254
          </h3>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800">
              <h4 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider text-center">Contact Details</h4>
              
              <div className="space-y-6 flex flex-col items-center text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-zinc-900 rounded-full text-orange-500 shrink-0">
                    <Mail size={32} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">Email</div>
                    <a href="mailto:harrisonreycaspian@gmail.com" className="text-white hover:text-orange-500 transition-colors text-lg">
                      harrisonreycaspian@gmail.com
                    </a>
                  </div>
                </div>

                <div className="w-full h-px bg-zinc-800 max-w-xs"></div>

                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-zinc-900 rounded-full text-orange-500 shrink-0">
                    <Phone size={32} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">Phone / WhatsApp</div>
                    <a href="tel:+254708654493" className="text-white hover:text-orange-500 transition-colors text-lg">
                      +254 708 654 493
                    </a>
                  </div>
                </div>

                <div className="w-full h-px bg-zinc-800 max-w-xs"></div>

                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-zinc-900 rounded-full text-orange-500 shrink-0">
                    <MapPin size={32} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">Location</div>
                    <span className="text-white text-lg">
                      Nairobi, Kenya<br/>
                      Available Worldwide
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    date: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      alert('Booking request sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', eventType: '', date: '', message: '' });
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to send booking request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-zinc-900 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-orange-500 font-bold tracking-[0.2em] uppercase text-sm mb-2">
            Get in Touch
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Book DJ Harry254
          </h3>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800">
              <h4 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Contact Details</h4>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-900 rounded-lg text-orange-500 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">Email</div>
                    <a href="mailto:harrisonreycaspian@gmail.com" className="text-white hover:text-orange-500 transition-colors">
                      harrisonreycaspian@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-900 rounded-lg text-orange-500 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">Phone / WhatsApp</div>
                    <a href="tel:+254708654493" className="text-white hover:text-orange-500 transition-colors">
                      +254 708 654 493
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-900 rounded-lg text-orange-500 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">Location</div>
                    <span className="text-white">
                      Nairobi, Kenya<br/>
                      Available Worldwide
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="eventType" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Event Type</label>
                  <select
                    id="eventType"
                    required
                    value={formData.eventType}
                    onChange={e => setFormData({...formData, eventType: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all appearance-none"
                  >
                    <option value="">Select Type</option>
                    <option value="club">Club/Lounge</option>
                    <option value="concert">Concert/Festival</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="private">Private Party</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="date" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Event Date</label>
                  <input
                    type="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-400 focus:text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Event Details</label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                  placeholder="Tell us more about your event (location, expected crowd, specific requirements)..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send size={20} />
                {isSubmitting ? 'Sending...' : 'Send Booking Request'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

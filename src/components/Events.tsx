import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Ticket, Calendar as CalendarIcon } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsData.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section id="events" className="py-24 bg-zinc-900 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-orange-500 font-bold tracking-[0.2em] uppercase text-sm mb-2">
            Live Experience
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Upcoming Events
          </h3>
        </div>

        {loading ? (
          <div className="text-center text-zinc-500 py-12">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center text-zinc-500 py-12">No upcoming events scheduled. Check back soon!</div>
        ) : (
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group flex flex-col md:flex-row items-center bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500/50 transition-colors gap-6"
              >
                {/* Date Box */}
                <div className="flex-shrink-0 w-full md:w-32 text-center md:text-left md:border-r border-zinc-800 md:pr-6">
                  <div className="text-2xl font-black text-white uppercase tracking-tighter">
                    {event.date}
                  </div>
                  <div className="text-sm text-orange-500 font-bold uppercase tracking-wider">
                    {event.day}
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex-grow text-center md:text-left">
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {event.title}
                  </h4>
                  <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 text-sm text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={16} className="text-zinc-500" />
                      {event.venue}
                    </span>
                    <span className="hidden sm:inline text-zinc-700">•</span>
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
                  <button
                    disabled={event.status === 'Sold Out'}
                    className={`w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-all ${
                      event.status === 'Sold Out'
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        : 'bg-orange-500 hover:bg-orange-600 text-white hover:scale-105 active:scale-95'
                    }`}
                  >
                    <Ticket size={18} />
                    {event.status === 'Sold Out' ? 'Sold Out' : 'Get Tickets'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-bold uppercase tracking-wider text-sm transition-colors"
          >
            <CalendarIcon size={18} />
            Book DJ Harry254 for your city
          </a>
        </div>
      </div>
    </section>
  );
}

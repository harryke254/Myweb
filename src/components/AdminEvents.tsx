import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Plus, Trash2, MapPin } from 'lucide-react';

export default function AdminEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    day: '',
    venue: '',
    location: '',
    status: 'Available',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'events'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      alert("Event added successfully!");
      setShowForm(false);
      setFormData({ title: '', date: '', day: '', venue: '', location: '', status: 'Available' });
      fetchEvents();
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Error adding event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteDoc(doc(db, 'events', id));
        fetchEvents();
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Manage Events</h1>
          <p className="text-zinc-400 mt-1">Add and update your upcoming gigs</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold uppercase tracking-wider transition-colors text-sm"
        >
          {showForm ? 'Cancel' : <><Plus size={18} /> Add Event</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Event Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g. Afrobeat Shutdown"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Date</label>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g. OCT 15"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Day</label>
                <input
                  type="text"
                  required
                  value={formData.day}
                  onChange={e => setFormData({...formData, day: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g. Saturday"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Venue</label>
                <input
                  type="text"
                  required
                  value={formData.venue}
                  onChange={e => setFormData({...formData, venue: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g. Club XS"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g. Nairobi, Kenya"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</label>
                <select
                  required
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 appearance-none"
                >
                  <option value="Available">Available</option>
                  <option value="Selling Fast">Selling Fast</option>
                  <option value="Sold Out">Sold Out</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-colors"
            >
              {isSubmitting ? 'Saving...' : 'Save Event'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-zinc-500">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="text-zinc-500 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 text-center">No events scheduled.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {events.map(event => (
            <div key={event.id} className="flex flex-col md:flex-row items-center bg-zinc-900 border border-zinc-800 rounded-2xl p-6 gap-6">
              <div className="flex-shrink-0 w-full md:w-32 text-center md:text-left md:border-r border-zinc-800 md:pr-6">
                <div className="text-2xl font-black text-white uppercase tracking-tighter">{event.date}</div>
                <div className="text-sm text-orange-500 font-bold uppercase tracking-wider">{event.day}</div>
              </div>
              <div className="flex-grow text-center md:text-left">
                <h4 className="text-xl font-bold text-white mb-2">{event.title}</h4>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 text-sm text-zinc-400">
                  <span className="flex items-center gap-1.5"><MapPin size={16} />{event.venue}</span>
                  <span className="hidden sm:inline text-zinc-700">•</span>
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  event.status === 'Sold Out' ? 'bg-zinc-800 text-zinc-500' : 'bg-orange-500/10 text-orange-500'
                }`}>
                  {event.status}
                </span>
                <button onClick={() => handleDelete(event.id)} className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

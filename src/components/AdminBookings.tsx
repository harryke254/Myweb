import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Mail, Calendar, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'bookings'));
      const bookingsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status: newStatus });
      fetchBookings();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this booking request?")) {
      try {
        await deleteDoc(doc(db, 'bookings', id));
        fetchBookings();
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Booking Requests</h1>
        <p className="text-zinc-400 mt-1">Manage incoming event booking inquiries</p>
      </div>

      {loading ? (
        <div className="text-zinc-500">Loading bookings...</div>
      ) : bookings.length === 0 ? (
        <div className="text-zinc-500 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 text-center">No booking requests yet.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
              {/* Status Indicator Line */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                booking.status === 'confirmed' ? 'bg-green-500' :
                booking.status === 'rejected' ? 'bg-red-500' : 'bg-orange-500'
              }`} />
              
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{booking.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                        <Mail size={14} />
                        <a href={`mailto:${booking.email}`} className="hover:text-orange-500 transition-colors">{booking.email}</a>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500' :
                      booking.status === 'rejected' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-800">
                    <div className="bg-zinc-950 px-4 py-2 rounded-lg border border-zinc-800">
                      <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Event Type</div>
                      <div className="text-sm font-medium text-white capitalize">{booking.eventType}</div>
                    </div>
                    <div className="bg-zinc-950 px-4 py-2 rounded-lg border border-zinc-800">
                      <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-1"><Calendar size={12}/> Date</div>
                      <div className="text-sm font-medium text-white">{booking.date}</div>
                    </div>
                    <div className="bg-zinc-950 px-4 py-2 rounded-lg border border-zinc-800">
                      <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Requested On</div>
                      <div className="text-sm font-medium text-white">{new Date(booking.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 mt-4">
                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Message Details</div>
                    <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{booking.message}</p>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 md:w-48 shrink-0">
                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 px-4 py-3 rounded-lg font-bold uppercase tracking-wider transition-colors text-xs"
                      >
                        <CheckCircle size={16} /> Confirm
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                        className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-3 rounded-lg font-bold uppercase tracking-wider transition-colors text-xs"
                      >
                        <XCircle size={16} /> Decline
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-3 rounded-lg font-bold uppercase tracking-wider transition-colors text-xs mt-auto"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

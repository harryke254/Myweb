import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { Upload, Plus, Trash2, Edit2, Play, Image as ImageIcon, Music } from 'lucide-react';

export default function AdminMixes() {
  const [mixes, setMixes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    duration: '',
    plays: 0,
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchMixes();
  }, []);

  const fetchMixes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'mixes'));
      const mixesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort by createdAt descending manually if needed, or assume order
      setMixes(mixesData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error("Error fetching mixes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!audioFile || !imageFile) return alert("Please select both audio and image files");
    
    // Check file size (500MB max for audio)
    if (audioFile.size > 500 * 1024 * 1024) {
      return alert("Audio file exceeds 500MB limit");
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // 1. Upload Image
      const imageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
      await uploadBytesResumable(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      // 2. Upload Audio
      const audioRef = ref(storage, `mixes/${Date.now()}_${audioFile.name}`);
      const uploadTask = uploadBytesResumable(audioRef, audioFile);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        }, 
        (error) => {
          console.error("Upload error:", error);
          alert("Error uploading audio");
          setIsUploading(false);
        }, 
        async () => {
          const audioUrl = await getDownloadURL(uploadTask.snapshot.ref);
          
          // 3. Save to Firestore
          await addDoc(collection(db, 'mixes'), {
            title: formData.title,
            genre: formData.genre,
            duration: formData.duration,
            plays: Number(formData.plays),
            audioUrl,
            imageUrl,
            createdAt: new Date().toISOString()
          });

          alert("Mix uploaded successfully!");
          setShowForm(false);
          setFormData({ title: '', genre: '', duration: '', plays: 0 });
          setAudioFile(null);
          setImageFile(null);
          setIsUploading(false);
          fetchMixes();
        }
      );
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this mix?")) {
      try {
        await deleteDoc(doc(db, 'mixes', id));
        fetchMixes();
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Manage Mixes</h1>
          <p className="text-zinc-400 mt-1">Upload and organize your mixtapes (Max 500MB)</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold uppercase tracking-wider transition-colors text-sm"
        >
          {showForm ? 'Cancel' : <><Plus size={18} /> Add New Mix</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 mb-8">
          <form onSubmit={handleUpload} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Mix Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g. Street Sensation Vol. 10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Genre</label>
                <input
                  type="text"
                  required
                  value={formData.genre}
                  onChange={e => setFormData({...formData, genre: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g. Afrobeat & Amapiano"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Duration</label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={e => setFormData({...formData, duration: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g. 1:15:00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Initial Plays</label>
                <input
                  type="number"
                  required
                  value={formData.plays}
                  onChange={e => setFormData({...formData, plays: Number(e.target.value)})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2"><ImageIcon size={14}/> Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={e => setImageFile(e.target.files?.[0] || null)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500/10 file:text-orange-500 hover:file:bg-orange-500/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2"><Music size={14}/> Audio File (Max 500MB)</label>
                <input
                  type="file"
                  accept="audio/*"
                  required
                  onChange={e => setAudioFile(e.target.files?.[0] || null)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500/10 file:text-orange-500 hover:file:bg-orange-500/20"
                />
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Uploading...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isUploading}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-colors"
            >
              <Upload size={18} />
              {isUploading ? 'Uploading...' : 'Upload Mix'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-zinc-500">Loading mixes...</div>
      ) : mixes.length === 0 ? (
        <div className="text-zinc-500 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 text-center">No mixes uploaded yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mixes.map(mix => (
            <div key={mix.id} className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
              <div className="aspect-video relative overflow-hidden bg-zinc-950">
                <img src={mix.imageUrl} alt={mix.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-1 rounded font-mono">{mix.duration}</div>
              </div>
              <div className="p-4">
                <div className="text-xs text-orange-500 font-bold uppercase mb-1">{mix.genre}</div>
                <h3 className="font-bold text-lg mb-2 truncate">{mix.title}</h3>
                <div className="flex items-center justify-between text-sm text-zinc-400 mb-4">
                  <span>{mix.plays} plays</span>
                  <a href={mix.audioUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white">
                    <Play size={14} /> Listen
                  </a>
                </div>
                <div className="flex gap-2 border-t border-zinc-800 pt-4">
                  <button onClick={() => handleDelete(mix.id)} className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 py-2 rounded-lg transition-colors text-sm font-bold">
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

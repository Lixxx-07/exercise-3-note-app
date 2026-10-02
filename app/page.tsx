'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, Sparkles, AlertCircle, CheckCircle2, Cloud } from 'lucide-react';
import NoteItem from '@/components/NoteItem';

interface Note {
  id: string;
  title: string;
  description: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [isDuplicate, setIsDuplicate] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

  useEffect(() => {
    if (!title.trim()) {
      setIsDuplicate(false);
      return;
    }

    const exists = notes.some(
      (note) => note.title.toLowerCase() === title.trim().toLowerCase() && note.id !== editingId
    );

    setIsDuplicate(exists);
  }, [title, notes, editingId]);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setMessage({ text: 'Please fill out both fields!', type: 'error' });
      return;
    }

    if (isDuplicate) {
      setMessage({ text: 'A note with this title is already existed!', type: 'error'});
      return;
    }

    if (editingId) {
      setNotes(notes.map((n) => (n.id === editingId ? { ...n, title, description } : n)));
      setMessage({ text: 'Note has been updated successfully!', type: 'success'});
      setEditingId(null);
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
      };
      setNotes([newNote, ...notes]);
      setMessage({ text: 'New note has been created!', type: 'success' });
    }

    setTitle('');
    setDescription('');
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setDescription(note.description);
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setTitle('');
      setDescription('');
    }
    setMessage({ text: 'Note deleted!', type: 'error' });
  };

  return (
    <div className='min-h-screen bg-[#f0f8ff] text-sky-950 p-6 md:p-12 relative overflow-hidden'>
      <div className='absolute top-[-100px] left=[-100px] w-96 h-96 bg-sky-200/50 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute bottom-[-100px] right[-100px] w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none' />

      <div className='max-w-4xl mx-auto space-y-8 relative z-10'>

        <header className='text-center space-y-2'>
          <div className='inline-flex items-center gap-2 bg-white/80 border border-sky-200 px-4 py-1.5 rounded-full shadow-sm text-xs text-sky-600 font-mmedium'>
            <Cloud className='w-3.5 h-3.5 text-sky-400' /> ☁️Note App☁️
          </div>
          ,<h1 className='text-3xl md: text-4xl font-extrabold text-sky-600 flex items-center justify-center gap-2'>
            Le Notes App <Sparkles className='w-6 h-6 text-sky-400' />
          </h1>
          <p className='text-xs text-sky-700/60 font-medium'>Exercise 3: Full CRUD with React Hooks & Tailwind</p>
        </header>

        <form
          onSubmit={handleSubmit}
          className='bg-white/80 border border-sky-100 rounded-3xl p-6 shadow-xl shadow-sky-100/60 space-y-4 backdrop-blur-md'
        >
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-bold text-sky-900 flex items-center gap-1.5'>
              {editingId ? '✏️ Edit Note' : '☁️ Add New Note'}
            </h2>
            {editingId && (
              <button
                type='button'
                onClick={() => {
                  setEditingId(null);
                  setTitle('');
                  setDescription('');
                }}
                className='text-xs text-sky-500 hover:underline'
              >
                Cancel Edit
              </button>
            )}
          </div>

          {message && (
            <div className={`p-3 rounded-2xl text-xs flex items-center gap-2 ${
              message.type === 'error' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-sky-50 text-sky-700 border border-sky-200'
            }`}>
              {message.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
              <span>{message.text}</span>
            </div>
          )}

          <div className='space-y-1'>
            <input
              type='text'
              placeholder='Note Title...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full bg-[#f8fbff] border rounded-2xl px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-sky-300 ${
                isDuplicate ? 'border-rose-400 focus:border-rose-500' : 'border-sky-200 focus:border-sky-400'
              }`}
            />
            {isDuplicate && (
              <p className='text-[11px] text-rose-500 flex item-center gap-1 pt-1'>
                <AlertCircle className='w-3 h-3' /> Duplicate title detected! Pick a unique title.
              </p>
            )}
          </div>

          <textarea
            rows={3}
            placeholder='Write your note description here...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full bg-[#f8fbff] border border-sky-200 rounded-2xl p-4 text-sm outline-none focus:border-sky-400 transition-colors resize-none placeholder:text-sky-300'
          />

          <button
            type='submit'
            disabled={isDuplicate}
            className='w-full bg-sky-400 hover:bg-sky-500 disabled:opacity-50 text-white font-semibold py-3 rounded-2xl text-sm transition-all shadow-md shadow-sky-200 flex items-center justify-center gap-2'
          >
            {editingId ? 'Update Note' : 'Add Note'} <PlusCircle className='w-4 h-4' />
          </button>
        </form>

        <div className='space-y-4'>
          <h2 className='text-xl font-bold text-sky-900'>
            All Notes ({notes.length})
          </h2>

          {notes.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-sky-200 rounded-3xl text-sky-400 text-xs bg-white/40">
              No notes created yet! Add your first cloud note above ☁️✨
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
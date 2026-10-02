'use client';

import { Edit3, Trash2 } from 'lucide-react';

interface Note {
    id: string;
    title: string;
    description: string;
}

interface NoteItemProps {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (id: string) => void;
}

export default function NoteItem({ note, onEdit, onDelete }: NoteItemProps) {
    return (
        <div className="bgg-white/90 border border-sky-100 rounded-2xl p-5 shadow-md shadow-sky100/50 flex flex-cols justify-between hover:border-sky-300 transition-all group backdrop-blur-sm">
            <div className="space-y-2">
                <h3 className="font-bold text-lg text-sky-800 break-words">{note.title}</h3>
                <p className="text-xs text-sky-900/70 whitespace-pre-wrap leading-relaxed break-words">{note.description}</p>
            </div>
            
            <div className="flex justify-end gap-2 pt-4 border-t border-sky-100/80 mt-4">
                <button
                    onClick={() => onEdit(note)}
                    className="p-2 text-sky-400 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-colors"
                    title="Edit Note"
                >
                    <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(note.id)}
                        className="p-2 text-sky-400 hover:text-rose-400 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Delete Note"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
            </div>
        </div>

    );
}
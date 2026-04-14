import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Note = {
    title: string;
    content: string;
    tag: string;
};

interface NoteStore {
    draft: Note;
    setDraft: (note: Note) => void;
    clearDraft: () => void;
}

const initialDraft = {
    title: '',
    content: '',
    tag: 'Todo',
};

export const useNoteStore = create<NoteStore>()(
    persist(
        set => ({
            draft: initialDraft,
            setDraft: note => set({ draft: note }),
            clearDraft: () => set({ draft: initialDraft }),
        }),
        {
            name: 'note-draft',
            partialize: state => ({ draft: state.draft }),
        },
    ),
);

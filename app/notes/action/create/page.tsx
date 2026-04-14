import css from './CreateNote.module.css';
import { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata: Metadata = {
    title: 'Create note - NoteHub',
    description: 'It`s a page for creating your new note',
    openGraph: {
        url: `http://localhost:3000/`,
        title: 'Create note - NoteHub',
        description: 'It`s a page for creating your new note',
        images: [
            {
                url: 'https://ethnomir.ru/upload/medialibrary/77b/kolibri.jpg',
                width: 1200,
                height: 630,
                alt: 'Create note - NoteHub',
            },
        ],
    },
};

function CreateNote() {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm />
            </div>
        </main>
    );
}

export default CreateNote;

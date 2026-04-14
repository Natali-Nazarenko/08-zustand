'use client';

import { useRouter } from 'next/navigation';

import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';
import { useState } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create note - NoteHub',
    description: 'It`s a page for creating your new note',
    openGraph: {
        url: `http://localhost:3000/`,
        title: 'NoteHub',
        description: 'NoteHub is a platform for managing your notes',
        images: [
            {
                url: 'https://ethnomir.ru/upload/medialibrary/77b/kolibri.jpg',
                width: 1200,
                height: 630,
                alt: 'NoteHub',
            },
        ],
    },
};

function CreateNote() {
    const router = useRouter();
    const close = () => router.back();

    const [isModalOpen, setIsModalOpen] = useState(true);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                {isModalOpen && (
                    <Modal onClose={close}>
                        <NoteForm onClose={close} />
                    </Modal>
                )}
            </div>
        </main>
    );
}

export default CreateNote;

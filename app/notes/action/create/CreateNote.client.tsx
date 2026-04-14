'use client';

import { useRouter } from 'next/navigation';

import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';

function CreateNoteClient() {
    const router = useRouter();
    const close = () => {
        router.back();
    };

    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <Modal onClose={close}>
                    <NoteForm onClose={close} />
                </Modal>
            </div>
        </main>
    );
}

export default CreateNoteClient;

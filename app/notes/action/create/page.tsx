import { useRouter } from 'next/navigation';

import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

function CreateNote() {
    const router = useRouter();
    const close = () => router.back();

    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm onClose={close} />
            </div>
        </main>
    );
}

export default CreateNote;

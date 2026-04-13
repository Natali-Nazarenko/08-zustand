'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import css from './NotePreview.module.css';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';

function NotePreviewClient() {
    const router = useRouter();
    const close = () => router.back();

    const { id } = useParams<{ id: string }>();

    const { data, isLoading, error } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) {
        return <p>Loading, please wait...</p>;
    }
    if (error || !data) {
        return <p>Something went wrong.</p>;
    }

    return (
        <Modal onClose={close}>
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{data?.title}</h2>
                    </div>
                    <p className={css.tag}>{data?.tag}</p>
                    <p className={css.content}>{data?.content}</p>
                    <p className={css.date}>{data?.createdAt}</p>
                </div>
                <button className={css.backBtn} onClick={close}>
                    Close
                </button>
            </div>
        </Modal>
    );
}

export default NotePreviewClient;

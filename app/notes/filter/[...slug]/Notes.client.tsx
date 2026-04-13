'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

import NoteList from '@/components/NoteList/NoteList';
import css from '@/app/notes/[id]/NotesPage.module.css';
import { fetchNotes } from '@/lib/api';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';

type NotesClientProps = {
    tag?: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSearch = useDebouncedCallback((value: string) => {
        setSearch(value);
        setPage(1);
    }, 1000);

    const { data, isSuccess } = useQuery({
        queryKey: ['notes', page, search, tag],
        queryFn: () => fetchNotes(page, search, tag),
        placeholderData: keepPreviousData,
        refetchOnMount: false,
    });

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={search} onSearch={handleSearch} />

                {isSuccess && data.totalPages > 1 && (
                    <Pagination
                        totalPages={data.totalPages}
                        currentPage={page}
                        onPageChange={setPage}
                    />
                )}

                <button className={css.button} onClick={openModal}>
                    Create note +
                </button>
            </header>

            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <NoteForm onClose={closeModal} />
                </Modal>
            )}

            {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
        </div>
    );
}

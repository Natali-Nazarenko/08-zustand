'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

import NoteList from '@/components/NoteList/NoteList';
import css from '@/app/notes/filter/[...slug]/NotesClient.module.css';
import { fetchNotes } from '@/lib/api';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Link from 'next/link';

type NotesClientProps = {
    tag?: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

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

                <Link href="/notes/action/create" className={css.button}>
                    Create note +
                </Link>
            </header>

            {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
        </div>
    );
}

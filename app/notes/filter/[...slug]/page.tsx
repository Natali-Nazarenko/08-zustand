import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type NotesByTagProps = {
    params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: NotesByTagProps): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: `"${slug[0]}" notes - NoteHub`,
        description: `You choose '${slug[0]}' notes`,
        openGraph: {
            url: `https://08-zustand-pearl-eight.vercel.app/notes/${slug[0]}`,
            title: `"${slug[0]}" notes - NoteHub`,
            description: `You choose '${slug[0]}' notes`,
            images: [
                {
                    url: 'https://ethnomir.ru/upload/medialibrary/77b/kolibri.jpg',
                    width: 1200,
                    height: 630,
                    alt: `"${slug[0]}" notes - NoteHub`,
                },
            ],
        },
    };
}

async function NotesByTag({ params }: NotesByTagProps) {
    const { slug } = await params;
    const firstSlug = slug?.[0];

    const tag = firstSlug && firstSlug !== 'all' ? firstSlug : undefined;
    const page = 1;
    const search = '';

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes', page, search, tag],
        queryFn: () => fetchNotes(page, search, tag),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
        </HydrationBoundary>
    );
}

export default NotesByTag;

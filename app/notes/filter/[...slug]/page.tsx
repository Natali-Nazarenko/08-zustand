import { fetchNotes } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';

type NotesByTagProps = {
    params: Promise<{ slug: string[] }>;
};

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

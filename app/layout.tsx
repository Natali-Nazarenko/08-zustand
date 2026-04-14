import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanstackProvider from '@/components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
    variable: '--font-roboto',
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'NoteHub',
    description: 'NoteHub is a platform for managing your notes',
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

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${roboto.variable}`}>
            <body>
                <TanstackProvider>
                    <Header />
                    {children}
                    {modal}
                    <Footer />
                </TanstackProvider>
            </body>
        </html>
    );
}

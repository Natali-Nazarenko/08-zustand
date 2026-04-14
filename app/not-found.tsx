import type { Metadata } from 'next';

import css from './page.module.css';

export const metadata: Metadata = {
    title: '404 - page not found',
    description: 'The page you are looking for does not exist.',
    openGraph: {
        url: `http://localhost:3000/`,
        title: '404 - page not found',
        description: 'THE PAGE YOU REQUESTED COULD NOT BE FOUND',
        images: [
            {
                url: 'https://hyperhost.ua/info/storage/uploads/2020/11/404%20robot.png',
                width: 1200,
                height: 630,
                alt: '404 - page not found',
            },
        ],
    },
};

const NotFound = () => {
    return (
        <>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </>
    );
};

export default NotFound;

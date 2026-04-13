'use client';

import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ModalProps {
    onClose?: () => void;
    children: React.ReactNode;
}

function Modal({ onClose, children }: ModalProps) {
    const router = useRouter();

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            router.back();
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                router.back();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [router]);

    return createPortal(
        <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
            <div className={css.modal}>{children}</div>
        </div>,
        document.body,
    );
}

export default Modal;

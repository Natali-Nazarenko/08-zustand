'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';
import { useRouter } from 'next/navigation';

import { useNoteStore } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';

interface NoteFormValues {
    title: string;
    content: string;
    tag: string;
}

function NoteForm() {
    const fieldId = useId();
    const queryClient = useQueryClient();

    const router = useRouter();
    const close = () => router.back();

    const { draft, setDraft, clearDraft } = useNoteStore();

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = event.target;
        setDraft({ ...draft, [name]: value });
    };

    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            close();
            clearDraft();
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
        onError: error => {
            console.error(error);
        },
    });

    const handleSubmit = () => {
        mutate(draft);
    };

    return (
        <form className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-title`}>Title</label>
                <input
                    id={`${fieldId}-title`}
                    type="text"
                    name="title"
                    className={css.input}
                    value={draft?.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-content`}>Content</label>
                <textarea
                    id={`${fieldId}-content`}
                    name="content"
                    rows={8}
                    className={css.textarea}
                    value={draft?.content}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <select
                    id="tag"
                    name="tag"
                    className={css.select}
                    required
                    value={draft?.tag}
                    onChange={handleChange}
                >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>

            <div className={css.actions}>
                <button type="button" className={css.cancelButton} onClick={close}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={false}
                    onClick={handleSubmit}
                >
                    Create note
                </button>
            </div>
        </form>
    );
}

export default NoteForm;

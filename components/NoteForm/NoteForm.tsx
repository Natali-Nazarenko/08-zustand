'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';

import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';

interface NoteFormValues {
    title: string;
    content: string;
    tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

interface NoteFormProps {
    onClose: () => void;
}

function NoteForm({ onClose }: NoteFormProps) {
    const fieldId = useId();

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            onClose();
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
        onError: error => {
            console.error(error);
        },
    });

    const handleSubmit = (formData: FormData) => {
        mutate(values);
    };

    return (
        <form action={handleSubmit} className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-title`}>Title</label>
                <input
                    id={`${fieldId}-title`}
                    type="text"
                    name="title"
                    className={css.input}
                    required
                />
                <span className={css.error}>Це поле обов'язкове!</span>
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-content`}>Content</label>
                <textarea
                    id={`${fieldId}-content`}
                    name="content"
                    rows={8}
                    className={css.textarea}
                    required
                />
                <span className={css.error}>Це поле обов'язкове!</span>
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <select id="tag" name="tag" className={css.select} required>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
                <span className={css.error}>Це поле обов'язкове!</span>
            </div>

            <div className={css.actions}>
                <button type="button" className={css.cancelButton} onClick={onClose}>
                    Cancel
                </button>
                <button type="submit" className={css.submitButton} disabled={false}>
                    Create note
                </button>
            </div>
        </form>
    );
}

export default NoteForm;

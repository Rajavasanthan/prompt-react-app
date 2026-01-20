import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddPromptForm = ({ onSuccess, onCancel }) => {
    const formik = useFormik({
        initialValues: {
            title: '',
            prompt: '', // API likely expects 'prompt' based on previous context, or description? description in prompt card... user asked for "prompt" input.
            // let's check PromptCard props usage in App.jsx. data was mapped to prompt={prompt.prompt}.
            // so likely title and prompt.
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(50, 'Must be 50 characters or less')
                .required('Title is required'),
            prompt: Yup.string()
                .min(10, 'Must be at least 10 characters')
                .required('Prompt content is required'),
        }),
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                const response = await fetch('https://prompt-node-app.onrender.com/prompt/create-prompt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    throw new Error('Failed to create prompt');
                }

                // Success
                setStatus({ success: true });
                if (onSuccess) onSuccess();
            } catch (error) {
                console.error('Error creating prompt:', error);
                setStatus({ error: 'Failed to create prompt. Please try again.' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            {/* Title Field */}
            <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-sm font-semibold text-gray-700">
                    Title
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    className={`p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#7CA9A0]/50 transition-all ${formik.touched.title && formik.errors.title
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-[#7CA9A0]'
                        }`}
                    placeholder="e.g., Generate a logo..."
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className="text-red-500 text-xs">{formik.errors.title}</div>
                ) : null}
            </div>

            {/* Prompt Field */}
            <div className="flex flex-col gap-1">
                <label htmlFor="prompt" className="text-sm font-semibold text-gray-700">
                    Prompt
                </label>
                <textarea
                    id="prompt"
                    name="prompt"
                    rows="4"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.prompt}
                    className={`p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#7CA9A0]/50 transition-all resize-none ${formik.touched.prompt && formik.errors.prompt
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-[#7CA9A0]'
                        }`}
                    placeholder="Describe your prompt in detail..."
                />
                {formik.touched.prompt && formik.errors.prompt ? (
                    <div className="text-red-500 text-xs">{formik.errors.prompt}</div>
                ) : null}
            </div>

            {formik.status?.error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                    {formik.status.error}
                </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="bg-[#7CA9A0] hover:bg-[#6b968d] text-white px-6 py-2 rounded shadow-sm transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {formik.isSubmitting ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            Creating...
                        </>
                    ) : (
                        'Create Prompt'
                    )}
                </button>
            </div>
        </form>
    );
};

export default AddPromptForm;

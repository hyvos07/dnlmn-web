'use client';
import { useState, useRef } from 'react';
import { Copy } from 'lucide-react';
import Toast from './Toast';
import OpenToProject from '@/sections/1_home/components/OpenToProject';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [copyMessage, setCopyMessage] = useState('Copy Email');
    const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' } | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !message) {
            setToast({
                show: true,
                message: 'Please fill out all fields.',
                type: 'error'
            });
            return;
        }

        setIsSending(true);

        try {
            const response = await fetch('/api/emailjs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }

            setName('');
            setEmail('');
            setMessage('');

            setToast({
                show: true,
                message: 'Your message has been sent successfully!',
                type: 'success'
            });
        } catch (error) {
            console.error('Error sending email:', error);
            setToast({
                show: true,
                message: 'Failed to send message. Please try again later.',
                type: 'error'
            });
        } finally {
            setIsSending(false);
        }
    };

    const copyEmailToClipboard = () => {
        navigator.clipboard.writeText('daniel@ristek.cs.ui.ac.id');
        setCopyMessage('Copied!');
    };

    return (
        <div id="cp" className="flex w-full justify-center items-center p-12 my-16">
            <div className="flex max-lg:flex-col min-w-[325px] lg:min-w-[850px] gap-12 w-full px-12 p-10 rounded-xl bg-slate-900">
                <div className="flex flex-col lg:w-3/5 w-full">
                    <div className="flex max-sm:flex-col max-sm:gap-5 w-full justify-between items-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-semibold text-white">Contact Me!</h2>
                        <OpenToProject />
                    </div>
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-zinc-300 mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-800 text-white rounded border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#54b4e2]"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-zinc-300 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-800 text-white rounded border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#54b4e2]"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-zinc-300 mb-2">Message</label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                                className="mb-4 w-full px-4 py-2 bg-slate-800 text-white rounded border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#54b4e2] resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSending}
                            className={`w-full py-2 px-4 rounded font-medium transition-colors ${isSending
                                ? 'bg-slate-700 text-slate-300 cursor-not-allowed'
                                : 'bg-[#3a9fd1] hover:bg-[#3593c3] text-white'
                                }`}
                        >
                            {isSending ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
                <div className="flex flex-col lg:w-2/5 justify-center items-center max-lg:mt-10 max-lg:justify-center">
                    <img
                        src="/images/furina.png"
                        alt="Furina"
                        className="md:w-40 md:h-40 w-32 h-32"
                        draggable="false"
                    />
                    <p className="my-6 text-sm font-medium text-white">... or copy my email below!</p>
                    <div className="flex items-center mb-6 bg-slate-700 rounded-lg px-4 py-3 w-min">
                        <p className="text-zinc-300 max-md:text-xs text-sm font-semibold">daniel@ristek.cs.ui.ac.id</p>
                        <div
                            className="flex justify-center items-center relative group ml-4"
                            onMouseLeave={() => {
                                setTimeout(() => {
                                    setCopyMessage('Copy Email');
                                }, 100)
                            }}
                        >
                            <button
                                onClick={copyEmailToClipboard}
                                className="text-[#54b4e2] hover:text-white transition-colors"
                            >
                                <Copy className="md:w-[20px] md:h-[20px] w-4 h-4" />
                            </button>
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 mr-4 bg-zinc-800 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {copyMessage}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {toast?.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}
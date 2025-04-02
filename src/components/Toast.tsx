import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center justify-between
            ${type === 'success' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'}`}>
            <p>{message}</p>
            <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
                <X size={16} />
            </button>
        </div>
    );
};
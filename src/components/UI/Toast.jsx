import React, { useEffect, useState } from 'react';

export default function Toast({ type, message, onDismiss }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onDismiss, 300);
        }, 3500);

        return () => clearTimeout(timer);
    }, [onDismiss]);

    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const icon = type === 'success' ? '✅' : '❗';

    return (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300 ${
            visible ? 'opacity-100' : 'opacity-0'
        }`}>
            <div
                className={`px-4 py-3 rounded-lg text-white shadow-lg ${bgColor} flex items-center gap-2 animate-fade-in`}
            >
                <span className="text-lg">{icon}</span>
                <span>{message}</span>
            </div>
        </div>
    );
}
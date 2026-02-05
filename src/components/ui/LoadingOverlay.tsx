'use client';

import React from 'react';

interface LoadingOverlayProps {
    isVisible: boolean;
    message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible, message = 'מייצר את הקטלוג שלך...' }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
            <div className="text-center px-6">
                <div className="relative mb-8">
                    {/* Premium Spinner */}
                    <div className="w-24 h-24 border-2 border-copper/20 rounded-full mx-auto"></div>
                    <div className="w-24 h-24 border-t-2 border-copper rounded-full absolute top-0 left-1/2 -ml-12 animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-copper font-serif italic text-xl">V</span>
                    </div>
                </div>

                <h2 className="text-white text-2xl font-serif italic mb-3 tracking-wide">{message}</h2>
                <p className="text-copper/60 text-xs uppercase tracking-[0.3em] font-bold animate-pulse">אל תסגור את החלון</p>

                {/* Visual Progress Bar (Indeterminate) */}
                <div className="mt-10 w-48 h-[1px] bg-white/5 mx-auto relative overflow-hidden">
                    <div className="absolute inset-0 bg-copper/40 animate-progress-slide"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;

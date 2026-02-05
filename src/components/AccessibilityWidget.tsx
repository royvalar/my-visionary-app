'use client';

import React, { useState, useEffect } from 'react';

const AccessibilityWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({
        grayscale: false,
        highContrast: false,
        largeText: false,
        highlightLinks: false,
    });

    // Toggle class on html element when settings change
    useEffect(() => {
        const html = document.documentElement;
        if (settings.grayscale) html.classList.add('a11y-grayscale');
        else html.classList.remove('a11y-grayscale');

        if (settings.highContrast) html.classList.add('a11y-high-contrast');
        else html.classList.remove('a11y-high-contrast');

        if (settings.largeText) html.classList.add('a11y-large-text');
        else html.classList.remove('a11y-large-text');

        if (settings.highlightLinks) html.classList.add('a11y-highlight-links');
        else html.classList.remove('a11y-highlight-links');
    }, [settings]);

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const resetSettings = () => {
        setSettings({
            grayscale: false,
            highContrast: false,
            largeText: false,
            highlightLinks: false,
        });
    };

    return (
        <div className="fixed bottom-6 left-6 z-[100] font-sans">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-copper text-white p-3 rounded-full shadow-2xl hover:bg-white hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-copper"
                aria-label="Accessibility Options"
                aria-expanded={isOpen}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                {/* Fallback Icon for accessibility usually is a person, let's use a standard one or the current arrow if specified, but usually a person icon is better.*/}
                {/* Replacing SVG with a standard accessibility icon (person in circle) */}
                <div className="absolute inset-0 flex items-center justify-center bg-copper rounded-full hover:bg-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
            </button>

            {isOpen && (
                <div className="absolute bottom-16 left-0 w-64 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-4 animate-fade-in-down origin-bottom-left">
                    <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                        <h3 className="text-copper text-xs font-bold uppercase tracking-widest">Accessibility</h3>
                        <button onClick={resetSettings} className="text-[10px] text-white/50 hover:text-white transition-colors uppercase">Reset</button>
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={() => toggleSetting('largeText')}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-bold uppercase tracking-wide transition-all ${settings.largeText ? 'bg-copper text-white' : 'bg-white/5 text-offWhite/70 hover:bg-white/10'}`}
                        >
                            <span>Increase Text</span>
                            <span className="text-lg">A+</span>
                        </button>

                        <button
                            onClick={() => toggleSetting('grayscale')}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-bold uppercase tracking-wide transition-all ${settings.grayscale ? 'bg-copper text-white' : 'bg-white/5 text-offWhite/70 hover:bg-white/10'}`}
                        >
                            <span>Grayscale</span>
                            <div className="w-4 h-4 bg-gradient-to-r from-gray-500 to-gray-200 rounded-full"></div>
                        </button>

                        <button
                            onClick={() => toggleSetting('highContrast')}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-bold uppercase tracking-wide transition-all ${settings.highContrast ? 'bg-copper text-white' : 'bg-white/5 text-offWhite/70 hover:bg-white/10'}`}
                        >
                            <span>High Contrast</span>
                            <div className="w-4 h-4 bg-white border border-black rounded-full"></div>
                        </button>

                        <button
                            onClick={() => toggleSetting('highlightLinks')}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-bold uppercase tracking-wide transition-all ${settings.highlightLinks ? 'bg-copper text-white' : 'bg-white/5 text-offWhite/70 hover:bg-white/10'}`}
                        >
                            <span>Highlight Links</span>
                            <span className="underline decoration-2">Link</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccessibilityWidget;

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                {/* Logo (Right) */}
                <Link href="/" className="text-2xl font-extrabold text-copper tracking-tighter uppercase italic">
                    My Visionary
                </Link>

                {/* Links (Center) */}
                <div className="hidden lg:flex items-center gap-12 text-[11px] tracking-[0.2em] uppercase font-bold">
                    <ul className="flex items-center gap-12">
                        <li>
                            <Link href="/" className="text-copper hover:text-white transition-all duration-300">
                                עמוד הבית
                            </Link>
                        </li>
                        <li className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center gap-2 hover:text-copper transition-all duration-300 uppercase tracking-widest font-bold focus:outline-none"
                            >
                                קולקציות
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-3 w-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isOpen && (
                                <div
                                    className="absolute top-full right-0 mt-4 w-56 bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl py-6 z-[100] text-right"
                                >
                                    <Link href="/collections/rose-gold" className="block px-8 py-3 text-[10px] hover:text-copper transition-colors border-b border-white/5 last:border-0 uppercase tracking-widest">
                                        Rose Gold
                                    </Link>
                                    <Link href="/collections/retro-classic" className="block px-8 py-3 text-[10px] hover:text-copper transition-colors border-b border-white/5 last:border-0 uppercase tracking-widest">
                                        Retro Classic
                                    </Link>
                                    <Link href="/collections/matte-black" className="block px-8 py-3 text-[10px] hover:text-copper transition-colors last:border-0 uppercase tracking-widest">
                                        Matte Black
                                    </Link>
                                </div>
                            )}
                        </li>
                        <li>
                            <Link href="/#architects" className="hover:text-copper transition-all duration-300">
                                קהילת אדריכלים/מעצבים
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Action (Left) */}
                <div className="hidden lg:block">
                    <button className="border border-copper/50 px-8 py-3 text-[11px] font-bold text-copper uppercase tracking-widest hover:bg-copper hover:text-white transition-all duration-500 rounded-full">
                        כניסה לאדריכלים/מעצבים
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Header;

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const Header = () => {
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const collectionsRef = useRef<HTMLLIElement>(null);
    const userRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        const handleClickOutside = (event: MouseEvent) => {
            if (collectionsRef.current && !collectionsRef.current.contains(event.target as Node)) {
                setIsCollectionsOpen(false);
            }
            if (userRef.current && !userRef.current.contains(event.target as Node)) {
                setIsUserOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            unsubscribe();
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsUserOpen(false);
            router.push('/');
        } catch (error: any) {
            console.error('Error signing out:', error.message);
        }
    };

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Error during Google sign-in:', error.message);
        }
    };

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
                        <li className="relative" ref={collectionsRef}>
                            <button
                                onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                                className="flex items-center gap-2 hover:text-copper transition-all duration-300 uppercase tracking-widest font-bold focus:outline-none"
                            >
                                קולקציות
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-3 w-3 transition-transform duration-300 ${isCollectionsOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isCollectionsOpen && (
                                <div
                                    className="absolute top-full right-0 mt-4 w-56 bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl py-6 z-[100] text-right"
                                >
                                    <Link href="/collections/rose-gold" className="block px-8 py-3 text-[10px] hover:text-copper transition-colors border-b border-white/5 last:border-0 uppercase tracking-widest text-white/70">
                                        Rose Gold
                                    </Link>
                                    <Link href="/collections/retro-classic" className="block px-8 py-3 text-[10px] hover:text-copper transition-colors border-b border-white/5 last:border-0 uppercase tracking-widest text-white/70">
                                        Retro Classic
                                    </Link>
                                    <Link href="/collections/matte-black" className="block px-8 py-3 text-[10px] hover:text-copper transition-colors last:border-0 uppercase tracking-widest text-white/70">
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
                    {user ? (
                        <div className="relative" ref={userRef}>
                            <button
                                onClick={() => setIsUserOpen(!isUserOpen)}
                                className="flex items-center gap-4 bg-white/[0.03] border border-white/10 hover:border-copper/50 transition-all duration-300 px-4 py-2 rounded-full group"
                            >
                                <div className="text-right">
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold leading-none mb-1">Hello,</p>
                                    <p className="text-[11px] text-white font-bold tracking-wider">{user.displayName?.split(' ')[0]}</p>
                                </div>
                                {user.photoURL && (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName || ''}
                                        className="w-10 h-10 rounded-full border-2 border-white/10 group-hover:border-copper transition-all object-cover grayscale group-hover:grayscale-0 shadow-lg"
                                    />
                                )}
                            </button>

                            {isUserOpen && (
                                <div className="absolute top-full left-0 mt-4 w-48 bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl py-4 z-[100] animate-fade-in-down">
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsUserOpen(false)}
                                        className="block px-6 py-3 text-[10px] text-white/70 hover:text-copper hover:bg-white/[0.02] transition-colors border-b border-white/5 uppercase tracking-widest font-bold text-left"
                                    >
                                        אזור אישי
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full block px-6 py-3 text-[10px] text-copper hover:text-white hover:bg-copper/10 transition-colors uppercase tracking-widest font-bold text-left"
                                    >
                                        התנתקות
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={handleLogin}
                            className="border border-copper/50 px-8 py-3 text-[11px] font-bold text-copper uppercase tracking-widest hover:bg-copper hover:text-white transition-all duration-500 rounded-full"
                        >
                            כניסה לאדריכלים/מעצבים
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;

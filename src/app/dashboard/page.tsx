'use client';

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const DashboardPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push('/');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error: any) {
            console.error('Error signing out:', error.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-copper animate-pulse tracking-[0.3em] uppercase text-xs font-bold">Loading...</div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <main className="min-h-screen bg-black text-offWhite selection:bg-copper selection:text-white" dir="rtl">
            <Header />

            <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-16 border-b border-white/5 pb-12">
                    {user.photoURL && (
                        <div className="relative">
                            <img
                                src={user.photoURL}
                                alt={user.displayName || 'User'}
                                className="w-32 h-32 rounded-full border-2 border-copper p-1 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-copper w-6 h-6 rounded-full border-2 border-black"></div>
                        </div>
                    )}
                    <div className="text-right flex-grow">
                        <p className="text-copper mb-2 tracking-[0.4em] uppercase text-[10px] font-bold">Member Area</p>
                        <h1 className="text-4xl md:text-6xl font-serif font-black mb-4 leading-none text-white italic">
                            שלום, {user.displayName}
                        </h1>
                        <p className="text-offWhite/40 font-light text-sm tracking-widest uppercase">מעצב פנים / אדריכל רשום</p>
                    </div>
                    <div>
                        <button
                            onClick={handleLogout}
                            className="border border-white/10 px-8 py-3 text-[10px] uppercase tracking-widest hover:border-copper hover:text-copper transition-all"
                        >
                            התנתקות
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Dashboard Cards */}
                    <div className="bg-white/[0.02] border border-white/5 p-10 hover:border-copper/30 transition-all group">
                        <h3 className="text-xl font-serif font-bold text-copper mb-6 italic">הפרויקטים שלי</h3>
                        <p className="text-sm text-offWhite/40 font-light leading-relaxed mb-8">צפה ונהל את לוחות ההשראה והפרויקטים ששמרת.</p>
                        <div className="h-px bg-white/5 mb-8 group-hover:bg-copper/20 transition-all"></div>
                        <a href="#" className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-white transition-colors">פתח גלריה</a>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-10 hover:border-copper/30 transition-all group">
                        <h3 className="text-xl font-serif font-bold text-copper mb-6 italic">כלים לתכנון</h3>
                        <p className="text-sm text-offWhite/40 font-light leading-relaxed mb-8">גישה לקבצי BIM, קטלוגים טכניים ומפרטים מלאים.</p>
                        <div className="h-px bg-white/5 mb-8 group-hover:bg-copper/20 transition-all"></div>
                        <a href="#" className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-white transition-colors">הורד קטלוגים</a>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-10 hover:border-copper/30 transition-all group">
                        <h3 className="text-xl font-serif font-bold text-copper mb-6 italic">ייעוץ אישי</h3>
                        <p className="text-sm text-offWhite/40 font-light leading-relaxed mb-8">קבע פגישה עם מומחה קולקציות לבניית מפרט מותאם.</p>
                        <div className="h-px bg-white/5 mb-8 group-hover:bg-copper/20 transition-all"></div>
                        <a href="#" className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-white transition-colors">תאם פגישה</a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default DashboardPage;

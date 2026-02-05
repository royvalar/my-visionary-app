'use client';

import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface CommunityPost {
    id: string;
    imageUrl: string;
    userId: string;
    userName: string;
    userPhoto: string;
    createdAt: any;
    status: string;
    category?: string;
}

const CATEGORIES = [
    { id: 'all', label: 'All Projects' },
    { id: 'Architecture', label: 'Architecture' },
    { id: 'Kitchen', label: 'Kitchen Design' },
    { id: 'Living Room', label: 'Living Room' },
    { id: 'Bathroom', label: 'Bathroom' },
    { id: 'Outdoor', label: 'Outdoor' }
];

export default function CommunityPage() {
    const [posts, setPosts] = useState<CommunityPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const postsRef = collection(db, 'community_posts');
                // For now fetching all approved or pending for demo, usually where('status', '==', 'approved')
                const q = query(postsRef, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const fetchedPosts: CommunityPost[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedPosts.push({ id: doc.id, ...doc.data() } as CommunityPost);
                });
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
            setLoading(false);
        };

        fetchPosts();
    }, []);

    const filteredPosts = selectedCategory === 'all'
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    return (
        <main className="min-h-screen bg-black text-offWhite selection:bg-copper selection:text-white">
            <Header />

            {/* Hero Section */}
            <header className="pt-40 pb-20 px-6 text-center">
                <div className="max-w-4xl mx-auto animate-fade-in-up">
                    <p className="text-copper mb-4 tracking-[0.4em] uppercase text-xs font-bold">Designer Community</p>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-white italic">קולות מהשטח: הקהילה שלנו</h1>
                    <p className="text-lg font-light tracking-wide max-w-2xl mx-auto text-offWhite/50 leading-relaxed">
                        מקום המפגש של האדריכלים והמעצבים המובילים בישראל. השראה, יצירה וחדשנות בחלל אחד.
                    </p>
                </div>
            </header>

            {/* Filters */}
            <section className="max-w-7xl mx-auto px-6 mb-16 overflow-x-auto">
                <div className="flex items-center justify-center gap-4 min-w-max pb-4 border-b border-white/5">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-6 py-2 text-[10px] uppercase font-bold tracking-widest transition-all duration-300 rounded-full border ${selectedCategory === cat.id
                                    ? 'bg-copper border-copper text-white'
                                    : 'bg-transparent border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="max-w-[1400px] mx-auto px-6 pb-40">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-6">
                        <div className="w-12 h-12 border-t-2 border-copper rounded-full animate-spin"></div>
                        <p className="text-white/20 uppercase tracking-[0.3em] text-[10px] font-bold">טוען השראה...</p>
                    </div>
                ) : filteredPosts.length > 0 ? (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {filteredPosts.map((post) => (
                            <div
                                key={post.id}
                                onClick={() => setSelectedImage(post.imageUrl)}
                                className="relative group cursor-zoom-in break-inside-avoid animate-fade-in"
                            >
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700 z-10"></div>
                                <img
                                    src={post.imageUrl}
                                    alt={post.userName}
                                    className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
                                />

                                {/* Post Info - Visible on Hover */}
                                <div className="absolute inset-x-0 bottom-0 p-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black via-black/80 to-transparent">
                                    <div className="flex items-center gap-4">
                                        {post.userPhoto && (
                                            <img src={post.userPhoto} className="w-10 h-10 rounded-full border border-white/20" alt={post.userName} />
                                        )}
                                        <div className="text-right">
                                            <p className="text-copper text-[10px] font-bold uppercase tracking-widest mb-1">Featured Architect</p>
                                            <h3 className="text-white text-lg font-serif italic mb-1">{post.userName}</h3>
                                            <p className="text-white/40 text-[10px] uppercase tracking-widest">{post.category || 'Project Detail'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Border Overlay */}
                                <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 transition-all duration-700 z-15 pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40">
                        <p className="text-white/20 uppercase tracking-[0.3em] text-xs font-bold">אין עדיין פרויקטים בקטגוריה זו</p>
                    </div>
                )}
            </section>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-10 right-10 text-white hover:text-copper transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img
                        src={selectedImage}
                        className="max-w-full max-h-full object-contain shadow-2xl animate-scale-up"
                        alt="Expanded"
                    />
                </div>
            )}

            <Footer />
        </main>
    );
}

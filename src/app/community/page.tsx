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
    { id: 'all', label: 'הכל' },
    { id: 'Ovens', label: 'תנורים' },
    { id: 'Refrigerators', label: 'מקררים' },
    { id: 'Faucets', label: 'ברזים וכיורים' },
    { id: 'Hobs', label: 'כיריים' },
    { id: 'Dishwashers', label: 'מדיחי כלים' }
];

const MOCK_POSTS: CommunityPost[] = [
    {
        id: 'mock1',
        imageUrl: '/community1.png',
        userId: 'mock',
        userName: 'דנה כהן עיצוב פנים',
        userPhoto: 'https://i.pravatar.cc/150?u=dana',
        createdAt: new Date(),
        status: 'approved',
        category: 'Kitchen'
    },
    {
        id: 'mock2',
        imageUrl: '/matte_black_oven.png',
        userId: 'mock',
        userName: 'איתי לוי אדריכלות',
        userPhoto: 'https://i.pravatar.cc/150?u=itay',
        createdAt: new Date(),
        status: 'approved',
        category: 'Ovens'
    },
    {
        id: 'mock3',
        imageUrl: '/fridge.png',
        userId: 'mock',
        userName: 'מיכל רות פרידמן',
        userPhoto: 'https://i.pravatar.cc/150?u=michal',
        createdAt: new Date(),
        status: 'approved',
        category: 'Refrigerators'
    },
    {
        id: 'mock4',
        imageUrl: '/gessi_faucet.png',
        userId: 'mock',
        userName: 'קובי אדריכלים',
        userPhoto: 'https://i.pravatar.cc/150?u=kobi',
        createdAt: new Date(),
        status: 'approved',
        category: 'Faucets'
    },
    {
        id: 'mock5',
        imageUrl: '/matte_black_hob.png',
        userId: 'mock',
        userName: 'ליטל עיצובים',
        userPhoto: 'https://i.pravatar.cc/150?u=lital',
        createdAt: new Date(),
        status: 'approved',
        category: 'Hobs'
    }
];

export default function CommunityPage() {
    const [posts, setPosts] = useState<CommunityPost[]>(MOCK_POSTS);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsRef = collection(db, 'community_posts');
                const q = query(postsRef, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                let fetchedPosts: CommunityPost[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedPosts.push({ id: doc.id, ...doc.data() } as CommunityPost);
                });

                if (fetchedPosts.length > 0) {
                    setPosts(fetchedPosts);
                }
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
        <main className="min-h-screen bg-black text-offWhite selection:bg-copper selection:text-white pb-20">
            <Header />

            {/* Hero Section */}
            <header className="pt-40 pb-20 px-6 text-center">
                <div className="max-w-4xl mx-auto animate-fade-in-up">
                    <p className="text-copper mb-4 tracking-[0.4em] uppercase text-xs font-bold">Designer Community</p>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-white italic whitespace-nowrap overflow-hidden text-ellipsis">קולות מהשטח: הקהילה שלנו</h1>
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
            <section className="max-w-7xl mx-auto px-6 pb-20">
                {loading && posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-6">
                        <div className="w-12 h-12 border-t-2 border-copper rounded-full animate-spin"></div>
                        <p className="text-white/20 uppercase tracking-[0.3em] text-[10px] font-bold">טוען השראה...</p>
                    </div>
                ) : filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredPosts.map((post) => (
                            <button
                                key={post.id}
                                onClick={() => setSelectedImage(post.imageUrl)}
                                className="relative h-[600px] group overflow-hidden shadow-2xl cursor-zoom-in animate-fade-in w-full text-right focus:outline-none focus:ring-4 focus:ring-copper"
                                aria-label={`View project: ${post.userName} - ${CATEGORIES.find(c => c.id === post.category)?.label || 'Kitchen Design'}`}
                            >
                                <img
                                    src={post.imageUrl}
                                    alt={post.userName}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                                <div className="absolute bottom-10 right-10 text-right">
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-copper mb-2 block font-bold">
                                        {post.category === 'Kitchen' ? 'Featured Project' : 'Designer Choice'}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-copper transition-colors duration-500">{post.userName}</h3>
                                    <p className="text-[11px] text-offWhite/40 italic font-light">
                                        {CATEGORIES.find(c => c.id === post.category)?.label || 'עיצוב מטבח'}
                                    </p>
                                </div>

                                {/* Selection Border Overlay */}
                                <div className="absolute inset-6 border border-white/0 group-hover:border-white/10 transition-all duration-700 pointer-events-none"></div>
                            </button>
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

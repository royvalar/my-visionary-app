'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface CommunityPost {
    id: string;
    imageUrl: string;
    userId: string;
    userName: string;
    category?: string;
    createdAt: any;
    status: string;
}

interface UserGalleryProps {
    userId: string;
}

const UserGallery: React.FC<UserGalleryProps> = ({ userId }) => {
    const [posts, setPosts] = useState<CommunityPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (!userId) return;

            try {
                const postsRef = collection(db, 'community_posts');
                // Create a query against the collection.
                // Note: Indexing might be required for 'userId' and 'createdAt' compound query.
                // If query fails, check console for Firebase index creation link.
                const q = query(
                    postsRef,
                    where('userId', '==', userId),
                    orderBy('createdAt', 'desc')
                );

                const querySnapshot = await getDocs(q);
                const userPosts: CommunityPost[] = [];
                querySnapshot.forEach((doc) => {
                    userPosts.push({ id: doc.id, ...doc.data() } as CommunityPost);
                });
                setPosts(userPosts);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, [userId]);

    const handleDelete = async (postId: string) => {
        if (!window.confirm("האם אתה בטוח שברצונך למחוק תמונה זו?")) return;

        setDeletingId(postId);
        try {
            await deleteDoc(doc(db, 'community_posts', postId));
            setPosts(prev => prev.filter(post => post.id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("שגיאה במחיקת התמונה. אנא נסה שנית.");
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="py-20 text-center">
                <div className="inline-block w-8 h-8 border-t-2 border-copper rounded-full animate-spin mb-4"></div>
                <p className="text-white/40 uppercase tracking-widest text-xs">טוען גלריה...</p>
            </div>
        );
    }

    if (posts.length === 0) {
        return null; // Don't show anything if user has no uploads, or show a placeholder if preferred
    }

    return (
        <div className="mt-20 border-t border-white/5 pt-16">
            <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-serif font-bold text-white italic">ההעלאות שלי</h3>
                <span className="text-copper text-xs tracking-[0.2em] font-bold uppercase">{posts.length} פרויקטים</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="group relative aspect-square bg-white/[0.02] border border-white/5 hover:border-copper/30 transition-all overflow-hidden">
                        <img
                            src={post.imageUrl}
                            alt="User upload"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />

                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                            <button
                                onClick={() => handleDelete(post.id)}
                                disabled={deletingId === post.id}
                                className="bg-red-900/80 hover:bg-red-700 text-white text-[10px] uppercase tracking-[0.2em] font-bold py-2 px-4 border border-red-500/30 backdrop-blur-sm transition-all"
                            >
                                {deletingId === post.id ? 'מוחק...' : 'מחק תמונה'}
                            </button>
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-2 right-2">
                            <span className={`text-[9px] uppercase tracking-widest font-bold px-2 py-1 bg-black/80 backdrop-blur-md border ${post.status === 'approved' ? 'text-green-500 border-green-500/30' :
                                    post.status === 'rejected' ? 'text-red-500 border-red-500/30' :
                                        'text-yellow-500 border-yellow-500/30'
                                }`}>
                                {post.status === 'approved' ? 'אושר' : post.status === 'rejected' ? 'נדחה' : 'ממתין'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserGallery;

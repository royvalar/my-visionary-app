'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth, db, storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const DashboardPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadSuccess, setUploadSuccess] = useState(false);
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

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        setUploading(true);
        setUploadSuccess(false);

        const storageRef = ref(storage, `community/${user.uid}/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Upload error:", error);
                setUploading(false);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                await addDoc(collection(db, 'community_posts'), {
                    imageUrl: downloadURL,
                    userId: user.uid,
                    userName: user.displayName,
                    userPhoto: user.photoURL,
                    createdAt: serverTimestamp(),
                    status: 'pending' // For moderation
                });

                setUploading(false);
                setUploadSuccess(true);
                setTimeout(() => setUploadSuccess(false), 5000);
            }
        );
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
                    <div className="bg-white/[0.02] border border-white/5 p-10 hover:border-copper/30 transition-all group relative overflow-hidden flex flex-col">
                        <h3 className="text-xl font-serif font-bold text-copper mb-6 italic">העלאה לקהילה</h3>
                        <p className="text-sm text-offWhite/40 font-light leading-relaxed mb-8 flex-grow">שתף את העיצובים שלך עם קהילת האדריכלים שלנו והופע בעמוד הקהילה.</p>
                        <div className="h-px bg-white/5 mb-8 group-hover:bg-copper/20 transition-all"></div>

                        <label className="cursor-pointer">
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileUpload}
                                disabled={uploading}
                            />
                            <div className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 border border-white/10 py-3 rounded-sm ${uploading ? 'text-copper' : 'hover:text-white hover:border-copper'}`}>
                                {uploading ? `מעלה... ${Math.round(uploadProgress)}%` : uploadSuccess ? 'הועלה בהצלחה!' : 'בחר תמונה מהמחשב'}
                            </div>
                        </label>

                        {uploading && (
                            <div className="absolute bottom-0 left-0 h-1 bg-copper transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                        )}
                        {uploadSuccess && (
                            <div className="mt-4 text-[10px] text-copper/80 tracking-widest text-center animate-bounce">התמונה נשלחה לאישור המערכת</div>
                        )}
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-10 hover:border-copper/30 transition-all group">
                        <h3 className="text-xl font-serif font-bold text-copper mb-6 italic">הורדת קטלוגים</h3>
                        <p className="text-sm text-offWhite/40 font-light leading-relaxed mb-8">צפה והורד את קטלוגי המותגים והקולקציות שלנו לשימוש מקצועי.</p>
                        <div className="h-px bg-white/5 mb-8 group-hover:bg-copper/20 transition-all"></div>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/collections/rose-gold" className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-white transition-colors border border-white/10 px-3 py-1 hover:border-copper">Rose Gold</Link>
                            <Link href="/collections/retro-classic" className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-white transition-colors border border-white/10 px-3 py-1 hover:border-copper">Retro Classic</Link>
                            <Link href="/collections/matte-black" className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-white transition-colors border border-white/10 px-3 py-1 hover:border-copper">Matte Black</Link>
                        </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-10 hover:border-copper/30 transition-all group">
                        <h3 className="text-xl font-serif font-bold text-copper mb-6 italic flex items-center gap-3 justify-end">
                            ייעוץ אישי בוואטסאפ
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.413 8.353-.162 1.541-.846 2.502-1.957 2.91-1.112.408-2.673.498-4.498.271"></path>
                            </svg>
                        </h3>
                        <p className="text-sm text-offWhite/40 font-light leading-relaxed mb-8">אנחנו כאן לכל שאלה מקצועית. התייעץ איתנו בזמן אמת לגבי שילובים ומפרטים.</p>
                        <div className="h-px bg-white/5 mb-8 group-hover:bg-copper/20 transition-all"></div>
                        <a href="https://wa.me/972583614111" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-white transition-colors bg-copper/20 px-6 py-3 border border-copper/30 hover:bg-copper transition-all">שלח הודעה בוואטסאפ</a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default DashboardPage;

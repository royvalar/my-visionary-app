import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-black py-32 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-24 text-right transition-all">
                    <div className="lg:col-span-2 space-y-10">
                        <div className="text-4xl font-black text-copper uppercase tracking-tighter">My Visionary</div>
                        <p className="text-offWhite/30 leading-relaxed max-w-md text-lg">
                            אנחנו מגדירים מחדש את החוויה של בחירת מטבח יוקרה. שפה חזותית אחידה המאגדת מותגים, עיצוב וטכנולוגיה.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-copper mb-10">ניווט</h4>
                        <ul className="space-y-6 text-offWhite/60 text-sm font-light">
                            <li><Link href="/" className="hover:text-copper transition-colors">עמוד הבית</Link></li>
                            <li><Link href="/#collections" className="hover:text-copper transition-colors">קולקציות</Link></li>
                            <li><Link href="/#architects" className="hover:text-copper transition-colors">מעצבים</Link></li>
                            <li><Link href="#" className="hover:text-copper transition-colors">צור קשר</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-copper mb-10">קשר</h4>
                        <ul className="space-y-6 text-offWhite/60 text-sm font-light">
                            <li dir="ltr" className="hover:text-copper cursor-pointer transition-colors">info@myvisionary.com</li>
                            <li dir="ltr" className="hover:text-copper cursor-pointer transition-colors">+972 (0) 54 123 4567</li>
                            <li className="font-normal opacity-40">תערוכה: שדרות רוטשילד, תל אביב</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-offWhite/20 uppercase tracking-[0.3em] font-bold">
                    <p>© 2026 My Visionary Collective. All rights reserved.</p>
                    <div className="flex gap-12">
                        <Link href="#" className="hover:text-copper transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-copper transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

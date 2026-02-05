'use client';

import React, { useState, useEffect } from 'react';

interface CookieSettings {
    necessary: boolean;
    analytics: boolean;
}

const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [settings, setSettings] = useState<CookieSettings>({
        necessary: true,
        analytics: false,
    });

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setShowBanner(true);
        } else {
            // If consent exists, we could check it, but for now we just hide the banner
            // In a real app, we might want to re-trigger if policy changes
        }
    }, []);

    const handleAcceptAll = () => {
        const newSettings = { necessary: true, analytics: true };
        saveSettings(newSettings);
    };

    const handleRejectAll = () => {
        const newSettings = { necessary: true, analytics: false };
        saveSettings(newSettings);
    };

    const handleSaveSelected = () => {
        saveSettings(settings);
    };

    const saveSettings = (newSettings: CookieSettings) => {
        localStorage.setItem('cookie-consent', JSON.stringify(newSettings));
        setShowBanner(false);
        setShowSettings(false);
        // Reload or dispatch event to notify other components (like Firebase)
        window.location.reload();
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 md:p-6 animate-fade-in-up">
            <div className="max-w-5xl mx-auto bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8">
                {!showSettings ? (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-right">
                            <h3 className="text-copper font-serif text-xl mb-2">אנחנו מעריכים את הפרטיות שלך</h3>
                            <p className="text-white/70 text-sm leading-relaxed">
                                אנו משתמשים בעוגיות כדי לשפר את חווית הגלישה שלך, להציג תוכן מותאם אישית ולנתח את התנועה באתר שלנו.
                                בלחיצה על "קבל הכל", אתם מסכימים לשימוש שלנו בעוגיות. לקריאה נוספת, עיינו במדיניות הפרטיות שלנו.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-4 min-w-fit">
                            <button
                                onClick={() => setShowSettings(true)}
                                className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors border border-white/10 rounded-full"
                            >
                                הגדרות
                            </button>
                            <button
                                onClick={handleRejectAll}
                                className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-all border border-white/20 rounded-full"
                            >
                                דחה הכל
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="px-8 py-2.5 text-xs font-bold uppercase tracking-widest bg-copper text-white hover:bg-white hover:text-black transition-all rounded-full shadow-lg shadow-copper/20"
                            >
                                קבל הכל
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                            <h3 className="text-copper font-serif text-2xl">הגדרות עוגיות</h3>
                            <button onClick={() => setShowSettings(false)} className="text-white/50 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-6 mb-8">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                <div className="text-right">
                                    <div className="flex items-center gap-2 justify-end">
                                        <span className="bg-copper/20 text-copper text-[10px] px-2 py-0.5 rounded uppercase font-bold">חובה</span>
                                        <h4 className="text-white font-bold">עוגיות הכרחיות</h4>
                                    </div>
                                    <p className="text-white/50 text-xs mt-1">עוגיות אלו נחוצות כדי שהאתר יפעל ולא ניתן לכבות אותן.</p>
                                </div>
                                <div className="w-12 h-6 bg-copper/50 rounded-full relative opacity-50 cursor-not-allowed">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-copper/30 transition-colors">
                                <div className="text-right">
                                    <h4 className="text-white font-bold">עוגיות ניתוח (Analytics)</h4>
                                    <p className="text-white/50 text-xs mt-1">עוגיות אלו עוזרות לנו להבין כיצד מבקרים מתקשרים עם האתר.</p>
                                </div>
                                <button
                                    onClick={() => setSettings(prev => ({ ...prev, analytics: !prev.analytics }))}
                                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${settings.analytics ? 'bg-copper' : 'bg-white/20'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings.analytics ? 'right-7' : 'right-1'}`}></div>
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleSaveSelected}
                                className="px-10 py-3 text-xs font-bold uppercase tracking-widest bg-copper text-white hover:bg-white hover:text-black transition-all rounded-full shadow-lg shadow-copper/20"
                            >
                                שמור העדפות
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
};

export default CookieConsent;

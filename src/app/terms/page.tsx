import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-black text-offWhite font-sans">
            <Header />

            <div className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-black text-copper uppercase tracking-tighter mb-16 text-center">
                    תנאי שימוש
                </h1>

                <div className="space-y-12 text-offWhite/80 leading-relaxed text-lg text-right">
                    <section>
                        <h2 className="text-2xl font-bold text-copper mb-4">1. קבלה של תנאי השימוש</h2>
                        <p>
                            ברוכים הבאים לאתר My Visionary. השימוש באתר, בתכניו ובשירותים המוצעים בו כפוף לתנאי השימוש המפורטים להלן. בעצם הגלישה או השימוש באתר, הנך מאשר כי קראת, הבנת והסכמת להיות מחויב לתנאים אלו.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-copper mb-4">2. קניין רוחני</h2>
                        <p>
                            כל התכנים המופיעים באתר, לרבות עיצובים, תמונות, טקסטים, לוגואים, גרפיקה, קטעי וידאו וסימני מסחר, הם בבעלותה הבלעדית של My Visionary או של ספקי התוכן שלה ומוגנים על ידי חוקי זכויות יוצרים וקניין רוחני בינלאומיים ובישראל. אין להעתיק, לשכפל, להפיץ או לעשות כל שימוש מסחרי בתכני האתר ללא אישור מראש ובכתב.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-copper mb-4">3. הגבלת אחריות</h2>
                        <p>
                            התוכן המוצג באתר נועד למטרות מידע והתרשמות בלבד. My Visionary עושה מאמצים להבטיח את דיוק המידע, אך אינה מתחייבת כי האתר יהיה חופשי משגיאות או הפרעות. האתר ניתן לשימוש "כמות שהוא" (AS IS). My Visionary לא תישא באחריות לכל נזק ישיר, עקיף או תוצאתי הנובע מהשימוש באתר או מהסתמכות על התוכן המופיע בו.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-copper mb-4">4. קישורים לאתרי צד שלישי</h2>
                        <p>
                            האתר עשוי להכיל קישורים לאתרים אחרים המופעלים על ידי צדדים שלישיים. My Visionary אינה אחראית לתוכן, למדיניות הפרטיות או לפעילות של אתרים אלו, והשימוש בהם הוא באחריות המשתמש בלבד.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-copper mb-4">5. שינויים בתנאי השימוש</h2>
                        <p>
                            My Visionary שומרת לעצמה את הזכות לעדכן או לשנות את תנאי השימוש בכל עת וללא הודעה מוקדמת. המשך השימוש באתר לאחר פרסום התנאים החדשים מהווה הסכמה להם.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-copper mb-4">6. דין וסמכות שיפוט</h2>
                        <p>
                            על תנאי שימוש אלו יחולו אך ורק דיני מדינת ישראל. כל מחלוקת הנובעת מתנאים אלו תובא להכרעה בלעדית בבתי המשפט המוסמכים בעיר תל אביב-יפו.
                        </p>
                    </section>

                    <div className="pt-12 border-t border-white/10 text-offWhite/40 text-sm">
                        <p>עדכון אחרון: פברואר 2026</p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

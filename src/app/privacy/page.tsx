import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-black text-offWhite font-sans">
            <Header />

            <div className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-black text-copper uppercase tracking-tighter mb-16 text-center">
                    מדיניות פרטיות
                </h1>

                <div className="space-y-12 text-offWhite/80 leading-relaxed text-lg text-right">
                    <section>
                        <h2 className="text-2xl font-bold text-copper mb-4">1. כללי</h2>
                        <p>
                            My Visionary מעריכה את פרטיות המשתמשים שלה ומחויבת להגן על המידע האישי שנמסר לה. מדיניות פרטיות זו מתארת את סוגי המידע שאנו אוספים, אופן השימוש בו והאמצעים שאנו נוקטים להגנתו.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-copper mb-4">2. איסוף מידע</h2>
                        <p>
                            אנו אוספים מידע שנמסר על ידך מרצונך החופשי, כגון בעת הרשמה לאתר, מילוי טפסים, או יצירת קשר עמנו. מידע זה עשוי לכלול שם, כתובת אימייל, מספר טלפון ופרטים מקצועיים. בנוסף, נאסף מידע טכני באופן אוטומטי בעת הגלישה באתר (כגון כתובת IP, סוג דפדפן ונתוני שימוש).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-copper mb-4">3. שירותי צד שלישי</h2>
                        <p>
                            האתר משתמש בשירותי צד שלישי לניהול נתונים ואחסון מדיה, לרבות Firebase (Google) ו-Cloudinary. שירותים אלו עשויים לאסוף ולאחסן מידע בהתאם למדיניות הפרטיות שלהם. אנו ממליצים לעיין במדיניות הפרטיות של ספקים אלו.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-copper mb-4">4. שימוש במידע</h2>
                        <p>
                            המידע נאסף לצורך אספקת השירותים, שיפור חוויית המשתמש באתר, יצירת קשר לצרכי שיווק או שירות לקוחות, וניהול חשבונות המשתמשים. My Visionary לא תמכור או תעביר מידע אישי לצדדים שלישיים ללא הסכמתך, למעט כמתחייב על פי דין.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-copper mb-4">5. Cookies (עוגיות)</h2>
                        <p>
                            האתר משתמש ב-Cookies לצורך תפעולו התקין, איסוף נתונים סטטיסטיים והתאמת תוכן המשתמש. באפשרותך לשלוט בשימוש ב-Cookies דרך הגדרות הדפדפן שלך.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-copper mb-4">6. אבטחת מידע</h2>
                        <p>
                            אנו מיישמים אמצעי אבטחה מקובלים כדי להגן על המידע שברשותנו. עם זאת, אין אבטחה מוחלטת באינטרנט, ואיננו יכולים להבטיח שהמידע יהיה מוגן באופן מלא מפני גישה בלתי מורשית.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-copper mb-4">7. זכויות המשתמש</h2>
                        <p>
                            הנך זכאי לעיין במידע עליך המוחזק במאגר המידע שלנו, ולבקש לתקנו או למחקו אם הוא אינו מדויק או אינו רלוונטי עוד.
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

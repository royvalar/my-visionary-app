import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { collections } from "@/data/collections";
import Link from "next/link";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-offWhite selection:bg-copper selection:text-white">
      <Header />

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center text-center hero-bg px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <div className="max-w-5xl relative z-10">
          <p className="text-copper mb-6 tracking-[0.4em] uppercase text-xs font-bold">Curating the Exceptional</p>
          <h1 className="text-6xl md:text-[6rem] font-extrabold mb-8 leading-none">
            האמנות שבמטבח
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wide mb-12 max-w-2xl mx-auto text-offWhite/70">
            My Visionary מאגדת את מותגי היוקרה המובילים לקולקציות הרמוניות. אנחנו בונים גשר עיצובי בין טכנולוגיה לאסתטיקה.
          </p>
          <div>
            <Link href="#collections" className="inline-block bg-copper text-white px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl">
              לגלות את הקולקציות
            </Link>
          </div>
        </div>
      </section>

      {/* Curation Message */}
      <section className="py-32 bg-black border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-10 leading-tight">אינטגרציה אסתטית בין מותגים</h2>
          <p className="text-lg text-offWhite/50 leading-relaxed">
            המשימה שלנו היא לייצר סדר בעולם של אפשרויות. אנחנו בונים קולקציות המבוססות על חומרים, צבעים וסגנונות חיים – ומאגדים תחתיהן את מכשירי המטבח הטובים בעולם כדי לייצר חלל אחד שלם והרמוני.
          </p>
        </div>
      </section>

      {/* Project Collections */}
      <section id="collections" className="py-32 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <div className="text-right">
            <p className="text-copper mb-4 text-xs tracking-widest uppercase font-bold">The Gallery</p>
            <h2 className="text-5xl md:text-6xl font-extrabold text-white">הקולקציות שלנו</h2>
          </div>
          <div className="text-offWhite/40 text-[11px] mt-6 md:mt-0 italic uppercase tracking-widest">
            Curated by Theme, Style, and Substance
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
          {collections.map((collection) => (
            <div key={collection.id} className="collection-card group">
              <div className="relative overflow-hidden mb-8 aspect-[4/5] bg-white/5">
                <img src={collection.image} alt={collection.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />

                {/* Product List (Hidden by default, visible on hover) */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center p-12 text-center">
                  <h4 className="text-copper text-sm tracking-[0.3em] font-bold mb-8 transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                    מכשירי הקולקציה
                  </h4>
                  <ul className="space-y-4 mb-10">
                    {collection.appliances.map((appliance, idx) => (
                      <li key={idx} className="text-white/80 text-[11px] tracking-widest transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                        {appliance}
                      </li>
                    ))}
                  </ul>
                  <Link href={collection.link} className="bg-white text-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-copper hover:text-white transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    לקולקצייה
                  </Link>
                </div>
              </div>
              <div className="space-y-6 flex-grow flex flex-col">
                <div className="collection-title-box border-b border-white/10 pb-6">
                  <h3 className="text-3xl font-bold text-white mb-2">{collection.name}</h3>
                  <p className="text-[10px] text-copper uppercase tracking-[0.3em] font-black">{collection.subtitle}</p>
                </div>
                <div className="collection-desc-box pt-4">
                  <p className="text-sm text-offWhite/50 font-light leading-relaxed">
                    {collection.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {collection.brands.map((brand, idx) => (
                    <span key={idx} className="px-3 py-1 border border-white/10 text-[9px] uppercase tracking-widest text-offWhite/40 group-hover:border-copper/40 group-hover:text-copper transition-colors">
                      {brand}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <Link href={collection.link} className="inline-flex items-center gap-3 text-copper text-[11px] font-bold uppercase tracking-widest hover:text-white transition-all group/link">
                    לפרטי הקולקציה המלאים
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover/link:translate-x-[-4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Hub */}
      <section id="architects" className="py-32 bg-white/[0.02] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
            <div className="lg:col-span-1 space-y-12">
              <div className="text-right">
                <h2 className="text-5xl font-extrabold mb-6 text-white">קהילת האדריכלים והמעצבים</h2>
                <p className="text-offWhite/60 leading-relaxed">
                  פלטפורמה המיועדת למקצוענים שרואים את המטבח כמרכז היצירה. שתפו את הפרויקטים שלכם המשלבים את קולקציות My Visionary וקבלו במה בלעדית בקהילת העיצוב שלנו.
                </p>
              </div>
              <div className="bg-copper/10 border border-copper/30 p-12 text-right">
                <h4 className="text-xl font-bold mb-4 text-copper italic tracking-tight">הצטרפות למועדון האדריכלים והמעצבים</h4>
                <p className="text-sm mb-10 text-offWhite/70 leading-relaxed font-light">קבלו גישה לכלים תכנוניים, קטלוגים מאוגדים וייעוץ אישי לבניית קולקציות מותאמות לקוח.</p>
                <div className="flex justify-end">
                  <div className="w-full">
                    <GoogleSignInButton />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative h-[600px] group overflow-hidden shadow-2xl">
                <img src="/community1.png" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute bottom-10 right-10 text-right">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-copper mb-2 block font-bold">Featured Project</span>
                  <h3 className="text-2xl font-bold text-white">דנה כהן עיצוב פנים</h3>
                  <p className="text-[11px] text-offWhite/40 italic font-light mt-1">וילת יוקרה, הרצליה פיתוח</p>
                </div>
              </div>
              <div className="relative h-[600px] group overflow-hidden shadow-2xl">
                <img src="/community2.png" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute bottom-10 right-10 text-right">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-copper mb-2 block font-bold">Architect Insight</span>
                  <h3 className="text-2xl font-bold text-white">אדריכל אלון לוי</h3>
                  <p className="text-[11px] text-offWhite/40 italic font-light mt-1">פנטהאוז מנהטן, תל אביב</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

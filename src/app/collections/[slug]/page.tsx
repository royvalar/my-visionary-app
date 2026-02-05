'use client';

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { collections } from "@/data/collections";
import { notFound } from "next/navigation";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import PDFCatalogTemplate from "@/components/pdf/PDFCatalogTemplate";
import { generatePDF } from "@/utils/pdfGenerator";

export default function CollectionPage({ params }: { params: any }) {
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const { slug } = React.use(params) as { slug: string };
    const collection = collections.find((c) => c.slug === slug);

    if (!collection) {
        notFound();
    }

    const handleDownloadPDF = async () => {
        setIsGeneratingPDF(true);
        // Give time for the hidden template to render
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            await generatePDF('pdf-template', `MyVisionary_${collection.slug}_Catalog`);
        } catch (error) {
            console.error('Failed to generate PDF:', error);
            alert('מצטערים, חלה שגיאה בייצור הקטלוג. אנא נסה שוב.');
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-offWhite selection:bg-copper selection:text-white">
            <Header />

            {/* Hero Section */}
            <header className="h-screen flex items-center justify-center text-center hero-bg relative px-6" style={{ backgroundImage: `linear-gradient(rgba(5, 5, 5, 0.5), rgba(5, 5, 5, 0.8)), url('${collection.heroImage || collection.image}')` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                <div className="max-w-4xl relative z-10 animate-fade-in-up">
                    <p className="text-copper mb-4 tracking-[0.4em] uppercase text-xs font-bold">{collection.tagline}</p>
                    <h1 className="text-5xl md:text-[5rem] font-extrabold mb-6 leading-none text-white uppercase italic">
                        {collection.name}
                    </h1>
                    <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto text-offWhite/70">
                        {collection.description}
                    </p>
                    <div className="mt-12">
                        <button
                            onClick={handleDownloadPDF}
                            disabled={isGeneratingPDF}
                            className="inline-block border border-copper text-copper px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-copper hover:text-white transition-all duration-500 rounded-full disabled:opacity-50"
                        >
                            הורד קטלוג PDF מלא
                        </button>
                    </div>
                </div>
            </header>

            {/* Zig-Zag Catalog Section */}
            <div className="py-20 space-y-32">
                {collection.products.map((product, index) => (
                    <section key={index} className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className={`space-y-8 ${index % 2 !== 0 ? 'md:order-2 text-right' : ''}`}>
                            <div className={`flex items-center gap-4 ${index % 2 !== 0 ? 'justify-end' : ''}`}>
                                {index % 2 === 0 && <div className="w-12 h-px bg-copper"></div>}
                                <span className="text-copper text-xs font-bold uppercase tracking-widest">{product.brand} • {product.series}</span>
                                {index % 2 !== 0 && <div className="w-12 h-px bg-copper"></div>}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">{product.name}</h2>
                            <p className="text-lg text-offWhite/50 leading-relaxed font-light">
                                {product.description}
                            </p>
                            <div className="pt-6">
                                <a href="#" className="inline-block bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-copper hover:text-white transition-all duration-500">
                                    לעוד פרטים בעמוד המותג {product.brand}
                                </a>
                            </div>
                        </div>
                        <div className={`relative group ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                            <div className="aspect-[4/5] bg-white/5 overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            <Footer />

            {/* Hidden PDF Template and Overlay */}
            {isGeneratingPDF && (
                <>
                    <PDFCatalogTemplate collection={collection} />
                    <LoadingOverlay isVisible={isGeneratingPDF} />
                </>
            )}
        </main>
    );
}

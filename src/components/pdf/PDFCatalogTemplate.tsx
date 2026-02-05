'use client';

import React from 'react';
import { Collection } from '@/data/collections';

interface PDFCatalogTemplateProps {
    collection: Collection;
}

const PDFCatalogTemplate: React.FC<PDFCatalogTemplateProps> = ({ collection }) => {
    const copper = '#B87333';
    const black = '#050505';

    return (
        <div id="pdf-template" className="pdf-container overflow-hidden" dir="rtl" style={{ position: 'fixed', left: '-9999px', top: '0' }}>
            {/* Cover Page */}
            <div className="pdf-page bg-black text-white justify-center items-center text-center relative overflow-hidden" style={{ backgroundColor: black }}>
                <div className="absolute inset-0 opacity-20 bg-center bg-cover" style={{ backgroundImage: `url('${collection.heroImage || collection.image}')` }}></div>
                <div className="relative z-10 p-12 border border-copper/30 m-8 bg-black/60 backdrop-blur-sm">
                    <p className="text-copper uppercase tracking-[0.4em] text-[12px] font-bold mb-6" style={{ color: copper }}>{collection.tagline}</p>
                    <h1 className="text-7xl font-serif font-black mb-8 italic uppercase leading-none" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {collection.name}
                    </h1>
                    <div className="w-24 h-px bg-copper mx-auto mb-8" style={{ backgroundColor: copper }}></div>
                    <p className="text-xl font-light tracking-widest text-white/70 max-w-lg mx-auto leading-relaxed">
                        {collection.subtitle}
                    </p>
                </div>

                {/* Logo and Signature */}
                <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4">
                    <div className="text-2xl font-extrabold text-copper tracking-tighter uppercase italic" style={{ color: copper }}>
                        My Visionary
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">
                        Design Curated by <span className="text-white/50">WixMix Agency</span>
                    </div>
                </div>
            </div>

            {/* Introduction Page */}
            <div className="pdf-page bg-white text-black pdf-break">
                <div className="flex-grow flex flex-col justify-center max-w-3xl mx-auto text-right">
                    <h2 className="text-铜 font-serif text-5xl mb-12 italic" style={{ color: copper, fontFamily: 'Playfair Display, serif' }}>על הקולקציה</h2>
                    <p className="text-2xl font-light leading-relaxed text-black/80 mb-16">
                        {collection.description}
                    </p>
                    <div className="grid grid-cols-2 gap-12">
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-black/40 mb-4">מותגים משתתפים</h4>
                            <ul className="text-lg space-y-2">
                                {collection.brands.map((brand, i) => (
                                    <li key={i} className="font-medium">{brand}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-black/40 mb-4">אלמנטים מרכזיים</h4>
                            <ul className="text-lg space-y-2">
                                {collection.appliances.map((item, i) => (
                                    <li key={i} className="font-medium">{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Page Footer */}
                <div className="mt-auto pt-12 border-t border-black/5 flex justify-between items-end">
                    <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/20">© 2026 My Visionary</div>
                    <div className="text-[8px] font-bold tracking-[0.3em] uppercase text-black/20">WixMix Signature Collection</div>
                </div>
            </div>

            {/* Product Pages */}
            {collection.products.map((product, index) => (
                <div key={index} className="pdf-page bg-white text-black pdf-break">
                    <div className="grid grid-cols-1 gap-12 flex-grow">
                        <div className="aspect-[16/10] overflow-hidden bg-black/5">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-6 text-right">
                            <div className="flex items-center gap-4 justify-end">
                                <span className="text-铜 text-[10px] font-bold uppercase tracking-widest" style={{ color: copper }}>{product.brand} • {product.series}</span>
                                <div className="w-12 h-px bg-copper" style={{ backgroundColor: copper }}></div>
                            </div>
                            <h2 className="text-4xl font-extrabold text-black leading-tight">{product.name}</h2>
                            <p className="text-lg text-black/60 leading-relaxed font-light max-w-2xl ml-auto">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {/* Page Footer */}
                    <div className="mt-auto pt-12 border-t border-black/5 flex justify-between items-end">
                        <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/20">My Visionary Catalog</div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-bold uppercase text-black/20">WixMix Agency</span>
                            <span className="text-lg font-serif italic text-black/40">{index + 1}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PDFCatalogTemplate;

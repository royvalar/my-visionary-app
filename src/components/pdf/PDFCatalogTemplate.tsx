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
        <div id="pdf-template" className="pdf-container overflow-hidden" dir="rtl" style={{ position: 'fixed', left: '0', top: '0', zIndex: 9998, backgroundColor: 'white', color: black, width: '210mm', height: '100vh', overflowY: 'auto' }}>
            {/* Cover Page */}
            <div className="pdf-page justify-center items-center text-center relative overflow-hidden" style={{ backgroundColor: black, color: 'white', padding: '20mm', minHeight: '297mm', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="absolute inset-0" style={{ backgroundImage: `url('${collection.heroImage || collection.image}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
                <div className="relative z-10 p-12 m-8 backdrop-blur-sm" style={{ border: `1px solid rgba(184, 115, 51, 0.3)`, backgroundColor: 'rgba(5, 5, 5, 0.6)', padding: '3rem', margin: '2rem', position: 'relative', zIndex: 10 }}>
                    <p className="uppercase tracking-[0.4em] text-[12px] font-bold mb-6" style={{ color: copper, textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '12px', fontWeight: 'bold', marginBottom: '1.5rem' }}>{collection.tagline}</p>
                    <h1 className="text-7xl font-serif font-black mb-8 italic uppercase leading-none" style={{ fontFamily: 'Playfair Display, serif', fontSize: '4.5rem', fontWeight: 900, marginBottom: '2rem', fontStyle: 'italic', textTransform: 'uppercase', lineHeight: 1 }}>
                        {collection.name}
                    </h1>
                    <div className="w-24 h-px mx-auto mb-8" style={{ backgroundColor: copper, width: '6rem', height: '1px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '2rem' }}></div>
                    <p className="text-xl font-light tracking-widest max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(229, 229, 229, 0.7)', fontSize: '1.25rem', fontWeight: 300, letterSpacing: '0.1em', maxWidth: '32rem', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.625 }}>
                        {collection.subtitle}
                    </p>
                </div>

                {/* Logo and Signature */}
                <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4" style={{ position: 'absolute', bottom: '3rem', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div className="text-2xl font-extrabold tracking-tighter uppercase italic" style={{ color: copper, fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.05em', textTransform: 'uppercase', fontStyle: 'italic' }}>
                        My Visionary
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: 'rgba(229, 229, 229, 0.3)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 'bold' }}>
                        Design Curated by <span style={{ color: 'rgba(229, 229, 229, 0.5)' }}>WixMix Agency</span>
                    </div>
                </div>
            </div>

            {/* Introduction Page */}
            <div className="pdf-page bg-white text-black pdf-break" style={{ backgroundColor: 'white', color: black, padding: '20mm', minHeight: '297mm', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '48rem', marginLeft: 'auto', marginRight: 'auto', textAlign: 'right' }}>
                    <h2 className="font-serif text-5xl mb-12 italic" style={{ color: copper, fontFamily: 'Playfair Display, serif', fontSize: '3rem', marginBottom: '3rem', fontStyle: 'italic' }}>על הקולקציה</h2>
                    <p className="text-2xl font-light leading-relaxed mb-16" style={{ color: 'rgba(5, 5, 5, 0.8)', fontSize: '1.5rem', fontWeight: 300, lineHeight: 1.625, marginBottom: '4rem' }}>
                        {collection.description}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: 'rgba(5, 5, 5, 0.4)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold', marginBottom: '1rem' }}>מותגים משתתפים</h4>
                            <ul style={{ fontSize: '1.125rem', listStyle: 'none', padding: 0, margin: 0 }}>
                                {collection.brands.map((brand, i) => (
                                    <li key={i} style={{ fontWeight: 500, marginBottom: '0.5rem' }}>{brand}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: 'rgba(5, 5, 5, 0.4)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold', marginBottom: '1rem' }}>אלמנטים מרכזיים</h4>
                            <ul style={{ fontSize: '1.125rem', listStyle: 'none', padding: 0, margin: 0 }}>
                                {collection.appliances.map((item, i) => (
                                    <li key={i} style={{ fontWeight: 500, marginBottom: '0.5rem' }}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Page Footer */}
                <div style={{ borderTop: `1px solid rgba(5, 5, 5, 0.05)`, paddingTop: '3rem', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: 'rgba(5, 5, 5, 0.2)', fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.2em', textTransform: 'uppercase' }}>© 2026 My Visionary</div>
                    <div className="text-[8px] font-bold tracking-[0.3em] uppercase" style={{ color: 'rgba(5, 5, 5, 0.2)', fontSize: '8px', fontWeight: 'bold', letterSpacing: '0.3em', textTransform: 'uppercase' }}>WixMix Signature Collection</div>
                </div>
            </div>

            {/* Product Pages */}
            {collection.products.map((product, index) => (
                <div key={index} className="pdf-page bg-white text-black pdf-break" style={{ backgroundColor: 'white', color: black, padding: '20mm', minHeight: '297mm', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', flexGrow: 1 }}>
                        <div style={{ backgroundColor: 'rgba(5, 5, 5, 0.05)', overflow: 'hidden', aspectRatio: '16/10' }}>
                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', marginBottom: '1.5rem' }}>
                                <span style={{ color: copper, fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{product.brand} • {product.series}</span>
                                <div style={{ backgroundColor: copper, width: '3rem', height: '1px' }}></div>
                            </div>
                            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: black, lineHeight: 1.25, marginBottom: '1.5rem' }}>{product.name}</h2>
                            <p style={{ color: 'rgba(5, 5, 5, 0.6)', fontSize: '1.125rem', fontWeight: 300, lineHeight: 1.625, maxWidth: '42rem', marginLeft: 'auto' }}>
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {/* Page Footer */}
                    <div style={{ borderTop: `1px solid rgba(5, 5, 5, 0.05)`, paddingTop: '3rem', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div style={{ color: 'rgba(5, 5, 5, 0.2)', fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.2em', textTransform: 'uppercase' }}>My Visionary Catalog</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ color: 'rgba(5, 5, 5, 0.2)', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.2em' }}>WixMix Agency</span>
                            <span style={{ color: 'rgba(5, 5, 5, 0.4)', fontFamily: 'Playfair Display, serif', fontSize: '1.125rem', fontStyle: 'italic' }}>{index + 1}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PDFCatalogTemplate;

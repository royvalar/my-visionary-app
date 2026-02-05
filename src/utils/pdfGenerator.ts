'use client';

/**
 * PDF Generator Utility
 * Uses html2pdf.js to generate professional PDFs from DOM elements.
 */

export const generatePDF = async (elementId: string, filename: string) => {
    // Dynamically import only on client side
    const html2pdf = (await import('html2pdf.js')).default;

    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error(`Element with id ${elementId} not found`);
    }

    const opt = {
        margin: 0,
        filename: `${filename}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            scrollX: 0,
            scrollY: 0,
            windowWidth: 794 // 210mm at 96dpi
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait' as const,
            compress: true
        },
        pagebreak: { mode: ['css', 'legacy'] as const } // Respect .pdf-break class
    };

    try {
        // Wait for all images to load
        const images = element.querySelectorAll('img');
        await Promise.all(Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = resolve; // Don't fail the PDF if one image fails
            });
        }));

        // Extra small delay to ensure rendering
        await new Promise(resolve => setTimeout(resolve, 500));

        await html2pdf().set(opt).from(element).save();
    } catch (error) {
        console.error('PDF Generation Error:', error);
        throw error;
    }
};

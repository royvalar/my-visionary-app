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
        // We set the element to visible temporarily just for capture, 
        // but since it's at -9999px it won't be seen by the user.
        const originalStyle = element.style.display;
        element.style.display = 'block';

        await html2pdf().set(opt).from(element).save();

        element.style.display = originalStyle;
    } catch (error) {
        console.error('PDF Generation Error:', error);
        throw error;
    }
};

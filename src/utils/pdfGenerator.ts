'use client';

/**
 * PDF Generator Utility
 * Uses html2pdf.js to generate professional PDFs from DOM elements.
 */

export const generatePDF = async (elementId: string, filename: string) => {
    // Dynamically import only on client side
    const html2pdf = (await import('html2pdf.js')).default;

    const originalElement = document.getElementById(elementId);
    if (!originalElement) {
        throw new Error(`Element with id ${elementId} not found`);
    }

    // Clone the element to ensure we can manipulate it without affecting the UI
    const clone = originalElement.cloneNode(true) as HTMLElement;

    // Style the clone to be visible but off-screen/underneath
    clone.style.position = 'fixed';
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.width = '210mm'; // Ensure A4 width
    clone.style.zIndex = '-9999'; // Behind everything
    clone.style.display = 'block'; // Make sure it's block
    clone.id = 'pdf-clone-temp'; // Prevent ID conflicts if possible, though deep clones keep IDs

    document.body.appendChild(clone);

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
        // Wait for all images in the CLONE to load
        const images = clone.querySelectorAll('img');
        await Promise.all(Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve; // Don't fail the PDF if one image fails
            });
        }));

        // Extra small delay to ensure rendering of the clone
        await new Promise(resolve => setTimeout(resolve, 500));

        await html2pdf().set(opt).from(clone).save();
    } catch (error) {
        console.error('PDF Generation Error:', error);
        throw error;
    } finally {
        // Always clean up the clone
        document.body.removeChild(clone);
    }
};

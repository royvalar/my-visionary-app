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
    clone.id = 'pdf-clone-temp'; // Prevent ID conflicts

    document.body.appendChild(clone);
    console.log('PDF Generator: Template clone appended to body');

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
        // 1. Wait for all images in the CLONE to load
        console.log('PDF Generator: Checking images...');
        const images = Array.from(clone.querySelectorAll('img'));

        await Promise.all(images.map(async (img) => {
            if (img.complete && img.naturalHeight !== 0) return;

            try {
                // Try decoding first if supported
                if (img.decode) {
                    await img.decode();
                } else {
                    // Fallback to onload
                    await new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = resolve; // Don't fail the PDF if one image fails
                        // Timeout after 5s to prevent hanging
                        setTimeout(resolve, 5000);
                    });
                }
            } catch (e) {
                console.warn('PDF Generator: Image load warning', e);
            }
        }));
        console.log(`PDF Generator: All ${images.length} images loaded/checked`);

        // 2. Delay Capture to allow layout engine to settle
        console.log('PDF Generator: Waiting for layout...');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 3. Start Capture
        console.log('PDF Generator: Starting html2pdf capture...');
        await html2pdf().set(opt).from(clone).save();
        console.log('PDF Generator: Capture complete');

    } catch (error) {
        console.error('PDF Generation Error:', error);
        throw error;
    } finally {
        // Always clean up the clone
        document.body.removeChild(clone);
        console.log('PDF Generator: Clone removed');
    }
};

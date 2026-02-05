import imageCompression from 'browser-image-compression';

export async function compressImage(file: File): Promise<File> {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/webp' // Preferred format
    };

    try {
        const compressedFile = await imageCompression(file, options);
        console.log(`Compressed image from ${file.size / 1024 / 1024}MB to ${compressedFile.size / 1024 / 1024}MB`);
        return compressedFile;
    } catch (error) {
        console.error('Error compressing image:', error);
        return file; // Return original if compression fails
    }
}

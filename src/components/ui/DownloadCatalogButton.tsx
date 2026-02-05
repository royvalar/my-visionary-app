'use client';

import React from 'react';

interface DownloadCatalogButtonProps {
    label: string;
    className?: string;
}

const DownloadCatalogButton: React.FC<DownloadCatalogButtonProps> = ({ label, className }) => {
    const handleDownloadPDF = () => {
        alert("קטלוג PDF יהיה זמין להורדה בקרוב!");
    };

    return (
        <button
            onClick={handleDownloadPDF}
            className={className}
        >
            {label}
        </button>
    );
};

export default DownloadCatalogButton;

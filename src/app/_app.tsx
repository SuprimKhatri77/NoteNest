import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { pdfjs } from 'react-pdf';
import '../globals.css';
function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // Set up the PDF.js worker
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;
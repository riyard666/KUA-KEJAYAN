// src/views/NewsDetailPage.tsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FormatDate } from "@/utils/format.ts";
import Footer from "@/components/Footer.tsx";
import EditorJSHTML from "editorjs-html";

// ==========================================================
// Inisialisasi EditorJSHTML
// ==========================================================
const editorJsHtml = EditorJSHTML({
    image: (block) => {
        const url = block?.data?.file?.url;
        const caption = block?.data?.caption || '';
        if (!url) return `<p class="text-red-500">Error: Gambar tidak valid.</p>`;
        return `
            <figure class="cdx-block image-tool my-6">
                <img src="${url}" alt="${caption}" class="rounded-lg w-full"/>
                ${caption ? `<figcaption class="text-center text-sm text-gray-500 mt-2">${caption}</figcaption>` : ''}
            </figure>
        `;
    },
    header: (block) => {
        const level = block?.data?.level || 1;
        const text = block?.data?.text || '';
        if (!text) return '';
        const sizeClass = level === 1 ? 'text-3xl' : level === 2 ? 'text-2xl' : 'text-xl';
        return `<h${level} class="${sizeClass} font-bold">${text}</h${level}>`;
    },
    list: (block) => {
        const style = block?.data?.style === 'ordered' ? 'ol' : 'ul';
        const items: string[] = Array.isArray(block?.data?.items) ? block.data.items : [];
        if (!items.length) return '';
        return `<${style} class="ml-6 space-y-1 list-disc">${items
            .map((i: string) => `<li>${i}</li>`)
            .join('')}</${style}>`;
    },
    raw: (block) => block?.data?.html || '',
    delimiter: () => `<div class="ce-delimiter my-8"><hr /></div>`,
    unknown: (block) => {
        console.warn(`Blok tidak dikenal: ${block?.type}`);
        return '';
    },
});


// ==========================================================
type NewsModel = {
    id: string;
    judul: string;
    slug: string;
    tanggal: string;
    penulis: string;
    gambar: string;
    konten: string;
};

export default function NewsDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [newsItem, setNewsItem] = useState<NewsModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [processedContent, setProcessedContent] = useState<string>("");

    useEffect(() => {
        fetch(
            "https://script.google.com/macros/s/AKfycbx6q-R7TwG2sQuBhgMU1K7VdSHmqi6LMPGSf7fjoVPiVUCE_SZlTDzBIh1_hups6e2d/exec"
        )
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data: NewsModel[]) => {
                const found = data.find((item) => item.slug === slug);
                if (!found) {
                    setError("Berita tidak ditemukan");
                    setLoading(false);
                    return;
                }

                setNewsItem(found);

                try {
                    let contentObj;
                    let finalHtml = "";

                    // 🔹 1. Coba parse sebagai JSON Editor.js
                    try {
                        contentObj = JSON.parse(found.konten);
                    } catch {
                        contentObj = null;
                    }

                    // 🔹 2. Jika JSON valid dan ada blocks → gunakan editorjs-html
                    if (contentObj && Array.isArray(contentObj.blocks)) {
                        const parsed = editorJsHtml.parse(contentObj);
                        finalHtml = Array.isArray(parsed) ? parsed.join("") : parsed;
                    }
                    // 🔹 3. Jika bukan JSON → anggap HTML lama
                    else {
                        finalHtml = found.konten;
                    }

                    setProcessedContent(finalHtml);
                } catch (e) {
                    console.error("Gagal memproses konten:", e);
                    setProcessedContent(
                        "<p class='text-red-500'>Konten tidak dapat dimuat.</p>"
                    );
                }

                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetch:", err);
                setError("Gagal memuat berita: " + err.message);
                setLoading(false);
            });
    }, [slug]);

    if (loading) return <p className="text-center py-10">Memuat berita...</p>;
    if (error) return <p className="text-center text-red-500 py-10">{error}</p>;
    if (!newsItem) return <p className="text-center text-gray-500 py-10">Data tidak tersedia</p>;

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
                <div className="mx-auto max-w-3xl px-4 py-12">
                    <Link to="/news" className="text-emerald-600 hover:underline mb-6 inline-block">
                        ← Kembali ke Berita
                    </Link>

                    <h1 className="text-3xl md:text-4xl font-bold mb-3 text-emerald-700">
                        {newsItem.judul}
                    </h1>

                    <p className="text-sm text-gray-500 mb-6">
                        {FormatDate(newsItem.tanggal)} • {newsItem.penulis}
                    </p>

                    {newsItem.gambar && (
                        <img
                            src={newsItem.gambar}
                            alt={newsItem.judul}
                            className="w-full max-h-[450px] object-cover rounded-lg mb-8"
                        />
                    )}

                    <div
                        className="prose prose-emerald max-w-none"
                        dangerouslySetInnerHTML={{ __html: processedContent }}
                    />
                </div>
            </div>

            <Footer />
        </>
    );
}

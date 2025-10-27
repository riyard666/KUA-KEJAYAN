// src/views/NewsDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {FormatDate} from "@/utils/format.ts";
import Footer from "@/components/Footer.tsx";

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

    useEffect(() => {
        fetch(
            "https://script.google.com/macros/s/AKfycbx6q-R7TwG2sQuBhgMU1K7VdSHmqi6LMPGSf7fjoVPiVUCE_SZlTDzBIh1_hups6e2d/exec"
        )
            .then((res) => res.json())
            .then((data: NewsModel[]) => {
                const found = data.find((item) => item.slug === slug);
                if (found) {
                    setNewsItem(found);
                } else {
                    setError("Berita tidak ditemukan");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetch:", err);
                setError("Gagal memuat berita");
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return <p className="text-center py-10">Memuat berita...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 py-10">{error}</p>;
    }

    if (!newsItem) {
        return <p className="text-center text-gray-500 py-10">Data tidak tersedia</p>;
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
                <div className="mx-auto max-w-3xl px-4 py-12">
                    {/* Back link */}
                    <Link to="/news" className="text-emerald-600 hover:underline mb-6 inline-block">
                        ← Kembali ke Berita
                    </Link>

                    {/* Judul */}
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 text-emerald-700">
                        {newsItem.judul}
                    </h1>

                    {/* Info penulis */}
                    <p className="text-sm text-gray-500 mb-6">
                        {FormatDate(newsItem.tanggal)} • {newsItem.penulis}
                    </p>

                    {/* Gambar utama */}
                    {newsItem.gambar && (
                        <img
                            src={newsItem.gambar}
                            alt={newsItem.judul}
                            className="w-full max-h-[450px] object-cover rounded-lg mb-8"
                        />
                    )}

                    {/* Konten berita */}
                    <div
                        className="prose prose-emerald max-w-none"
                        dangerouslySetInnerHTML={{ __html: newsItem.konten }}
                    />
                </div>
            </div>

            <Footer />
        </>
    );
}

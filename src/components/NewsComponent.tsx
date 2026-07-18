import { useEffect, useState } from "react";
import type { NewsModel } from "@/model/news.model.tsx";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FormatDateId } from "@/utils/format.ts";

interface NewsProps {
    horizontal?: boolean;
}

export default function NewsComponent({ horizontal = false }: NewsProps) {
    const [news, setNews] = useState<NewsModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(
            "https://script.google.com/macros/s/AKfycbzvVcygmNEShLz3iFBto7XhWtwcJCJ-C_3gspBOk2VPT-m-L_en_SEjg7vGIpT96bYy/exec"
        )
            .then((res) => res.json())
            .then((data) => {
                setNews(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetch:", err);
                setError("Gagal memuat berita");
                setLoading(false);
            });
    }, []);

if (loading) return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="mx-auto max-w-6xl px-4">
                {/* Judul Halaman Buatan */}
                <div className="flex flex-col items-center justify-center mb-12 animate-pulse">
                    <div className="h-10 bg-gray-300 rounded w-64 mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-96"></div>
                </div>

                {/* Grid 6 Kartu Berita Buatan */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                            {/* Gambar Kartu */}
                            <div className="h-52 bg-gray-300 w-full"></div>
                            {/* Isi Kartu */}
                            <div className="p-6">
                                <div className="h-3 bg-gray-300 rounded w-1/3 mb-4"></div>
                                <div className="h-6 bg-gray-300 rounded w-full mb-2"></div>
                                <div className="h-6 bg-gray-300 rounded w-4/5 mb-4"></div>
                                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

    return (
        <div
            className={
                horizontal
                    ? "flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory -mx-4 px-4 pb-4"
                    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            }
        >
            {news.map((item) => (
                <Card
                    key={item.id}
                    className={`overflow-hidden shadow-md ${
                        horizontal
                            ? "min-w-[320px] max-w-[320px] flex-shrink-0 snap-start"
                            : ""
                    }`}
                >
                    <img
                        src={item.gambar}
                        alt={item.judul}
                        className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-4 flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg font-bold mb-2 line-clamp-2">
                                {item.judul}
                            </h2>
                            <p className="text-sm text-gray-500 mb-3">
                                {FormatDateId(item.tanggal)} • {item.penulis}
                            </p>
                            <div className="text-gray-700 text-sm line-clamp-3 mb-4">
                                {item.deskripsi}
                            </div>
                        </div>
                        <Link
                            to={`/news/${item.slug}`}
                            className="text-emerald-600 font-medium hover:underline mt-auto"
                        >
                            Baca Selengkapnya →
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

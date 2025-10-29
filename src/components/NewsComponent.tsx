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
            "https://script.google.com/macros/s/AKfycbx6q-R7TwG2sQuBhgMU1K7VdSHmqi6LMPGSf7fjoVPiVUCE_SZlTDzBIh1_hups6e2d/exec"
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

    if (loading) return <p className="text-center py-10">Memuat berita...</p>;
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

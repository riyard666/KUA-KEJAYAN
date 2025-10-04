import { useEffect, useState } from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {Link} from "react-router-dom";
import type {NewsModel} from "@/model/news.model.tsx";
import { FormatDateId} from "@/utils/format.ts";
import Footer from "@/components/Footer.tsx";

export default function NewsList() {
    const [news, setNews] = useState<NewsModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(
            "https://script.google.com/macros/s/AKfycbx6q-R7TwG2sQuBhgMU1K7VdSHmqi6LMPGSf7fjoVPiVUCE_SZlTDzBIh1_hups6e2d/exec" // ganti dengan link API spreadsheet kamu
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

    if (error) {
        return ;
    }

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">

                <div className="mx-auto max-w-6xl px-4 py-12">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-5xl font-bold text-emerald-700 text-center">
                            Informasi KUA Kejayan
                        </h1>
                        <p className={"text-center"}>Dapatkan berita, pengumuman, dan informasi penting terkini yang selalu kami update untuk masyarakat.</p>
                    </div>

                    {
                        loading ? (
                            <p className="text-center py-10">Memuat berita...</p>
                        ) : (
                            <>

                                {
                                    error ? (
                                        <p className="text-center text-red-500 py-10">{error}</p>
                                    ) : (
                                        <>
                                            <>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {news.map((item) => (
                                                        <Card key={item.id} className="overflow-hidden shadow-md">
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

                                                                    {/* render konten HTML */}
                                                                    <div
                                                                        className="text-gray-700 text-sm line-clamp-3 mb-4"
                                                                        dangerouslySetInnerHTML={{ __html: item.konten }}
                                                                    />
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
                                            </>
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>

            <Footer />
        </div>
    );
}
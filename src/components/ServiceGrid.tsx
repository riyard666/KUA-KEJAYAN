"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const services = [
    {
        title: "Nikah",
        description: "Daftar online atau ajukan rekomendasi nikah.",
        icon: "💒",
        links: [
            { text: "Daftar Nikah (SIMKAH)", url: "https://simkah4.kemenag.go.id/" },
            { text: "Rekomendasi Nikah", url: "https://s.id/daftar_surat_rekomendasi_nikah" },
        ],
    },
    {
        title: "Kalender Jadwal Nikah",
        description: "Pantau slot jadwal tersedia & rencanakan tanggal terbaik.",
        icon: "📅",
        links: [
            { text: "Lihat Jadwal", url: "/kalender-jadwal-nikah" }
        ]
    },
    {
        title: "Pengecekan Nikah",
        description: "Cek status dan legalitas pernikahan Anda secara resmi.",
        icon: "✅",
        links: [
            { text: "Cek Status Nikah", url: "https://pusaka-v3.kemenag.go.id/layanan-pengecekan-nikah" }
        ]
    },
    {
        title: "E-Book",
        description: "Layanan buku digital.",
        icon: "📔",
        links: [
            { text: "E-Book Bimwin", url: "https://s.id/E-bookBinwin" },
            { text: "E-Book BRUS", url: "https://s.id/BRUS_KEJAYAN" },
            { text: "E-Book EAIW", url: "https://s.id/panduanEAIW" }
        ]
    },
    {
        title: "SERFITIKAT",
        description: "Sertifikat BRUS Bisa di Download DISINI.",
        icon: "🪪",
        links: [
            { text: "Sertifikat BRUS", url: "https://s.id/Sertificate_BRUS" }
        ]
    },
    {
        title: "BIMWIN",
        description: "Pre-test dan post-test Bimbingan Pra-Nikah.",
        icon: "🤵‍♂️👰‍♀️",
        links: [
            { text: "Post-tes & Pre-tes", url: "https://s.id/Pre-Test-Post-Test-KUA-Kejayan" }
        ]
    },
    {
        title: "Daftar Wakaf",
        description: "Pendaftaran online semakin mudah dan cepat.",
        icon: "📜",
        links: [
            { text: "Data Wakaf (SIWAK)", url: "https://siwak.kemenag.go.id/" }
        ]
    },
    {
        title: "Sertifikasi Produk Halal",
        description: "Segera halalkan produk Anda.",
        icon: "🍲",
        links: [
            { text: "Produk Halal", url: "https://s.id/SertifikasiHalalKejayan" }
        ]
    },
    {
        title: "Kalkulator Zakat",
        description: "Hitung kewajiban zakat untuk berbagai jenis harta.",
        icon: "💰",
        links: [
            { text: "Kalkulator Zakat (BAZNAS)", url: "https://baznas.go.id/kalkulatorzakat" }
        ]
    },
    {
        title: "Arah Kiblat",
        description: "Temukan arah kiblat akurat berbasis lokasi perangkat Anda.",
        icon: "🧭",
        links: [
            { text: "Qibla Finder", url: "https://qiblafinder.withgoogle.com/intl/id/desktop/find/" }
        ]
    },
    {
        title: "Al-Quran",
        description: "Baca Al-Quran digital dengan terjemahan dan tafsir.",
        icon: "📖",
        links: [
            { text: "Quran Kemenag", url: "https://quran.kemenag.go.id/" }
        ]
    },
    {
        title: "Pilihan Doa",
        description: "Kumpulan doa sehari-hari untuk berbagai kebutuhan Anda.",
        icon: "🤲",
        links: [
            { text: "Kumpulan Doa", url: "https://pusaka-v3.kemenag.go.id/islam/pilihan-doa" }
        ]
    }
];

export default function ServiceGrid() {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [currentLinks, setCurrentLinks] = useState<{ text: string; url: string }[]>([]);

    // Fungsi navigasi yang aman untuk internal maupun eksternal url
    const handleNavigate = (url: string) => {
        if (url.startsWith("/")) {
            navigate(url); // Navigasi internal Next.js
        } else {
            window.open(url, "_blank", "noopener,noreferrer"); // Navigasi eksternal aman
        }
        setOpenDialog(false);
    };

    const handleCardClick = (links: { text: string; url: string }[]) => {
        if (links.length === 1) {
            handleNavigate(links[0].url);
        } else {
            setCurrentLinks(links);
            setOpenDialog(true);
        }
    };

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Layanan Digital KUA Kejayan</h2>
                    <p className="text-gray-600">Panduan lengkap untuk layanan Kantor Urusan Agama</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <Card
              key={index}
              className="group relative p-6 bg-white border border-gray-100 rounded-2xl hover:border-emerald-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
              onClick={() => handleCardClick(service.links)}
            >
              {/* Efek cahaya/gradient tipis di latar belakang saat disentuh */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Ikon dengan animasi membesar dan sedikit berputar */}
              <div className="relative text-4xl mb-5 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 drop-shadow-sm">
                {service.icon}
              </div>
              
              {/* Teks Judul */}
              <h3 className="relative text-lg font-bold mb-2 text-gray-800 group-hover:text-emerald-700 transition-colors duration-300">
                {service.title}
              </h3>
              
              {/* Teks Deskripsi */}
              <p className="relative text-gray-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </Card>
                    ))}
                </div>
            </div>

            {/* Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Pilih Layanan</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 mt-4">
                        {currentLinks.map((link, idx) => (
                            <Button
                                key={idx}
                                variant="outline"
                                onClick={() => handleNavigate(link.url)}
                            >
                                {link.text}
                            </Button>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                            Batal
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}

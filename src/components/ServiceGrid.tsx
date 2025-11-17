"use client";

import { useState } from "react";
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
        title: 'Kalender Jadwal Nikah',
        description: 'Pantau slot jadwal tersedia & rencanakan tanggal terbaik.',
        icon: '📅',
        links: [
            { text: 'Lihat Jadwal', url: '/kalender-jadwal-nikah' }
        ]
    },
    {
        title: 'Pengecekan Nikah',
        description: 'Cek status dan legalitas pernikahan Anda secara resmi.',
        icon: '✅',
        links: [
            { text: 'Cek Status Nikah', url: 'https://pusaka-v3.kemenag.go.id/layanan-pengecekan-nikah' }
        ]
    },
    {
        title: 'E-Book',
        description: 'Layanan buku digital.',
        icon: '📔',
        links: [
            { text: "E-Book Bimwin", url: "https://s.id/E-bookBinwin" },
            { text: "E-Book BRUS", url: "https://s.id/BRUS_KEJAYAN" }
            { text: "E-Book EAIW", url: "https://s.id/panduanEAIW" },
        ]
    },
    {
        title: "BIMWIN",
        description: "Pre-test dan post-test Bimbingan Pra-Nikah.",
        icon: "🤵‍♂️👰‍♀️",
        links: [
            { text: "Post-tes & Pre-tes", url: "https://s.id/Pre-Test-Post-Test-KUA-Kejayan" }],
    },
    {
        title: 'Daftar Wakaf',
        description: 'Pendaftaran online semakin mudah dan cepat.',
        icon: '📜',
        links: [
            { text: 'Data Wakaf (SIWAK)', url: 'https://siwak.kemenag.go.id/' }
        ]
    },
    {
        title: 'Kalkulator Zakat',
        description: 'Hitung kewajiban zakat untuk berbagai jenis harta.',
        icon: '💰',
        links: [
            { text: 'Kalkulator Zakat (BAZNAS)', url: 'https://baznas.go.id/kalkulatorzakat' }
        ]
    },
    {
        title: 'Arah Kiblat',
        description: 'Temukan arah kiblat akurat berbasis lokasi perangkat Anda.',
        icon: '🧭',
        links: [
            { text: 'Qibla Finder', url: 'https://qiblafinder.withgoogle.com/intl/id/desktop/find/' }
        ]
    },
    {
        title: 'Al-Quran',
        description: 'Baca Al-Quran digital dengan terjemahan dan tafsir.',
        icon: '📖',
        links: [
            { text: 'Quran Kemenag', url: 'https://quran.kemenag.go.id/' }
        ]
    }
];

export default function ServiceGrid() {
    const [openDialog, setOpenDialog] = useState(false);
    const [currentLinks, setCurrentLinks] = useState<{ text: string; url: string }[]>([]);

    const handleCardClick = (links: { text: string; url: string }[]) => {
        if (links.length === 1) {
            window.open(links[0].url, "_blank");
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
                            className="p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                            onClick={() => handleCardClick(service.links)}
                        >
                            <div className="text-4xl mb-4">{service.icon}</div>
                            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-600 text-sm">{service.description}</p>
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
                                onClick={() => window.open(link.url, "_blank")}
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

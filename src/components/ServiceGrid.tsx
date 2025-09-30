import { Card } from '@/components/ui/card';

const services = [
    {
        title: 'Nikah',
        description: 'Daftar online atau ajukan rekomendasi nikah.',
        icon: '💒',
        links: [
            { text: 'Daftar Nikah (SIMKAH)', url: 'https://simkah4.kemenag.go.id/' },
            { text: 'Rekomendasi Nikah', url: 'https://s.id/daftar_surat_rekomendasi_nikah' }
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
        title: 'Masjid Terdekat',
        description: 'Temukan masjid sekitar beserta detail lokasi & info.',
        icon: '🕌',
        links: [
            { text: 'Data Masjid (PUSAKA)', url: 'https://pusaka.kemenag.go.id/masjid/' }
        ]
    },
    {
        title: 'Data Tanah Wakaf',
        description: 'Akses data sertifikat wakaf terverifikasi untuk publik.',
        icon: '📜',
        links: [
            { text: 'Data Wakaf (SIWAK)', url: 'https://siwak.kemenag.go.id/' }
        ]
    },
    {
        title: 'Kalender Jadwal Nikah',
        description: 'Pantau slot jadwal tersedia & rencanakan tanggal terbaik.',
        icon: '📅',
        links: [
            { text: 'Lihat Jadwal', url: '#' }
        ]
    },
    {
        title: 'Pengecekan Nikah',
        description: 'Cek status dan legalitas pernikahan Anda secara resmi.',
        icon: '✅',
        links: [
            { text: 'Cek Status Nikah', url: '#' }
        ]
    },
    {
        title: 'Pilihan Doa',
        description: 'Kumpulan doa sehari-hari untuk berbagai kebutuhan Anda.',
        icon: '🤲',
        links: [
            { text: 'Kumpulan Doa', url: '#' }
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
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Layanan Digital KUA</h2>
                    <p className="text-gray-600">Panduan lengkap untuk layanan Kantor Urusan Agama</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                            <div className="text-4xl mb-4">{service.icon}</div>
                            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                            <div className="space-y-2">
                                {service.links.map((link, linkIndex) => (
                                    <a
                                        key={linkIndex}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-emerald-700 hover:text-emerald-800 text-sm font-medium hover:underline"
                                    >
                                        ↗ {link.text}
                                    </a>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
import { Card } from '@/components/ui/card';

const procedures = [
    {
        icon: '📘',
        title: 'Alur Pendaftaran Nikah',
        subtitle: 'KUA Kejayan',
        count: '2 Jalur Pendaftaran'
    },
    {
        icon: '✅',
        title: 'Syarat-Syarat Pernikahan',
        subtitle: 'Dokumen wajib disiapkan',
        count: 'Lengkapi Berkas Anda'
    },
    {
        icon: '👤',
        title: 'Wali Nikah',
        subtitle: 'Ketentuan dan urutan',
        count: '2 Jenis Wali'
    },
    {
        icon: '📄',
        title: 'Rekomendasi Nikah',
        subtitle: 'Untuk nikah di luar kecamatan',
        count: '3 Syarat Dokumen'
    },
    {
        icon: '✒️',
        title: 'Legalisir Buku Nikah',
        subtitle: 'Pengesahan fotokopi',
        count: '3 Syarat Utama'
    },
    {
        icon: '🤝',
        title: 'Rujuk',
        subtitle: 'Kembali setelah talak',
        count: 'Syarat Rujuk'
    },
    {
        icon: '⚖️',
        title: 'Itsbat Nikah',
        subtitle: 'Pengesahan nikah',
        count: 'Berdasarkan Putusan PA'
    },
    {
        icon: '📖',
        title: 'Duplikat Buku Nikah',
        subtitle: 'Jika hilang atau rusak',
        count: '2 Jenis Kasus'
    },
    {
        icon: '🕌',
        title: 'Wakaf',
        subtitle: 'Pemberitahuan kehendak wakaf',
        count: 'Proses di KUA/PPAIW'
    },
    {
        icon: '🕋',
        title: 'Pengukuran Arah Kiblat',
        subtitle: 'Verifikasi untuk masjid/mushalla',
        count: 'Layanan Gratis'
    },
    {
        icon: '🌙',
        title: 'Masuk Islam',
        subtitle: 'Pencatatan ikrar syahadat',
        count: 'Proses Bimbingan'
    },
    {
        icon: '🎓',
        title: 'Rekomendasi Pendidikan Keagamaan',
        subtitle: 'Untuk madrasah, TPQ, MDTA',
        count: 'Izin Operasional'
    }
];

export default function InfoCards() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center mb-8">
                    Prosedur Layanan dan Panduan Informasi KUA Kejayan
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {procedures.map((procedure, index) => (
                        <Card key={index} className="p-4 hover:shadow-md transition-shadow duration-300 cursor-pointer">
                            <div className="text-center">
                                <div className="text-3xl mb-3">{procedure.icon}</div>
                                <h3 className="font-semibold text-sm mb-1">{procedure.title}</h3>
                                <p className="text-xs text-gray-600 mb-2">{procedure.subtitle}</p>
                                <hr className="border-gray-200 mb-2" />
                                <p className="text-xs font-medium text-emerald-700">{procedure.count}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
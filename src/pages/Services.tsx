import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, FileText, Users, Heart, BookOpen, Building, Calculator, Gift, Scale } from 'lucide-react';

const services = [
    {
        id: 'nikah',
        title: 'Persyaratan Nikah & Rujuk',
        icon: Heart,
        description: 'Layanan pencatatan pernikahan dan rujuk, termasuk ketentuan wali.',
        requirements: [
            'Surat Pengantar dari RT/RW',
            'Fotocopy KTP Calon Pengantin',
            'Fotocopy Kartu Keluarga',
            'Surat Keterangan Belum Menikah',
            'Pas Foto 2x3 (4 lembar)',
            'Surat Persetujuan Calon Mempelai',
            'Ketentuan Wali Nikah (Wali Nasab/Wali Hakim sesuai peraturan Kemenag)'
        ],
        procedures: [
            'Datang ke KUA dengan membawa persyaratan lengkap',
            'Mengisi formulir pendaftaran',
            'Verifikasi berkas oleh petugas',
            'Penetapan jadwal akad nikah',
            'Pelaksanaan akad nikah',
            'Penerbitan buku nikah'
        ]
    },
    {
        id: 'keluarga-sakinah',
        title: 'Bimbingan Keluarga Sakinah',
        icon: Users,
        description: 'Program pembinaan keharmonisan keluarga',
        requirements: [
            'Fotocopy KTP Suami Istri',
            'Fotocopy Buku Nikah',
            'Surat Pengantar RT/RW'
        ],
        procedures: [
            'Pendaftaran di KUA',
            'Mengikuti sesi konseling',
            'Mengikuti seminar keluarga',
            'Evaluasi dan tindak lanjut'
        ]
    },
    {
        id: 'kemasjidan',
        title: 'Bimbingan Kemasjidan',
        icon: Building,
        description: 'Pembinaan dan pengembangan masjid',
        requirements: [
            'Surat Permohonan dari Takmir Masjid',
            'Profil Masjid',
            'Fotocopy Sertifikat Tanah Masjid'
        ],
        procedures: [
            'Pengajuan permohonan bimbingan',
            'Survey lokasi masjid',
            'Penyusunan program pembinaan',
            'Pelaksanaan bimbingan',
            'Monitoring dan evaluasi'
        ]
    },
    {
        id: 'hisab-rukyat',
        title: 'Hisab Rukyat',
        icon: Calculator,
        description: 'Penentuan awal bulan Hijriah',
        requirements: [
            'Surat Permohonan',
            'Data Koordinat Lokasi'
        ],
        procedures: [
            'Pengajuan permohonan',
            'Perhitungan hisab',
            'Pelaksanaan rukyat',
            'Penetapan hasil'
        ]
    },
    {
        id: 'penyuluhan',
        title: 'Penyuluhan Agama Islam',
        icon: BookOpen,
        description: 'Kegiatan dakwah dan penyuluhan',
        requirements: [
            'Surat Permohonan dari Masyarakat/Lembaga',
            'Jadwal Kegiatan'
        ],
        procedures: [
            'Pengajuan permohonan penyuluhan',
            'Penjadwalan kegiatan',
            'Pelaksanaan penyuluhan',
            'Evaluasi kegiatan'
        ]
    },
    {
        id: 'zakat-wakaf',
        title: 'Bimbingan Zakat & Wakaf',
        icon: Gift,
        description: 'Pengelolaan zakat dan wakaf',
        requirements: [
            'Surat Permohonan',
            'Dokumen Kepemilikan (untuk wakaf)',
            'Identitas Pemberi Wakaf'
        ],
        procedures: [
            'Konsultasi awal',
            'Verifikasi dokumen',
            'Proses administrasi',
            'Penerbitan sertifikat'
        ]
    },
    {
        id: 'paiw',
        title: 'Pendaftaran Akta Ikrar Wakaf (PAIW)',
        icon: FileText,
        description: 'Layanan pendaftaran akta ikrar wakaf',
        requirements: [
            'Contoh Pernyataan Tidak Dalam Sengketa',
            'Contoh Surat Riwayat Tanah dan Sporadik',
            'Daftar Kekayaan di Tanah Wakaf',
            'Permohonan Pengajuan Akta Ikrar Wakaf',
            'Pernyataan Nadzir dan Bersedia Diaudit (Perorangan)',
            'Surat Pernyataan Bersedia Diaudit Organisasi & Badan Hukum'
        ],
        procedures: [
            'Pengajuan permohonan dengan melengkapi berkas',
            'Verifikasi dokumen oleh petugas',
            'Survey lokasi tanah wakaf',
            'Pembuatan akta ikrar wakaf',
            'Penandatanganan akta',
            'Pendaftaran ke Badan Wakaf Indonesia'
        ]
    },
    {
        id: 'mediasi',
        title: 'Mediasi & Konsultasi Hukum Islam',
        icon: Scale,
        description: 'Layanan mediasi dan konsultasi syariah',
        requirements: [
            'Surat Permohonan',
            'Identitas Para Pihak',
            'Dokumen Pendukung'
        ],
        procedures: [
            'Pengajuan permohonan mediasi',
            'Penjadwalan sesi mediasi',
            'Pelaksanaan mediasi',
            'Pembuatan kesepakatan',
            'Tindak lanjut'
        ]
    },
    {
        id: 'sertifikasi',
        title: 'Sertifikasi Halal',
        icon: Badge,
        description: 'Bantuan proses sertifikasi halal',
        requirements: [
            'Surat Permohonan',
            'Profil Usaha',
            'Daftar Bahan Baku'
        ],
        procedures: [
            'Konsultasi awal',
            'Pendampingan pengajuan',
            'Koordinasi dengan MUI',
            'Follow up proses'
        ]
    }
];

export default function Services() {
    const [openService, setOpenService] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('s');
        if (id) setOpenService(id);
    }, []);

    const toggleService = (serviceId: string) => {
        setOpenService(openService === serviceId ? null : serviceId);
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-4 text-emerald-700">Layanan KUA Kejayan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Kami menyediakan berbagai layanan keagamaan untuk masyarakat Kecamatan Kejayan.
                        Klik pada setiap layanan untuk melihat persyaratan dan prosedur lengkap.
                    </p>
                </div>

                <div className="grid gap-4 max-w-4xl mx-auto">
                    {services.map((service) => {
                        const IconComponent = service.icon;
                        const isOpen = openService === service.id;

                        return (
                            <Card key={service.id} className="overflow-hidden">
                                <Collapsible open={isOpen} onOpenChange={() => toggleService(service.id)}>
                                    <CollapsibleTrigger asChild>
                                        <div className="p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-emerald-100 rounded-lg">
                                                        <IconComponent className="h-6 w-6 text-emerald-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
                                                        <p className="text-gray-600">{service.description}</p>
                                                    </div>
                                                </div>
                                                {isOpen ? (
                                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                                )}
                                            </div>
                                        </div>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <div className="px-6 pb-6 border-t bg-gray-50">
                                            <div className="grid md:grid-cols-2 gap-6 pt-6">
                                                <div>
                                                    <h4 className="font-semibold text-emerald-700 mb-3">Persyaratan</h4>
                                                    <ul className="space-y-2">
                                                        {service.requirements.map((req, index) => (
                                                            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                                                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                                                                {req}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold text-emerald-700 mb-3">Prosedur</h4>
                                                    <ol className="space-y-2">
                                                        {service.procedures.map((proc, index) => (
                                                            <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                                  {index + 1}
                                </span>
                                                                {proc}
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </div>
                                            </div>

                                            {service.id === 'nikah' && (
                                                <div className="mt-6 flex gap-3">
                                                    <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                                                        <a href="https://simkah4.kemenag.go.id/" target="_blank" rel="noopener noreferrer">
                                                            Daftar Online (SIMKAH)
                                                        </a>
                                                    </Button>
                                                    <Button asChild variant="outline" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                                                        <a href="https://s.id/daftar_surat_rekomendasi_nikah" target="_blank" rel="noopener noreferrer">
                                                            Rekomendasi Nikah
                                                        </a>
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <Card className="p-6 bg-emerald-50 max-w-2xl mx-auto">
                        <h3 className="text-lg font-semibold text-emerald-700 mb-2">Butuh Bantuan?</h3>
                        <p className="text-gray-700 mb-4">
                            Untuk informasi lebih lanjut atau konsultasi, silakan hubungi kami di kantor KUA Kejayan
                            atau melalui kontak yang tersedia.
                        </p>
                        <div className="flex gap-2 justify-center">
                            <Badge className="bg-emerald-100 text-emerald-700">Gratis</Badge>
                            <Badge className="bg-blue-100 text-blue-700">Profesional</Badge>
                            <Badge className="bg-orange-100 text-orange-700">Terpercaya</Badge>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
import { Card } from '@/components/ui/card';
import {useState} from "react";

const procedures: Procedure[] = [
    {
        icon: '📘',
        title: 'Alur Pendaftaran Nikah',
        subtitle: 'KUA Kejayan',
        count: '2 Jalur Pendaftaran',
        details: [
            {
                sectionTitle: "Alur Pendaftaran Nikah (Offline)",
                items: [
                    "Surat Pengantar Nikah: Calon pengantin mengurus surat pengantar nikah dari kelurahan/desa.",
                    "Pendaftaran di KUA: Bawa surat pengantar dari kelurahan/desa ke KUA tempat akad nikah akan dilaksanakan.",
                    "Verifikasi Dokumen: Petugas KUA akan memeriksa kelengkapan dan keabsahan dokumen.",
                    "Penentuan Jadwal: Tentukan tanggal dan waktu pelaksanaan akad nikah di KUA.",
                    "Akad Nikah: Laksanakan akad nikah sesuai jadwal, baik di dalam atau di luar kantor KUA.",
                    "Penerbitan Buku Nikah: Setelah akad nikah, pasangan akan menerima Buku Nikah sebagai bukti sah."
                ]
            },
            {
                sectionTitle: "Alur Pendaftaran Nikah (Online)",
                items: [
                    "Akses Simkah: Buka situs resmi Simkah Kemenag di https://simkah4.kemenag.go.id.",
                    "Daftar atau Masuk: Jika belum punya akun, buat akun Simkah dengan memasukkan email dan membuat password, lalu verifikasi melalui kode OTP.",
                    "Pilih Menu Daftar Nikah: Setelah masuk ke dashboard, pilih menu 'Daftar Nikah'.",
                    "Pilih Lokasi dan Waktu: Tentukan lokasi (provinsi, kabupaten/kota, kecamatan) dan waktu pelaksanaan akad nikah.",
                    "Isi Data Calon Pengantin: Masukkan data diri lengkap calon pengantin pria dan wanita.",
                    "Masukkan Kontak: Masukkan nomor telepon dan alamat email.",
                    "Unggah Foto: Unggah foto calon pengantin.",
                    "Cetak Bukti: Setelah semua data terisi dan dokumen terunggah, cetak bukti pendaftaran nikah.",
                    "Verifikasi di KUA: Data yang telah didaftarkan akan diverifikasi oleh petugas KUA.",
                    "Pelaksanaan Akad Nikah: Setelah verifikasi selesai, akad nikah bisa dilaksanakan sesuai jadwal."
                ]
            }
        ]
    },
    {
        icon: '✅',
        title: 'Syarat-Syarat Pernikahan',
        subtitle: 'Dokumen wajib disiapkan',
        count: 'Lengkapi Berkas Anda',
        details: [
            {
                sectionTitle: "Dokumen Wajib",
                items: [
                    "Surat pengantar nikah dari kelurahan/desa (N1).",
                    "Permohonan Kehendak Nikah (N2).",
                    "Fotokopi KTP calon pengantin, Wali dan 2 Orang Saksi.",
                    "Fotokopi Akta Kelahiran.",
                    "Fotokopi KK calon pengantin.",
                    "Pas foto 2x3 dan 4x6 sebanyak 5 lembar dengan latar belakang biru.",
                    "Surat rekomendasi nikah dari KUA asal (jika akad nikah dilakukan di luar wilayah domisili).",
                    "Surat keterangan sehat dari puskesmas/rumah sakit dan Elektronik Siap Hamil (ELSIMIL).",
                    "Surat persetujuan kedua calon pengantin (N4).",
                    "Surat Izin orang tua/wali Jika calon pengantin di bawah usia 21 tahun (N5).",
                    "Surat dispensasi kawin dari pengadilan agama (jika usia di bawah ketentuan 19 Tahun).",
                    "Surat izin dari atasan (bagi anggota TNI/POLRI).",
                    "Penetapan izin poligami dari pengadilan agama (jika poligami).",
                    "Akta cerai Asli (jika duda/janda cerai).",
                    "Akta kematian pasangan (jika duda/janda ditinggal mati).",
                    "Dispensasi Kecamatan Jika Pendaftaran Nikah kurang dari 10 Hari Kerja."
                ]
            },
            {
                sectionTitle: "Catatan",
                items: [
                    "Setelah mendaftar, calon pengantin wajib mengikuti bimbingan perkawinan (Bimwin) di KUA."
                ]
            }
        ]
    },
    {
        icon: '👤',
        title: 'Wali Nikah',
        subtitle: 'Ketentuan dan urutan',
        count: '2 Jenis Wali',
        description:
            "Wali nikah adalah pihak yang memiliki wewenang untuk menikahkan seorang perempuan dalam Islam. Keberadaan wali nikah sangat penting untuk memastikan keabsahan suatu pernikahan secara syariat. Tanpa wali, pernikahan bisa dianggap tidak sah menurut hukum Islam. Dalam hukum Islam, terdapat 2 macam wali nikah yang berhak menikahkan seorang wanita, yaitu wali nasab dan wali hakim.",
        details: [
            {
                sectionTitle: "A. Wali Nasab",
                description: "Berikut Urutan Wali Nasab:",
                items: [
                    "Bapak kandung",
                    "Kakek, yaitu bapak dari bapak",
                    "Buyut, yaitu bapak dari kakek",
                    "Saudara laki-laki sebapak dan seibu",
                    "Saudara laki-laki sebapak",
                    "Anak laki-laki dari saudara laki-laki sebapak dan seibu",
                    "Anak laki-laki dari saudara laki-laki sebapak",
                    "Paman, yaitu saudara laki-laki bapak sebapak dan seibu",
                    "Paman sebapak, yaitu saudara laki-laki bapak sebapak",
                    "Anak paman sebapak dan seibu",
                    "Anak paman sebapak",
                    "Cucu paman sebapak dan seibu",
                    "Cucu paman sebapak",
                    "Paman bapak sebapak dan seibu",
                    "Paman bapak sebapak",
                    "Anak paman bapak sebapak dan seibu",
                    "Anak paman bapak sebapak"
                ]
            },
            {
                sectionTitle: "B. Wali Hakim",
                description: "Sebab-Sebab Wali Hakim:",
                items: [
                    "Wali nasab tidak ada",
                    "Walinya adhal (wali yang enggan menikahkan)",
                    "Walinya tidak diketahui keberadaannya",
                    "Walinya tidak dapat dihadirkan/ditemui karena dipenjara",
                    "Wali nasab tidak ada yang beragama Islam",
                    "Walinya dalam keadaan berihram",
                    "Wali yang menikahi wanita tersebut"
                ]
            }
        ]
    },
    {
        icon: '📄',
        title: 'Rekomendasi Nikah',
        subtitle: 'Untuk nikah di luar kecamatan',
        count: '3 Syarat Dokumen',
        description:
            "Rekomendasi Nikah diperlukan bagi calon pengantin yang akan melaksanakan akad nikah di luar wilayah domisili (alamat KTP). Ajukan rekomendasi di KUA sesuai domisili Anda dengan membawa berkas berikut:",
        details: [
            {
                sectionTitle: "Dokumen yang Diperlukan",
                items: [
                    "Surat Pengantar Perkawinan dari Kepala Desa/Lurah tempat tinggal calon pengantin (Model N1).",
                    "Fotokopi Kartu Tanda Penduduk (KTP), Kartu Keluarga (KK), dan Akta Kelahiran masing-masing calon pengantin.",
                    "Pas foto berwarna latar belakang biru ukuran 3×4 cm sebanyak 2 (dua) lembar."
                ]
            },
            {
                sectionTitle: "Catatan",
                items: [
                    "Rekomendasi Nikah digunakan sebagai syarat pencatatan pernikahan di KUA tempat akad nikah dilaksanakan. Serahkan berkas langsung ke KUA Kecamatan sesuai domisili pada KTP dan dibuat 2 Rangkap.",
                ]
            }
        ]
    },
    {
        icon: '✒️',
        title: 'Legalisir Buku Nikah',
        subtitle: 'Pengesahan fotokopi',
        count: '3 Syarat Utama',
        description:
            "Untuk melegalisir fotokopi buku nikah Anda, harap siapkan berkas berikut:",
        details: [
            {
                items: [
                    "Fotokopi buku nikah/buku pencatatan perkawinan dan yang asli.",
                    "Surat keterangan, sebagai suami dan istri dari Kepala Desa/Lurah.",
                    "Surat pernyataan bermaterai dari yang bersangkutan bahwa peristiwa perkawinan dicatat pada KUA kecamatan dimaksud."
                ]
            },
        ]
    },
    {
        icon: '🤝',
        title: 'Rujuk',
        subtitle: 'Kembali setelah talak',
        count: 'Syarat Rujuk',
        description: "Proses rujuk dapat dilakukan dengan melengkapi dokumen berikut:",
        details: [
            {
                sectionTitle: "Dokumen yang Diperlukan",
                items: [
                    "Surat pengantar rujuk dari Kepala Desa/Lurah tempat tinggal calon pengantin (Model N1).",
                    "Permohonan kehendak rujuk dari pemohon rujuk (Model N2).",
                    "Surat persetujuan suami-istri (Model N3).",
                    "Surat izin orang tua (Model N4).",
                    "Akta cerai/thalak asli dari Pengadilan Agama dan masih dalam masa iddah.",
                    "Fotokopi KK dan KTP masing-masing 1 lembar."
                ]
            },
            {
                sectionTitle: "Catatan",
                items: [
                    "Rujuk dapat dilaksanakan bila perceraian terjadi adalah cerai/thalak dari suami.",
                    "Jika perceraian yang terjadi adalah cerai gugat dari istri, maka tidak bisa dilakukan rujuk, tetapi harus dilaksanakan akad nikah baru."
                ]
            }
        ]
    },
    {
        icon: '⚖️',
        title: 'Itsbat Nikah',
        subtitle: 'Pengesahan nikah',
        count: 'Berdasarkan Putusan PA',
        description:
            "Pencatatan pengesahan nikah (itsbat) dilakukan setelah adanya putusan dari Pengadilan Agama.",
        details: [
            {
                sectionTitle: "Syarat Pencatatan",
                items: [
                    "Amar putusan dari Pengadilan Agama atau",
                    {
                        text: "Bila dalam amar putusan Pengadilan Agama tidak menyebutkan KUA Kecamatan untuk pencatatan pengesahan Perkawinan dilakukan atas dasar:",
                        subItems: [
                            "Surat permohonan yang bersangkutan",
                            "Surat pernyataan belum pernah mencatatkan pengesahan nikah/perkawinan atau itsbat pada KUA Kecamatan dan",
                            "Surat keterangan dari Kepala Desa/Lurah tempat domisili pemohon"
                        ]
                    },
                    "Fotokopi KTP dan KK masing-masing 3 lembar",
                    "Fotokopi KTP wali, dan 2 orang saksi masing-masing 1 lembar",
                    "Pas foto background biru ukuran 2x3 sebanyak 5 lembar"
                ]
            },
            {
                sectionTitle: "Catatan",
                items: [
                    "Pencatatan pengesahan nikah/perkawinan atau itsbat yang dilakukan di kantor perwakilan Republik Indonesia di luar negeri dilakukan oleh pegawai pencatat nikah/perkawinan/penghulu."
                ]
            }
        ]
    }
    ,
    {
        icon: '📖',
        title: 'Duplikat Buku Nikah',
        subtitle: 'Jika hilang atau rusak',
        count: '2 Jenis Kasus',
        description: "Syarat untuk mengajukan duplikat Buku Nikah:",
        details: [
            {
                sectionTitle: "Buku Nikah Rusak",
                items: [
                    "Buku Nikah yang rusak.",
                    "KTP suami dan istri.",
                    "Pas foto 2x3 latar biru."
                ]
            },
            {
                sectionTitle: "Buku Nikah Hilang",
                items: [
                    "Surat keterangan kehilangan dari kepolisian.",
                    "KTP suami dan istri.",
                    "Pas foto 2x3 latar biru."
                ]
            },
            {
                sectionTitle: "Catatan",
                items: [
                    "Penerbitan buku nikah pengganti dilakukan di KUA tempat akad nikah dilaksanakan."
                ]
            }
        ]
    },
    {
        icon: '🕌',
        title: 'Wakaf',
        subtitle: 'Pemberitahuan kehendak wakaf',
        count: 'Proses di KUA/PPAIW',
        details: [
            {
                items: [
                    "Pemberitahuan kehendak wakaf.",
                    "Sertifikat hak atas tanah atau surat pemilikan tanah lainnya.",
                    "Surat keterangan status tanah tidak dalam sengketa dari Kepala Desa/Lurah diketahui oleh Camat.",
                    "Susunan pengurus wakaf (nadzir).",
                    "Fotokopi KTP wakif, 4 (empat) orang nadzir dan 2 (dua) orang saksi dan dilegalisir oleh Camat @ 1 (satu) lembar.",
                    "Materai 10.000, bila wakif telah meninggal dunia.",
                    "Fotokopi KTP ahli waris, bila wakif telah meninggal dunia.",
                    "Wakif, nadzir dan saksi menghadap kepala KUA/PPAIW (Pejabat Pembuat Akta Ikrar Wakaf)."
                ]
            },
        ]
    },
    {
        icon: '🕋',
        title: 'Pengukuran Arah Kiblat',
        subtitle: 'Verifikasi untuk masjid/mushalla',
        count: 'Layanan Gratis',
        details: [
            {
                items: [
                    "Takmir masjid / mushalla / pengurus wakaf lainnya mengajukan permohonan kepada Badan Hisab Rukyat (BHR) Kabupaten Rokan Hulu atau KUA Kecamatan Rokan IV Koto.",
                    "Melampirkan denah lokasi yang mau diukur arah kiblatnya.",
                ]
            },
        ]
    },
    {
        icon: '🌙',
        title: 'Masuk Islam',
        subtitle: 'Pencatatan ikrar syahadat',
        count: 'Proses Bimbingan',
        details: [
            {
                items: [
                    "Surat keterangan masuk islam dari pengurus masjid / mushalla / instansi / organisasi lainnya (blangko tersedia di KUA).",
                    "Surat pernyataan masuk islam pakai materai 10.000.",
                    "Surat sumpah.",
                    "Surat keterangan telah khitan dari dokter/puskesmas.",
                    "Pas foto (3x4) sebanyak 5 (lima) lembar."
                ]
            }
        ]
    },
    {
        icon: '🎓',
        title: 'Rekomendasi Pendidikan Keagamaan',
        subtitle: 'Untuk madrasah, TPQ, MDTA',
        count: 'Izin Operasional',
        details: [
            {
                items: [
                    "Surat permohonan.",
                    "Profil madrasah (TPQ, MDTA dan RA).",
                    "Rekomendasi kepala desa/lurah."
                ]
            }
        ]
    }
];

interface ProcedureItem {
    text: string;
    subItems?: string[];
}

interface ProcedureSection {
    sectionTitle?: string;
    description?: string;
    items: (string | ProcedureItem)[];
}

interface Procedure {
    icon: string;
    title: string;
    subtitle: string;
    description?: string;
    count: string;
    details?: ProcedureSection[];
}



export default function InfoCards() {

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <section className="py-12 bg-white">
            <div className="container px-4">
                <h2 className="text-2xl font-bold text-center mb-8">
                    Prosedur Layanan dan Panduan Informasi KUA Kejayan
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {procedures.map((procedure, index) => (
                        <>
                            {/* Card */}
                            <Card
                                key={`card-${index}`}
                                onClick={() => handleToggle(index)}
                                className={`p-4 hover:shadow-md transition-shadow duration-300 cursor-pointer ${
                                    activeIndex === index ? "border-emerald-500 shadow-lg" : ""
                                }`}
                            >
                                <div className="text-center">
                                    <div className="text-3xl mb-3">{procedure.icon}</div>
                                    <h3 className="font-semibold text-sm mb-1">
                                        {procedure.title}
                                    </h3>
                                    <p className="text-xs text-gray-600 mb-2">
                                        {procedure.subtitle}
                                    </p>
                                    <hr className="border-gray-200 mb-2" />
                                    <p className="text-xs font-medium text-emerald-700">
                                        {procedure.count}
                                    </p>
                                </div>
                            </Card>

                            {/* Detail muncul full width setelah card yg dipilih */}
                            {activeIndex === index && (
                                <div
                                    key={`detail-${index}`}
                                    className="col-span-full mt-2 p-6 border rounded-lg bg-gray-50 text-sm text-gray-700"
                                >
                                    <div className={"mb-3"}>
                                        <h2 className="text-xl font-bold text-green-700">{procedure.title}</h2>
                                        <p className="text-gray-700">{procedure.description}</p>
                                    </div>
                                    {procedure.details && procedure.details.map((section, secIndex) => (
                                        <div key={secIndex} className="mb-6">
                                            {/* Ada sectionTitle */}
                                            {section.sectionTitle && (
                                                <h3 className="text-green-600 font-bold mb-3">
                                                    {section.sectionTitle}
                                                </h3>
                                            )}

                                            {/* Ada description */}
                                            {section.description && (
                                                <p className="mb-2">{section.description}</p>
                                            )}

                                            {/* List item */}
                                            <ol className="list-decimal list-inside space-y-2">
                                                {section.items.map((item, i) => (
                                                    <li key={i}>
                                                        {typeof item === "string" ? (
                                                            item
                                                        ) : (
                                                            <>
                                                                {item.text}
                                                                {item.subItems && (
                                                                    <ul className="list-disc list-inside ml-6 space-y-1">
                                                                        {item.subItems.map((sub, si) => (
                                                                            <li key={si}>{sub}</li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </>
                                                        )}
                                                    </li>
                                                ))}
                                            </ol>

                                        </div>
                                    ))}


                                </div>
                            )}
                        </>
                    ))}
                </div>
            </div>
        </section>
    );
}

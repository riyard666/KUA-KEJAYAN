import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Profile() {
    return (
        <div className="min-h-screen bg-white">

            <div className="container mx-auto px-4 py-8">

                {/* Profil KUA */}
                <Card className="p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-emerald-700">Profil KUA Kejayan</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-emerald-600">Latar Belakang</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Kantor Urusan Agama sebagaimana disebutkan di dalam Peraturan Menteri Agama Nomor 34 tahun 2016 tentang Organisasi dan Tata Kerja Kantor Urusan Agama, pasal 1 bahwa Kantor Urusan Agama yang selanjutnya disingkat KUA adalah Unit Pelaksana Teknis pada Kementerian Agama, berada di bawah dan bertanggung jawab kepada Direktur Jenderal Bimbingan Masyarakat Islam dan secara operasional dibina oleh Kepala Kantor Kementerian Agama Kabupaten/Kota yang bertugas melaksanakan, layanan dan bimbingan masyarakat Islam di wilayah kerjanya.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Kantor Urusan Agama Kecamatan Kejayan menjadi salah satu bagian diantara 106 (Seratus Enam) KUA Kecamatan yang ditunjuk oleh Kementerian Agama untuk program piloting project revitalisasi KUA melalui Keputusan Menteri Agama Nomor 578 tahun 2022 tentang Revitalisasi Kantor Urusan Agama Kecamatan.
                            </p>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-emerald-600">Tugas Pokok dan Fungsi</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-800">Kedudukan</h4>
                                    <p className="text-gray-700">Kantor Urusan Agama Kecamatan Kejayan adalah sebagai unit pelaksana teknis Direktorat Jendral Bimbingan Masyarakat Islam.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Tugas Pokok</h4>
                                    <p className="text-gray-700">Kantor Urusan Agama Kecamatan Kejayan bertugas melaksanakan sebagian tugas Kantor Kementerian agama Kabupaten/Kota di bidang urusan Agama Islam.</p>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-emerald-600">Wilayah Kerja</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Kecamatan Kejayan terletak diantara Kecamatan Wonorejo, Kecamatan Tutur, Kecamatan Pasrepan, Kecamatan Pohjentrek, Kecamatan Kraton, dan Kecamatan Gondang Wetan. Secara umum, wilayah Kecamatan Kejayan memiliki 24 Desa dan 1 Kelurahan. Kejayan terbagi habis menjadi 87 Dusun, 146 Rukun Warga (RW) dan 402 Rukun Tetangga (RT), dengan luas wilayah sebesar 79,15 Km².
                            </p>
                        </div>
                    </div>
                </Card>
                {/* Visi Misi */}
                <Card className="p-8 mb-8">
                    <h1 className="text-3xl font-bold mb-6 text-emerald-700">Visi & Misi KUA Kejayan</h1>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-emerald-600">VISI</h2>
                            <p className="text-gray-700 leading-relaxed">
                                TERWUJUDNYA MASYARAKAT KECAMATAN KEJAYAN YANG TAAT BERAGAMA, RUKUN, CERDAS, DAN SEJAHTERA LAHIR BATIN.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-emerald-600">MISI</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Meningkatkan kualitas pelayanan keagamaan pada masyarakat</li>
                                <li>• Meningkatkan kualitas pelayanan nikah dan rujuk berbasis teknologi informasi</li>
                                <li>• Meningkatkan kualitas bimbingan keluarga sakinah</li>
                                <li>• Meningkatkan kualitas pelayanan informasi dan bimbingan haji, zakat dan wakaf</li>
                                <li>• Meningkatkan peran lembaga keagamaan</li>
                                <li>• Memaksimalkan kemitraan umat dan koordinasi lintas sektoral</li>
                            </ul>
                        </div>
                    </div>
                </Card>

                {/* Motto */}
                <Card className="p-8 mb-8 bg-emerald-50">
                    <h2 className="text-2xl font-bold mb-6 text-emerald-700 text-center">MOTTO "GLOWING"</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { letter: 'G', meaning: 'GESIT DALAM PELAYANAN' },
                            { letter: 'L', meaning: 'LEGALITAS HUKUM YANG JELAS' },
                            { letter: 'O', meaning: 'OPTIMALISASI DALAM MELAYANI' },
                            { letter: 'W', meaning: 'WORK RELATIONSHIP LINTAS SEKTORAL' },
                            { letter: 'I', meaning: 'INTEGRITAS DAN INOVATIF' },
                            { letter: 'N', meaning: 'NYAMAN DALAM SETIAP BENTUK PELAYANAN' },
                            { letter: 'G', meaning: 'GRATIS TANPA BIAYA' }
                        ].map((item, index) => (
                            <div key={index} className="text-center p-4 bg-white rounded-lg">
                                <div className="text-2xl font-bold text-emerald-600 mb-2">{item.letter}</div>
                                <div className="text-sm text-gray-700">{item.meaning}</div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
import {Instagram, Mail, MapPin, Phone} from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-emerald-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">KUA Kejayan</h3>
                        <div className="space-y-2 text-sm">
                            <a href="https://wa.me/6285265253483" className="flex items-center gap-2 hover:text-emerald-400">
                                <span><Phone size={16}/></span> 0852-6525-3483
                            </a>
                            <a href="mailto:kuakejayan@gmail.com" className="flex items-center gap-2 hover:text-emerald-400">
                                <span><Mail size={16}/></span> kejayankua@gmail.com
                            </a>
                            <a href="https://www.instagram.com/kuakejayan?igsh=MTlmb3hycHpoaW14NQ==" className="flex items-center gap-2 hover:text-emerald-400">
                                <span><Instagram size={16} /></span> Instagram
                            </a>
                            <a href="https://maps.app.goo.gl/k2R1DfLKLj9zNUcY8?g_st=iw" className="flex items-center gap-2 hover:text-emerald-400">
                                <span><MapPin size={16}/> </span> Lokasi (Maps)
                            </a>
                        </div>
                    </div>

                    {/* Profile Menu */}
                    <div>
                        <h4 className="font-semibold mb-4">PROFIL</h4>
                        <div className="space-y-2 text-sm">
                            <a href="/" className="block hover:text-emerald-400">Home</a>
                            <a href="/profile" className="block hover:text-emerald-400">Visi & Misi</a>
                            <a href="/pegawai" className="block hover:text-emerald-400">Data Pegawai</a>
                        </div>
                    </div>

                    {/* Services Menu */}
                    <div>
                        <h4 className="font-semibold mb-4">LAYANAN</h4>
                        <div className="space-y-2 text-sm">
                            <a href="https://simkah4.kemenag.go.id/" className="block hover:text-emerald-400">Pendaftaran Nikah</a>
                            <a href="https://baznas.go.id/kalkulatorzakat" className="block hover:text-emerald-400">Zakat (Kalkulator)</a>
                            <a href="https://qiblafinder.withgoogle.com/intl/id/desktop/find/" className="block hover:text-emerald-400">Kalibrasi Arah Kiblat</a>
                        </div>
                    </div>

                    {/* Information Menu */}
                    <div>
                        <h4 className="font-semibold mb-4">INFORMASI</h4>
                        <div className="space-y-2 text-sm">
                            <a href="#" className="block hover:text-emerald-400">Panduan Informasi Nikah</a>
                            <a href="https://pusaka.kemenag.go.id/masjid/" className="block hover:text-emerald-400">Data Masjid</a>
                            <a href="https://siwak.kemenag.go.id/" className="block hover:text-emerald-400">Data Tanah Wakaf</a>
                            <a href="#" className="block hover:text-emerald-400">Statistik Nikah</a>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-700 my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>© {currentYear} KUA Kejayan. Seluruh hak cipta dilindungi.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="https://instagram.com/kuakejayan" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
                            Instagram
                        </a>
                        <a href="https://youtube.com/@kuakejayan" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
                            YouTube
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

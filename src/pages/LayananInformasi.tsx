import Footer from "@/components/Footer.tsx";
import InfoCards from "@/components/InfoCards";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Folder, HeartHandshake, Landmark} from "lucide-react";

export default function LayananInformasi() {
    return(
        <>
            {/*hero*/}
            <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-linear-to-b from-emerald-200 to-white">
                <div className="px-4 md:py-24 md:w-12xl">
                    <h1 className="md:text-5xl text-3xl font-bold uppercase text-emerald-700">
                        Prosedur Layanan & Panduan Informasi
                    </h1>
                    <p className="text-lg mt-2">KUA Kecamatan Kejayan</p>


                    <div className="grid md:grid-cols-3 gap-6 md:my-10 xl:w-6xl">
                        <Card>
                            <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                                <HeartHandshake size={40} className="text-yellow-500" />
                                <h3 className="text-xl font-semibold mb-2">Layanan Pernikahan</h3>
                                <p className="text-gray-700">
                                    Mencakup semua prosedur terkait pernikahan: Pendaftaran, syarat,
                                    wali, rekomendasi, rujuk, hingga itsbat nikah.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                                <Landmark size={40} className="text-yellow-500" />
                                <h3 className="text-xl font-semibold mb-2">Layanan Umat & Ibadah</h3>
                                <p className="text-gray-700">
                                    Panduan untuk layanan keagamaan seperti prosedur wakaf,
                                    pengukuran arah kiblat, dan bimbingan masuk Islam.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                                <Folder size={40} className="text-yellow-500" />
                                <h3 className="text-xl font-semibold mb-2">Administrasi & Rekomendasi</h3>
                                <p className="text-gray-700">
                                    Proses legalisir, pengurusan duplikat buku nikah, dan penerbitan
                                    rekomendasi izin operasional.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <div className="min-h-screen bg-white">
                <div className="container flex flex-col mx-auto">
                    <InfoCards />
                </div>
            </div>

            <Footer/>

        </>
    )
}
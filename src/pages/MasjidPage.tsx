import MasjidComponent from "@/components/MasjidComponent.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { CalendarDays, MapPinned, RulerDimensionLine } from "lucide-react";
import Footer from "@/components/Footer.tsx";
import { Helmet } from "react-helmet-async";

export default function MasjidPage() {
  return (
    <>
      <Helmet>
        <title>Data Masjid Kecamatan Kejayan - KUA Kejayan</title>
        <meta name="description" content="Temukan informasi lengkap dan akurat mengenai daftar masjid di seluruh wilayah Kecamatan Kejayan." />
      </Helmet>

      {/* Background hijau muda yang menyatu sampai ke bawah */}
      <div className="bg-gradient-to-b from-emerald-50 to-white min-h-screen">
        
        {/* Bagian Header & Kotak Informasi */}
        <section className="relative pt-12 pb-6 flex flex-col justify-center items-center overflow-hidden">
          <div className="px-4 max-w-6xl mx-auto text-center w-full">
            <h1 className="md:text-4xl text-3xl font-bold uppercase text-emerald-800 mb-4">
              Data Masjid di Kecamatan Kejayan
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base mb-10">
              Temukan informasi lengkap dan akurat mengenai daftar masjid di seluruh wilayah Kecamatan Kejayan.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Kotak 1 */}
              <Card className="border border-emerald-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center flex flex-col items-center gap-3">
                    <div className="p-3 bg-emerald-50 rounded-full">
                      <MapPinned size={30} className="text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Nama & Alamat</h3>
                      <p className="text-gray-500 text-sm mt-1">Identitas dan lokasi lengkap setiap masjid</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Kotak 2 */}
              <Card className="border border-emerald-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center flex flex-col items-center gap-3">
                    <div className="p-3 bg-emerald-50 rounded-full">
                      <RulerDimensionLine size={30} className="text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Luas Bangunan</h3>
                      <p className="text-gray-500 text-sm mt-1">Detail ukuran properti wakaf masjid</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Kotak 3 */}
              <Card className="border border-emerald-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center flex flex-col items-center gap-3">
                    <div className="p-3 bg-emerald-50 rounded-full">
                      <CalendarDays size={30} className="text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Tahun Berdiri</h3>
                      <p className="text-gray-500 text-sm mt-1">Informasi sejarah pendirian bangunan</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Bagian Tabel & Pencarian (Jarak sekarang sudah dirapatkan) */}
        <div className="pb-16 px-4 mt-2">
          <MasjidComponent />
        </div>

        <Footer />
      </div>
    </>
  );
}

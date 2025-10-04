import MasjidComponent from "@/components/MasjidComponent.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {CalendarDays, MapPinned, RulerDimensionLine} from "lucide-react";
import Footer from "@/components/Footer.tsx";

export default  function MasjidPage(){
    return (
        <div className="">

            {/*hero*/}
            <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-linear-to-b from-emerald-200 to-white">
                <div className="px-4 md:py-24 md:w-12xl">
                    <h1 className={"md:text-5xl text-3xl font-bold md:w-lg uppercase text-emerald-700"}>Data Masjid di Kecamatan Kejayan</h1>
                    <p>Temukan informasi lengkap dan akurat mengenai daftar masjid di seluruh wilayah Kecamatan Kejayan.</p>

                    <div className={"grid md:grid-cols-3 gap-3 md:my-10"}>
                        <Card>
                            <CardContent>
                                <div className={"text-center flex flex-col items-center gap-3"}>
                                    <MapPinned size={35} className={"text-yellow-500"} />
                                    <div>
                                        <h3 className={"text-xl font-medium"}>
                                            Nama & Alamat
                                        </h3>
                                        <p>Identitas dan lokasi lengkap setiap masjid</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className={"text-center flex flex-col items-center gap-3"}>
                                    <RulerDimensionLine size={35} className={"text-yellow-500"} />
                                    <div>
                                        <h3 className={"text-lg font-medium"}>
                                            Luas Bangunan
                                        </h3>
                                        <p>Detail ukuran properti wakaf masjid</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="">
                            <CardContent>
                                <div className={"text-center flex flex-col items-center gap-3"}>
                                    <CalendarDays size={35} className={"text-yellow-500"} />
                                    <div>
                                        <h3 className={"text-lg font-medium"}>
                                           Tahun Berdiri
                                        </h3>
                                        <p>Informasi sejarah pendirian bangunan</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            <MasjidComponent />
            <Footer />
        </div>
    )
}
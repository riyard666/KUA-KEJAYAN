"use client"
import Footer from "@/components/Footer.tsx";
import {Card, CardContent } from "@/components/ui/card"
import {FileCheck2, MapPinned, Ruler} from "lucide-react";
import WakafComponent from "@/components/WakafComponent.tsx";

export default function WakafPage() {

    return (
        <div >
            <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-linear-to-b from-emerald-200 to-white">
                <div className="px-4 md:py-24 max-w-6xl mx-auto text-center md:text-left">
                    <h1 className="md:text-5xl text-3xl font-bold uppercase text-emerald-700">
                        Data Tanah Wakaf di Kecamatan Kejayan
                    </h1>
                    <p className="mt-3 text-gray-700 max-w-2xl">
                        Temukan informasi detail mengenai tanah wakaf di seluruh wilayah Kecamatan Kejayan,
                        mulai dari lokasi, ukuran, hingga status sertifikasi resmi.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
                        <Card>
                            <CardContent>
                                <div className="text-center flex flex-col items-center gap-3">
                                    <MapPinned size={35} className="text-yellow-500" />
                                    <div>
                                        <h3 className="text-xl font-medium">Lokasi Tanah</h3>
                                        <p>Alamat lengkap tanah wakaf</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="text-center flex flex-col items-center gap-3">
                                    <Ruler size={35} className="text-yellow-500" />
                                    <div>
                                        <h3 className="text-lg font-medium">Luas Tanah</h3>
                                        <p>Ukuran & batas tanah wakaf</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="text-center flex flex-col items-center gap-3">
                                    <FileCheck2 size={35} className="text-yellow-500" />
                                    <div>
                                        <h3 className="text-lg font-medium">Status Sertifikat</h3>
                                        <p>Legalitas & dokumen resmi tanah wakaf</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <WakafComponent />

            <Footer/>

        </div>
  )
}

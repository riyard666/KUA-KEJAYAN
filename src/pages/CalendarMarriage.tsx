import Footer from "@/components/Footer.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Clock, Notebook} from "lucide-react";

export default function CalendarMarriage(){
    return (
        <div className="min-h-screen">


            <section className="relative flex flex-col justify-center overflow-hidden bg-linear-to-b from-emerald-100 to-white">
                <div className="max-w-6xl px-4 py-12 md:py-18 mx-auto">
                    <h1 className={"text-5xl font-bold w-xl"}>Kalender Jadwal Nikah</h1>
                    <p>Halaman ini menampilkan jadwal akad nikah yang sudah terdaftar di KUA Kejayan. Klik tanggal pada kalender untuk melihat nama pasangan dan rincian acara. Pilih tanggal yang masih kosong sebelum mengisi formulir pendaftaran.</p>

                    <div className={"grid grid-cols-2 gap-3 my-10"}>
                        <Card>
                            <CardContent>
                                <div className={"text-center flex flex-col items-center gap-3"}>
                                    <Clock size={35} className={"text-yellow-500"} />
                                    <div>
                                        <h3 className={"text-xl font-medium"}>
                                            Jam Layanan KUA
                                        </h3>
                                        <p>Senin–Jumat, 07.30–16.00 WIB</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className={"text-center flex flex-col items-center gap-3"}>
                                    <Notebook size={35} className={"text-yellow-500"} />
                                    <div>
                                        <h3 className={"text-lg font-medium"}>
                                            Catatan
                                        </h3>
                                        <p>Tanggal merah/libur nasional tidak menerima layanan.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <div className={"mx-auto max-w-6xl rounded-lg my-10"}>
                <iframe
                    src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FJakarta&showPrint=0&title=Kalender%20Jadwal%20Nikah%20-%20KUA%20Kejayan&src=aXQua3Vha2VqYXlhbkBnbWFpbC5jb20&color=%23039be5"
                    style={{border: 0, width: "100%", height: 600}} frameBorder="0"
                    scrolling="no" className={"rounded-2xl"}></iframe>
            </div>

            <Footer/>
        </div>
    )
}
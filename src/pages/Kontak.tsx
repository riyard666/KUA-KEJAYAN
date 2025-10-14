import Footer from "@/components/Footer.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Clock, Mail, MapPin, Phone} from "lucide-react";
import {Link} from "react-router-dom";

export default function Kontak() {
    return(
        <div className="">
            <div className="min-h-screen">
                <div className="mx-auto lg:w-6xl my-10 flex flex-col justify-center items-center gap-6">
                    <div className="md:w-lg text-center">
                        <h1 className="text-4xl font-bold text-emerald-700">Hubungi Kami</h1>
                        <p className="">Kami siap membantu Anda. Silakan hubungi kami melalui detail di bawah ini atau kirimkan pesan melalui formulir kritik/saran.</p>
                    </div>

                    <div className="flex flex-col gap-3 px-3">
                        <Link to={'https://maps.app.goo.gl/V27HCZmnLCxQFxQk7'} target="_blank" >

                            <Card className="transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                                <CardContent>
                                    <div className="md:w-lg flex flex-row items-center gap-3">
                                        <MapPin className="w-14 h-14 text-emerald-700"/>
                                        <div>
                                            <h3 className="text-xl font-medium">Alamat</h3>
                                            <p>Jl. Raya Tanggulangin No.29, Besuk, Tanggulangin, Kec. Kejayan, Pasuruan, Jawa Timur 67172</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link to={'https://wa.me/6282228398564'} target="_blank" >
                            <Card className="transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                                <CardContent>
                                    <div className="md:w-lg flex flex-row items-center gap-3">
                                        <Phone className="w-8 h-8 text-emerald-700"/>
                                        <div>
                                            <h3 className="text-xl font-medium">Nomor Telepon / Whatsapp</h3>
                                            <p> 0822-2839-8564</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link to={'mailto:kejayankua@gmail.com'} target="_blank" >
                            <Card className="transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                                <CardContent>
                                    <div className="md:w-lg flex flex-row items-center gap-3">
                                        <Mail className="w-8 h-8 text-emerald-700"/>
                                        <div>
                                            <h3 className="text-xl font-medium">Email</h3>
                                            <p> kejayankua@gmail.com</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Card className="transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                            <CardContent>
                                <div className="md:w-lg flex flex-row items-center gap-3">
                                    <Clock className="w-8 h-8 text-emerald-700"/>
                                    <div>
                                        <h3 className="text-xl font-medium">
                                            Jam Pelayanan
                                        </h3>
                                        <p> Senin - Jumat: 08:00 - 16:00 WIB </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

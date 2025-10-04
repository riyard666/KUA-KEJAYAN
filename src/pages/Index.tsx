import PrayerSchedule from '@/components/PrayerSchedule';
import MarriageStats from '@/components/MarriageStats';
import ServiceGrid from '@/components/ServiceGrid';
import InfoCards from '@/components/InfoCards';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

export default function Index() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero */}
            <section className="relative overflow-hidden bg-linear-to-b from-emerald-100 to-white">
                <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
                    <div className="grid items-center gap-8 grid-cols-1 lg:grid-cols-2">
                        {/* Left Content */}
                        <div className="space-y-4 text-center lg:text-left">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
                                SELAMAT DATANG DI ZONA INTEGRITAS{" "}
                                <span className="text-emerald-700">KUA KEJAYAN</span>
                            </h1>
                            <p className="text-gray-600 text-md md:text-lg max-w-xl mx-auto lg:mx-0">
                                Pelayanan keagamaan untuk masyarakat Kejayan
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                                <Button
                                    className="rounded-2xl text-emerald-700 border-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
                                    variant="outline"
                                >
                                    <Link to="https://simkah4.kemenag.go.id/">
                                        Daftar Nikah (SIMKAH)
                                    </Link>
                                </Button>

                                <Button
                                    className="rounded-2xl text-emerald-50 bg-emerald-700 hover:bg-emerald-900 hover:text-emerald-50"
                                >
                                    <Link to="https://docs.google.com/forms/d/e/1FAIpQLSfWK7t3cD0aSgrZU2HV4EdpQTK8v3t9VBx2bJ8Ut8g91lA4eQ/viewform">
                                        Rekomendasi Nikah
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-blue-50 p-6 shadow-md">
                            <PrayerSchedule />
                        </div>
                    </div>
                </div>
            </section>

            {/* Marriage Stats */}
            <section className="border-t">
                <div className="mx-auto max-w-6xl px-4 py-10">
                    <MarriageStats />
                </div>
            </section>

            {/* Services grid */}
            <section className="border-t">
                <div className="mx-auto max-w-6xl px-4 py-10">
                    <ServiceGrid />
                </div>
            </section>

            {/* Procedures / Info Cards */}
            <section className="border-t">
                <div className="mx-auto max-w-6xl px-4 py-10">
                    <InfoCards />
                </div>
            </section>

            <Footer />
        </div>
    );
}

import PrayerSchedule from '@/components/PrayerSchedule';
import MarriageStats from '@/components/MarriageStats';
import ServiceGrid from '@/components/ServiceGrid';
import InfoCards from '@/components/InfoCards';
import Footer from '@/components/Footer';

export default function Index() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
                    <div className="grid items-center gap-8 grid-cols-1 lg:grid-cols-2">
                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-4xl text-center lg:text-start font-bold text-emerald-700">KUA Kejayan</h1>
                            <p className="text-gray-600 text-center lg:text-start">
                                Pelayanan keagamaan untuk masyarakat Kecamatan Kejayan. Informasi nikah, masjid, wakaf, dan layanan PAIW tersedia lengkap.
                            </p>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-blue-50 p-6">
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
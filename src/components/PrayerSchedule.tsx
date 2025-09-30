import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { fetchPrayerTimes, getCurrentLocation, FALLBACK_LOCATION, type PrayerData } from '@/lib/prayer-api.ts';

const motivationalTexts = [
    'Sholat tepat waktu, hidup penuh berkah.',
    'Waktu adalah amanah, sholat adalah prioritas.',
    'Datanglah sebelum panggilan-Nya, bukan setelahnya.',
    'Tenangkan hati, kuatkan iman dengan sholat.',
    'Sholat: istirahat terbaik bagi hati yang lelah.',
    'Sibuk boleh, tapi jangan lupa sholat.',
    'Mulailah hari dengan Subuh, akhiri dengan Isya.',
    'Dekat dengan Allah, jauh dari gelisah.',
    'Tepat waktu untuk sholat, tepat waktu untuk hidup.',
    'Keberkahan datang bagi yang menjaga waktunya.'
];

export default function PrayerSchedule() {
    const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [locationNote, setLocationNote] = useState('');

    useEffect(() => {
        loadPrayerTimes();
    }, []);

    const loadPrayerTimes = async () => {
        try {
            setLoading(true);

            try {
                const position = await getCurrentLocation();
                const { latitude: lat, longitude: lon } = position.coords;
                const data = await fetchPrayerTimes(lat, lon);
                setPrayerData(data);
                setLocationNote(`Lokasi Anda (${lat.toFixed(4)}, ${lon.toFixed(4)})`);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (geoError) {
                // Fallback to default location
                const data = await fetchPrayerTimes(FALLBACK_LOCATION.lat, FALLBACK_LOCATION.lon);
                setPrayerData(data);
                setLocationNote(FALLBACK_LOCATION.label);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError('Gagal memuat jadwal sholat');
        } finally {
            setLoading(false);
        }
    };

    const prayerTimes = [
        { name: 'FAJR / SUBUH', emoji: '🌙', time: prayerData?.timings.Fajr || '00:00' },
        { name: 'SUNRISE / TERBIT', emoji: '🌅', time: prayerData?.timings.Sunrise || '00:00' },
        { name: 'DHUHR / ZUHUR', emoji: '☀️', time: prayerData?.timings.Dhuhr || '00:00' },
        { name: 'ASR / ASAR', emoji: '🌤️', time: prayerData?.timings.Asr || '00:00' },
        { name: 'MAGHRIB', emoji: '🌇', time: prayerData?.timings.Maghrib || '00:00' },
        { name: 'ISHA / ISYA', emoji: '🌌', time: prayerData?.timings.Isha || '00:00' },
    ];

    return (
        <section className="py-12 bg-gradient-to-b from-emerald-50 to-white">
            <div className="container mx-auto px-4">
                {/* Scrolling Motivational Text */}
                <div className="mb-8 overflow-hidden bg-emerald-100 rounded-2xl py-3">
                    <div className="whitespace-nowrap text-emerald-800 font-medium animate-scroll">
                        {motivationalTexts.join(' • ')}
                    </div>
                </div>

                <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Jadwal Shalat</h2>

                    {loading && (
                        <p className="text-gray-600">Mencari lokasi…</p>
                    )}

                    {error && (
                        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {prayerData && (
                        <>
                            <p className="text-gray-600 mb-4">
                                {prayerData.date.readable} / Hijriah {prayerData.date.hijri?.date}
                            </p>
                            <p className="text-sm text-gray-500 mb-6">
                                Sumber: Aladhan • TZ: {Intl.DateTimeFormat().resolvedOptions().timeZone} • {locationNote}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {prayerTimes.map((prayer, index) => (
                                    <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                                        <div className="text-2xl mb-2">{prayer.emoji}</div>
                                        <div className="font-semibold text-sm text-gray-700 mb-1">
                                            {prayer.name}
                                        </div>
                                        <div className="text-lg font-bold text-emerald-700">
                                            {prayer.time}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </Card>
            </div>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }
            `}</style>
        </section>
    );
}
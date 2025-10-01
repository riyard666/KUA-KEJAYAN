import {useCallback, useEffect, useState} from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from "axios";

const mosqueData = [
    { name: 'Masjid Al-Ikhlas', village: 'Kejayan', address: 'Desa Kejayan' },
    { name: 'Masjid Baitul Muttaqin', village: 'Sumberejo', address: 'Desa Sumberejo' },
    { name: 'Masjid Nurul Huda', village: 'Kedungbunder', address: 'Desa Kedungbunder' },
    { name: 'Masjid Al-Hidayah', village: 'Karanganyar', address: 'Desa Karanganyar' },
    { name: 'Masjid Jami At-Taqwa', village: 'Wonorejo', address: 'Desa Wonorejo' },
    { name: 'Masjid Al-Falah', village: 'Sumberdiren', address: 'Desa Sumberdiren' },
    { name: 'Masjid Baiturrahman', village: 'Kedawung', address: 'Desa Kedawung' },
    { name: 'Masjid An-Nur', village: 'Purworejo', address: 'Desa Purworejo' },
    { name: 'Masjid Al-Muttaqin', village: 'Tegalsari', address: 'Desa Tegalsari' },
    { name: 'Masjid Darul Ulum', village: 'Sumberagung', address: 'Desa Sumberagung' }
];

const wakafData = [
    { donor: 'H. Ahmad Suyuti', village: 'Kejayan', area: '500 m²', type: 'Tanah' },
    { donor: 'Hj. Siti Aminah', village: 'Sumberejo', area: '300 m²', type: 'Tanah' },
    { donor: 'H. Mohammad Yusuf', village: 'Kedungbunder', area: '750 m²', type: 'Tanah' },
    { donor: 'Hj. Fatimah', village: 'Karanganyar', area: '400 m²', type: 'Tanah' },
    { donor: 'H. Abdul Rahman', village: 'Wonorejo', area: '600 m²', type: 'Tanah' },
    { donor: 'Hj. Khadijah', village: 'Sumberdiren', area: '350 m²', type: 'Tanah' },
    { donor: 'H. Ibrahim', village: 'Kedawung', area: '800 m²', type: 'Tanah' },
    { donor: 'Hj. Aisyah', village: 'Purworejo', area: '450 m²', type: 'Tanah' },
    { donor: 'H. Usman', village: 'Tegalsari', area: '550 m²', type: 'Tanah' },
    { donor: 'Hj. Zainab', village: 'Sumberagung', area: '700 m²', type: 'Tanah' }
];

export default function Information() {
    const [mosqueSearch, setMosqueSearch] = useState('');
    const [wakafSearch, setWakafSearch] = useState('');
    const [tabValue, setTabValue] = useState("mosques");
    const [data, setData] = useState<never[]>([]);

    const filteredMosques = mosqueData.filter(mosque =>
        mosque.name.toLowerCase().includes(mosqueSearch.toLowerCase()) ||
        mosque.village.toLowerCase().includes(mosqueSearch.toLowerCase())
    );

    const filteredWakaf = wakafData.filter(wakaf =>
        wakaf.donor.toLowerCase().includes(wakafSearch.toLowerCase()) ||
        wakaf.village.toLowerCase().includes(wakafSearch.toLowerCase())
    );

    const fetchDataMasjid = useCallback(async () => {
        try {
            await axios
                .get("https://script.google.com/macros/s/AKfycbwkp-FaTa9uwPC27jt96JJfb8YjTcRVTn9kFPIPcD33iUEDvNzJCcQ3quoFEBCYLeWF/exec")
                .then((res: { data: string; }) => {
                    // Karena pakai HtmlService, data datang sebagai text, bukan JSON
                    const parsed = JSON.parse(res.data);
                    setData(parsed);
                })
                .catch((err) => console.error("Error:", err));

        }catch(err) {
            console.error(err);
        }
    },[])

    useEffect(() => {
        fetchDataMasjid().catch(console.error);
    }, [fetchDataMasjid]);

    console.log(data)

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace("#", "");
            if (hash === "masjid") setTabValue("mosques");
            if (hash === "wakaf") setTabValue("wakaf");
        };

        handleHashChange(); // panggil saat pertama render
        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-emerald-700">Informasi KUA Kejayan</h1>
                <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="mosques">Data Masjid</TabsTrigger>
                        <TabsTrigger value="wakaf">Data Tanah Wakaf</TabsTrigger>
                    </TabsList>

                    <TabsContent value="mosques" className="space-y-6">
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-emerald-700">Data Masjid Kecamatan Kejayan</h2>
                                <Badge variant="outline">{filteredMosques.length} Masjid</Badge>
                            </div>

                            <div className="mb-6">
                                <Input
                                    placeholder="Cari masjid berdasarkan nama atau desa..."
                                    value={mosqueSearch}
                                    onChange={(e) => setMosqueSearch(e.target.value)}
                                    className="max-w-md"
                                />
                            </div>

                            <div className="grid gap-4">
                                {filteredMosques.map((mosque, index) => (
                                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-800">{mosque.name}</h3>
                                                <p className="text-gray-600">{mosque.address}</p>
                                            </div>
                                            <Badge className="bg-emerald-100 text-emerald-700">{mosque.village}</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredMosques.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    Tidak ada masjid yang ditemukan dengan kata kunci "{mosqueSearch}"
                                </div>
                            )}
                        </Card>
                    </TabsContent>

                    <TabsContent value="wakaf" className="space-y-6">
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-emerald-700">Data Tanah Wakaf Kecamatan Kejayan</h2>
                                <Badge variant="outline">{filteredWakaf.length} Wakaf</Badge>
                            </div>

                            <div className="mb-6">
                                <Input
                                    placeholder="Cari wakaf berdasarkan nama pewakaf atau desa..."
                                    value={wakafSearch}
                                    onChange={(e) => setWakafSearch(e.target.value)}
                                    className="max-w-md"
                                />
                            </div>

                            <div className="grid gap-4">
                                {filteredWakaf.map((wakaf, index) => (
                                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-800">{wakaf.donor}</h3>
                                                <p className="text-gray-600">Desa {wakaf.village}</p>
                                                <div className="flex gap-2 mt-2">
                                                    <Badge variant="outline">{wakaf.type}</Badge>
                                                    <Badge className="bg-blue-100 text-blue-700">{wakaf.area}</Badge>
                                                </div>
                                            </div>
                                            <Badge className="bg-emerald-100 text-emerald-700">{wakaf.village}</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredWakaf.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    Tidak ada data wakaf yang ditemukan dengan kata kunci "{wakafSearch}"
                                </div>
                            )}
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
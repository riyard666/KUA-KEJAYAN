import {Card, CardContent} from "@/components/ui/card.tsx";
import {IdCardLanyard, ListCheck, Medal} from "lucide-react";
import type {PegawaiModel} from "@/model/pegawai.model.tsx";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";

export default function Pegawai() {
    const [data, setData] = useState<PegawaiModel[]>([])
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>("");

    // fetch data dari Google Apps Script
    const fetchPegawai = useCallback(async () => {
        try {
            const res = await axios.get(
                "https://script.google.com/macros/s/AKfycbwC9UD8n1cU--do5M2PRgVJFLXbyi9u4w1QKcjYA7EiAw1fLq8f2KKqJ7ISjLUFHXjb/exec"
            );
            setData(res.data);
        } catch (err) {
            console.error("Error fetch:", err);
            setError("Gagal memuat data!");
        }
    }, []);

    useEffect(() => {
        fetchPegawai().catch(console.error);
    }, [fetchPegawai]);

    // filter data berdasarkan pencarian
    const filteredData = data.filter((p) => {
        const keyword = search.toLowerCase();
        return (
            p.nama.toLowerCase().includes(keyword) ||
            p.jabatan.toLowerCase().includes(keyword) ||
            p.tempat_tgl_lahir.toLowerCase().includes(keyword) ||
            p.keterangan.toLowerCase().includes(keyword)
        );
    });

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }
    return(
        <div className="min-h-screen">

            {/*hero*/}
            <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-linear-to-b from-emerald-100 to-white">
                <div className="max-w-6xl px-4 py-12 md:py-24 mx-auto">
                    <h1 className={"text-5xl font-bold w-xl"}>DATA ASN DI KANTOR
                        URUSAN AGAMA
                        KECAMATAN KEJAYAN</h1>
                    <p>Daftar Aparatur Sipil Negara beserta jabatan, pangkat/golongan, dan keterangan tugas di lingkungan KUA Kejayan.</p>

                    <div className={"grid grid-cols-3 gap-3 my-10"}>
                        <Card>
                            <CardContent>
                                <div className={"text-center flex flex-col items-center gap-3"}>
                                    <IdCardLanyard size={35} className={"text-yellow-500"} />
                                   <div>
                                       <h3 className={"text-xl font-medium"}>
                                           Data Lengkap
                                       </h3>
                                       <p>Informasi komprehensif ASN</p>
                                   </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className={"text-center flex flex-col items-center gap-3"}>
                                    <Medal size={35} className={"text-yellow-500"} />
                                    <div>
                                        <h3 className={"text-lg font-medium"}>
                                            Pangkat & Golongan
                                        </h3>
                                        <p>Status Kepangkatan Terkini</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="">
                            <CardContent>
                                <div className={"text-center flex flex-col items-center gap-3"}>
                                    <ListCheck size={35} className={"text-yellow-500"} />
                                    <div>
                                        <h3 className={"text-lg font-medium"}>
                                            Keterangan Tugas
                                        </h3>
                                        <p>Deskripsi Tanggung Jawab</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <div className="max-w-6xl px-4 py-12 md:py-24 mx-auto">
            {/* Search bar */}
                <input
                    type="text"
                    placeholder="Cari nama, jabatan, tempat lahir, keterangan..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Total pegawai */}
                <p className="mb-4 text-gray-600">
                    Total: <b>{filteredData.length}</b> pegawai
                </p>

                {/* Grid pegawai */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredData.map((p, idx) => (
                        <div
                            key={idx}
                            className="relative bg-white shadow-lg rounded-2xl p-5 border border-gray-200"
                        >

                            {/* Foto */}
                            <div className="flex flex-col items-center">
                                <img
                                    src={p.path_source} // path dari spreadsheet
                                    alt={p.nama}
                                    className="h-70 object-cover rounded-lg shadow-md border-2 border-gray-200 bg-gray-100"
                                />
                                <h2 className="text-lg font-bold mt-3 text-center">{p.nama}</h2>
                                <p className="text-gray-600 text-sm text-center">{p.jabatan}</p>
                            </div>

                            {/* Detail info */}
                            <div className="mt-3 text-sm text-gray-700 space-y-1">
                                <p>
                                    <b>Tempat/Tgl Lahir:</b> {p.tempat_tgl_lahir || "-"}
                                </p>
                                <p>
                                    <b>Pangkat:</b> {p.pangkat || "-"}
                                </p>
                                <p>
                                    <b>Golongan:</b> {p.golongan || "-"}
                                </p>
                                <p>
                                    <b>Keterangan:</b> {p.keterangan || "-"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
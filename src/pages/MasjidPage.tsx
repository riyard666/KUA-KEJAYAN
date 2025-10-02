import {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import type {MasjidModel} from "@/model/masjid.model.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {Button} from "@/components/ui/button.tsx";
import Footer from "@/components/Footer.tsx";
// ];

export default function MasjidPage() {
    const [data, setData] = useState<MasjidModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const limit = 15; // tampilkan 10 per page

    const fetchDataMasjid = useCallback(async () => {
        try {
            axios
                .get(
                    "https://script.google.com/macros/s/AKfycbwpaEy2chUyC1hMRssYtNA8uuH2JP7E3JUlm55IzGXqnR7cUXaos3EWQ-DO-0Ilr_8q/exec" // ganti dengan URL Apps Script kamu
                )
                .then((res) => {
                    setData(res.data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.error("Error fetch:", err)
                    setLoading(false)
                })

        }catch(err) {
            console.error(err);
        }
    },[setData, setLoading])

    useEffect(() => {
        fetchDataMasjid().catch(console.error);
    }, [fetchDataMasjid]);

    const startIndex = (page - 1) * limit;
    const paginatedData = data.slice(startIndex, startIndex + limit);

    const totalPages = Math.ceil(data.length / limit);

    return (
        <>

            <div className="min-h-screen mx-50 mt-3">
                <h1 className="text-4xl font-bold">
                    Data Masjid di Kecamatan Kejayan
                </h1>
                <p>
                    Temukan informasi lengkap dan akurat mengenai daftar masjid di seluruh wilayah Kecamatan Kejayan
                </p>

                {loading ? (
                    <div className="flex items-center justify-center min-h-screen bg-gray-50">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-12 h-12 border-4 border-green-900 border-dashed rounded-full animate-spin" />
                            <p className="text-green-900 font-medium">Loading...</p>
                        </div>
                    </div>
                    ) : (
                    <Table className={"mt-10"}>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Masjid</TableHead>
                                <TableHead>Alamat</TableHead>
                                <TableHead>Status Tanah</TableHead>
                                <TableHead>Luas Bangunan</TableHead>
                                <TableHead>Tahun Berdiri</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedData.map((m, i) => (
                                <TableRow key={i}>
                                    <TableCell>{m.nama_masjid}</TableCell>
                                    <TableCell>{m.alamat}</TableCell>
                                    <TableCell>{m.status_tanah}</TableCell>
                                    <TableCell>{m.luas_tanah}</TableCell>
                                    <TableCell>{m.tahun_berdiri}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                {loading ? (<div></div>) : (
                    <>
                        <div className="flex justify-between items-center mt-4">
                            <Button
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                                variant="outline"
                            >
                                Prev
                            </Button>

                            <span>
              Page {page} of {totalPages}
            </span>

                            <Button
                                disabled={page === totalPages}
                                onClick={() => setPage((p) => p + 1)}
                                variant="outline"
                            >
                                Next
                            </Button>
                        </div>
                    </>
                )}
            </div>
            <Footer />

        </>
    );
}
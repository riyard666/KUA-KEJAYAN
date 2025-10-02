import { useCallback, useEffect, useState, useMemo } from "react";
import axios from "axios";
import type { MasjidModel } from "@/model/masjid.model.tsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Footer from "@/components/Footer.tsx";

export default function MasjidPage() {
    const [data, setData] = useState<MasjidModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedDesa, setSelectedDesa] = useState("");
    const limit = 15;

    const fetchDataMasjid = useCallback(async () => {
        try {
            axios
                .get(
                    "https://script.google.com/macros/s/AKfycbwpaEy2chUyC1hMRssYtNA8uuH2JP7E3JUlm55IzGXqnR7cUXaos3EWQ-DO-0Ilr_8q/exec"
                )
                .then((res) => {
                    setData(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetch:", err);
                    setLoading(false);
                });
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        fetchDataMasjid().catch(console.error);
    }, [fetchDataMasjid]);

    // Ambil daftar desa_kelurahan unik
    const desaList = useMemo(
        () => Array.from(new Set(data.map((d) => d.desa_kelurahan))).sort(),
        [data]
    );

    // Filter & search
    const filteredData = useMemo(() => {
        return data.filter((m) => {
            const matchesSearch =
                m.nama_masjid.toLowerCase().includes(search.toLowerCase()) ||
                m.alamat.toLowerCase().includes(search.toLowerCase());

            const matchesDesa = selectedDesa ? m.desa_kelurahan === selectedDesa : true;

            return matchesSearch && matchesDesa;
        });
    }, [data, search, selectedDesa]);

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedData = filteredData.slice(startIndex, startIndex + limit);
    const totalPages = Math.ceil(filteredData.length / limit);

    return (
        <>
            <div className="min-h-screen mx-50 mt-3">
                <h1 className="text-4xl font-bold">Data Masjid di Kecamatan Kejayan</h1>
                <p>
                    Temukan informasi lengkap dan akurat mengenai daftar masjid di seluruh
                    wilayah Kecamatan Kejayan
                </p>

                {/* Filter dan Search */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
                    <Input
                        placeholder="Cari masjid / alamat..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="md:w-1/3"
                    />

                    <Select
                        value={selectedDesa || "all"}
                        onValueChange={(value) => {
                            setSelectedDesa(value === "all" ? "" : value);
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Filter Desa/Kelurahan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Desa/Kelurahan</SelectItem>
                            {desaList.map((desa) => (
                                <SelectItem key={desa} value={desa}>
                                    {desa}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Tabel */}
                {loading ? (
                    <div className="flex items-center justify-center min-h-screen bg-gray-50">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-12 h-12 border-4 border-green-900 border-dashed rounded-full animate-spin" />
                            <p className="text-green-900 font-medium">Loading...</p>
                        </div>
                    </div>
                ) : (
                    <Table className="mt-10">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Masjid</TableHead>
                                <TableHead>Alamat</TableHead>
                                <TableHead>Status Tanah</TableHead>
                                <TableHead>Luas Bangunan</TableHead>
                                <TableHead>Tahun Berdiri</TableHead>
                                <TableHead>Desa/Kelurahan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((m, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{m.nama_masjid}</TableCell>
                                        <TableCell>{m.alamat}</TableCell>
                                        <TableCell>{m.status_tanah}</TableCell>
                                        <TableCell>{m.luas_tanah}</TableCell>
                                        <TableCell>{m.tahun_berdiri}</TableCell>
                                        <TableCell>{m.desa_kelurahan}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">
                                        Tidak ada data ditemukan
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}

                {/* Pagination */}
                {!loading && (
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
                            disabled={page === totalPages || totalPages === 0}
                            onClick={() => setPage((p) => p + 1)}
                            variant="outline"
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

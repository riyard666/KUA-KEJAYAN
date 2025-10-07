"use client"
import {useCallback, useEffect, useMemo, useState} from "react"
import axios from "axios"
import type {MasjidModel} from "@/model/masjid.model.tsx"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.tsx"
import {Button} from "@/components/ui/button.tsx"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select.tsx"

export default function MasjidComponent() {
    const [data, setData] = useState<MasjidModel[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const limit = 15
    const [selectedDesa, setSelectedDesa] = useState("")

    const fetchDataMasjid = useCallback(async () => {
        try {
            const res = await axios.get(
                "https://script.google.com/macros/s/AKfycbwpaEy2chUyC1hMRssYtNA8uuH2JP7E3JUlm55IzGXqnR7cUXaos3EWQ-DO-0Ilr_8q/exec"
            )
            setData(res.data)
        } catch (err) {
            console.error("Error fetch:", err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchDataMasjid().catch(console.error)
    }, [fetchDataMasjid])

    // daftar desa unik
    const desaList = useMemo(() => {
        const cleanList = data
            .map((d) => (d.desa_kelurahan || "").trim().toLowerCase()) // normalisasi
            .filter((v) => v) // hapus kosong/null
        const uniqueList = Array.from(new Set(cleanList)) // hapus duplikat
        return uniqueList
            .map(
                (desa) =>
                    desa.charAt(0).toUpperCase() +
                    desa.slice(1) // kapital huruf pertama
            )
            .sort()
    }, [data])

    // filter + search
    const filteredData = useMemo(() => {
        if (!selectedDesa) return [] // jangan tampilkan data sebelum pilih desa

        return data.filter((item) => {
            return item.desa_kelurahan === selectedDesa
        })
    }, [data, selectedDesa])

    // pagination
    const totalPages = Math.ceil(filteredData.length / limit)
    const paginatedData = filteredData.slice((page - 1) * limit, page * limit)

    return (
        <div>
            <div className=" p-4 space-y-4 mx-10 lg:mx-50 mt-3">
                {/* Search & Filter */}
                <div className="flex gap-4 items-center">
                    <Select
                        value={selectedDesa}
                        onValueChange={(value) => {
                            setSelectedDesa(value)
                            setPage(1)
                        }}
                    >
                        <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Pilih Desa/Kelurahan" />
                        </SelectTrigger>
                        <SelectContent>
                            {desaList.map((desa) => (
                                <SelectItem key={desa} value={desa}>
                                    {desa}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Table */}
                <div className="border rounded-lg">
                    <Table>
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
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : !selectedDesa ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">
                                        Silakan pilih desa terlebih dahulu
                                    </TableCell>
                                </TableRow>
                            ) : paginatedData.length > 0 ? (
                                paginatedData.map((item, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{item.nama_masjid}</TableCell>
                                        <TableCell>{item.alamat}</TableCell>
                                        <TableCell>{item.status_tanah}</TableCell>
                                        <TableCell>{item.luas_tanah}</TableCell>
                                        <TableCell>{item.tahun_berdiri}</TableCell>
                                        <TableCell>{item.desa_kelurahan}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">
                                        Tidak ada data
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {selectedDesa && (
                    <div className="flex justify-between items-center">
            <span>
              Page {page} of {totalPages || 1}
            </span>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                            >
                                Prev
                            </Button>
                            <Button
                                variant="outline"
                                disabled={page === totalPages || totalPages === 0}
                                onClick={() => setPage((p) => p + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

"use client"

import type {WakafModel} from "@/model/wakaf.model"
import {useCallback, useEffect, useMemo, useState} from "react"
import axios from "axios"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {FormatDateNoTime} from "@/utils/format.ts";
import Footer from "@/components/Footer.tsx";

export default function WakafPage() {
    const [data, setData] = useState<WakafModel[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const limit = 15

    const [search, setSearch] = useState("")
    const [selectedYear, setSelectedYear] = useState<string>("")

    const fetchDataWakaf = useCallback(async () => {
        try {
            const res = await axios.get(
                "https://script.google.com/macros/s/AKfycbxRKSJJoSpC4G0bygdM0-WoX8S0mUeUfbFI7BnnHbzMHK-jKUFvM5aI8adaWIpv_XvS/exec"
            )
            setData(res.data)
            setLoading(false)
        } catch (err) {
            console.error("Error fetch:", err)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchDataWakaf().catch(console.error)
    }, [fetchDataWakaf])

    // ambil list tahun unik untuk filter
    const years = useMemo(() => {
        return Array.from(new Set(data.map((item) => item.tahun))).sort()
    }, [data])

    // filter data berdasar search & tahun
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchSearch =
                item.wakif.toLowerCase().includes(search.toLowerCase()) ||
                item.nazhir.toLowerCase().includes(search.toLowerCase()) ||
                item.kelurahan.toLowerCase().includes(search.toLowerCase())

            const matchYear = selectedYear ? item.tahun === selectedYear : true

            return matchSearch && matchYear
        })
    }, [data, search, selectedYear])

    // pagination
    const totalPages = Math.ceil(filteredData.length / limit)
    const paginatedData = filteredData.slice((page - 1) * limit, page * limit)

    return (
        <div className=" ">
            <div className="min-h-screen  p-4 space-y-4 mx-10 lg:mx-50 mt-3">
                <h1 className="text-4xl font-bold ">Daftar Wakaf</h1>

                {/* Search & Filter */}
                <div className="flex gap-4 items-center">
                    <Input
                        placeholder="Cari Wakif / Nazhir / Kelurahan..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setPage(1)
                        }}
                        className="max-w-sm"
                    />
                    <Select
                        value={selectedYear}
                        onValueChange={(value) => {
                            setSelectedYear(value === "all" ? "" : value)
                            setPage(1)
                        }}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Filter Tahun" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Tahun</SelectItem>
                            {years.map((year) => (
                                <SelectItem key={year} value={year}>
                                    {year}
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
                                <TableHead>Kelurahan</TableHead>
                                <TableHead>Alamat</TableHead>
                                <TableHead>Wakif</TableHead>
                                <TableHead>Nazhir</TableHead>
                                <TableHead>Luas (M²)</TableHead>
                                <TableHead>Penggunaan</TableHead>
                                <TableHead>Nomor AIW</TableHead>
                                <TableHead>Tanggal AIW</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Tahun</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={10} className="text-center">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : paginatedData.length > 0 ? (
                                paginatedData.map((item, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{item.kelurahan}</TableCell>
                                        <TableCell>{item.alamat}</TableCell>
                                        <TableCell>{item.wakif}</TableCell>
                                        <TableCell>{item.nazhir}</TableCell>
                                        <TableCell>{item.luas_m2}</TableCell>
                                        <TableCell>{item.penggunaan}</TableCell>
                                        <TableCell>{item.nomor_aiw}</TableCell>
                                        <TableCell>{FormatDateNoTime(item.tanggal_aiw)}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>{item.tahun}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={10} className="text-center">
                                        Tidak ada data
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
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
            </div>
            <Footer/>

        </div>
  )
}

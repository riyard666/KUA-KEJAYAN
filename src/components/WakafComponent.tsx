import { Input } from "@/components/ui/input.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { FormatDateNoTime } from "@/utils/format.ts";
import { Button } from "@/components/ui/button.tsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { WakafModel } from "@/model/wakaf.model.tsx";
import axios from "axios";
import { Search } from "lucide-react";

export default function WakafComponent() {
  const [data, setData] = useState<WakafModel[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const limit = 15

  const [search, setSearch] = useState("")
  const [selectedYear, setSelectedYear] = useState<string>("")

  const fetchDataWakaf = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://script.google.com/macros/s/AKfycbymnSRRGOqOSTud3mJWUC1VvPZmxrxSrV3B8TFoNRU1KTlHnyYTAN4LKDSkay7m35a-NQ/exec"
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
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-emerald-50">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Cari Wakif / Nazhir / Kelurahan..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="pl-10 pr-4 py-2 w-full rounded-xl border-gray-200 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 transition-all shadow-sm"
          />
        </div>
        
        <Select
          value={selectedYear}
          onValueChange={(value) => {
            setSelectedYear(value === "all" ? "" : value)
            setPage(1)
          }}
        >
          <SelectTrigger className="w-full md:w-[200px] rounded-xl border-gray-200 shadow-sm focus:ring-emerald-500">
            <SelectValue placeholder="Filter Tahun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Tahun</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year as string}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-emerald-50/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-emerald-900">Kelurahan</TableHead>
                <TableHead className="font-semibold text-emerald-900">Alamat</TableHead>
                <TableHead className="font-semibold text-emerald-900">Wakif</TableHead>
                <TableHead className="font-semibold text-emerald-900">Nazhir</TableHead>
                <TableHead className="font-semibold text-emerald-900 whitespace-nowrap">Luas (M²)</TableHead>
                <TableHead className="font-semibold text-emerald-900">Penggunaan</TableHead>
                <TableHead className="font-semibold text-emerald-900">Nomor AIW</TableHead>
                <TableHead className="font-semibold text-emerald-900 whitespace-nowrap">Tanggal AIW</TableHead>
                <TableHead className="font-semibold text-emerald-900">Status</TableHead>
                <TableHead className="font-semibold text-emerald-900">Tahun</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                // Efek Skeleton Loading Modern
                Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={`skeleton-${idx}`}>
                    {Array.from({ length: 10 }).map((_, colIdx) => (
                      <TableCell key={`col-${colIdx}`}>
                        <div className="h-5 w-full bg-gray-100 rounded animate-pulse"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : paginatedData.length > 0 ? (
                // Data Asli
                paginatedData.map((item, idx) => (
                  <TableRow 
                    key={idx} 
                    className="hover:bg-emerald-50/40 transition-colors duration-200"
                  >
                    <TableCell className="font-medium text-gray-700">{item.kelurahan}</TableCell>
                    <TableCell className="text-gray-600">{item.alamat}</TableCell>
                    <TableCell className="text-gray-600">{item.wakif}</TableCell>
                    <TableCell className="text-gray-600">{item.nazhir}</TableCell>
                    <TableCell className="text-gray-600 text-center">{item.luas_m2}</TableCell>
                    <TableCell className="text-gray-600">{item.penggunaan}</TableCell>
                    <TableCell className="text-gray-600 whitespace-nowrap">{item.nomor_aiw}</TableCell>
                    <TableCell className="text-gray-600">{FormatDateNoTime(item.tanggal_aiw)}</TableCell>
                    <TableCell>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium whitespace-nowrap">
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600">{item.tahun}</TableCell>
                  </TableRow>
                ))
              ) : (
                // State Data Kosong
                <TableRow>
                  <TableCell colSpan={10} className="h-32 text-center text-gray-500 font-medium">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="w-8 h-8 text-gray-300" />
                      <span>Data tidak ditemukan</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center bg-white px-4 py-3 rounded-2xl border border-emerald-100 shadow-sm">
        <span className="text-sm text-gray-600 font-medium">
          Halaman <span className="text-emerald-700">{page}</span> dari {totalPages || 1}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Sebelumnnya
          </Button>
          <Button
            variant="outline"
            className="rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((p) => p + 1)}
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client"
import { useCallback, useEffect, useMemo, useState } from "react"
import axios from "axios"
import type { MasjidModel } from "@/model/masjid.model.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import { MapPin, Search } from "lucide-react"

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
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-emerald-50">
        <div className="flex items-center gap-2 text-emerald-800 font-medium w-full md:w-auto px-2">
          <MapPin className="w-5 h-5 text-emerald-600" />
          <span className="whitespace-nowrap">Filter Wilayah:</span>
        </div>
        <Select
          value={selectedDesa}
          onValueChange={(value) => {
            setSelectedDesa(value)
            setPage(1)
          }}
        >
          <SelectTrigger className="w-full md:w-[300px] rounded-xl border-gray-200 shadow-sm focus:ring-emerald-500">
            <SelectValue placeholder="Pilih Desa/Kelurahan..." />
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

      {/* Table Section */}
      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-emerald-50/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-emerald-900">Nama Masjid</TableHead>
                <TableHead className="font-semibold text-emerald-900">Alamat</TableHead>
                <TableHead className="font-semibold text-emerald-900">Status Tanah</TableHead>
                <TableHead className="font-semibold text-emerald-900 whitespace-nowrap">Luas Bangunan</TableHead>
                <TableHead className="font-semibold text-emerald-900 whitespace-nowrap">Tahun Berdiri</TableHead>
                <TableHead className="font-semibold text-emerald-900">Desa/Kelurahan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                // Efek Skeleton Loading
                Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={`skeleton-${idx}`}>
                    {Array.from({ length: 6 }).map((_, colIdx) => (
                      <TableCell key={`col-${colIdx}`}>
                        <div className="h-5 w-full bg-gray-100 rounded animate-pulse"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : !selectedDesa ? (
                // State: Belum pilih desa
                <TableRow>
                  <TableCell colSpan={6} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="p-4 bg-emerald-50 rounded-full">
                        <MapPin className="w-8 h-8 text-emerald-500" />
                      </div>
                      <span className="text-gray-500 font-medium">Silakan pilih desa/kelurahan terlebih dahulu untuk melihat data.</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginatedData.length > 0 ? (
                // Data Asli
                paginatedData.map((item, idx) => (
                  <TableRow 
                    key={idx}
                    className="hover:bg-emerald-50/40 transition-colors duration-200"
                  >
                    <TableCell className="font-medium text-gray-800">{item.nama_masjid}</TableCell>
                    <TableCell className="text-gray-600">{item.alamat}</TableCell>
                    <TableCell>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium whitespace-nowrap">
                        {item.status_tanah || "-"}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600 text-center">{item.luas_tanah || "-"}</TableCell>
                    <TableCell className="text-gray-600 text-center">{item.tahun_berdiri || "-"}</TableCell>
                    <TableCell className="text-gray-600">{item.desa_kelurahan}</TableCell>
                  </TableRow>
                ))
              ) : (
                // State: Data Kosong
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="w-8 h-8 text-gray-300" />
                      <span className="text-gray-500 font-medium">Tidak ada data masjid untuk desa ini.</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {selectedDesa && (
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
              Sebelumnya
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
      )}
    </div>
  )
}

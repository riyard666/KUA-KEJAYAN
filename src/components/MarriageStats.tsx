"use client"

import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
    Table, TableHeader, TableBody, TableRow, TableHead, TableCell
} from "@/components/ui/table";
import type { PernikahanModel } from "@/model/pernikahan.model.tsx";
import axios from "axios";

const MONTHS_ID = [
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember",
];

export default function MarriageStats() {
    const currentYear = new Date().getFullYear();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<PernikahanModel[]>([]);
    const [filteredData, setFilteredData] = useState<PernikahanModel[]>([]);
    const [tahun, setTahun] = useState<number>(currentYear);
    const [desa, setDesa] = useState<string>("all");

    const fetchDataPernikahan = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "https://script.google.com/macros/s/AKfycbyAhtiMGqBL11tpXDs3X4tbvE6ddp4ur_0NGu6lCqENiDhaY3qolNpRMxQICWR0wubE/exec"
            );
            setData(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetch:", err);
            setError("Gagal mengambil data");
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDataPernikahan().catch(console.error);
    }, [fetchDataPernikahan]);

    useEffect(() => {
        let temp = data;
        if (desa !== "all") temp = temp.filter(d => d.desa === desa);
        temp = temp.filter(d => d.tahun === tahun.toString());
        setFilteredData(temp);
    }, [data, desa, tahun]);

    const desaList = Array.from(new Set(data.map(d => d.desa)));

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-semibold text-emerald-700">
                        Statistik Pernikahan {currentYear}
                    </h2>
                    <p className="text-gray-600">
                        Akumulasi per bulan dan per desa (target: 25 desa, Januari–Desember) berdasarkan data yang Anda unggah.
                    </p>
                </div>

                {/* Filter Tahun & Desa */}
                <div className="flex gap-2 items-center">
                    <label className="text-gray-700">Tahun:</label>
                    <select
                        value={tahun}
                        onChange={(e) => setTahun(parseInt(e.target.value))}
                        className="border rounded px-2 py-1"
                    >
                        {Array.from({ length: 5 }).map((_, i) => {
                            const y = currentYear - i;
                            return <option key={y} value={y}>{y}</option>;
                        })}
                    </select>

                    <label className="text-gray-700">Desa:</label>
                    <select
                        value={desa}
                        onChange={(e) => setDesa(e.target.value)}
                        className="border rounded px-2 py-1"
                    >
                        <option value="all">Semua Desa</option>
                        {desaList.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
            </div>

            {loading && <p className="text-gray-500">Memuat data...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}

            {!loading && !error && (
                <Card className="p-4 overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Desa</TableHead>
                                {MONTHS_ID.map((m) => <TableHead key={m}>{m}</TableHead>)}
                                <TableHead>Tahun</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={14} className="text-center py-4">
                                        Tidak ada data
                                    </TableCell>
                                </TableRow>
                            )}
                            {filteredData.map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{row.desa}</TableCell>
                                    <TableCell>{row.jan}</TableCell>
                                    <TableCell>{row.feb}</TableCell>
                                    <TableCell>{row.mar}</TableCell>
                                    <TableCell>{row.apr}</TableCell>
                                    <TableCell>{row.mei}</TableCell>
                                    <TableCell>{row.jun}</TableCell>
                                    <TableCell>{row.jul}</TableCell>
                                    <TableCell>{row.agu}</TableCell>
                                    <TableCell>{row.sep}</TableCell>
                                    <TableCell>{row.okt}</TableCell>
                                    <TableCell>{row.nov}</TableCell>
                                    <TableCell>{row.des}</TableCell>
                                    <TableCell>{row.tahun}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            )}
        </div>
    );
}

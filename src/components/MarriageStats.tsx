import { useEffect, useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Users } from 'lucide-react'; // Tambahan ikon untuk Total Keseluruhan

type PernikahanModel = Record<string, string | number | null | undefined>;

const MONTHS_ID = [
    'jan','feb','mar','apr','mei','jun','jul','agu','sep','okt','nov','des'
];

export default function MarriageStats() {
    const [data, setData] = useState<PernikahanModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [selectedDesa, setSelectedDesa] = useState<string>('Semua');

    const fetchDataPernikahan = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                'https://script.google.com/macros/s/AKfycbxRA0XzkA7sVKOPABWM-HPhx3CVGEZeS5gU10c7zEp6jQhS51VcHD_siAdfNoBLhJ5c/exec'
            );
            const normalizedData = (res.data as unknown[]).map(normalizeRow);
            setData(normalizedData);

            // set default tahun terbaru
            const years = normalizedData.map(r => Number(r.tahun)).filter(Boolean);
            const maxYear = Math.max(...years);
            setSelectedYear(maxYear);

        } catch (err) {
            console.error('Error fetch:', err);
            setError('Gagal memuat data pernikahan');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDataPernikahan().catch(console.error);
    }, [fetchDataPernikahan]);

    const filteredData = useMemo(() => {
        return data.filter(r =>
            (selectedYear ? Number(r.tahun) === selectedYear : true) &&
            (selectedDesa === 'Semua' ? true : r.desa === selectedDesa)
        );
    }, [data, selectedYear, selectedDesa]);

    // Menambahkan perhitungan Grand Total (Total Keseluruhan)
    const { monthlyTotals, grandTotal } = useMemo(() => {
        const totals: Record<string, number> = {};
        let sum = 0;
        MONTHS_ID.forEach(m => totals[m] = 0);

        for (const r of filteredData) {
            MONTHS_ID.forEach(m => {
                const val = toNum(r[m]);
                totals[m] += val;
                sum += val; // Menjumlahkan semua data
            });
        }
        return { monthlyTotals: totals, grandTotal: sum };
    }, [filteredData]);

    const allYears = Array.from(new Set(data.map(r => Number(r.tahun)))).sort((a,b)=>a-b);
    const allDesa = useMemo(() => {
        const uniqueDesa = new Set(
            data
                .map(r => (r.desa ?? '').toString().trim().toUpperCase()) // normalisasi
                .filter(Boolean)
        );
        return ['Semua', ...Array.from(uniqueDesa).sort()];
    }, [data]);


    return (
        <div className="space-y-6 container mx-auto px-4">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-semibold text-emerald-700">Statistik Pernikahan</h2>
                    <p className="text-gray-600 text-sm md:text-base">
                        Data berdasarkan tahun dan desa.
                    </p>
                </div>

                {/* Dropdown filter */}
                <div className="flex flex-col sm:flex-row gap-2">
                    <select
                        value={selectedYear ?? ''}
                        onChange={e => setSelectedYear(Number(e.target.value))}
                        className="bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block px-4 py-2.5 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all duration-300 cursor-pointer outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2310b981%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[position:right_1rem_center] pr-10"
                    >
                        {allYears.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                    <select
                        value={selectedDesa}
                        onChange={e => setSelectedDesa(e.target.value)}
                        className="bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block px-4 py-2.5 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all duration-300 cursor-pointer outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2310b981%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[position:right_1rem_center] pr-10"
                    >
                        {allDesa.map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Loader / Error */}
            {loading && (
                <div className="w-full animate-pulse py-8">
                    {/* Kotak Besar untuk Area Grafik */}
                    <div className="h-64 bg-gray-200/80 rounded-xl w-full flex items-end px-8 pb-4 gap-4 justify-between mt-4">
                        <div className="h-1/3 w-12 bg-gray-300 rounded-t-sm hidden sm:block"></div>
                        <div className="h-2/4 w-12 bg-gray-300 rounded-t-sm hidden sm:block"></div>
                        <div className="h-3/4 w-12 bg-gray-300 rounded-t-sm hidden sm:block"></div>
                        <div className="h-full w-12 bg-gray-300 rounded-t-sm hidden sm:block"></div>
                        <div className="h-2/3 w-12 bg-gray-300 rounded-t-sm hidden sm:block"></div>
                        <div className="h-1/4 w-12 bg-gray-300 rounded-t-sm hidden sm:block"></div>
                    </div>
                </div>
            )}
            
            {error && <p className="text-red-600 text-center">Error: {error}</p>}

            {/* Grafik Batang Statistik Pernikahan */}
            {!loading && !error && (
                <Card className="p-6 bg-white shadow-sm border border-gray-100 rounded-2xl">
                    
                    {/* Header Grafik & Total Keseluruhan (Tampilan Baru) */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
                            <span className="w-2 h-5 bg-emerald-600 rounded-full"></span>
                            Grafik Perkembangan Pernikahan
                        </h3>
                        
                        {/* Kotak Ringkasan Total */}
                        <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-emerald-100/50 px-4 py-2.5 rounded-xl border border-emerald-100 shadow-sm">
                            <div className="p-2 bg-emerald-500 rounded-lg shadow-sm">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-[11px] text-emerald-700 font-bold uppercase tracking-wider mb-0.5">Total Keseluruhan</p>
                                <p className="text-2xl font-black text-emerald-900 leading-none">
                                    {grandTotal} <span className="text-xs font-semibold text-emerald-600">Pasangan</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full pt-4">
                        {/* Area Utama Grafik */}
                        <div className="h-64 flex items-end justify-between gap-1 sm:gap-3 px-1 sm:px-4 border-b border-gray-200 relative pb-1">
                            
                            {/* Garis Bantu Horizontal Belakang */}
                            <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between pointer-events-none">
                                <div className="w-full border-t border-gray-100"></div>
                                <div className="w-full border-t border-gray-100"></div>
                                <div className="w-full border-t border-gray-100"></div>
                                <div className="w-full border-t border-gray-100"></div>
                            </div>

                            {/* Pembuatan Batang Grafik Secara Otomatis */}
                            {MONTHS_ID.map((m) => {
                                const total = monthlyTotals[m] ?? 0;
                                // Mencari angka tertinggi untuk kalkulasi tinggi batang proporsional
                                const maxTotal = Math.max(...MONTHS_ID.map(x => monthlyTotals[x] ?? 0), 1);
                                const persenTinggi = (total / maxTotal) * 100;
                                
                                return (
                                    <div key={m} className="flex-1 flex flex-col items-center group relative z-10 h-full justify-end">
                                        {/* Tooltip Balon Angka Saat Kursor Menempel */}
                                        <div className="absolute -top-10 bg-gray-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-md transform translate-y-2 group-hover:translate-y-0">
                                            {total} Pernikahan
                                        </div>
                                        
                                        {/* Batang Grafik */}
                                        <div 
                                            style={{ height: `${total > 0 ? persenTinggi : 4}%` }} 
                                            className={`w-full max-w-[36px] rounded-t-md transition-all duration-500 relative flex items-start justify-center pt-1.5 ${
                                                total > 0 
                                                ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 group-hover:from-emerald-500 group-hover:to-emerald-300 shadow-sm cursor-pointer' 
                                                : 'bg-gray-100'
                                            }`}
                                        >
                                            {/* Angka di dalam batang (muncul jika layar cukup besar) */}
                                            {total > 0 && (
                                                <span className="text-[10px] font-black text-white hidden sm:block">
                                                    {total}
                                                </span>
                                            )}
                                        </div>

                                        {/* Label Nama Bulan di Bawah Garis */}
                                        <span className="text-[10px] sm:text-xs font-bold text-gray-500 mt-3 block tracking-wider uppercase">
                                            {m.substring(0, 3)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}

function toNum(val: string | number | null | undefined) {
    if (val == null) return 0;
    const num = Number(String(val).replace(/[^\d.-]/g, ''));
    return Number.isNaN(num) ? 0 : num;
}

function normalizeRow(r: unknown): PernikahanModel {
    const out: PernikahanModel = {};
    if (typeof r === 'object' && r && !Array.isArray(r)) {
        Object.entries(r as Record<string, unknown>).forEach(([k, v]) => {
            const kk = k.trim();
            out[kk] = typeof v === 'string' ? v.trim() : (v as number | null | undefined);
        });
    }
    return out;
}

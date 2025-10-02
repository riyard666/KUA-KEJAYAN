import { useEffect, useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';

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

    const { monthlyTotals } = useMemo(() => {
        const totals: Record<string, number> = {};
        MONTHS_ID.forEach(m => totals[m] = 0);

        for (const r of filteredData) {
            MONTHS_ID.forEach(m => totals[m] += toNum(r[m]));
        }
        return { monthlyTotals: totals };
    }, [filteredData]);

    const allYears = Array.from(new Set(data.map(r => Number(r.tahun)))).sort((a,b)=>a-b);
    const allDesa = ['Semua', ...Array.from(new Set(data.map(r => r.desa?.toString() || ''))).sort()];

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between space-x-4">
                <div>
                    <h2 className="text-2xl font-semibold text-emerald-700">Statistik Pernikahan</h2>
                    <p className="text-gray-600">Filter data berdasarkan tahun dan desa.</p>
                </div>
                <div className="flex space-x-2">
                    <select
                        value={selectedYear ?? ''}
                        onChange={e => setSelectedYear(Number(e.target.value))}
                        className="border rounded p-1"
                    >
                        {allYears.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                    <select
                        value={selectedDesa}
                        onChange={e => setSelectedDesa(e.target.value)}
                        className="border rounded p-1"
                    >
                        {allDesa.map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading && <p className="text-gray-500">Memuat data...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}

            {!loading && !error && (
                <Card className="p-4">
                    <h3 className="font-semibold mb-3">Ringkasan Bulanan</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {MONTHS_ID.map(m => (
                            <div key={m} className="rounded-lg border p-3 bg-white">
                                <div className="text-xs text-gray-500">{m}</div>
                                <div className="text-xl font-bold text-emerald-700">{monthlyTotals[m] ?? 0}</div>
                            </div>
                        ))}
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

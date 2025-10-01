import { useEffect, useMemo, useState } from 'react';
import Papa, {type ParseResult } from 'papaparse';
import { Card } from '@/components/ui/card';

type Row = Record<string, string | number | null | undefined>;

const MONTHS_ID = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
];

export default function MarriageStats() {
    const [rows, setRows] = useState<Row[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Papa.parse('/data/pernikahan-2025.csv', {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: (result: ParseResult<unknown>) => {
                const data = (result.data as unknown[]).map((r) => normalizeRow(r));
                setRows(data);
                setLoading(false);
            },
            error: (err) => {
                setError(err.message || 'Gagal memuat data pernikahan');
                setLoading(false);
            },
        });
    }, []);

    const { monthlyTotals } = useMemo(() => {
        const monthlyTotals: Record<string, number> = {};
        MONTHS_ID.forEach((m) => (monthlyTotals[m] = 0));
        const totalByDesa: { desa: string; total: number }[] = [];
        let desaCount = 0;

        for (const r of rows) {
            const desa = (r['Desa'] || r['desa'] || r['Kelurahan'] || r['kelurahan'] || '').toString();
            const total = MONTHS_ID.reduce((acc, m) => acc + toNum(r[m]), 0);
            if (desa) {
                totalByDesa.push({ desa, total });
                desaCount += 1;
            }
            for (const m of MONTHS_ID) {
                monthlyTotals[m] += toNum(r[m]);
            }
        }

        totalByDesa.sort((a, b) => b.total - a.total);
        return { monthlyTotals, totalByDesa, desaCount };
    }, [rows]);

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-emerald-700">Statistik Pernikahan 2025</h2>
                    <p className="text-gray-600">
                        Akumulasi per bulan dan per desa (target: 25 desa, Januari–Desember) berdasarkan data yang Anda unggah.
                    </p>
                </div>
            </div>

            {loading && <p className="text-gray-500">Memuat data...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}

            {!loading && !error && (
                <>
                    <Card className="p-4">
                        <h3 className="font-semibold mb-3">Ringkasan Bulanan</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                            {MONTHS_ID.map((m) => (
                                <div key={m} className="rounded-lg border p-3 bg-white">
                                    <div className="text-xs text-gray-500">{m}</div>
                                    <div className="text-xl font-bold text-emerald-700">{monthlyTotals[m] ?? 0}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </>
            )}
        </div>
    );
}

function toNum(val: string | number | null | undefined): number {
    if (val == null) return 0;
    const num = Number(String(val).replace(/[^\d.-]/g, ''));
    return Number.isNaN(num) ? 0 : num;
}
function normalizeRow(r: unknown): Row {
    const out: Row = {};
    if (typeof r === 'object' && r && !Array.isArray(r)) {
        Object.entries(r as Record<string, unknown>).forEach(([k, v]) => {
            const kk = k.trim();
            out[kk] = typeof v === 'string' ? v.trim() : (v as number | null | undefined);
        });
    }
    return out;
}
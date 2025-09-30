import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { supabase, type NewsRecord } from '@/lib/supabaseClient';

type LocalDraft = Omit<NewsRecord, 'id'> & { image_object_url?: string | null };

type DisplayItem = (NewsRecord & { image_object_url?: undefined }) | (LocalDraft & { id?: undefined });

function getImageUrl(item: DisplayItem): string | null {
    if ('image_object_url' in item && item.image_object_url) return item.image_object_url;
    if ('image_url' in item && item.image_url) return item.image_url;
    return null;
}

export default function NewsList() {
    const [items, setItems] = useState<DisplayItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                if (supabase) {
                    const { data, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });
                    if (error) throw error;
                    const list = (data ?? []) as NewsRecord[];
                    setItems(list);
                } else {
                    const draftsRaw = localStorage.getItem('newsDrafts');
                    const drafts: LocalDraft[] = draftsRaw ? (JSON.parse(draftsRaw) as LocalDraft[]) : [];
                    setItems(drafts);
                }
            } catch (e) {
                const msg = e instanceof Error ? e.message : 'Gagal memuat berita';
                setError(msg);
            } finally {
                setLoading(false);
            }
        };
        void load();
    }, []);

    return (
        <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-emerald-700 mb-6">Berita</h1>
    {loading && <p className="text-gray-500">Memuat...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
            {!loading && !error && items.length === 0 && (
                <p className="text-gray-600">Belum ada berita.</p>
            )}
            <div className="grid gap-4 md:grid-cols-2">
                {items.map((it, idx) => {
                        const key = 'id' in it && it.id ? it.id : `draft-${idx}`;
                        const image = getImageUrl(it);
                        return (
                            <Card key={key} className="p-4">
                            {image && (
                                <img src={image} alt={it.title} className="h-40 w-full object-cover rounded-md border mb-3" />
                    )}
                        <h3 className="text-lg font-semibold">{it.title}</h3>
                        {!!it.category && <div className="text-xs text-emerald-700 mt-1">{it.category}</div>}
                            {!!it.summary && <p className="text-gray-700 mt-2">{it.summary}</p>}
                                <div className="text-xs text-gray-500 mt-3">
                                {it.created_at ? new Date(it.created_at).toLocaleString() : ''}
                                </div>
                                </Card>
                            );
                            })}
                        </div>
                        </div>
                        </div>
                    );
                    }
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase, type NewsRecord } from '@/lib/supabaseClient';

type LocalDraft = Omit<NewsRecord, 'id'> & { image_object_url?: string | null };

function saveDraftToLocalStorage(data: LocalDraft) {
    try {
        const key = 'newsDrafts';
        const existingRaw = localStorage.getItem(key);
        const existing: LocalDraft[] = existingRaw ? (JSON.parse(existingRaw) as LocalDraft[]) : [];
        existing.unshift(data);
        localStorage.setItem(key, JSON.stringify(existing));
    } catch {
        /* ignore */
    }
}

export default function NewsUpload() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [message, setMessage] = useState<string>('');

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setImageFile(file || null);
        setImagePreview(file ? URL.createObjectURL(file) : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('saving');
        setMessage('');

        const createdAt = new Date().toISOString();

        if (supabase) {
            try {
                let imageUrl: string | null = null;

                if (imageFile) {
                    const fileExt = imageFile.name.split('.').pop() || 'png';
                    const uuid = (typeof crypto !== 'undefined' && 'randomUUID' in crypto) ? crypto.randomUUID() : `${Date.now()}`;
                    const filePath = `news/${uuid}.${fileExt}`;
                    const { error: uploadErr } = await supabase.storage
                        .from('news_images')
                        .upload(filePath, imageFile, {
                            cacheControl: '3600',
                            upsert: true,
                        });
                    if (uploadErr) throw uploadErr;

                    const { data: publicUrlData } = supabase.storage.from('news_images').getPublicUrl(filePath);
                    imageUrl = publicUrlData.publicUrl ?? null;
                }

                const { error: insertErr } = await supabase.from('news').insert({
                    title,
                    category: category || null,
                    summary: summary || null,
                    content,
                    image_url: imageUrl,
                    created_at: createdAt,
                } satisfies NewsRecord);

                if (insertErr) throw insertErr;

                setStatus('saved');
                setMessage('Berita berhasil diunggah ke Supabase.');
                setTitle('');
                setSummary('');
                setContent('');
                setCategory('');
                setImageFile(null);
                setImagePreview(null);
                return;
            } catch (err) {
                const msg = err instanceof Error ? err.message : 'Unknown error';
                setStatus('error');
                setMessage(`Gagal menyimpan ke Supabase: ${msg}. Simpan sebagai draf lokal.`);
            }
        }

        try {
            saveDraftToLocalStorage({
                title,
                category: category || null,
                summary: summary || null,
                content,
                image_url: null,
                created_at: createdAt,
                image_object_url: imagePreview || null,
            });
            setStatus('saved');
            setMessage('Supabase belum aktif. Draf disimpan di browser (LocalStorage).');
            setTitle('');
            setSummary('');
            setContent('');
            setCategory('');
            setImageFile(null);
            setImagePreview(null);
        } catch {
            setStatus('error');
            setMessage('Gagal menyimpan draf di browser.');
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-start justify-center px-4 py-8">
            <Card className="w-full max-w-2xl p-6">
                <div className="mb-6">
                    <div className="mx-auto h-12 w-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                        K
                    </div>
                    <h1 className="mt-3 text-xl font-semibold text-emerald-700 text-center">Upload Berita</h1>
                    <p className="text-sm text-gray-600 text-center">
                        Lengkapi form di bawah. Untuk penyimpanan permanen gunakan Supabase. Jika belum aktif, data akan disimpan sebagai draf di browser Anda.
                    </p>
                    {status !== 'idle' && (
                        <div
                            className={`mt-4 rounded-md border p-3 text-sm ${
                                status === 'saved'
                                    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                                    : status === 'error'
                                        ? 'border-red-200 bg-red-50 text-red-800'
                                        : 'border-blue-200 bg-blue-50 text-blue-800'
                            }`}
                        >
                            {message}
                        </div>
                    )}
                    {!supabase && (
                        <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                            Supabase belum terhubung. Aktifkan melalui tombol “Supabase” di kanan atas, lalu isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.
                        </div>
                    )}
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="title">Judul</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul berita" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Kategori</Label>
                        <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Kategori (opsional)" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="summary">Ringkasan</Label>
                        <Textarea id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Ringkasan singkat" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Konten</Label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Konten berita lengkap"
                            className="min-h-[160px]"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Gambar</Label>
                        <Input id="image" type="file" accept="image/*" onChange={onImageChange} />
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="mt-2 h-40 w-full object-cover rounded-md border" />
                        )}
                    </div>

                    <Button disabled={status === 'saving'} type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                        {status === 'saving' ? 'Menyimpan...' : 'Simpan'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
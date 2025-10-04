import { useState } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function Feedback() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await axios.post(
                "https://formspree.io/f/xanpjgdj", // ganti dengan endpoint Formspree kamu
                {
                    name,
                    email,
                    message,
                    _subject: "Kritik & Saran - KUA Kejayan",
                    _replyto: email,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            setStatus('success');
            setName('');
            setEmail('');
            setMessage('');
        } catch (err) {
            console.error("Error submit:", err);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-start justify-center px-4 py-8">
            <Card className="w-full max-w-2xl p-6">
                <div className="mb-6 text-center">
                    <div className="mx-auto h-12 w-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                        K
                    </div>
                    <h1 className="mt-3 text-xl font-semibold text-emerald-700">Kritik &amp; Saran</h1>
                    <p className="text-sm text-gray-600">
                        Silakan kirim masukan Anda. Form ini akan terkirim ke email admin via Formspree.
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="name">Nama</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nama Anda"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nama@domain.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Pesan</Label>
                        <Textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tuliskan masukan Anda"
                            className="min-h-[140px]"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                        {status === 'loading' ? 'Mengirim...' : 'Kirim'}
                    </Button>

                    {status === 'success' && (
                        <p className="text-green-600 text-sm mt-2">Terima kasih! Pesan Anda sudah terkirim.</p>
                    )}
                    {status === 'error' && (
                        <p className="text-red-600 text-sm mt-2">Terjadi kesalahan, coba lagi nanti.</p>
                    )}
                </form>
            </Card>
        </div>
    );
}

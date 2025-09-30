import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function Feedback() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent('Kritik/Saran KUA Kejayan');
        const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);
        window.location.href = `mailto:kejayankua@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <div className="min-h-screen bg-white flex items-start justify-center px-4 py-8">
            <Card className="w-full max-w-2xl p-6">
                <div className="mb-6 text-center">
                    <div className="mx-auto h-12 w-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                        K
                    </div>
                    <h1 className="mt-3 text-xl font-semibold text-emerald-700">Kritik &amp; Saran</h1>
                    <p className="text-sm text-gray-600">Silakan kirim masukan Anda. Klik kirim akan membuka email kejayankua@gmail.com.</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="name">Nama</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Anda" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@domain.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Pesan</Label>
                        <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tuliskan masukan Anda" className="min-h-[140px]" />
                    </div>
                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">Kirim via Email</Button>
                </form>
            </Card>
        </div>
    );
}
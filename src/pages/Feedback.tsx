import { useState } from 'react';
import axios from 'axios';
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
            <div className="max-w-2xl mx-auto px-4 py-12">
        
        {/* Header Elegan */}
        <div className="text-center mb-10">
          <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Kritik & Saran</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Identitas Anda terjaga. Masukan Anda sangat berharga untuk layanan KUA Kejayan.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Nama</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan nama Anda" className="w-full px-4 py-3 rounded-xl border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" required />
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alamat@email.com" className="w-full px-4 py-3 rounded-xl border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" required />
          </div>
          <div>
            <Label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Pesan Anda</Label>
            <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tuliskan masukan Anda..." className="w-full px-4 py-3 rounded-xl border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none min-h-[140px]" required />
          </div>
          
          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-200">
            {status === 'loading' ? 'Mengirim...' : 'Kirim Masukan'}
          </Button>
        </form>

        {status === 'success' && <p className="text-green-600 text-sm mt-4 text-center">Terima kasih! Pesan Anda sudah terkirim.</p>}
        {status === 'error' && <p className="text-red-600 text-sm mt-4 text-center">Terjadi kesalahan, coba lagi nanti.</p>}
      </div>
    </div>
    );
}

// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Daftar User-Agents bot yang ingin kita alihkan ke Prerender.io
const BOT_USER_AGENTS = [
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'googlebot',
    // tambahkan bot media sosial atau SEO lainnya
];

export function middleware(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') || '';
    const pathname = request.nextUrl.pathname;
    const isBot = BOT_USER_AGENTS.some(bot => userAgent.toLowerCase().includes(bot));

    // 1. Cek apakah ini permintaan dari bot
    if (isBot) {
        // 2. Cek apakah ini URL berita spesifik
        if (pathname.startsWith('/news/')) {

            // GANTI INI DENGAN TOKEN ANDA
            const PRERENDER_TOKEN = 'WebUfBawk0flvIlAoGFM';

            // 3. Bangun URL untuk Prerender.io
            // Prerender.io menggunakan format: https://service.prerender.io/TOKEN/URL_ASLI

            // URL asli Anda yang perlu dirender (pastikan domainnya benar)
            const targetUrl = encodeURIComponent(`https://kuakejayan.vercel.app${pathname}`);

            // URL ke Prerender.io
            const prerenderUrl = `https://service.prerender.io/${PRERENDER_TOKEN}/${targetUrl}`;

            // 4. Lakukan Rewrite (ini yang akan dilihat oleh bot)
            return NextResponse.rewrite(prerenderUrl);
        }
    }

    // Jika bukan bot, atau jika bukan halaman yang perlu dirender, lanjutkan seperti biasa
    return NextResponse.next();
}

// Konfigurasi untuk Vercel Middleware
export const config = {
    // Hanya jalankan middleware ini pada path yang dimulai dengan /news
    matcher: '/news/:path*',
};
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Daftar User-Agents bot yang akan dialihkan
const BOT_USER_AGENTS = [
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'googlebot',
    'bingbot',
];

export function middleware(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') || '';
    const pathname = request.nextUrl.pathname;
    const isBot = BOT_USER_AGENTS.some(bot => userAgent.toLowerCase().includes(bot));

    // 1. Cek apakah ini permintaan dari bot
    if (isBot) {
        // 2. Cek apakah ini URL halaman berita spesifik (misal: /news/slug-berita)
        if (pathname.startsWith('/news/') && pathname.split('/').length > 2) {
            const slug = pathname.split('/').pop();

            // Arahkan bot ke Serverless Function yang akan merender HTML OG
            // Serverless Function akan dipanggil di /api/og-render/[slug]
            const ogRenderPath = `/api/og-render/${slug}`;

            // Lakukan Rewrite. Bot akan menerima respons dari /api/og-render/slug
            return NextResponse.rewrite(new URL(ogRenderPath, request.url));
        }
    }

    // Jika bukan bot, atau jika bukan halaman berita, lanjutkan ke aplikasi React biasa.
    return NextResponse.next();
}

// Konfigurasi agar Middleware hanya berjalan pada path yang relevan
export const config = {
    matcher: ['/news/:path*'],
};
// api/og-render.ts

// Type data berita Anda (disalin dari NewsDetailPage.tsx)
type NewsModel = {
    id: string;
    judul: string;
    slug: string;
    tanggal: string; // Tidak digunakan, tapi disertakan
    penulis: string; // Tidak digunakan, tapi disertakan
    gambar: string;
    konten: string;
};

export default async function ogRender(req: Request) {
    const url = new URL(req.url);
    // Asumsi slug diambil dari path setelah /api/og-render/
    const slug = url.pathname.split('/').pop();

    if (!slug) {
        return new Response('Slug tidak ditemukan', { status: 404 });
    }

    try {
        // 1. Ambil semua data berita
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbx6q-R7TwG2sQuBhgMU1K7VdSHmqi6LMPGSf7fjoVPiVUCE_SZlTDzBIh1_hups6e2d/exec"
        );
        const data: NewsModel[] = await response.json();
        const newsItem = data.find((item) => item.slug === slug);

        if (!newsItem) {
            // Jika berita tidak ditemukan, kembalikan HTML default
            return new Response('<h1>Berita Tidak Ditemukan</h1>', { status: 404, headers: { 'Content-Type': 'text/html' } });
        }

        // 2. Buat metadata
        const description = newsItem.konten
            ? newsItem.konten.replace(/<[^>]+>/g, '').substring(0, 150) + '...'
            : 'Baca berita terbaru dari KUA Kejayan.';

        const fullUrl = `https://kuakejayan.vercel.app/news/${newsItem.slug}`;

        // 3. Buat HTML khusus untuk bot (hanya berisi tag OG)
        const html = `
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <title>${newsItem.judul}</title>
                <meta name="description" content="${description}">
                
                <meta property="og:title" content="${newsItem.judul}">
                <meta property="og:description" content="${description}">
                <meta property="og:image" content="${newsItem.gambar}">
                <meta property="og:url" content="${fullUrl}">
                <meta property="og:type" content="article">
                <meta property="og:site_name" content="KUA Kejayan">
                
                <meta name="twitter:card" content="summary_large_image">
                <meta name="twitter:title" content="${newsItem.judul}">
                <meta name="twitter:description" content="${description}">
                <meta name="twitter:image" content="${newsItem.gambar}">
                
                <meta http-equiv="refresh" content="0; url=${fullUrl}">
            </head>
            <body>
                Memuat berita...
            </body>
            </html>
        `;

        return new Response(html, {
            status: 200,
            headers: { 'Content-Type': 'text/html' },
        });

    } catch (e) {
        console.error(e);
        return new Response('Error internal server', { status: 500 });
    }
}
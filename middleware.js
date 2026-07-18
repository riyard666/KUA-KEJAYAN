export const config = {
  // Hanya jalankan fungsi ini jika pengunjung membuka halaman berita
  matcher: '/news/:path*', 
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const userAgent = req.headers.get('user-agent') || '';
  
  // 1. Deteksi apakah yang datang adalah Robot
  const isBot = /whatsapp|facebookexternalhit|twitterbot|linkedinbot|googlebot|bingbot|slackbot|telegrambot/i.test(userAgent);
  if (!isBot) return;

  try {
    // 2. Ambil "slug" (ujung tautan berita) dari URL
    const pathParts = url.pathname.split('/');
    const slug = pathParts[pathParts.length - 1];

    // ---> GANTI DENGAN URL API ANDA YANG ADA DI BARIS 68 <---
    // Pastikan Anda menyalin semuanya secara lengkap dari awal https sampai /exec
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbyoyPG2spddXsJo8j2IhnCbqQk2AWBjE_n9SfoiqK43Dk6EAzZVsTDJlshoJd2aD32/exec';
    
    // 3. Panggil data dari Google Script
    const response = await fetch(googleScriptUrl);
    const jsonResponse = await response.json();

    // 4. Cari berita yang sesuai (Sudah disesuaikan dengan struktur Baris 78 di kode Anda!)
    const allNewsData = jsonResponse.data;
    const found = allNewsData.find((item) => item.slug === slug);

    if (found) {
      // 5. Rakit halaman pratinjau HTML khusus untuk Robot
      const html = `
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <title>${found.judul} | KUA Kecamatan Kejayan</title>
          <meta name="description" content="Baca selengkapnya mengenai: ${found.judul}" />
          
          <!-- Meta Tag Wajib untuk Pratinjau WhatsApp & Facebook -->
          <meta property="og:title" content="${found.judul}" />
          <meta property="og:description" content="Baca selengkapnya mengenai: ${found.judul}" />
          <meta property="og:image" content="${found.gambar}" />
          <meta property="og:url" content="${req.url}" />
          <meta property="og:type" content="article" />
        </head>
        <body>
          <h1>${found.judul}</h1>
          <img src="${found.gambar}" alt="${found.judul}" />
        </body>
        </html>
      `;

      // 6. Serahkan HTML tersebut langsung ke Robot WhatsApp
      return new Response(html, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

  } catch (error) {
    console.error("Gagal memproses bot middleware:", error);
  }

  // Jika terjadi error, biarkan Vercel memuat website seperti biasa
  return;
}

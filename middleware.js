export const config = {
  matcher: '/news/:path*', 
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const userAgent = req.headers.get('user-agent') || '';
  
  const isBot = /whatsapp|facebookexternalhit|twitterbot|linkedinbot|googlebot|bingbot|slackbot|telegrambot/i.test(userAgent);
  if (!isBot) return;

  try {
    const pathParts = url.pathname.split('/');
    const slug = pathParts[pathParts.length - 1];

    // Tautan Asli Google Script Anda
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbyoyPG2spddXsJo8j2IhnCbqQk2AWBjE_n9SfoiqK43Dk6EAzZVsTDJlshoJd2aD32/exec';
    
    // --- JURUS PAMUNGKAS: Menggunakan Agen Perantara (AllOrigins) ---
    // Kita bungkus URL Google di dalam URL Agen Perantara agar Google terkecoh
    const bypassUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(googleScriptUrl)}`;

    const response = await fetch(bypassUrl, {
        method: 'GET',
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    const textResponse = await response.text();

    // Cek apakah pertahanan Google masih tembus atau tidak
    if (textResponse.trim().startsWith('<')) {
      throw new Error("Sial, Google masih menahan agen kita!");
    }

    // Jika sukses menembus, kita ubah teks menjadi JSON
    const jsonResponse = JSON.parse(textResponse);
    // ----------------------------------------------------------------

    const allNewsData = jsonResponse.data;
    const found = allNewsData.find((item) => item.slug === slug);

    if (found) {
      const html = `
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <title>${found.judul} | KUA Kecamatan Kejayan</title>
          <meta property="og:title" content="${found.judul}" />
          <meta property="og:description" content="Baca selengkapnya mengenai: ${found.judul}" />
          <meta property="og:image" content="${found.gambar}" />
          <meta property="og:url" content="${req.url}" />
          <meta property="og:type" content="article" />
        </head>
        <body><h1>${found.judul}</h1></body>
        </html>
      `;
      return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    } else {
      return new Response("<html><head><title>Pesan: Berita Tidak Ditemukan</title><meta property='og:title' content='Pesan: Berita Tidak Ditemukan' /></head></html>", { status: 200, headers: { 'Content-Type': 'text/html' } });
    }

  } catch (error) {
    const errorHtml = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <title>Lapor Error: ${error.message}</title>
        <meta property="og:title" content="Lapor Error: ${error.message}" />
        <meta property="og:type" content="article" />
      </head>
      <body><h1>${error.message}</h1></body>
      </html>
    `;
    return new Response(errorHtml, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
}

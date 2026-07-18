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

    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbyoyPG2spddXsJo8j2IhnCbqQk2AWBjE_n9SfoiqK43Dk6EAzZVsTDJlshoJd2aD32/exec';
    
    // --- JURUS MENYAMAR: Memalsukan identitas Vercel menjadi browser Chrome ---
    const response = await fetch(googleScriptUrl, { 
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      }
    });

    // Kita baca dulu sebagai teks biasa untuk mengecek isinya
    const textResponse = await response.text();

    // Jika Google masih mengirimkan HTML (berawalan <), kita buat error agar tidak jebol
    if (textResponse.trim().startsWith('<')) {
      throw new Error("Google masih memblokir server kita");
    }

    // Jika aman, ubah teks menjadi JSON
    const jsonResponse = JSON.parse(textResponse);
    // --------------------------------------------------------------------------

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

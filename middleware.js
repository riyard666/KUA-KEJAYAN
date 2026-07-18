export const config = {
  matcher: '/news/:path*', 
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const userAgent = req.headers.get('user-agent') || '';
  
  // Deteksi robot FB, WA, dkk
  const isBot = /whatsapp|facebookexternalhit|twitterbot|linkedinbot|googlebot|bingbot|slackbot|telegrambot/i.test(userAgent);
  if (!isBot) return;

  try {
    const pathParts = url.pathname.split('/');
    const slug = pathParts[pathParts.length - 1];
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbyoyPG2spddXsJo8j2IhnCbqQk2AWBjE_n9SfoiqK43Dk6EAzZVsTDJlshoJd2aD32/exec';
    
    let jsonResponse = null;

    // TACTIC 1: Serangan Langsung (Membersihkan identitas mesin agar Google tidak curiga)
    try {
      const resDirect = await fetch(googleScriptUrl, { 
          method: 'GET',
          headers: { 'Accept': 'application/json' } 
      });
      const textDirect = await resDirect.text();
      // Jika yang dibalas BUKAN HTML (tidak diawali tanda <), berarti sukses!
      if (!textDirect.trim().startsWith('<')) {
        jsonResponse = JSON.parse(textDirect);
      }
    } catch (e) { 
      // Jika Tactic 1 gagal, biarkan lanjut ke Tactic 2
    }

    // TACTIC 2: Pindah ke Agen Proksi Bebas Blokir (CodeTabs) jika Tactic 1 digagalkan
    if (!jsonResponse) {
      const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(googleScriptUrl);
      const resProxy = await fetch(proxyUrl);
      const textProxy = await resProxy.text();
      
      if (!textProxy.trim().startsWith('<')) {
        jsonResponse = JSON.parse(textProxy);
      } else {
        throw new Error("Kedua jalur ditahan.");
      }
    }

    // Cari berita yang cocok
    const found = jsonResponse?.data?.find((item) => item.slug === slug);

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
      
      // JURUS CACHE SUPER CEPAT: Simpan hasil ini di server selama 1 hari (86400 detik)
      // Ini menjamin Facebook tidak akan pernah kena "Curl Timeout" lagi
      return new Response(html, { 
        status: 200, 
        headers: { 
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 's-maxage=86400, stale-while-revalidate'
        } 
      });
    }

  } catch (error) {
    // Jika semua cara gagal, kita hilangkan pesan error yang muncul di judul FB.
    // Kita minta sistem diam saja, biarkan bot Facebook memuat situs seperti biasa.
    return;
  }
}

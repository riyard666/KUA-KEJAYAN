export const config = {
  matcher: '/news/:path*',
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const userAgent = req.headers.get('user-agent') || '';
  const isBot = /whatsapp|facebookexternalhit|twitterbot|linkedinbot|googlebot|bingbot|slackbot|telegrambot/i.test(userAgent);
  if (!isBot) return;

  try {
    const slug = url.pathname.split('/').pop();
    
    // JALUR BELAKANG: Menyedot langsung dari sheet 'Berita' dengan format CSV
    const sheetId = '1f-gijZH-esfIUBKD4iqnA68AkBir8s3gRNZz1xp0kQ4';
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Berita`;

    const res = await fetch(csvUrl);
    const text = await res.text();
    // Membersihkan JSONP dari Google
    const json = JSON.parse(text.substring(47).slice(0, -2));
    
    // Mapping data mentah Google menjadi objek berita yang rapi
    const rows = json.table.rows;
    const found = rows.find(r => r.c[0]?.v?.toString() === slug); // Asumsi kolom 0 adalah slug

    if (found) {
      const html = `
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <title>${found.c[1].v} | KUA Kecamatan Kejayan</title>
          <meta property="og:title" content="${found.c[1].v}" />
          <meta property="og:description" content="Baca selengkapnya di KUA Kejayan" />
          <meta property="og:image" content="${found.c[2].v}" />
          <meta property="og:url" content="${req.url}" />
          <meta property="og:type" content="article" />
        </head>
        <body><h1>${found.c[1].v}</h1></body>
        </html>
      `;
      return new Response(html, { 
        status: 200, 
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 's-maxage=86400' } 
      });
    }
  } catch (e) {
    // Jika gagal, biarkan bot Facebook memuat halaman asli
    return;
  }
}

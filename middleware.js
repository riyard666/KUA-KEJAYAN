export const config = {
  matcher: '/news/:path*', 
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const userAgent = req.headers.get('user-agent') || '';
  
  // Deteksi Robot Facebook / WhatsApp
  const isBot = /whatsapp|facebookexternalhit|twitterbot|linkedinbot|googlebot|bingbot|slackbot|telegrambot/i.test(userAgent);
  if (!isBot) return;

  try {
    const pathParts = url.pathname.split('/');
    const slug = pathParts[pathParts.length - 1];

    // ID Spreadsheet Anda
    const sheetId = '1f-gijZH-esfIUBKD4iqnA68AkBir8s3gRNZz1xp0kQ4';
    
    // Nama Tab sesuai gambar Anda
    const sheetName = 'berita_db'; 

    // Tautan Jalur Belakang Google (Anti-Blokir)
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;

    const response = await fetch(gvizUrl);
    const text = await response.text();

    // Bersihkan respons Google agar menjadi format JSON yang bisa dibaca sistem
    const jsonString = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
    const jsonData = JSON.parse(jsonString);

    let judul = "Berita KUA Kecamatan Kejayan";
    let gambar = "";
    let isFound = false;

    // Cari baris berita yang cocok dengan tautan (Berdasarkan kolom di gambar Anda)
    if (jsonData && jsonData.table && jsonData.table.rows) {
      for (const row of jsonData.table.rows) {
        // Kolom C (Index 2) adalah kolom Slug
        const rowSlug = row.c[2] && row.c[2].v ? row.c[2].v.toString() : '';

        if (rowSlug === slug) {
          isFound = true;
          // Kolom B (Index 1) adalah Judul
          judul = row.c[1] && row.c[1].v ? row.c[1].v.toString() : judul;
          // Kolom F (Index 5) adalah Gambar
          gambar = row.c[5] && row.c[5].v ? row.c[5].v.toString() : '';
          break; // Berita ditemukan, berhenti mencari
        }
      }
    }

    if (isFound) {
      // Rakit HTML khusus untuk pratinjau
      const html = `
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <title>${judul} | KUA Kecamatan Kejayan</title>
          <meta property="og:title" content="${judul}" />
          <meta property="og:description" content="Situs resmi KUA Kecamatan Kejayan, Kabupaten Pasuruan." />
          <meta property="og:image" content="${gambar}" />
          <meta property="og:url" content="${req.url}" />
          <meta property="og:type" content="article" />
        </head>
        <body><h1>${judul}</h1></body>
        </html>
      `;
      
      // Simpan di server (Cache) agar kecepatan muat 1 milidetik!
      return new Response(html, { 
        status: 200, 
        headers: { 
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 's-maxage=86400, stale-while-revalidate'
        } 
      });
    }
  } catch (error) {
    // Jika ada error diam-diam lewatkan agar web asli tetap berfungsi normal
  }

  return;
}

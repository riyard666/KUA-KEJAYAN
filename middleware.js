export const config = {
  matcher: '/(.*)', // Menangkap semua halaman website
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const userAgent = req.headers.get('user-agent') || '';
  
  // 1. Deteksi apakah yang datang adalah Robot (WhatsApp, Facebook, Google, dll)
  const isBot = /whatsapp|facebookexternalhit|twitterbot|linkedinbot|googlebot|bingbot|slackbot|telegrambot/i.test(userAgent);
  
  // 2. Abaikan file statis (gambar, css, js) agar tidak menghabiskan kuota Prerender Anda
  const isStaticFile = /\.(css|js|png|jpg|jpeg|gif|ico|svg|json|txt)$/i.test(url.pathname);

  if (isBot && !isStaticFile) {
    // 3. Jika itu Robot, arahkan permintaan ke Prerender.io
    const prerenderUrl = `https://service.prerender.io/${req.url}`;
    
    return fetch(prerenderUrl, {
      headers: {
        // GANTI TEKS DI BAWAH INI DENGAN TOKEN PRERENDER ANDA
        'X-Prerender-Token': 'wg6EI6Q6TTjoZ9sTnJZD'
      }
    });
  }
}

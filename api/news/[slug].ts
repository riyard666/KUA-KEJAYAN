// api/news/[slug].ts
export const config = { runtime: "edge" };

const API_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbx6q-R7TwG2sQuBhgMU1K7VdSHmqi6LMPGSf7fjoVPiVUCE_SZlTDzBIh1_hups6e2d/exec";

const DEFAULT_OG = {
    title: "KUA Kejayan",
    description: "Informasi layanan, jadwal, dan agenda KUA Kejayan.",
    image: "https://kuakejayan.vercel.app/og-default.jpg",
};

interface NewsItem {
    slug: string;
    judul: string;
    konten?: string;
    gambar?: string;
    [key: string]: unknown;
}

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function truncate(text: string, length = 150): string {
    if (!text) return "";
    if (text.length <= length) return text;
    return text.slice(0, length).trim().replace(/\s+\S*$/, "") + "...";
}

export default async function handler(req: Request): Promise<Response> {
    try {
        const url = new URL(req.url);
        const segments = url.pathname.split("/").filter(Boolean);
        const slug = decodeURIComponent(segments[segments.length - 1] || "");

        const r = await fetch(API_ENDPOINT, { cache: "no-store" });
        if (!r.ok) throw new Error("Failed to fetch news");

        const data = (await r.json()) as NewsItem[];

        const found =
            Array.isArray(data) &&
            data.find((item) => String(item.slug) === slug);

        const rawKonten = typeof found?.konten === "string" ? found.konten : "";

        const og = found
            ? {
                title: found.judul || DEFAULT_OG.title,
                description:
                    truncate(stripHtml(rawKonten), 150) ||
                    DEFAULT_OG.description,
                image: found.gambar || DEFAULT_OG.image,
                url: `https://kuakejayan.vercel.app/news/${encodeURIComponent(slug)}`,
            }
            : {
                ...DEFAULT_OG,
                url: `https://kuakejayan.vercel.app/news/${encodeURIComponent(slug)}`,
            };

        const html = `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(og.title)}</title>

  <meta property="og:title" content="${escapeHtml(og.title)}" />
  <meta property="og:description" content="${escapeHtml(og.description)}" />
  <meta property="og:image" content="${escapeHtml(og.image)}" />
  <meta property="og:url" content="${escapeHtml(og.url)}" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />

  <meta http-equiv="refresh" content="0;url=${escapeHtml(og.url)}" />
  <script>
    window.location.replace("${escapeJs(og.url)}");
  </script>
</head>
<body>Redirecting...</body>
</html>`;

        return new Response(html, {
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                "Cache-Control": "public, max-age=60, s-maxage=60",
            },
        });
    } catch (err) {
        const fallbackHtml = `<!doctype html><html><head><meta http-equiv="refresh" content="0;url=https://kuakejayan.vercel.app/news" /></head><body>Redirecting...</body></html>`;
        return new Response(fallbackHtml, {
            headers: { "Content-Type": "text/html; charset=utf-8" },
            status: 200,
        });
    }
}

function escapeHtml(str: string): string {
    return String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function escapeJs(str: string): string {
    return String(str || "")
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\n");
}

import Footer from "@/components/Footer.tsx";
import NewsComponent from "@/components/NewsComponent.tsx";

export default function NewsList() {
    return (
        <div>
            <div className="mx-auto max-w-6xl px-4 py-12 min-h-screen">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-emerald-700">
                        Informasi KUA Kejayan
                    </h1>
                    <p>Dapatkan berita, pengumuman, dan informasi penting terkini yang selalu kami update untuk masyarakat.</p>
                </div>

                <NewsComponent />
            </div>


            <Footer />
        </div>
    );
}
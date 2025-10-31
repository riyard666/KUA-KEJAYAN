import News from "@/components/NewsComponent/News.tsx";

export default function NewsUpload() {
    return(
        <div className="px-20 mx-auto">
            <div className="my-8">
                <h2 className="text-xl md:text-4xl font-bold text-emerald-700">
                    Daftar Berita
                </h2>
            </div>
            <News/>
        </div>
    )
}
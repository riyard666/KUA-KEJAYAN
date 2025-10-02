import Footer from "@/components/Footer.tsx";
import InfoCards from "@/components/InfoCards";

export default function LayananInformasi() {
    return(
        <>
            <div className="min-h-screen bg-white">
                <div className="container mx-auto px-4">

                    <div className="grid gap-4 max-w-4xl mx-auto">
                        <section>
                            <div className="mx-auto max-w-6xl px-4 ">
                                <InfoCards />
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <Footer/>

        </>
    )
}
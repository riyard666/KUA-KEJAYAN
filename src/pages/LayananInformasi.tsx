import Footer from "@/components/Footer.tsx";
import InfoCards from "@/components/InfoCards";

export default function LayananInformasi() {
    return(
        <>
            <div className="min-h-screen bg-white">
                <div className="container flex flex-col mx-auto">
                    <InfoCards />
                </div>
            </div>

            <Footer/>

        </>
    )
}
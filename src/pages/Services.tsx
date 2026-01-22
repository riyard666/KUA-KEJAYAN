import ServiceGrid from "@/components/ServiceGrid.tsx";
import Footer from "@/components/Footer.tsx";
import {Helmet} from "react-helmet-async";

export default function Services() {

    return (

        <>
            <Helmet>
                <title>Layanan Digital KUA Kejayan - KUA Kejayan</title>
                <meta name="description" content="Panduan lengkap untuk layanan Kantor Urusan Agama." />
            </Helmet>

            <div className="min-h-screen bg-white">
                <div className="container mx-auto px-4">

                    <div className="grid gap-4 max-w-4xl mx-auto">
                        <section>
                            <div className="mx-auto max-w-6xl px-4 ">
                                <ServiceGrid />
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <Footer/>

        </>
    );
}
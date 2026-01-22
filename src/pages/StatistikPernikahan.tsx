import Footer from "@/components/Footer.tsx";
import MarriageStats from "@/components/MarriageStats.tsx";
import {Helmet} from "react-helmet-async";

export default function StatistikPernikahan() {
    return (
        <>
            <Helmet>
                <title>Statistik Pernikahan - KUA Kejayan</title>
                <meta name="description" content="Statistisk Pernikahan berdasarkan tahun dan desa." />
            </Helmet>
            <div className="min-h-screen bg-white">
                <div className="container mx-auto px-4">

                    <div className="grid gap-4 my-10">
                        <section>
                            <div className=" ">
                                <MarriageStats />
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <Footer/>

        </>
    )
}
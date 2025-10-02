import Footer from "@/components/Footer.tsx";
import MarriageStats from "@/components/MarriageStats.tsx";

export default function StatistikPernikahan() {
    return (
        <>
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
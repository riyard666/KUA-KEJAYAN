import Footer from "@/components/Footer.tsx";

export default function CalendarMarriage(){
    return (
        <div className="min-h-screen">


            <div className={"mx-auto max-w-6xl rounded-lg"}>
                <iframe
                    src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FJakarta&showPrint=0&title=Kalender%20Jadwal%20Nikah%20-%20KUA%20Kejayan&src=aXQua3Vha2VqYXlhbkBnbWFpbC5jb20&color=%23039be5"
                    style={{border: 0, width: "100%", height: 600}} frameBorder="0"
                    scrolling="no"></iframe>
            </div>

            <Footer/>
        </div>
    )
}
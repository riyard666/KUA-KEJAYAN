import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Services from '@/pages/Services';
import Profile from '@/pages/Profile';
import Login from '@/pages/Login';
import Navbar from '@/components/Navbar';
import NewsUpload from '@/pages/NewsUpload';
import NewsList from '@/pages/NewsList';
import Feedback from '@/pages/Feedback';
import MasjidPage from "@/pages/MasjidPage";
import WakafPage from "@/pages/WakafPage.tsx";
import LayananInformasi from "@/pages/LayananInformasi.tsx";
import StatistikPernikahan from "@/pages/StatistikPernikahan.tsx";
import Pegawai from "@/pages/Pegawai.tsx";
import CalendarMarriage from "@/pages/CalendarMarriage.tsx";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/layanan" element={<Services />} />
                    <Route path="/layanan-informasi" element={<LayananInformasi />} />
                    <Route path="/statistik-pernikahan" element={<StatistikPernikahan />} />
                    <Route path="/data-masjid" element={<MasjidPage />} />
                    <Route path="/data-wakaf" element={<WakafPage />} />
                    <Route path="/kalender-jadwal-nikah" element={<CalendarMarriage />} />
                    <Route path="/pegawai" element={<Pegawai />} />
                    <Route path="/news-upload" element={<NewsUpload />} />
                    <Route path="/news" element={<NewsList />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
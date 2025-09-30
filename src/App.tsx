import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Services from '@/pages/Services';
import Profile from '@/pages/Profile';
import Information from '@/pages/Information';
import Login from '@/pages/Login';
import Navbar from '@/components/Navbar';
import NewsUpload from '@/pages/NewsUpload';
import NewsList from '@/pages/NewsList';
import Feedback from '@/pages/Feedback';

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
                    <Route path="/services" element={<Services />} />
                    <Route path="/information" element={<Information />} />
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
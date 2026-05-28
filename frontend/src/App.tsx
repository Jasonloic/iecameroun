import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Medias from "./pages/Medias.tsx";
import Bibliotheque from "./pages/Bibliotheque.tsx";
import ArticleDetail from "./pages/ArticleDetail.tsx"; // 1. Import du nouveau composant dynamique
import { usePageTracking } from "./hooks/usePageTracking";

const queryClient = new QueryClient();

function AppRoutes() {
    usePageTracking();

    return (
        <Routes>
            <Route path="/"             element={<Index />} />
            <Route path="/medias"       element={<Medias />} />
            <Route path="/medias/:id"   element={<ArticleDetail />} />
            <Route path="/bibliotheque" element={<Bibliotheque />} />
            <Route path="*"             element={<NotFound />} />
        </Routes>
    );
}

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
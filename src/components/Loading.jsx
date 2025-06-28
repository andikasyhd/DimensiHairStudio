import { Scissors } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-white">
            <div className="w-14 h-14 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mb-4 flex items-center justify-center">
                <Scissors className="w-6 h-6 text-amber-700 animate-pulse" />
            </div>
            <p className="text-amber-700 text-lg italic tracking-wide">Memuat halaman barbershop...</p>
        </div>
    );
}

export default function LoadingSpinner({ text = "Memuat layanan pangkas..." }) {
    return (
        <div className="p-8 text-center text-gray-600">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-amber-600 mx-auto mb-4"></div>
            <p className="text-sm italic tracking-wide">{text}</p>
        </div>
    );
}

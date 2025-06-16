export function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-950">
      <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-yellow-400 text-lg font-semibold">Memuat...</p>
    </div>
  );
}


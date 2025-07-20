import { useEffect, useState } from 'react';
import { Search, Filter, RotateCcw, Star, Calendar, User, MessageSquare, ChevronLeft, ChevronRight, TrendingUp, Eye } from 'lucide-react';
import { feedbackAPI } from '../../service/feedbackAPI';

export default function FeedbackPelanggan() {
    const [feedback, setFeedback] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await feedbackAPI.getAllFeedback();
                setFeedback(data);
            } catch (error) {
                console.error('Gagal memuat data feedback:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredFeedback = feedback
        .filter(item =>
            item.nama?.toLowerCase().includes(searchTerm.toLowerCase().trim())
        )
        .filter(item =>
            ratingFilter ? item.rating == ratingFilter : true // perhatikan: pakai '=='
        )

        .sort((a, b) => {
            if (sortOrder === 'terbaru') {
                return new Date(b.created_at) - new Date(a.created_at);
            } else if (sortOrder === 'terlama') {
                return new Date(a.created_at) - new Date(b.created_at);
            }
            return 0;
        });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredFeedback.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);

    // Statistics

    const totalFeedback = feedback.length;

    const resetFilter = () => {
        setSearchTerm('');
        setSortOrder('');
        setRatingFilter('');
        setCurrentPage(1);
    };

    const renderStars = (rating, size = "text-base") => {
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`${size} ${star <= rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                    />
                ))}
                <span className="ml-1 text-sm text-gray-600">({rating})</span>
            </div>
        );
    };

    const FeedbackCard = ({ item, index }) => (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {item.nama ? item.nama.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 group-hover:text-sky-600 transition-colors">
                                {item.nama || 'Anonymous'}
                            </h3>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(item.created_at).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                    <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full font-medium">
                        #{startIndex + index + 1}
                    </span>
                </div>

                <div className="mb-4">
                    {renderStars(item.rating, "w-4 h-4")}
                </div>

                <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                    {item.saran || 'Tidak ada feedback'}
                </p>

                <button
                    onClick={() => setSelectedFeedback(item)}
                    className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 text-sm font-medium transition-colors"
                >
                    <Eye className="w-4 h-4" />
                    Lihat Detail
                </button>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 p-4 sm:p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                                <MessageSquare className="text-sky-600" />
                                Feedback Pelanggan
                            </h1>
                            <p className="text-gray-600">Kelola dan pantau feedback dari pelanggan Anda</p>
                        </div>

                        {/* Statistics Cards */}
                        <div className="flex gap-4">
                            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Total Feedback</p>
                                        <p className="text-2xl font-bold text-gray-800">{totalFeedback}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Cari nama pelanggan..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                            >
                                <option value="">Urutkan</option>
                                <option value="terbaru">Terbaru</option>
                                <option value="terlama">Terlama</option>
                            </select>
                            <ChevronLeft className="absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Rating Filter */}
                        <div className="relative">
                            <select
                                value={ratingFilter}
                                onChange={(e) => setRatingFilter(e.target.value)}
                                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                            >
                                <option value="">Semua Rating</option>
                                {[5, 4, 3, 2, 1].map(bintang => (
                                    <option key={bintang} value={bintang}>{bintang} Bintang</option>
                                ))}
                            </select>
                            <ChevronLeft className="absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Reset Button */}
                        <button
                            onClick={resetFilter}
                            className="inline-flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset
                        </button>

                        {/* View Toggle */}
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('table')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'table'
                                        ? 'bg-white text-sky-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                Tabel
                            </button>
                            <button
                                onClick={() => setViewMode('card')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'card'
                                        ? 'bg-white text-sky-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                Kartu
                            </button>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(searchTerm || sortOrder || ratingFilter) && (
                        <div className="flex flex-wrap gap-2">
                            <span className="text-sm text-gray-600">Filter aktif:</span>
                            {searchTerm && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-sky-100 text-sky-700 rounded-full text-xs">
                                    <User className="w-3 h-3" />
                                    {searchTerm}
                                </span>
                            )}
                            {sortOrder && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                    <Filter className="w-3 h-3" />
                                    {sortOrder === 'terbaru' ? 'Terbaru' : 'Terlama'}
                                </span>
                            )}
                            {ratingFilter && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                                    <Star className="w-3 h-3" />
                                    {ratingFilter} Bintang
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Content */}
                {currentItems.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
                        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada feedback</h3>
                        <p className="text-gray-500">
                            {feedback.length === 0
                                ? 'Belum ada feedback dari pelanggan'
                                : 'Tidak ada feedback yang sesuai dengan filter'
                            }
                        </p>
                    </div>
                ) : viewMode === 'card' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {currentItems.map((item, index) => (
                            <FeedbackCard key={item.id} item={item} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-8">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-sky-600 to-blue-600 text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">No</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Nama</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold hidden md:table-cell">Feedback</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Rating</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Tanggal</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {currentItems.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-600">
                                                {startIndex + index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                        {item.nama ? item.nama.charAt(0).toUpperCase() : 'U'}
                                                    </div>
                                                    <span className="font-medium text-gray-800">
                                                        {item.nama || 'Anonymous'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 max-w-xs hidden md:table-cell">
                                                <p className="truncate">
                                                    {item.saran || 'Tidak ada feedback'}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                {renderStars(item.rating, "w-3 h-3")}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">
                                                {new Date(item.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => setSelectedFeedback(item)}
                                                    className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 text-sm font-medium transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    Detail
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="text-sm text-gray-600">
                            Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredFeedback.length)} dari {filteredFeedback.length} feedback
                            {filteredFeedback.length !== feedback.length && ` (${feedback.length} total)`}
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Prev
                            </button>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    const pageNum = i + 1;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`w-8 h-8 text-sm font-medium rounded-lg transition-colors ${currentPage === pageNum
                                                    ? 'bg-sky-600 text-white'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Detail Modal */}
                {selectedFeedback && (
                    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">

                        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-gray-800">Detail Feedback</h3>
                                    <button
                                        onClick={() => setSelectedFeedback(null)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                                        {selectedFeedback.nama ? selectedFeedback.nama.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">
                                            {selectedFeedback.nama || 'Anonymous'}
                                        </h4>
                                        <p className="text-gray-600 flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(selectedFeedback.created_at).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                    {renderStars(selectedFeedback.rating, "w-5 h-5")}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-800 leading-relaxed">
                                            {selectedFeedback.saran || 'Tidak ada feedback yang diberikan.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
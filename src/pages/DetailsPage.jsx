import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDetails } from "../api/LoremPicsumAPI";

function DetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);
        getDetails({ id })
            .then((data) => {
                if (!mounted) return;
                setDetail(data);
            })
            .catch((err) => {
                if (!mounted) return;
                setError(err.message || "Failed to load photo details");
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [id]);

    const title = detail?.title || "Untitled photo";
    const author = detail?.author || "Unknown author";
    const description = detail?.description || "No description available for this photo.";
    const imageSrc = detail?.download_url || detail?.url || (detail ? `https://picsum.photos/id/${detail.id}` : null);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded shadow-sm text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                        ← Back to gallery
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {loading ? (
                        <div className="w-full h-64 flex items-center justify-center">
                            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="w-full h-64 flex items-center justify-center text-red-500">
                            {error}
                        </div>
                    ) : imageSrc ? (
                        <img
                            src={imageSrc}
                            alt={title}
                            className="w-full h-auto object-contain bg-black"
                        />
                    ) : (
                        <div className="w-full h-64 flex items-center justify-center bg-gray-100 text-gray-400">
                            No image available
                        </div>
                    )}

                    <div className="p-6">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h1>
                        <div className="text-sm text-gray-600 mb-4">By <span className="font-medium text-gray-800">{author}</span></div>
                        <p className="text-gray-700 leading-relaxed">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
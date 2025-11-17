import { useEffect, useState, useContext } from 'react'
import PhotosGrid from "../components/PhotosGrid";
import { getPhotosList } from "../api/LoremPicsumAPI";
import { PhotoContext } from "../context/PhotoContext";

function HomePage() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getPhotosList(page)
      .then((data) => {
        if (!mounted) return;
        setPhotos((prev) => [...prev, ...data]);
        // If API returned fewer than requested, we've reached the end
        const PAGE_LIMIT = 28;
        if (!data || data.length < PAGE_LIMIT) setHasMore(false);
      })
      .catch((err) => {
        console.error("Failed to load photos", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [page]);

  useEffect(() => {
    function handleScroll() {
      if (loading || !hasMore) return;
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((p) => p + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center text-gray-800 my-6">
          Photo Gallery
        </h1>
        <PhotosGrid photos={photos} />

        {loading && (
          <div className="flex justify-center py-6">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}

        {!hasMore && !loading && (
          <div className="text-center text-gray-500 py-6">
            No more photos to load.
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;

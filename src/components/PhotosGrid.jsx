import { Link } from "react-router-dom";

export default function PhotosGrid({ photos }) {
  if (!photos || photos.length === 0) {
    return (
      <p className="text-center text-gray-500 p-10">No photos to display.</p>
    );
  }

  return (
    <div className="grid gap-6 p-2 sm:p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {photos.map((photo) => (
        <Link to={`/photo/${photo.id}`} key={photo.id}>
          <div
            className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col"
          >
            <img
              className="w-full h-48 sm:h-40 md:h-44 object-cover"
              src={`https://picsum.photos/id/${photo.id}/600/400`}
              alt={photo.author}
              loading="lazy"
            />
            <div className="px-3 py-2 text-sm text-gray-500 border-t">
              {photo.author}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

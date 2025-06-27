import { useState, useEffect } from "react";
import { PlayCircle, Heart, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const YOUTUBE_API_KEY = "AIzaSyBs5kTp96KHd8XEZe_IapOwH6Imx3iEVi0";

const HomePage = ({ username }: { username?: string }) => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [favSearch, setFavSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const favs = localStorage.getItem(`favorites_${username}`);
    if (favs) setFavorites(JSON.parse(favs));
  }, [username]);

  const saveFavorites = (newFavs: any[]) => {
    setFavorites(newFavs);
    localStorage.setItem(`favorites_${username}`, JSON.stringify(newFavs));
  };

  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          query
        )}&key=${YOUTUBE_API_KEY}&maxResults=10&type=video`
      );
      const data = await res.json();
      setVideos(data.items || []);
    } catch (err) {
      console.error("Error al buscar videos:", err);
    }
  };

  const toggleFavorite = (video: any) => {
    const exists = favorites.find((fav) => fav.id.videoId === video.id.videoId);
    if (exists) {
      saveFavorites(favorites.filter((fav) => fav.id.videoId !== video.id.videoId));
    } else {
      saveFavorites([...favorites, video]);
    }
  };

  const filteredFavorites = favorites.filter((fav) =>
    fav.snippet.title.toLowerCase().includes(favSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 sm:px-6 py-6">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <PlayCircle size={32} className="text-red-600" />
          <h1 className="text-3xl font-bold text-white">InnovaTube</h1>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-md">Hola, Amigo! <strong>{username}</strong></span>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white"
          >
            <LogOut size={18} /> Cerrar sesión
          </button>
        </div>

      </header>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-6 w-full max-w-3xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar en YouTube..."
          className="p-3 w-full rounded-md sm:rounded-l-md sm:rounded-r-none text-white placeholder-gray-500 border border-white bg-transparent"
        />
        <button
          onClick={handleSearch}
          className="bg-red-600 hover:bg-red-500 p-3 rounded-md sm:rounded-r-md sm:rounded-l-none text-white w-full sm:w-auto"
        >
          <Search className="mx-auto" />
        </button>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Resultados</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => (
            <div key={video.id.videoId} className="bg-[#1f1f1f] rounded-lg overflow-hidden shadow-md">
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-base mb-1 line-clamp-2">{video.snippet.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{video.snippet.channelTitle}</p>
                <button
                  onClick={() => toggleFavorite(video)}
                  className={`flex items-center gap-2 text-sm px-3 py-1 rounded transition ${favorites.find((fav) => fav.id.videoId === video.id.videoId)
                      ? "bg-red-600 hover:bg-red-500"
                      : "bg-blue-600 hover:bg-blue-500"
                    }`}
                >
                  <Heart size={16} />
                  {favorites.find((fav) => fav.id.videoId === video.id.videoId)
                    ? "Quitar de favoritos"
                    : "Agregar a favoritos"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">Favoritos</h2>
        <input
          type="text"
          value={favSearch}
          onChange={(e) => setFavSearch(e.target.value)}
          placeholder="Buscar en favoritos..."
          className="p-3 mb-6 rounded w-full sm:max-w-lg text-black placeholder-gray-500"
        />
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFavorites.length === 0 && <p className="text-gray-400">No hay favoritos.</p>}
          {filteredFavorites.map((video) => (
            <div key={video.id.videoId} className="bg-[#1f1f1f] rounded-lg overflow-hidden shadow-md">
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-base mb-1 line-clamp-2">{video.snippet.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{video.snippet.channelTitle}</p>
                <button
                  onClick={() => toggleFavorite(video)}
                  className="flex items-center gap-2 text-sm bg-red-600 hover:bg-red-500 px-3 py-1 rounded"
                >
                  <Heart size={16} /> Quitar de favoritos
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Botón móvil fijo al fondo */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-[#0f0f0f] p-4 border-t border-gray-700 flex justify-center">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white"
        >
          <LogOut size={18} /> Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default HomePage;

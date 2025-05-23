import { useState } from "react";

interface MovieSearchProps {
  updateMovies: (newMovies: any[]) => void; // Recibe la función de actualización como prop
}

const MovieSearch = ({ updateMovies }: MovieSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMovies = async (query: string) => {
    if (!query) return;
    setIsLoading(true);
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=d57e4ba9&s=${query}&type=movie`
    );
    const data = await response.json();
    if (data.Response === "True") {
      updateMovies(data.Search); // Actualiza el estado de las películas en el componente padre
    } else {
      updateMovies([]); // Si no hay resultados, se pasa un array vacío
    }
    setIsLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMovies(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="max-w-xl mx-auto space-y-4">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pl-12 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Buscar película..."
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6M4 10a6 6 0 1112 0 6 6 0 01-12 0z"
          />
        </svg>
      </div>

      <button
        type="submit"
        className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none"
      >
        Buscar
      </button>

      {isLoading && <div className="mt-4 text-center">Cargando...</div>}
    </form>
  );
};

export default MovieSearch;

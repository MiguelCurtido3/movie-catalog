interface MovieCatalogProps {
  movies: any[]; // Recibe las películas como props
}

const MovieCatalog = ({ movies }: MovieCatalogProps) => {
   return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 duration-300"
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-80 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 truncate">{movie.Title}</h3>
              <p className="text-sm text-gray-500">{movie.Year}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-lg text-gray-500">No se encontraron películas.</div>
      )}
    </div>
  );
};

export default MovieCatalog;

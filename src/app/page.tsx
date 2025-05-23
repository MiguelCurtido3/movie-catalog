"use client";
import { useState, useEffect } from "react";
import MovieSearch from "./components/MovieSearch"; // Componente de búsqueda
import MovieCatalog from "./components/MovieCatalog"; // Componente de catálogo

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]); // Estado global de películas

  // Función para actualizar las películas en el estado principal
  const updateMovies = (newMovies: any[]) => {
    setMovies(newMovies);
  };

  // Cargar películas predeterminadas al cargar la página
  useEffect(() => {
    const fetchCatalog = async () => {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=d57e4ba9&s=batman&type=movie`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search); // Setear las películas predeterminadas
      }
    };
    fetchCatalog();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Parte superior: Buscador */}
      <section className="bg-blue-600 text-white p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Catálogo de Películas</h1>
        <p className="text-xl mb-6">Encuentra tus películas favoritas</p>
        <MovieSearch updateMovies={updateMovies} /> {/* Pasar la función de actualización */}
      </section>

      {/* Parte inferior: Catálogo de Películas */}
      <section className="p-10">
        <h2 className="text-3xl font-semibold text-center mb-6">Películas Populares</h2>
        <MovieCatalog movies={movies} /> {/* Pasar las películas como props */}
      </section>
    </div>
  );
}

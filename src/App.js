import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [data, setData] = useState([]); // Estado para guardar los datos de la API
  const [loading, setLoading] = useState(true); // Estado para mostrar si está cargando
  const [error, setError] = useState(null); // Estado para manejar errores

  // Cambia esta URL para probar con PokéAPI
  const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=10"; // Obtener lista de 10 Pokémon

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Mostrar "Cargando" antes de hacer la petición
        const response = await fetch(API_URL); // Hacer la solicitud
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`); // Manejar errores HTTP
        }
        const result = await response.json(); // Convertir la respuesta a JSON
        setData(result.results); // Guardar los resultados (lista de Pokémon)
      } catch (err) {
        setError(err.message); // Guardar el mensaje de error
      } finally {
        setLoading(false); // Terminar el estado de carga
      }
    };

    fetchData();
  }, [API_URL]); // Se ejecuta cuando cambia la URL de la API

  if (loading) return <h1>Cargando...</h1>; // Mostrar mientras carga
  if (error) return <h1>Error: {error}</h1>; // Mostrar si hay un error

  return (
    <div>
      <h1>Lista de Pokémon</h1>
      <div className="card-container">
        {data.map((item, index) => (
          <div key={index} className="card">
            <h2>{item.name}</h2> {/* Mostrar nombre del Pokémon */}
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`}
              alt={item.name}
            /> {/* Mostrar imagen del Pokémon */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

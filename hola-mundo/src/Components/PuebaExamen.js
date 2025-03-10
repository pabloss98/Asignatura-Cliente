import React, { useState, useEffect } from "react";

// Componente principal
const SpotiMain = () => {
    const [canciones, setCanciones] = useState([]);
    const [filtro, setFiltro] = useState("");

    useEffect(() => {
        const fetchCanciones = async () => {
            try {
                const response = await fetch("/json/Spotify.json");
                const data = await response.json();
                setCanciones(data);
            } catch (error) {
                console.error("Error cargando las canciones", error);
            }
        };
        fetchCanciones();
    }, []);

    return (
        <div>
            <h1>SpotifEx</h1>
            <FiltradoCanciones filtro={filtro} setFiltro={setFiltro} />
            <ListadoCanciones canciones={canciones} filtro={filtro} />
            <MasPopular canciones={canciones} />
        </div>
    );
};

// Componente para mostrar la lista de canciones
const ListadoCanciones = ({ canciones, filtro }) => {
    const cancionesFiltradas = canciones.filter(cancion => 
        cancion.artista.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Artista</th>
                    <th>Álbum</th>
                    <th>Duración (s)</th>
                </tr>
            </thead>
            <tbody>
                {cancionesFiltradas.map(cancion => (
                    <tr key={cancion.id}>
                        <td>{cancion.id}</td>
                        <td>{cancion.nombre}</td>
                        <td>{cancion.artista}</td>
                        <td>{cancion.album}</td>
                        <td>{cancion.duracion}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// Componente para filtrar por artista
const FiltradoCanciones = ({ filtro, setFiltro }) => {
    return (
        <input 
            type="text" 
            placeholder="Filtrar por artista" 
            value={filtro} 
            onChange={(e) => setFiltro(e.target.value)}
        />
    );
};

// Componente para mostrar la canción más popular
const MasPopular = ({ canciones }) => {
    if (canciones.length === 0) return <p>No hay canciones disponibles</p>;

    const cancionPopular = canciones.reduce((max, cancion) => 
        cancion.popularidad > max.popularidad ? cancion : max, canciones[0]
    );

    return (
        <div>
            <h2>Canción más popular</h2>
            <p>{cancionPopular.nombre} - {cancionPopular.artista}</p>
        </div>
    );
};

export default SpotiMain;

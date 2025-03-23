import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';


Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const Estadisticas = ({ mes, año }) => {
  const [estadisticas, setEstadisticas] = useState(null); 
  const [cargando, setCargando] = useState(false); 
  const [error, setError] = useState(null); 

 
  useEffect(() => {
    const obtenerEstadisticas = async () => {
      setCargando(true); 
      setError(null);

      try {
        const respuesta = await axios.get(`http://localhost/SERVIDOR/practica/stats.php?month=${mes}&year=${año}`);
        setEstadisticas(respuesta.data); 
      } catch (err) {
        setError('No se pudo cargar la información, por favor intenta de nuevo.'); 
      } finally {
        setCargando(false); 
      }
    };

    obtenerEstadisticas();
  }, [mes, año]);

  if (cargando) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!estadisticas) {
    return <div>No hay datos disponibles para este mes y año.</div>; 
  }

  const datosGrafico = {
    labels: estadisticas.valores.map((_, index) => `Día ${index + 1}`), 
    datasets: [
      {
        label: 'Valor LENTA',
        data: estadisticas.valores, 
        borderWidth: 1, 
      },
    ],
  };

  const opcionesGrafico = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Estadísticas de Valor LENTA', 
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Valor: ${tooltipItem.raw}`, 
        },
      },
    },
  };

  return (
    <div>
      <h2>Estadísticas Valor LENTA</h2>
      <p><strong>Valor Medio:</strong> {estadisticas.media || 'No disponible'}</p>
      <p><strong>Valor Mínimo:</strong> {estadisticas.minimo || 'No disponible'}</p>
      <p><strong>Valor Máximo:</strong> {estadisticas.maximo || 'No disponible'}</p>

      {/* Aquí mostramos el gráfico */}
      <Bar data={datosGrafico} options={opcionesGrafico} />
    </div>
  );
};

export default Estadisticas;

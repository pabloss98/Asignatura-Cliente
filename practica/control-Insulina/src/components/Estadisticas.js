import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Estadisticas = ({ mes, año }) => {
    const [estadisticas, setEstadisticas] = useState({ valores: [], media: null, minimo: null, maximo: null });
    const [cargando, setCargando] = useState(true);
    const [mensajeError, setMensajeError] = useState(null);

    useEffect(() => {
        const obtenerEstadisticas = async () => {
            try {
                const { data } = await axios.get(`http://localhost/SERVIDOR/practica?month=${mes}&year=${año}`);
                if (data && Array.isArray(data.valores)) {
                    setEstadisticas(data);
                } else {
                    throw new Error('Datos mal formateados');
                }
            } catch (error) {
                console.error('Error al obtener las estadísticas:', error);
                setMensajeError('No se pueden cargar las estadisticas.');
            } finally {
                setCargando(false);
            }
        };

        obtenerEstadisticas();
    }, [mes, año]);

    if (cargando) return <p>Cargando datos...</p>;
    if (mensajeError) return <p>{mensajeError}</p>;

    if (!estadisticas || !Array.isArray(estadisticas.valores) || !estadisticas.valores.length) {
        return <p>No hay datos disponibles para mostrar.</p>;
    }

    const datosGrafico = {
        labels: estadisticas.valores.map((_, index) => index + 1),
        datasets: [{
            label: 'Valor LENTA',
            data: estadisticas.valores,
            fill: false
        }]
    };

    return (
        <div>
            <h2>Estadísticas del Valor LENTA</h2>
            <p>Valor Medio: {estadisticas.media ?? 'No disponible'}</p>
            <p>Valor Mínimo: {estadisticas.minimo ?? 'No disponible'}</p>
            <p>Valor Máximo: {estadisticas.maximo ?? 'No disponible'}</p>
            <Line data={datosGrafico} />
        </div>
    );
};

export default Estadisticas;

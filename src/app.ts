import { series } from './data/data.js';
import { Serie } from './models/Serie.js';

function calcularPromedioTemporadas(series: Serie[]): number {
    if (series.length === 0) return 0;
    const totalTemporadas = series.reduce((sum, serie) => sum + serie.seasons, 0);
    return parseFloat((totalTemporadas / series.length).toFixed(2));
}

function mostrarTabla(): void {
    const tbody = document.getElementById('seriesTableBody');
    if (tbody) {
        tbody.innerHTML = series.map(serie => `
      <tr>
        <td>${serie.id}</td>
        <td>${serie.name}</td>
        <td>${serie.channel}</td>
        <td>${serie.seasons}</td>
      </tr>
    `).join('');
    }
    const promedio = calcularPromedioTemporadas(series);
    const avgSection = document.getElementById('averageSection');
    if (avgSection) {
        avgSection.innerHTML = `Promedio de temporadas: <strong>${promedio}</strong> temporadas`;
    }
}

mostrarTabla();
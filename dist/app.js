import { series } from './data/data.js';
function calcularPromedioTemporadas(series) {
    if (series.length === 0)
        return 0;
    const totalTemporadas = series.reduce((sum, serie) => sum + serie.seasons, 0);
    return parseFloat((totalTemporadas / series.length).toFixed(2));
}
function mostrarDetalleSerie(serie) {
    const detailContainer = document.getElementById('serieDetailContainer');
    if (detailContainer) {
        detailContainer.innerHTML = `
            <div class="card serie-detail-card">
                <img class="card-img-top" src="${serie.image}" alt="${serie.name}">
                <div class="card-body">
                    <h5 class="card-title">${serie.name}</h5>
                    <p class="card-text">${serie.description}</p>
                    <p class="card-text"><strong>Canal:</strong> ${serie.channel}</p>
                    <p class="card-text"><strong>Temporadas:</strong> ${serie.seasons}</p>
                    <a href="${serie.url}" target="_blank" class="btn btn-primary">Ver más</a>
                </div>
            </div>
        `;
    }
}
function mostrarTabla() {
    const tbody = document.getElementById('seriesTableBody');
    if (tbody) {
        tbody.innerHTML = series.map(serie => `
      <tr data-serie-id="${serie.id}">
        <td>${serie.id}</td>
        <td>${serie.name}</td>
        <td>${serie.channel}</td>
        <td>${serie.seasons}</td>
      </tr>
    `).join('');
        // Agregar event listeners a cada fila
        const rows = tbody.querySelectorAll('tr');
        rows.forEach(row => {
            row.addEventListener('click', () => {
                // Remover la clase 'selected' de todas las filas
                rows.forEach(r => r.classList.remove('selected'));
                // Agregar la clase 'selected' a la fila clickeada
                row.classList.add('selected');
                // Obtener el ID de la serie
                const serieId = parseInt(row.getAttribute('data-serie-id') || '0');
                // Encontrar la serie correspondiente
                const serieSeleccionada = series.find(s => s.id === serieId);
                // Mostrar el detalle
                if (serieSeleccionada) {
                    mostrarDetalleSerie(serieSeleccionada);
                }
            });
        });
    }
    const promedio = calcularPromedioTemporadas(series);
    const avgSection = document.getElementById('averageSection');
    if (avgSection) {
        avgSection.innerHTML = `Promedio de temporadas: <strong>${promedio}</strong> temporadas`;
    }
}
mostrarTabla();
//# sourceMappingURL=app.js.map
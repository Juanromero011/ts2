import { series } from './data/data.js';
let serieSeleccionada = null;
function calcularPromedioTemporadas(series) {
    if (series.length === 0)
        return 0;
    const totalTemporadas = series.reduce((sum, serie) => sum + serie.seasons, 0);
    return parseFloat((totalTemporadas / series.length).toFixed(2));
}
function mostrarTabla() {
    const tbody = document.getElementById('seriesTableBody');
    if (tbody) {
        tbody.innerHTML = series.map(serie => `
      <tr class="serie-row" data-id="${serie.id}" style="cursor: pointer;">
        <td>${serie.id}</td>
        <td>${serie.name}</td>
        <td>${serie.channel}</td>
        <td>${serie.seasons}</td>
      </tr>
    `).join('');
        // Agregar event listeners a cada fila
        const filas = document.querySelectorAll('.serie-row');
        filas.forEach(fila => {
            fila.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id') || '0');
                const serieSel = series.find(s => s.id === id);
                if (serieSel) {
                    serieSeleccionada = serieSel;
                    mostrarDetalle(serieSel);
                    // Marcar fila como seleccionada
                    document.querySelectorAll('.serie-row').forEach(r => r.classList.remove('table-active'));
                    e.currentTarget.classList.add('table-active');
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
function mostrarDetalle(serie) {
    const detalleDiv = document.getElementById('detalleCard');
    if (detalleDiv) {
        detalleDiv.innerHTML = `
      <div class="card">
        <img src="${serie.image}" class="card-img-top" alt="${serie.name}">
        <div class="card-body">
          <h5 class="card-title">${serie.name}</h5>
          <p class="card-text"><strong>Canal:</strong> ${serie.channel}</p>
          <p class="card-text"><strong>Temporadas:</strong> ${serie.seasons}</p>
          <p class="card-text"><strong>Descripción:</strong></p>
          <p class="card-text">${serie.description}</p>
          <a href="${serie.url}" class="btn btn-primary" target="_blank">Ver en sitio oficial</a>
        </div>
      </div>
    `;
    }
}
function limpiarDetalle() {
    const detalleDiv = document.getElementById('detalleCard');
    if (detalleDiv) {
        detalleDiv.innerHTML = `
      <div class="alert alert-info" role="alert">
        Selecciona una serie para ver el detalle
      </div>
    `;
    }
}
mostrarTabla();
limpiarDetalle();
//# sourceMappingURL=app.js.map
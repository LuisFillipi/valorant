function fetchMapDetails(mapUuid) {
return fetch(`https://valorant-api.com/v1/maps/${mapUuid}`)
    .then(response => {
    if (!response.ok) {
    throw new Error('Erro ao obter os dados do mapa.');
}
    return response.json();
});
}

// dados da api

function showMapDetails(mapUuid) {
fetchMapDetails(mapUuid)

.then(mapDetails => {
if (mapDetails && mapDetails.data) {
    const mapDiv = document.querySelector(`#map-${mapUuid}`);
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('map-details');
    detailsDiv.innerHTML = `
        <h2>${mapDetails.data.displayName}</h2>
        <p>${mapDetails.data.narrativeDescription}</p>
        <p>${mapDetails.data.tacticalDescription}</p>
`;

    mapDiv.appendChild(detailsDiv);
} else {
    console.error('Dados do mapa incompletos:', mapDetails);
}
})
.catch(error => {
    console.error('Erro ao obter os detalhes do mapa:', error);
});
}
  
// ter os dados da api

function fetchMaps() {
fetch('https://valorant-api.com/v1/maps')
.then(response => {
    if (!response.ok) {
    throw new Error('Erro ao obter os dados dos mapas.');
}
    return response.json();
})

.then(data => {
const mapsContainer = document.querySelector('.maps');
data.data.forEach(map => {
    const mapDiv = document.createElement('div');
        mapDiv.classList.add('map');
        mapDiv.setAttribute('id', `map-${map.uuid}`);
        mapDiv.innerHTML = `
        <img src="${map.splash}" alt="${map.name}" onclick="showMapDetails('${map.uuid}')">
    `;
    mapsContainer.appendChild(mapDiv);
});
}).catch(error => {
    console.error('Erro:', error.message);
    });
}
  
window.addEventListener('load', fetchMaps);
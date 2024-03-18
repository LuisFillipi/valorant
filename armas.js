function fetchWeaponDetails(weaponUuid) {
return fetch(`https://valorant-api.com/v1/weapons/${weaponUuid}`)
.then(response => {
if (!response.ok) {
    throw new Error('Erro ao obter os dados da arma.');
}
    return response.json();
});
}
  
function showWeaponDetails(weaponUuid) {
const weaponDiv = document.querySelector(`#weapon-${weaponUuid}`);
if (weaponDiv.querySelector('.weapon-details')) {
    return;
}
  
fetchWeaponDetails(weaponUuid)
.then(weaponDetails => {
if (weaponDetails && weaponDetails.data) {
const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('weapon-details');
    detailsDiv.innerHTML = `
    <h2>${weaponDetails.data.displayName}</h2>
    <p>${weaponDetails.data.category}</p>
    <p>Preço: ${weaponDetails.data.shopData.cost}</p>
    <p>categoria: ${weaponDetails.data.shopData.categoryText}</p>
`;

weaponDiv.appendChild(detailsDiv);
} else {
    console.error('Dados da arma incompletos:', weaponDetails);
}
}).catch(error => {
    console.error('Erro ao obter os detalhes da arma:', error);
});
}  

function fetchWeapons() {
fetch('https://valorant-api.com/v1/weapons')
.then(response => {
if (!response.ok) {
    throw new Error('Erro ao obter os dados das armas.');
}
    return response.json();
})

.then(data => {
const weaponsContainer = document.querySelector('.weapons');
data.data.forEach(weapon => {
const weaponDiv = document.createElement('div');
    weaponDiv.classList.add('weapon');
    weaponDiv.setAttribute('id', `weapon-${weapon.uuid}`);
    weaponDiv.innerHTML = `
    <img src="${weapon.displayIcon}" alt="${weapon.displayName}" onclick="showWeaponDetails('${weapon.uuid}')">
`;
weaponsContainer.appendChild(weaponDiv);
});
}).catch(error => {
console.error('Erro:', error.message);
});
}

window.addEventListener('load', fetchWeapons);
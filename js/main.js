const diccionario = {
    'Derrha': 'tssyfruQDtIAqHFn6_PYZE9T59tAJuKC84O0CJSDjonvZ43ICxVGobGBtQ',
    'Juan': 'x5ArhdY1Loa-0O7sNsrcVFXF-xHhN8x1-VRrdyETe8BlOF1gGsQDa7I_-A',
    'Shalom': '_NGH7E0CdC4huOMRPXf-AXoSQG__Qtqskc8jks9y-C2yEYX1YwglqvybYA',
    'Mora': '6w8j7Te17VKixI5OqG_JFWvRdzHgvY9FpAiXIRw8sUvbjnFHrMv6nw_2UQ',
    'Felipa': 'dDAliuV1ZUhoNdMnjOl9xsEtWxUfTPLmnWf72wAuoKol1dysYWp-kT3_uw',
    //'Flor': 'FVOuJVyxlRRrgDLzVVMIe2pDXJHsWJyvbX7iFZbupaWEZN3rzFEv9wozNw',
    'Salem': 'oMG97YNMvOl8Rh9jMDhCMhfW29V2mRdn3gA7_jAwA95-CtTkqzTfVoCKXQ',
    'Machi': 'uNtt3NF3QYHBgM0P9-IeKMjtxR7_qfbLjahyRLFTTfhUI2SkvWUYKKqTPw',
};

const URLApi = 'https://tft-api.op.gg/api/v1/na/summoners/';


async function fetchData() {
    const loader = document.getElementById('loader');
    loader.classList.remove('hidden'); // Mostrar el loader

    const fetchedData = {};

    for (const summonerName in diccionario) {
        const summonerId = diccionario[summonerName];
        const response = await fetch(`${URLApi}${summonerId}`);
        const data = await response.json();
        fetchedData[summonerName] = data.data;
    }

    loader.classList.add('hidden'); // Ocultar el loader después de cargar los datos
    return fetchedData;
}

async function renewProfiles() {
    for (const summonerName in diccionario) {
        let summonerId = diccionario[summonerName];
        console.log(`${URLApi}${summonerId}/renew`);
        // Make a POST to api to renew the profile
        
        const response = await fetch(`${URLApi}${summonerId}/renew`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log(response);
        const data = await response.json();
        console.log(response);
        return
    }
}
async function buildTable(data) {
    let table = document.getElementById('leaderBoard');
    let winStreak = '🔥';
    let loseStreak = '❄️';

    let tbody = table.querySelector('tbody'); // Obtén solo el cuerpo de la tabla

    let tableHTML = ''; // Variable para almacenar el HTML de las filas

    for (const summonerName in data) {
        let summoner = data[summonerName].summoner;
        let entry = data[summonerName].summoner.entry;
        let rank = entry && entry.RANKED_TFT ? entry.RANKED_TFT : null; // Verifica si entry y entry.RANKED_TFT existen

        let row = `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${summonerName}
                </th>
                <td class="px-6 py-4">
                    ${summoner.gameName}
                </td>
                <td class="px-6 py-4">
                    ${rank ? (rank.tier || 'Unranked') + ' ' + (rank.rank || '') : 'Unranked'} 
                </td>
                <td class="px-6 py-4">
                   ${rank.wins + '/' + rank.losses} 
                </td>
            </tr>`;

        tableHTML += row; // Agrega la fila al HTML de las filas
    }

    tbody.innerHTML = tableHTML; // Establece el HTML completo de las filas en el cuerpo de la tabla
}

async function main() {
    renewProfiles();
    // Renew profiles every 5 minutes
    setInterval(renewProfiles, 300000);
    const data = await fetchData();
    buildTable(data);
    // Refresh data every 5 minutes
    setInterval(async () => {
        const data = await fetchData();
        buildTable(data);
    }, 300000);
}

main();
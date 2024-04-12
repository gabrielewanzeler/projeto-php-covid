document.addEventListener('DOMContentLoaded', function () {
    
    const countrySelect = document.getElementById('countrySelect');
    const stateListElement = document.getElementById('stateList');
    const lastUpdateElement = document.getElementById('lastUpdate');
    const containerVisor2 = document.querySelector('.container-visor2 h1');

    countryForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const selectedCountry = countrySelect.value;
        fetchData(selectedCountry);
        updateLastUpdate(selectedCountry);
        document.querySelector(".container-visor2").classList.remove("hide");
        containerVisor2.textContent = `País: ${selectedCountry}`;   

    function fetchData(country) {
        console.log(`Solicitando dados da API-Covid-19 para o país ${country}`);
        fetch(`https://dev.kidopilabs.com.br/exercicio/covid.php?pais=${country}`)
            .then(response => {
                console.log(`Resposta recebida da API-Covid-19 para o país ${country}:`, response);
                return response.json();
            })
            .then(data => {
                console.log(`Dados recebidos da API-Covid-19 para o país ${country}`);
                updateTotalStats(data);
                updateStateStats(data);
                storeAccessData(country);
                createChart(data);
                updateLastUpdate(country);
            })
            .catch(error => console.error('Erro ao obter dados:', error));
    }
});
    
    function updateTotalStats(data) {
        
        const totalCases = calculateTotalCases(data);
        const totalDeaths = calculateTotalDeaths(data);
    
        document.getElementById('confirmedCasesNumber').textContent = totalCases.toLocaleString('pt-BR');
        document.getElementById('totalDeathsNumber').textContent = totalDeaths.toLocaleString('pt-BR');
        document.querySelector("#totalStats").classList.remove("hide");
    }
    
    function calculateTotalCases(data) {
        let totalCases = 0;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                totalCases += data[key].Confirmados;
            }
        }
        return totalCases;
    }

    function calculateTotalDeaths(data) {
        let totalDeaths = 0;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                totalDeaths += data[key].Mortos;
            }
        }
        return totalDeaths;
    }
    
    function updateStateStats(data) {
        stateListElement.innerHTML = '';
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const stateData = data[key];
                const confirmedCasesFormatted = stateData.Confirmados.toLocaleString('pt-BR');
                const deathsFormatted = stateData.Mortos.toLocaleString('pt-BR');
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <p>Estado: ${stateData.ProvinciaEstado}</p>
                    <p>Casos confirmados: ${confirmedCasesFormatted}, Mortes: ${deathsFormatted}</p>`;
                stateListElement.appendChild(listItem);
            }
        }
        document.querySelector("#stateStats").classList.remove("hide");
    }
    
    function updateLastUpdate(country) {
        fetch('store_access_data.php')
            .then(response => response.json())
            .then(data => {
                if (data) {
                    const lastAccess = new Date(data.access_time);
                    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                    const formattedDate = lastAccess.toLocaleDateString('pt-BR', options);
                    const formattedTime = lastAccess.toLocaleTimeString('pt-BR');
                    lastUpdateElement.textContent = `Última busca: ${formattedDate}, ${formattedTime} - País acessado: ${data.country}`;
                } else {
                    lastUpdateElement.textContent = `Não há dados de acesso anteriores.`;
                }
            })
            .catch(error => console.error('Erro ao obter dados de último acesso:', error));
    }    
    
    updateLastUpdate();

    function storeAccessData(country) {
        const currentDate = new Date();
        const requestData = {
            country: country,
            accessTime: currentDate.toISOString() // convertendo a data para o formato ISO para facilitar
        };
    
        fetch('store_access_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar os dados de acesso.');
            }
            console.log('Dados de acesso enviados com sucesso.');
        })
        .catch(error => console.error('Erro ao enviar os dados de acesso:', error));
    }
    //updateLastUpdate(selectedCountry);
    
    function createChart(data) {
        const labels = [];
        const confirmedCases = [];
    
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const stateData = data[key];
                labels.push(stateData.ProvinciaEstado);
                confirmedCases.push(stateData.Confirmados);
            }
        }
    
        const ctx = document.getElementById('chart').getContext('2d');

        if (window.myChart instanceof Chart) {
            window.myChart.destroy();
        }
    
        window.myChart = new Chart(ctx, {
            type: 'pie', // Tipo de gráfico de pizza
            data: {
                labels: labels,
                datasets: [{
                    label: 'Casos Confirmados',
                    data: confirmedCases,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(255, 99, 132, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    labels: {
                        fontSize: 14
                    }
                },
                title: {
                    display: true,
                    text: 'Casos Confirmados',
                    fontSize: 17 
                },
                defaultFontFamily: "'Arial', sans-serif",
                defaultFontSize: 16 
            }
        });
        
        document.querySelector(".info").classList.remove("hide");
    }

});
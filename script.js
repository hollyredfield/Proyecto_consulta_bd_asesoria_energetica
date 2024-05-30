document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    fetchResults();
});

document.getElementById('showAll').addEventListener('click', function(event) {
    event.preventDefault();
    fetchAllResults();
});

function fetchResults() {
    let cif = document.getElementById('cif').value.trim();
    let nombre = document.getElementById('nombre').value.trim();
    let comercializadora = document.getElementById('comercializadora').value.trim();
    let estado = document.getElementById('estado').value.trim();

    const url = `http://192.168.101.4:3000/asesoria_energetica?cif=${cif}&nombre=${nombre}&comercializadora=${comercializadora}&estado=${estado}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Verifica la estructura de los datos aquí

            const resultsTableBody = document.getElementById('resultsTableBody');
            resultsTableBody.innerHTML = '';

            if (Array.isArray(data)) {
                cif = cif.toLowerCase();
                nombre = nombre.toLowerCase();
                comercializadora = comercializadora.toLowerCase();
                estado = estado.toLowerCase();

                let filteredData = data.filter(contract => {
                    let matches = true;

                    if (cif) {
                        matches = matches && typeof contract.CIF === 'string' && contract.CIF.toLowerCase() === cif;
                    }
                    if (nombre) {
                        matches = matches && typeof contract.NOMBRE === 'string' && contract.NOMBRE.toLowerCase() === nombre;
                    }
                    if (comercializadora) {
                        matches = matches && typeof contract.COMERCIALIZADORA === 'string' && contract.COMERCIALIZADORA.toLowerCase() === comercializadora;
                    }
                    if (estado) {
                        matches = matches && typeof contract.ESTADO === 'string' && contract.ESTADO.toLowerCase() === estado;
                    }

                    return matches;
                });

                filteredData.forEach(contract => {
                    const row = document.createElement('tr');

                    const id = contract.CIF ?? 'N/A';
                    const nombre = contract.NOMBRE ?? 'N/A';
                    const fecha = contract.FECHA ?? 'N/A';
                    const comercializadora = contract.COMERCIALIZADORA ?? 'N/A';
                    const estado = contract.ESTADO ?? 'N/A';

                    row.innerHTML = `
                        <td>${id}</td>
                        <td>${nombre}</td>
                        <td>${fecha}</td>
                        <td>${comercializadora}</td>
                        <td>${estado}</td>
                    `;
                    resultsTableBody.appendChild(row);
                });
            } else {
                console.error('Respuesta inesperada:', data);
            }
        })
        .catch(error => console.error('Error al realizar la consulta:', error));
}

function fetchAllResults() {
    const url = `http://192.168.101.4:3000/asesoria_energetica`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Verifica la estructura de los datos aquí

            const resultsTableBody = document.getElementById('resultsTableBody');
            resultsTableBody.innerHTML = '';

            if (Array.isArray(data)) {
                data.forEach(contract => {
                    const row = document.createElement('tr');

                    const id = contract.CIF ?? 'N/A';
                    const nombre = contract.NOMBRE ?? 'N/A';
                    const fecha = contract.FECHA ?? 'N/A';
                    const comercializadora = contract.COMERCIALIZADORA ?? 'N/A';
                    const estado = contract.ESTADO ?? 'N/A';

                    row.innerHTML = `
                        <td>${id}</td>
                        <td>${nombre}</td>
                        <td>${fecha}</td>
                        <td>${comercializadora}</td>
                        <td>${estado}</td>
                    `;
                    resultsTableBody.appendChild(row);
                });
            } else {
                console.error('Respuesta inesperada:', data);
            }
        })
        .catch(error => console.error('Error al realizar la consulta:', error));
}
window.onload = function() {
    var ctx1 = document.getElementById('contratosChart').getContext('2d');
    var chart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
            datasets: [{
                label: 'Contratos',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var ctx2 = document.getElementById('estadoChart').getContext('2d');
    var datos = [
        {
            "CIF":"70817608X",
            "NOMBRE":"PAOLA HERNANZ ASENSIO",
            "CUPS":"ES0315000011500600BA",
            "TARIFA":"20TD",
            "COMERCIALIZADORA":"GANA ENERGIA",
            "COMERCIAL":"CHUS",
            "ESTADO":"TRAMITADO",
            "ACCIONES":"",
            "FECHA":"1/3/2023",
            "PAGADO":"",
            "O 50%":"",
            "DOCUMENTOS ADJUNTOS":"CARPETA CONTRATOS  DE BASE DE DATOS\\PAOLA HERNANZ ASENSIO.pdf",
            "FECHA DE ACABAR CONTRATO":""
        },
        // Más objetos aquí...
    ];

    var estados = {};
    for (var i = 0; i < datos.length; i++) {
        if (estados[datos[i].ESTADO]) {
            estados[datos[i].ESTADO]++;
        } else {
            estados[datos[i].ESTADO] = 1;
        }
    }

    var chart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: Object.keys(estados),
            datasets: [{
                label: 'Estado',
                data: Object.values(estados),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
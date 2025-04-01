document.getElementById('generarMatrices').addEventListener('click', generarMatrices);

async function generarMatrices() {
    try {
        const filas = parseInt(document.getElementById('filas').value);
        const columnas = parseInt(document.getElementById('columnas').value);

        if (isNaN(filas) || isNaN(columnas) || filas < 1 || columnas < 1) {
            mostrarError('Por favor ingrese valores válidos para filas y columnas');
            return;
        }

        document.getElementById('error').textContent = '';

        // Generar interfaz para Matriz 1
        const matriz1Div = document.getElementById('matriz1Inputs');
        matriz1Div.innerHTML = generarInputsMatriz(filas, columnas, 'm1');

        // Generar interfaz para Matriz 2
        const matriz2Div = document.getElementById('matriz2Inputs');
        matriz2Div.innerHTML = generarInputsMatriz(filas, columnas, 'm2');

        document.getElementById('matrices').style.display = 'block';
        document.getElementById('resultado').style.display = 'none';
    } catch (error) {
        mostrarError('Ocurrió un error al generar las matrices.');
    }
}

function generarInputsMatriz(filas, columnas, prefix) {
    let html = '<table>';
    for (let i = 0; i < filas; i++) {
        html += '<tr>';
        for (let j = 0; j < columnas; j++) {
            html += `<td><input type="number" id="${prefix}_${i}_${j}" placeholder="0"></td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    return html;
}

function mostrarResultado(matriz) {
    const resultadoDiv = document.getElementById('matrizResultado');
    let html = '<table>';
    for (let i = 0; i < matriz.length; i++) {
        html += '<tr>';
        for (let j = 0; j < matriz[i].length; j++) {
            html += `<td>${matriz[i][j]}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    resultadoDiv.innerHTML = html;
    document.getElementById('resultado').style.display = 'block';
}

function mostrarError(mensaje) {
    document.getElementById('error').textContent = mensaje;
}
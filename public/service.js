document.getElementById('sumarMatrices').addEventListener('click', sumarMatrices);

async function sumarMatrices() {
    try {
        const filas = parseInt(document.getElementById('filas').value);
        const columnas = parseInt(document.getElementById('columnas').value);

        // Capturar valores de las matriz 1
        const matriz1 = [];
        let error = false;

        for (let i = 0; i < filas; i++) {
            const fila = [];
            for (let j = 0; j < columnas; j++) {
                const valor = document.getElementById(`m1_${i}_${j}`).value;
                if (valor === '' || isNaN(valor)) {
                    mostrarError(`Por favor complete todos los valores de la Matriz 1 (fila ${i + 1}, columna ${j + 1})`);
                    error = true;
                    break;
                }
                fila.push(valor);
            }
            if (error) break;
            matriz1.push(fila);
        }
        if (error) return;

        // Capturar valores de la Matriz 2
        const matriz2 = [];
        for (let i = 0; i < filas; i++) {
            const fila = [];
            for (let j = 0; j < columnas; j++) {
                const valor = document.getElementById(`m2_${i}_${j}`).value;
                if (valor === '' || isNaN(valor)) {
                    mostrarError(`Por favor complete todos los valores de la Matriz 2 (fila ${i + 1}, columna ${j + 1})`);
                    error = true;
                    break;
                }
                fila.push(valor);
            }
            if (error) break;
            matriz2.push(fila);
        }
        if (error) return;

        // Llamada al servidor
        const response = await fetch('http://localhost:3000/sumar-matrices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matriz1, matriz2 }),
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error);
        };

        const data = await response.json();
        mostrarResultado(data.resultado);
    } catch (err) {
        mostrarError(err.message || 'Ocurrió un error al sumar las matrices.');
    };
};

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
};
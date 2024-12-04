function tablaPiezas(){

    document.getElementById('formulario').innerHTML=`
    <h2>Gestión de Piezas</h2>
    <form onsubmit="agregarPieza(event)" id="formPieza">
        <label for="numeroPieza">Número de Pieza:</label>
        <input type="number" id="numeroPieza" required><br>
        <label for="numeroPedidoPieza">Número de Pedido:</label>
        <input type="number" id="numeroPedidoPieza" required><br>
        <label for="largo">Largo (cm):</label>
        <input type="number" id="largo" step="0.1" required><br>
        <label for="ancho">Ancho (cm):</label>
        <input type="number" id="ancho" step="0.1" required><br>
        <label for="grosor">Grosor (cm):</label>
        <input type="number" id="grosor" step="0.1" required><br>
        <label for="color">Color:</label>
        <input type="text" id="color" value="Natural"><br>
        <label for="chapeado">Chapeado en ambas caras:</label>
        <select id="chapeado">
            <option value="No">No</option>
            <option value="Sí">Sí</option>
        </select><br>

        <button type="submit">Añadir Pieza</button>
    </form>`;
}

function tablaPiezasAñadidas(){
    document.getElementById('tablaPiezasContenedor').innerHTML=`
    <h3>Piezas</h3>
    <table id="tablaPiezasAñadidas">
        <thead>
            <tr>
                <th>Número</th>
                <th>Pedido</th>
                <th>Largo</th>
                <th>Ancho</th>
                <th>Grosor</th>
                <th>Color</th>
                <th>Chapeado por ambas caras</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>`;
}

function agregarPieza(event) {
    event.preventDefault();

    const numero = parseInt(document.getElementById("numeroPieza").value);
    const numeroPedido = parseInt(document.getElementById("numeroPedidoPieza").value);
    const largo = parseFloat(document.getElementById("largo").value);
    const ancho = parseFloat(document.getElementById("ancho").value);
    const grosor = parseFloat(document.getElementById("grosor").value);
    const color = document.getElementById("color").value;
    const chapeado = document.getElementById("chapeado").value;

    if (piezas.some(p => p.numero === numero)) {
        alert("El número de pieza ya existe.");
        return;
    }
    
   /* if (!pedidos.some(p => p.numero === numeroPedido)) {
        alert("El número de pedido asociado no existe.");
        return;
    }
    */

    if (!document.getElementById("tablaPiezasAñadidas")){
        tablaPiezasAñadidas();
    }

    piezas.push({ numero, numeroPedido, largo, ancho, grosor, color, chapeado });
    guardarDatos();
    actualizarTablasPiezas();
}


function actualizarTablasPiezas(){
    const tablaPiezasAñadidas = document.querySelector("#tablaPiezasAñadidas tbody");
            tablaPiezasAñadidas.innerHTML = "";
            piezas.forEach(p => {
                tablaPiezasAñadidas.innerHTML += `
                    <tr>
                        <td>${p.numero}</td>
                        <td>${p.numeroPedido}</td>
                        <td>${p.largo}</td>
                        <td>${p.ancho}</td>
                        <td>${p.grosor}</td>
                        <td>${p.color}</td>
                        <td>${p.chapeado}</td>
                        <td><button onclick="eliminarPieza(${p.numero})">Eliminar</button></td>
                    </tr>`;
            });
}

function eliminarPieza(numero) {
    const index = piezas.findIndex(p => p.numero === numero);
    if (index !== -1) piezas.splice(index, 1);
    guardarDatos();
    actualizarTablasPiezas();
}
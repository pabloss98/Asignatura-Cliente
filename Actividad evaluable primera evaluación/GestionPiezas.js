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
        <label for="cortada">Cortada:</label>
        <select id="cortada">
            <option value="No">No</option>
            <option value="Sí">Sí</option>
        </select><br>
    

        <button type="submit">Añadir Pieza</button>
    </form>
    
    
    <h2>Modificar Pieza</h2>
    <form onsubmit="ModificarPieza(event)" id="formModificar">
        <label for="numeroPieza">Número de Pieza:</label>
        <input type="number" id="numeroPiezaModificar" required><br>
        <label for="numeroPedidoPieza">Número de Pedido:</label>
        <input type="number" id="numeroPedidoPiezaModificar" required><br>
        <label for="largo">Largo (cm):</label>
        <input type="number" id="largoModificar" step="0.1" required><br>
        <label for="ancho">Ancho (cm):</label>
        <input type="number" id="anchoModificar" step="0.1" required><br>
        <label for="grosor">Grosor (cm):</label>
        <input type="number" id="grosorModificar" step="0.1" required><br>
        <label for="color">Color:</label>
        <input type="text" id="colorModificar" value="Natural"><br>
        <label for="chapeado">Chapeado en ambas caras:</label>
        <select id="chapeadoModificar">
            <option value="No">No</option>
            <option value="Sí">Sí</option>
        </select><br>
        <label for="cortada">Cortada:</label>
        <select id="cortadaModificar">
            <option value="No">No</option>
            <option value="Sí">Sí</option>
        </select><br>
    

        <button type="submit">Modificar Pieza</button>
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
                <th>Cortada</th>
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
    const cortada = document.getElementById("cortada").value;

    if (numero <= 0|| numeroPedido <= 0|| largo <= 0|| ancho <= 0|| grosor <= 0){
        alert("Todos los campos deben estar en positivo");
        return;
    }

    if (piezas.some(p => p.numero === numero)) {
        alert("El número de pieza ya existe.");
        return;
    }
    

    if (!document.getElementById("tablaPiezasAñadidas")){
        tablaPiezasAñadidas();
    }

    piezas.push({ numero, numeroPedido, largo, ancho, grosor, color, chapeado, cortada });
    guardarDatos();
    actualizarTablasPiezas();
}


function ModificarPieza(event){
    event.preventDefault(); //Prevenir el envio de formulario

    const numero = parseInt(document.getElementById("numeroPiezaModificar").value);
    const numeroPedido = parseInt(document.getElementById("numeroPedidoPiezaModificar").value);
    const largo = parseFloat(document.getElementById("largoModificar").value);
    const ancho = parseFloat(document.getElementById("anchoModificar").value);
    const grosor = parseFloat(document.getElementById("grosorModificar").value);
    const color = document.getElementById("colorModificar").value;
    const chapeado = document.getElementById("chapeadoModificar").value;
    const cortada = document.getElementById("cortadaModificar").value;

    const index = piezas.findIndex(p => p.numero === numero);

    if (index === -1) {
        alert("La pieza no existe.");
        return;
    }

    piezas[index] = {
        numero: numero,
        numeroPedido,
        largo,
        ancho,
        grosor,
        color,
        chapeado,
        cortada,
    };

    
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
                        <td>${p.cortada}</td>
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

function guardarDatos() {
    localStorage.setItem("piezas", JSON.stringify(piezas));
}
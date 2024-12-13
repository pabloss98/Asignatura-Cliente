function tabla() {
    document.getElementById('formulario').innerHTML = `
        <h2>Gestión de Pedidos</h2>
        <form onsubmit= "agregarPedido(event)"id="formPedido">
            <label for="numeroPedido">Número de Pedido:</label>
            <input type="number" id="numeroPedido" required><br>
            <label for="cliente">Cliente:</label>
            <input type="text" id="cliente" required><br>
            <label for="fecha">Fecha:</label>
            <input type="date" id="fecha" required><br>
            <label>Procesado:</label>
            <input type="checkbox" id="procesadoModificar"><br>
            <label>Servido:</label>
            <input type="checkbox" id="servidoModificar"><br>
            <button type="submit" >Añadir Pedido</button>
        </form>

        <h2>Modificar Pedido</h2>
        <form id="formModificar" onsubmit="ModificarPedido(event)">
            <label>Número de Pedido:</label>
            <input type="number" id="numeroPedidoModificar" min="1" required><br>
            <label>Cliente:</label>
            <input type="text" id="clienteModificar" maxlength="50" required><br>
            <label>Fecha de Pedido:</label>
            <input type="date" id="fechaPedidoModificar" required><br>
            <label>Procesado:</label>
            <input type="checkbox" id="procesadoModificar"><br>
            <label>Servido:</label>
            <input type="checkbox" id="servidoModificar"><br>
            <button type="submit">Modificar Pedido</button>
        </form>`;

    const fechaInput = document.getElementById('fecha');
    const today = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('max', today);
}


function tablapedidos(){
    document.getElementById('tablaPedidosContenedor').innerHTML=`
    <h3>Pedidos</h3>
    <table id="tablaPedidos">
        <thead>
            <tr>
                <th>Número</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Procesado</th>
                <th>Servido</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>`;
}


function agregarPedido(event) {
    event.preventDefault();

    const numero = parseInt(document.getElementById("numeroPedido").value);
    const cliente = document.getElementById("cliente").value;
    const fecha = document.getElementById("fecha").value;
    const procesado = document.getElementById('procesadoModificar').checked;
    const servido = document.getElementById('servidoModificar').checked;

    if (numero <= 0) {
        alert("El número de pedido debe ser un valor positivo mayor que 0.");
        return;
    }

    if (pedidos.some(p => p.numero === numero)) {
        alert("El número de pedido ya existe.");
        return;
    }

    pedidos.push({ numero, cliente, fecha, procesado: false, servido: false });
    guardarDatos();

    if (!document.getElementById("tablaPedidos")) {
        tablapedidos();
    }

    actualizarTablasPedido();
}

function ModificarPedido(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const numeroPedido = parseInt(document.getElementById('numeroPedidoModificar').value);
    const cliente = document.getElementById('clienteModificar').value;
    const fechaPedido = document.getElementById('fechaPedidoModificar').value;
    const procesado = document.getElementById('procesadoModificar').checked;
    const servido = document.getElementById('servidoModificar').checked;

    const index = pedidos.findIndex(p => p.numero === numeroPedido);

    if (index === -1) {
        alert("El pedido no existe.");
        return;
    }

    pedidos[index] = {
        numero: numeroPedido,
        cliente,
        fecha: fechaPedido,
        procesado,
        servido,
    };

 
    guardarDatos();

    actualizarTablasPedido();

    
}


function actualizarTablasPedido() {
    const tablaPedidos = document.querySelector("#tablaPedidos tbody");
    tablaPedidos.innerHTML = "";

    pedidos.forEach(p => {
        tablaPedidos.innerHTML += `
            <tr>
                <td>${p.numero}</td>
                <td>${p.cliente}</td>
                <td>${p.fecha}</td>
                <td>${p.procesado ? "Sí" : "No"}</td>
                <td>${p.servido ? "Sí" : "No"}</td>
                <td><button onclick="eliminarPedido(${p.numero})">Eliminar</button></td>
            </tr>`;
    });
}

function eliminarPedido(numero) {
    const index = pedidos.findIndex(p => p.numero === numero);
    if (index !== -1) pedidos.splice(index, 1);
    guardarDatos();
    actualizarTablasPedido();
}

function guardarDatos() {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

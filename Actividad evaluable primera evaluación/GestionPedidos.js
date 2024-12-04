function tabla(){
   
    document.getElementById('formulario').innerHTML=`
<h2>Gestión de Pedidos</h2>
    <form onsubmit= "agregarPedido(event)"id="formPedido">
        <label for="numeroPedido">Número de Pedido:</label>
        <input type="number" id="numeroPedido" required><br>
        <label for="cliente">Cliente:</label>
        <input type="text" id="cliente" required><br>
        <label for="fecha">Fecha:</label>
        <input type="date" id="fecha" required><br>
        <button type="submit" >Añadir Pedido</button>
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

//document.getElementById("BotonPedidos").addEventListener("click", tabla);

function agregarPedido(event) {
    event.preventDefault();
    
    const numero = parseInt(document.getElementById("numeroPedido").value);
    const cliente = document.getElementById("cliente").value;
    const fecha = document.getElementById("fecha").value;

    if (numero <= 0) {
        alert("El número de pedido debe ser un valor positivo mayor que 0.");
        return;
    }
    

    if (pedidos.some(p => p.numero === numero)) {
        alert("El número de pedido ya existe.");
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (fecha > today) {
        alert("La fecha no puede ser posterior al día de hoy.");
        return;
    }
    

    pedidos.push({ numero, cliente, fecha, procesado: false, servido: false });
    guardarDatos();
    

    if (!document.getElementById("tablaPedidos")){
        tablapedidos();
    }

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
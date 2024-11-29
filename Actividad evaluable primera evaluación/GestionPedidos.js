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
}

function tablapedidos(){
    document.getElementById('BotonPedidos').innerHTML=`
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

document.getElementById("BotonPedidos").addEventListener("click", tabla);

function agregarPedido() {

    
    const numero = parseInt(document.getElementById("numeroPedido").value);
    const cliente = document.getElementById("cliente").value;
    const fecha = document.getElementById("fecha").value;

    if (pedidos.some(p => p.numero === numero)) {
        alert("El número de pedido ya existe.");
        return;
    }

    pedidos.push({ numero, cliente, fecha, procesado: false, servido: false });
    guardarDatos();
    actualizarTablas();
}
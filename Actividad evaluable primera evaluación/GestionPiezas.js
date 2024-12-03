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
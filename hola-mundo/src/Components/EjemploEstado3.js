import { useState } from "react";
const EjemploEstado3 = () => {
    const[estado, setEstado] = useState(
    {
        titulo: "por defecto",
        hora: new Date().toLocaleTimeString(),
        numero:0,
        numeros:[]

    }
    )
    const cambiarEstado = () => {
        let numero = Math.round(Math.random()*4);
        let numeros = estado.numeros;
        numeros.push(numero);
        setEstado({
            hora: new Date().toLocaleTimeString(),
            numeros: numeros,
            numero: numero,
            titulo: numero % 2 == 0 ? "Numeor par" : " Numero impar"
        })
        console.log("cambiarEstado: ", estado);
    };

    const colores = ["red", "yellow", "green", "blue", "orange"];

    return(
        <>
            <div style={{backgroundColor: colores[estado.numero]}}>
                <header>
                    <h1>{estado.hora} - {estado.numero}</h1>
                </header>
                <div>{estado.hora}</div>
                Pulsa el botón para cambiar el estado
                <div>
                    <button onClick = {cambiarEstado}>Cambiar Estado</button>
                </div>

                <div>
                    Numeros generados
                    <ul>
                        {estado.numeros.map( (n) => <li key={n}>{n}</li>)}
                    </ul>
                </div>
            </div>
        </>
    )
}
export default EjemploEstado3;
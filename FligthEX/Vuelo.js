const vuelo = JSON.parse(localStorage.getItem("vuelo")) || [];

function guardarDatos() {
    localStorage.setItem("vuelo", JSON.stringify(vuelo));
}

function agregardatos(){
    const codigo = document.getElementById("codigo").value;
    const numeroplazas = parseInt(document.getElementById("numeroplazas").value);
    const importe = parseFloat(document.getElementById("importe").value);

    if (vuelo.some(p => p.codigo === codigo)) {
        alert("El vuelo ya existe.");
        return;
    }
     if (codigo <= 0) {
        alert("El codigo debe ser un valor positivo mayor que 0.");
        return;
    }
     if (numeroplazas <= 0) {
        alert("El número de plazas debe ser un valor positivo mayor que 0.");
        return;
    }
    
    if (importe <= 0) {
        alert("El importe debe ser un valor positivo mayor que 0.");
        return;
    } 
    if (codigo <= 0) {
        alert("El codigo debe ser un valor positivo mayor que 0.");
        return;
    }

    const VueloMuyRentable = [];
    const resultadosDiv = document.getElementById("resultados");

    vuelo.forEach(({ codigo, numeroplazas, importe }) => {
        if (!codigo || !numeroplazas || importe <= 0) {
            resultadosDiv.innerHTML += `<p>El usuario ${codigo} tiene datos inválidos.</p>`;
         } else {
            const resul = numeroplazas * importe;
            if (resul <= 20000){
                VueloMuyRentable.push({codigo, numeroplazas, importe});
            }
                 }

             });

             if (VueloMuyRentable.length > 0) {
                localStorage.setItem("VueloMuyRentable", JSON.stringify(VueloMuyRentable));
             }


    vuelo.push({codigo, numeroplazas, importe});
    guardarDatos();
    alert("El vuelo se ha guardado con exito");
}


function modificardatos(){
    const codigo = document.getElementById("codigo").value;
    const numeroplazas = parseInt(document.getElementById("numeroplazas").value);
    const importe = parseFloat(document.getElementById("importe").value);

    const index = vuelo.findIndex(p => p.codigo === codigo);

    

    if (codigo <= 0) {
        alert("El codigo debe ser un valor positivo mayor que 0.");
        return;
    }
     if (numeroplazas <= 0) {
        alert("El número de plazas debe ser un valor positivo mayor que 0.");
        return;
    }
    
    if (importe <= 0) {
        alert("El importe debe ser un valor positivo mayor que 0.");
        return;
    } 
    if (codigo <= 0) {
        alert("El codigo debe ser un valor positivo mayor que 0.");
        return;
    }

    if (index === -1){
        alert("El vuelo no existe");
        return;
    }else{
        vuelo.splice(index, 1);
        vuelo.push({codigo, numeroplazas, importe});
        guardarDatos();
        alert("El vuelo se ha modificado con exito");
    }

    guardarDatos();

    
}


function calcular(){

    const resultadosDiv = document.getElementById("resultados");

            resultadosDiv.innerHTML = ""; // limpia los resultados anteriores

            vuelo.forEach(({ codigo, numeroplazas, importe }) => {
                if (!codigo || !numeroplazas || importe <= 0) {
                    resultadosDiv.innerHTML += `<p>El usuario ${codigo} tiene datos inválidos.</p>`;
                 } else {
                    const resul = numeroplazas * importe;
                    if (resul <= 10000){
                        resultadosDiv.innerHTML += `<p>Poco rentable. Los ingresos estimados de ${codigo} son ${resul.toFixed(2)}. </p>`; 
                    }else if(resul > 10000 && resul <= 20000){
                        resultadosDiv.innerHTML += `<p> Rentable. Los ingresos estimados de ${codigo} son ${resul.toFixed(2)}.</p>`;
                    }else{
                        resultadosDiv.innerHTML += `<p>Muy rentable. Los ingresos estimados de ${codigo} son ${resul.toFixed(2)}. </p>`;
                    }
                         }

                     });
    
                     
}



function testUnidad2(){
    var cadena = "abc";
    var cadena2 = String("abc");
    var cadena3 = new String ("abc");
    
    document.write(typeof cadena);
    document.write("<br/>");
    document.write(typeof cadena2);
    document.write("<br/>");
    document.write(typeof cadena3);
    document.write("<br/>");
    document.write(typeof cadena3.valueOf());
    document.write("<br/>");
    let longitud = 10;
    longitud = "10";
    document.write(typeof longitud);

    if (cadena == "abc"){

        var x = 10;
        let y = 11;
    }
        
    document.write("<br/>");
    document.write(x);
    document.write("<br/>");
    document.write(y);


}
    
    function testUnidad2_1(){
        let nombre;
        let nota;
        nombre = prompt('Escriba nombre:', '');
        nota = prompt('Escriba una nota:', '');
        if (nota>=5){
            alert(nombre+ ' está aprobado con un '+ nota);
        }else {
            alert (nombre+ ' está suspenso con un '+ nota);
        }


    }


    

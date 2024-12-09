/**
 * Clase que representa los datos de una línea
 */
export class Linea {
    constructor(numero, origen, destino, horaSalida, intervalo) {
      this.Numero = parseInt(numero);
      this.Origen = origen;
      this.Destino = destino;
      this.HoraSalida = horaSalida;
      this.Intervalo = intervalo;
    }
  }
  /**
   * Clase que representa los datos de una parada
   */
  export class Parada {
    constructor(numero, numeroLinea, localidad, intervalo) {
      this.numero = numero;
      this.numeroLinea = numeroLinea;
      this.localidad = localidad;
      this.intervalo = intervalo;
    }
  
    get Numero() {
      return this.numero;
    }
  
    set Numero(valor) {
      if (!numero || isNaN(numero))
        throw "El número de parada debe tener un valor y ser numérico";
      this.numero = parseInt(valor);
    }
  
    get NumeroLinea() {
      return this.numeroLinea;
    }
  
    set NumeroLinea(valor) {
      if (!numeroLinea || isNaN(numeroLinea))
        throw "El número de línea debe tener un valor y ser numérico";
      this.numeroLinea = parseInt(valor);
    }
  
    get Localidad() {
      return this.localidad;
    }
  
    set Localidad(valor) {
      if (!valor || valor === "") throw "La localidad debe tener un valor";
      this.localidad = valor;
    }
  
    get Intervalo() {
      return this.intervalo;
    }
  
    set Intervalo(valor) {
      if (!valor || valor === "") throw "El intervalo debe tener un valor";
      this.intervalo = valor;
    }
  }
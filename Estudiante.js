export class Estudiante {
    static contadorId = 1;

    constructor(nombre, edad, nivel, calificaciones) {
        this.id = Estudiante.contadorId++;
        this.nombre = nombre;
        this.edad = edad;
        this.nivel = nivel;
        this.calificaciones = calificaciones;
    }
}

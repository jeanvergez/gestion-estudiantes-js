import { Estudiante } from './Estudiante.js';

export const GestorEstudiantes = {
    estudiantes: [],

    crearEstudiante(nombre, edad, nivel, calificaciones) {
        const nuevoEstudiante = new Estudiante(nombre, edad, nivel, calificaciones);
        this.estudiantes.push(nuevoEstudiante);
        console.log("Estudiante creado:", nuevoEstudiante);
    },

    listarEstudiantes() {
        if (this.estudiantes.length === 0) {
            console.log("No hay estudiantes registrados.");
        } else {
            console.log("Lista de estudiantes:");
            for (let estudiante of this.estudiantes) {
                console.log(`${estudiante.id} - ${estudiante.nombre}, ${estudiante.edad} años, Nivel: ${estudiante.nivel}`);
            }
        }
    },

    actualizarEstudiante(id, nuevoNombre, nuevaEdad, nuevoNivel, nuevasCalificaciones) {
        for (let estudiante of this.estudiantes) {
            if (estudiante.id === id) {
                estudiante.nombre = nuevoNombre;
                estudiante.edad = nuevaEdad;
                estudiante.nivel = nuevoNivel;
                estudiante.calificaciones = nuevasCalificaciones;
                console.log("Estudiante actualizado:", estudiante);
                return;
            }
        }
        console.log("Estudiante no encontrado.");
    },

    eliminarEstudiante(id) {
        const index = this.estudiantes.findIndex(est => est.id === id);
        if (index !== -1) {
            console.log("Estudiante eliminado:", this.estudiantes[index]);
            this.estudiantes.splice(index, 1);
        } else {
            console.log("Estudiante no encontrado.");
        }
    }
};

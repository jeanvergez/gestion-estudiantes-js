import readline from 'readline';
import { GestorEstudiantes } from './GestorEstudiantes.js';
import { obtenerListadoEstudiantes, buscarEstudiante } from './reportes.js'; // Ajustar según los reportes

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function mostrarMenu() {
    console.log(`
    --- Menú ---
    1. Crear estudiante
    2. Listar estudiantes
    3. Actualizar estudiante
    4. Eliminar estudiante
    5. Generar reportes
    6. Salir
    `);

    rl.question("Selecciona una opción: ", (opcion) => {
        switch (opcion) {
            case "1":
                rl.question("Nombre: ", (nombre) => {
                    rl.question("Edad: ", (edad) => {
                        rl.question("Nivel: ", (nivel) => {
                            rl.question("Calificaciones (formato JSON): ", (calificacionesStr) => {
                                const calificaciones = JSON.parse(calificacionesStr);
                                GestorEstudiantes.crearEstudiante(nombre, parseInt(edad), nivel, calificaciones);
                                mostrarMenu();
                            });
                        });
                    });
                });
                break;

            case "2":
                GestorEstudiantes.listarEstudiantes();
                mostrarMenu();
                break;

            case "6":
                rl.close();
                break;

            default:
                console.log("Opción no válida.");
                mostrarMenu();
        }
    });
}

export function iniciarMenu() {
    mostrarMenu();
}

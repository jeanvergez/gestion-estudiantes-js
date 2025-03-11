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

                case "3":
    rl.question("ID del estudiante a actualizar: ", (id) => {
        rl.question("Nuevo nombre: ", (nuevoNombre) => {
            rl.question("Nueva edad: ", (nuevaEdad) => {
                rl.question("Nuevo nivel: ", (nuevoNivel) => {
                    rl.question("Nuevas calificaciones (formato JSON): ", (calificacionesStr) => {
                        const nuevasCalificaciones = JSON.parse(calificacionesStr);
                        GestorEstudiantes.actualizarEstudiante(parseInt(id), nuevoNombre, parseInt(nuevaEdad), nuevoNivel, nuevasCalificaciones);
                        mostrarMenu();
                    });
                });
            });
        });
    });
    break;


    case "4":
    rl.question("ID del estudiante a eliminar: ", (id) => {
        GestorEstudiantes.eliminarEstudiante(parseInt(id));
        mostrarMenu();
    });
    break;


    case "5":
    console.log("Listado de estudiantes:", obtenerListadoEstudiantes());
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

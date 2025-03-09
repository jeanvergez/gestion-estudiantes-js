import { GestorEstudiantes } from './GestorEstudiantes.js';

export function obtenerListadoEstudiantes() {
    return GestorEstudiantes.estudiantes.map(estudiante => ({
        nombre: estudiante.nombre,
        área: estudiante.nivel
    }));
}

export function buscarEstudiante(parametro) {
    return GestorEstudiantes.estudiantes.find(estudiante =>
        estudiante.id === parametro || estudiante.nombre === parametro
    );
}

export function calcularPromedioPorEstudiante() {
    return GestorEstudiantes.estudiantes.map(estudiante => {
        const calificaciones = Object.values(estudiante.calificaciones);
        const promedio = calificaciones.reduce((acc, nota) => acc + nota, 0) / calificaciones.length;
        return {
            nombre: estudiante.nombre,
            promedio: promedio.toFixed(1),
            área: estudiante.nivel
        };
    });
}

export function filtrarEstudiantesPorUmbral(umbral) {
    return calcularPromedioPorEstudiante().filter(estudiante => estudiante.promedio > umbral);
}

export function obtenerAprobadosReprobadosPorMateria(materia, notaMinima = 60) {
    const aprobados = GestorEstudiantes.estudiantes.filter(estudiante => estudiante.calificaciones[materia] >= notaMinima);
    const reprobados = GestorEstudiantes.estudiantes.filter(estudiante => estudiante.calificaciones[materia] < notaMinima);
    return {
        aprobados: aprobados.map(est => ({
            nombre: est.nombre,
            calificación: est.calificaciones[materia],
            área: est.nivel
        })),
        reprobados: reprobados.map(est => ({
            nombre: est.nombre,
            calificación: est.calificaciones[materia],
            área: est.nivel
        }))
    };
}

export function calcularPromedioGeneralGrupo() {
    const totalCalificaciones = GestorEstudiantes.estudiantes.reduce((acc, estudiante) => {
        const calificaciones = Object.values(estudiante.calificaciones);
        return acc + calificaciones.reduce((suma, nota) => suma + nota, 0);
    }, 0);

    const totalMaterias = GestorEstudiantes.estudiantes.reduce((acc, estudiante) => {
        return acc + Object.values(estudiante.calificaciones).length;
    }, 0);

    return (totalCalificaciones / totalMaterias).toFixed(1);
}

export function promedioPorArea() {
    const promedios = {};

    GestorEstudiantes.estudiantes.forEach(estudiante => {
        const calificaciones = Object.values(estudiante.calificaciones);
        const promedioEstudiante = calificaciones.reduce((suma, nota) => suma + nota, 0) / calificaciones.length;

        if (!promedios[estudiante.nivel]) {
            promedios[estudiante.nivel] = { total: promedioEstudiante, count: 1 };
        } else {
            promedios[estudiante.nivel].total += promedioEstudiante;
            promedios[estudiante.nivel].count++;
        }
    });

    for (const area in promedios) {
        promedios[area] = (promedios[area].total / promedios[area].count).toFixed(1);
    }

    return promedios;
}

export function distribucionPorArea() {
    return GestorEstudiantes.estudiantes.reduce((distribucion, estudiante) => {
        distribucion[estudiante.nivel] = (distribucion[estudiante.nivel] || 0) + 1;
        return distribucion;
    }, {});
}

export function promedioMateriasPorArea() {
    const resultados = {};

    GestorEstudiantes.estudiantes.forEach(estudiante => {
        if (!resultados[estudiante.nivel]) {
            resultados[estudiante.nivel] = {};
        }

        for (const [materia, nota] of Object.entries(estudiante.calificaciones)) {
            if (!resultados[estudiante.nivel][materia]) {
                resultados[estudiante.nivel][materia] = { total: nota, count: 1 };
            } else {
                resultados[estudiante.nivel][materia].total += nota;
                resultados[estudiante.nivel][materia].count++;
            }
        }
    });

    for (const nivel in resultados) {
        for (const materia in resultados[nivel]) {
            resultados[nivel][materia] = (resultados[nivel][materia].total / resultados[nivel][materia].count).toFixed(1);
        }
    }

    return resultados;
}

export function mejoresYPeoresPorArea() {
    const resultados = {};

    GestorEstudiantes.estudiantes.forEach(estudiante => {
        const calificaciones = Object.values(estudiante.calificaciones);
        const promedio = calificaciones.reduce((suma, nota) => suma + nota, 0) / calificaciones.length;

        if (!resultados[estudiante.nivel]) {
            resultados[estudiante.nivel] = [];
        }

        resultados[estudiante.nivel].push({ nombre: estudiante.nombre, promedio, área: estudiante.nivel });
    });

    for (const area in resultados) {
        resultados[area] = {
            mejores: resultados[area].sort((a, b) => b.promedio - a.promedio).slice(0, 2),
            peores: resultados[area].sort((a, b) => a.promedio - b.promedio).slice(0, 2)
        };
    }

    return resultados;
}
export function rankingPorPromedio() {
    return calcularPromedioPorEstudiante().sort((a, b) => b.promedio - a.promedio);
}

export function contarAprobadosYReprobados(notaMinima = 60) {
    return GestorEstudiantes.estudiantes.reduce(
        (conteo, estudiante) => {
            const calificaciones = Object.values(estudiante.calificaciones);
            const aprobadas = calificaciones.filter(nota => nota >= notaMinima).length;
            const reprobadas = calificaciones.length - aprobadas;

            conteo.aprobados += aprobadas === calificaciones.length ? 1 : 0;
            conteo.reprobados += reprobadas > 0 ? 1 : 0;

            return conteo;
        },
        { aprobados: 0, reprobados: 0 }
    );
}

export function generarReporteAcademico() {
    const estudiantes = calcularPromedioPorEstudiante();

    const mejoresEstudiantes = estudiantes.filter(est => est.promedio > 85);
    const peoresEstudiantes = estudiantes.filter(est => est.promedio < 60);

    return {
        totalEstudiantes: GestorEstudiantes.estudiantes.length,
        promedioGeneralGrupo: calcularPromedioGeneralGrupo(),
        mejoresEstudiantes,
        peoresEstudiantes
    };
}


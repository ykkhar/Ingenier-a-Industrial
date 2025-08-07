const malla = {
"I": {
  "Preliminares de Matemática": ["Algebra", "Análisis Matemático I a"],
  "Algebra": ["Geometría Analítica", "Física I", "Probabilidad y Estadística", "Computación I"],
  "Análisis Matemático I a": ["Geometría Analítica", "Análisis Matemático I b", "Física I", "Química General"],
  "Ingeniería y Sistemas Socioeconómicos": ["Introducción a la Economía"],
},
"II": {
  "Geometría Analítica": ["Análisis Matemático II"],
  "Sistemas de Representación I": ["Estabilidad I", "Sistemas de Representación II"],
  "Análisis Matemático I b": ["Análisis Matemático II", "Física II", "Estabilidad I", "Probabilidad y Estadística"],
  "Física I": ["Física II", "Estabilidad I", "Termodinámica", "Mecánica Racional"],
},
"III": {
  "Análisis Matemático II": ["Análisis Matemático III", "Métodos Numéricos", "Termodinámica", "Mecánica Racional"],
  "Química General": ["Termodinámica", "Conocimiento de Materiales"],
  "Física II": ["Electrotecnia General"],
  "Estabilidad I": ["Estabilidad II"],
  "Inglés I": ["Inglés II", "Electrotecnia General", "Elementos de Máquinas", "Física III", "Introducción a la Economía", "Mecánica de los Fluidos"],
},
"IV": {
  "Análisis Matemático III": ["Física III", "Electrotecnia General", "Mecánica de los Fluidos"],
  "Estabilidad II": ["Conocimiento de Materiales"],
  "Probabilidad y Estadística": ["Introducción a la Economía", "Física III", "Máquinas y Medidas Eléctricas"],
  "Métodos Numéricos": ["Máquinas Térmicas"],
  "Computación I": ["Computación II", "Sistemas de Representación II"],
  "Inglés II": ["Instalaciones Eléctricas", "Investigación Operativa", "Máquinas Hidráulicas", "Máquinas Térmicas", "Organización Industrial II"],
},
"V": {
  "Termodinámica": ["Mecánica de los Fluidos"],
  "Computación II": [],
  "Sistemas de Representación II": [],
  "Conocimiento de Materiales": ["Elementos de Máquinas"],
  "Mecánica Racional": ["Elementos de Máquinas", "Física III", "Mecánica de los Fluidos"],
},
"VI": {
  "Elementos de Máquinas": ["Máquinas y Medidas Eléctricas", "Tecnología Mecánica", "Máquinas Hidráulicas", "Máquinas Térmicas"],
  "Introducción a la Economía": ["Organización Industrial I"],
  "Física III": ["Electrónica I"],
  "Electrotecnia General": ["Máquinas y Medidas Eléctricas", "Electrónica I"],
  "Mecánica de los Fluidos": ["Máquinas Térmicas", "Máquinas Hidráulicas"],
},
"VII": {
  "Máquinas y Medidas Eléctricas": ["Instalaciones Eléctricas", "Instalaciones Industriales"],
  "Electrónica I": [],
  "Tecnología Mecánica": [],
  "Organización Industrial I": ["Investigación Operativa", "Organización Industrial II"],
},
"VIII": {
  "Investigación Operativa": ["Gestión de Calidad"],
  "Organización Industrial II": ["Legislación", "Gestión de Calidad", "Organización Industrial III", "Seguridad, Higiene y Gestión Ambiental", "Costos Industriales"],
  "Instalaciones Eléctricas": ["Emprendedurismo y Proyecto de Inversión"],
  "Máquinas Térmicas": ["Instalaciones Industriales"],
  "Máquinas Hidráulicas": ["Instalaciones Industriales"],
},
"IX": {
  "Legislación": ["Emprendedurismo y Proyecto de Inversión"],
  "Instalaciones Industriales": [],
  "Gestión de Calidad": ["Emprendedurismo y Proyecto de Inversión"],
  "Organización Industrial III": ["Emprendedurismo y Proyecto de Inversión"],
  "Seguridad, Higiene y Gestión Ambiental": ["Emprendedurismo y Proyecto de Inversión"],
  "Costos Industriales": ["Emprendedurismo y Proyecto de Inversión"],
},
"XI": {
  "Emprendedurismo y Proyecto de Inversión": []
}
};

const estadoRamos = {};
const ramosPorSemestre = {};

for (const [semestre, ramos] of Object.entries(malla)) {
  ramosPorSemestre[semestre] = Object.keys(ramos);
  for (const [nombre, abre] of Object.entries(ramos)) {
    estadoRamos[nombre] = {
      nombre,
      requisitos: [],
      abre,
      aprobado: false
    };
  }
}

for (const ramo of Object.values(estadoRamos)) {
  for (const destino of ramo.abre) {
    if (!estadoRamos[destino]) {
      estadoRamos[destino] = {
        nombre: destino,
        requisitos: [],
        abre: [],
        aprobado: false
      };
    }
    estadoRamos[destino].requisitos.push(ramo.nombre);
  }
}

function crearRamoDiv(nombre) {
  const ramo = estadoRamos[nombre];
  const div = document.createElement("div");
  div.className = "ramo";
  div.id = nombre;
  div.innerHTML = `<strong>${nombre}</strong><br><button class="boton">Aprobé</button>`;

  const boton = div.querySelector("button");
  boton.onclick = () => {
    ramo.aprobado = !ramo.aprobado;
    actualizarEstado();
  };

  return div;
}

function actualizarEstado() {
  for (const ramo of Object.values(estadoRamos)) {
    const div = document.getElementById(ramo.nombre);
    if (!div) continue;

    const puedeActivarse = ramo.requisitos.every(req => estadoRamos[req]?.aprobado);
    div.classList.toggle("activo", puedeActivarse || ramo.requisitos.length === 0);
    div.classList.toggle("aprobado", ramo.aprobado);
  }
}

function renderizarMalla() {
  const mallaDiv = document.getElementById("malla");
  for (const [semestre, ramos] of Object.entries(ramosPorSemestre)) {
    const semestreDiv = document.createElement("div");
    semestreDiv.className = "semestre";
    semestreDiv.innerHTML = `<h2>${semestre} Semestre</h2>`;

    for (const nombre of ramos) {
      const ramoDiv = crearRamoDiv(nombre);
      semestreDiv.appendChild(ramoDiv);
    }
    mallaDiv.appendChild(semestreDiv);
  }

  // Detectar ramos no ubicados en semestres
  const ramosNoUbicados = Object.keys(estadoRamos).filter(
    nombre => !Object.values(ramosPorSemestre).flat().includes(nombre)
  );

  if (ramosNoUbicados.length > 0) {
    const otrosDiv = document.createElement("div");
    otrosDiv.className = "semestre";
    otrosDiv.innerHTML = `<h2>Otros</h2>`;

    for (const nombre of ramosNoUbicados) {
      const ramoDiv = crearRamoDiv(nombre);
      otrosDiv.appendChild(ramoDiv);
    }

    mallaDiv.appendChild(otrosDiv);
  }

  actualizarEstado();
}

document.addEventListener("DOMContentLoaded", renderizarMalla);

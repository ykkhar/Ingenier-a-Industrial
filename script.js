// Datos: semestres con asignaturas y requisitos
const semestres = [
  {
    nombre: "I Semestre",
    asignaturas: {
      "Preliminares de Matemática": [],
      "Algebra": ["Preliminares de Matemática"],
      "Análisis Matemático I a": ["Preliminares de Matemática"],
      "Ingeniería y Sistemas Socioeconómicos": []
    }
  },
  {
    nombre: "II Semestre",
    asignaturas: {
      "Geometría Analítica": ["Algebra", "Análisis Matemático I a"],
      "Sistemas de Representación I": [],
      "Análisis Matemático I b": ["Análisis Matemático I a"],
      "Física I": ["Algebra", "Análisis Matemático I a"]
    }
  },
  {
    nombre: "III Semestre",
    asignaturas: {
      "Análisis Matemático II": ["Geometría Analítica", "Análisis Matemático I b"],
      "Química General": ["Análisis Matemático I a"],
      "Física II": ["Física I", "Análisis Matemático I b"],
      "Estabilidad I": ["Física I", "Análisis Matemático I b", "Sistemas de Representación I"],
      "Inglés I": []
    }
  },
  {
    nombre: "IV Semestre",
    asignaturas: {
      "Análisis Matemático III": ["Análisis Matemático II"],
      "Estabilidad II": ["Estabilidad I"],
      "Probabilidad y Estadística": ["Algebra", "Análisis Matemático I b"],
      "Métodos Numéricos": ["Análisis Matemático II"],
      "Computación I": ["Algebra"],
      "Inglés II": ["Inglés I"]
    }
  },
  {
    nombre: "V Semestre",
    asignaturas: {
      "Termodinámica": ["Física I", "Química General", "Análisis Matemático II"],
      "Computación II": ["Computación I"],
      "Sistemas de Representación II": ["Sistemas de Representación I", "Computación I"],
      "Conocimiento de Materiales": ["Química General", "Estabilidad II"],
      "Mecánica Racional": ["Análisis Matemático II"]
    }
  },
  {
    nombre: "VI Semestre",
    asignaturas: {
      "Elementos de Máquinas": ["Conocimiento de Materiales", "Mecánica Racional"],
      "Introducción a la Economía": ["Ingeniería y Sistemas Socioeconómicos", "Inglés I", "Probabilidad y Estadística"],
      "Física III": ["Mecánica Racional", "Inglés I", "Análisis Matemático III", "Probabilidad y Estadística"],
      "Electrotecnia General": ["Física II", "Análisis Matemático III", "Inglés I"],
      "Mecánica de los Fluidos": ["Análisis Matemático III", "Mecánica Racional", "Termodinámica"]
    }
  },
  {
    nombre: "VII Semestre",
    asignaturas: {
      "Máquinas y Medidas Eléctricas": ["Elementos de Máquinas", "Electrotecnia General"],
      "Electrónica I": ["Física III", "Electrotecnia General"],
      "Tecnología Mecánica": ["Elementos de Máquinas"],
      "Organización Industrial I": ["Introducción a la Economía"]
    }
  },
  {
    nombre: "VIII Semestre",
    asignaturas: {
      "Investigación Operativa": ["Organización Industrial I", "Inglés II"],
      "Organización Industrial II": ["Organización Industrial I"],
      "Instalaciones Eléctricas": ["Máquinas y Medidas Eléctricas", "Inglés II"],
      "Máquinas Térmicas": ["Métodos Numéricos", "Mecánica de los Fluidos", "Elementos de Máquinas"],
      "Máquinas Hidráulicas": ["Mecánica de los Fluidos", "Elementos de Máquinas"]
    }
  },
  {
    nombre: "IX Semestre",
    asignaturas: {
      "Legislación": ["Organización Industrial II"],
      "Instalaciones Industriales": ["Máquinas Hidráulicas", "Máquinas Térmicas", "Máquinas y Medidas Eléctricas"],
      "Gestión de Calidad": ["Organización Industrial II", "Investigación Operativa"],
      "Organización Industrial III": ["Organización Industrial II"],
      "Seguridad, Higiene y Gestión Ambiental": ["Organización Industrial II"],
      "Costos Industriales": ["Organización Industrial II"]
    }
  },
  {
    nombre: "X Semestre",
    asignaturas: {
      "Electiva 1": [],
      "Electiva 2": [],
      "Electiva 3": [],
      "Electiva 4": []
    }
  },
  {
    nombre: "XI Semestre",
    asignaturas: {
      "Emprendedurismo y Proyecto de Inversión": [
        "Instalaciones Eléctricas", "Gestión de Calidad", "Organización Industrial III",
        "Seguridad, Higiene y Gestión Ambiental", "Costos Industriales", "Legislación",
        "Electiva 1", "Electiva 2", "Electiva 3", "Electiva 4"
      ]
    }
  },
  {
    nombre: "Final de Carrera",
    asignaturas: {
      "Proyecto Final de Ingeniería": ["Emprendedurismo y Proyecto de Inversión"]
    }
  }
];

const aprobadas = new Set();

function crearMalla() {
  const contenedor = document.getElementById("malla");

  semestres.forEach((semestre, idx) => {
    const col = document.createElement("div");
    col.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = semestre.nombre;
    col.appendChild(titulo);

    Object.keys(sem

const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      { value: 1, name: `${"1.".green} Buscar ciudad` },
      { value: 2, name: `${"2.".green} Historial` },
      { value: 0, name: `${"0.".green} Salir` },
    ],
  },
];
const pausaOpcion = [
  {
    type: "input",
    name: "enter",
    message: `Presione ${"ENTER".green} para continuar`,
  },
];
const inquirerMenu = async () => {
  console.clear();
  console.log("===========================".green);
  console.log("   Seleccione una opción  ");
  console.log("===========================\n".green);
  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};
const pausa = async () => {
  console.log("\n");
  const { pausa } = await inquirer.prompt(pausaOpcion);
  return pausa;
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.trim().length === 0) {
          return "Por favor, ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};
const listadoLugares = async (lugares = []) => {
  const opcionesLugares = lugares.map((lugar, i) => {
    const idx = `${i + 1}.`.green;
    return { value: lugar.id, name: `${idx} ${lugar.nombre}` };
  });
  opcionesLugares.unshift({
    value: "0",
    name: "0. ".green + "Cancelar",
  });
  const opcionesMenuLugares = [
    {
      type: "list",
      name: "id",
      message: "Selecciona el lugar:",
      choices: opcionesLugares,
    },
  ];

  const { id } = await inquirer.prompt(opcionesMenuLugares);
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const opcionesTareas = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const opcionesMenuBorrar = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciona",
      choices: opcionesTareas,
    },
  ];

  const { ids } = await inquirer.prompt(opcionesMenuBorrar);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoLugares,
  confirmar,
  mostrarListadoChecklist,
};

const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
const main = async () => {
  let opt;
  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const termino = await leerInput("Ciudad: ");
        const lugares = await busquedas.ciudad(termino);
        const lugarId = await listadoLugares(lugares);
        if (lugarId === "0") continue;
        const lugarSeleccionado = lugares.find((lugar) => lugar.id === lugarId);
        busquedas.agregarHistorial(lugarSeleccionado.nombre);

        const climaLugarSeleccionado = await busquedas.climaLugar(
          lugarSeleccionado.lat,
          lugarSeleccionado.lng
        );
        console.log("\nInformacion de la ciudad\n".green);
        console.log("Ciudad: " + lugarSeleccionado.nombre);
        console.log("Lat: " + lugarSeleccionado.lat);
        console.log("Lng: " + lugarSeleccionado.lng);
        console.log("Temperatura: " + climaLugarSeleccionado.temp + "°");
        console.log("Mínima: " + climaLugarSeleccionado.min + "°");
        console.log("Máxima: " + climaLugarSeleccionado.max + "°");
        console.log("Cómo esta el clima: " + climaLugarSeleccionado.desc);

        break;
      case 2:
        busquedas.historialCapitalizado.forEach((lugar, i) => {
          const idx = `${i + 1}`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;
      default:
        break;
    }
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};
main();

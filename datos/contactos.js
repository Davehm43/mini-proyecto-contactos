// ==================================================
// IMPORTAR HERRAMIENTAS
// ==================================================

const fs = require("fs");
const path = require("path");


// ==================================================
// RUTA DEL ARCHIVO JSON
// ==================================================

const rutaArchivo = path.join(
  __dirname,
  "..",
  "contactos.json"
);


// ==================================================
// OBTENER CONTACTOS
// ==================================================

function obtenerContactos() {

  const contenido = fs.readFileSync(
    rutaArchivo,
    "utf8"
  );

  return JSON.parse(contenido);
}


// ==================================================
// GUARDAR CONTACTOS
// ==================================================

function guardarContactos(contactos) {

  const contenido = JSON.stringify(
    contactos,
    null,
    2
  );

  fs.writeFileSync(
    rutaArchivo,
    contenido
  );
}


// ==================================================
// EXPORTAR FUNCIONES
// ==================================================

module.exports = {
  obtenerContactos,
  guardarContactos
};
const fs = require("fs");
// Leer tareas.json
const contenido = fs.readFileSync("contactos.json", "utf8");

// Convertir JSON a array de JavaScript
let contactos = JSON.parse(contenido);

const {
 mostrarContactos,
 agregarContactos,
 guardarContactos,
 eliminarContactos,
 buscarContacto,
 buscarContactosPorNombre,
 editarContacto

} = require("./operaciones");

const opcion = Number(process.argv[2]);

switch (opcion) {

  // 1. Mostrar contactos
  case 1:
    mostrarContactos(contactos);
    break;

  // 2. Agregar contacto
  case 2: {
    const nombre = process.argv[3];
    const telefono = process.argv[4];

    agregarContactos(contactos, nombre, telefono);
    break;
  }

  // 3. Buscar contacto
  case 3: {
    const nombre = process.argv[3];

    buscarContactosPorNombre(contactos, nombre);
    break;
  }r

  // 4. Editar contacto
  case 4: {
    const id = Number(process.argv[3]);
    const nuevoNombre = process.argv[4];
    const nuevoTelefono = process.argv[5];
    
    if (!id || !nuevoNombre || !nuevoTelefono) {
    console.log("❌ Faltan datos para editar");
    break;
  }
    editarContacto(contactos, id, nuevoNombre, nuevoTelefono);
    break;
  }

  // 5. Eliminar contacto
  case 5: {
    const id = Number(process.argv[3]);

    eliminarContactos(contactos, id);
    break;
  }

  // Opción incorrecta
default:
  console.log("📱 GESTOR DE CONTACTOS");
  console.log("");
  console.log("Uso:");
  console.log("1 → Mostrar contactos");
  console.log("2 → Agregar contacto");
  console.log("3 → Buscar contacto");
  console.log("4 → Editar contacto");
  console.log("5 → Eliminar contacto");
  console.log("");
  console.log("Ejemplos:");
  console.log("node app.js 1");
  console.log("node app.js 2 Carlos 999111222");
  console.log("node app.js 3 Carlos");
  console.log("node app.js 4 2 David 926780420");
  console.log("node app.js 5 2");
}
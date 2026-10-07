const fs = require("fs");

function guardarContactos(contactos){
    const contenido = JSON.stringify(contactos, null, 2);
    
      fs.writeFileSync("contactos.json", contenido);
}


function mostrarContactos(contactos) {
  console.log("📋 CONTACTOS");

  contactos.forEach((contacto) => {

    console.log(`${contacto.id} - [${contacto.nombre}] ${contacto.telefono}`);
  });
}


function agregarContactos(contactos, nombre,telefono) {
  
  if (!nombre) {
    console.log("❌ El nombre es obligatorio");
    return;
  }

  // Validar teléfono
  if (!telefono) {
    console.log("❌ El teléfono es obligatorio");
    return;
  }

const contactoExistente = contactos.find((contacto) => {
  return contacto.telefono === telefono;
});

  if (contactoExistente) {
  console.log("❌ Ese telefono ya está registrado");
  return;
}
  const ultimoId = contactos.reduce((maximo, contacto) => {
    return Math.max(maximo, contacto.id);
  }, 0);

  const nuevoContacto = {
    id: ultimoId + 1,
    nombre:nombre,
    telefono:telefono
  };

  contactos.push(nuevoContacto);
  guardarContactos(contactos);

}

function eliminarContactos(contactos,id){
    const nuevosContactos=contactos.filter((contacto)=>contacto.id!==id);

    if (nuevosContactos.length===contactos.length){
        console.log(`❌el contacto ${id} no existe`);
        return;
    }
    contactos.length=0;

    nuevosContactos.forEach((contacto)=>{
        contactos.push(contacto);
    })
    guardarContactos(contactos);
}

function buscarContacto(contactos, nombre){
   const contacto = contactos.find((contacto) => contacto.nombre.toLowerCase().trim() === nombre.toLowerCase().trim());

   if(contacto){
    console.log("🔎 contacto encontrado");
    console.log(`ID: ${contacto.id}`);
    console.log(`Nombre: ${contacto.nombre}`);
    console.log(`Teléfono: ${contacto.telefono}`);
   }else{
      console.log(`❌ el nombre ${nombre} no existe`);
}
   }

function buscarContactosPorNombre(contactos, nombre) {
  const resultados = contactos.filter((contacto) => {
    return contacto.nombre.toLowerCase().trim().includes(nombre.toLowerCase().trim());
  });

  if (resultados.length > 0) {
    resultados.forEach((contacto) => {
      console.log(`ID: ${contacto.id}`);
      console.log(`Nombre: ${contacto.nombre}`);
      console.log(`Teléfono: ${contacto.telefono}`);
    });
  } else {
    console.log(`❌ No encontramos contactos con "${nombre}"`);
  }
}

function editarContacto(contactos,id,nuevoNombre,nuevoTelefono){
  
  if(!nuevoNombre){
    console.log("el nombre esta vacio");
    return;
  }
  
  if (!nuevoTelefono) {
  console.log("❌ El teléfono está vacío");
  return;
}

  const contacto=contactos.find((contacto)=>{
    return contacto.id===id;
  });

  if(!contacto){
    console.log(`❌ El contacto con ID ${id} no existe`);
    return;
  }

  const telefonoExistente=contactos.find((contacto)=>{
    return contacto.telefono===nuevoTelefono&&contacto.id !== id;
  });

  if (telefonoExistente){
    console.log("❌ Ese teléfono ya está registrado");
    return;
  }
  contacto.nombre=nuevoNombre;
  contacto.telefono=nuevoTelefono;

  guardarContactos(contactos);
  console.log("✅ Contacto actualizado correctamente");
}

module.exports = {
    mostrarContactos,
    guardarContactos,
    agregarContactos,
    eliminarContactos,
    buscarContacto,
    buscarContactosPorNombre,
    editarContacto
};


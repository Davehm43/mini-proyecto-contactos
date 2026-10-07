// ==================================================
// IMPORTAR HERRAMIENTAS
// ==================================================

const {
  obtenerContactos,
  guardarContactos
} = require("../datos/contactos");


// ==================================================
// GET: OBTENER TODOS LOS CONTACTOS
// ==================================================

function listarContactos(req, res, next) {
  try {
    const contactos = obtenerContactos();

    res.json(contactos);

  } catch (error) {
    next(error);
  }
}


// ==================================================
// GET: OBTENER CONTACTO POR ID
// ==================================================

function obtenerContactoPorId(req, res, next) {
  try {
    const contactos = obtenerContactos();

    const id = Number(req.params.id);

    const contacto = contactos.find((contacto) => {
      return contacto.id === id;
    });

    if (!contacto) {
      return res.status(404).json({
        mensaje: "Contacto no encontrado"
      });
    }

    res.json(contacto);

  } catch (error) {
    next(error);
  }
}


// ==================================================
// POST: CREAR CONTACTO
// ==================================================

function crearContacto(req, res, next) {
  try {
    const contactos = obtenerContactos();

    const { nombre, telefono } = req.body;

    // Validar que exista nombre
    if (!nombre) {
      return res.status(400).json({
        mensaje: "El nombre es obligatorio"
      });
    }

    // Quitar espacios al inicio y al final
    const nombreLimpio = nombre.trim();

    // Validar que no sean solamente espacios
    if (!nombreLimpio) {
      return res.status(400).json({
        mensaje: "El nombre es obligatorio"
      });
    }

    // Validar que exista teléfono
    if (!telefono) {
      return res.status(400).json({
        mensaje: "El teléfono es obligatorio"
      });
    }

    // Validar que tenga exactamente 9 dígitos
    if (!/^\d{9}$/.test(telefono)) {
      return res.status(400).json({
        mensaje: "El teléfono debe tener exactamente 9 dígitos"
      });
    }

    // Comprobar si el teléfono ya existe
    const contactoExistente = contactos.find((contacto) => {
      return contacto.telefono === telefono;
    });

    if (contactoExistente) {
      return res.status(400).json({
        mensaje: "Ese teléfono ya está registrado"
      });
    }

    // Obtener el último ID
    const ultimoId = contactos.reduce((maximo, contacto) => {
      return Math.max(maximo, contacto.id);
    }, 0);

    // Crear nuevo contacto
    const nuevoContacto = {
      id: ultimoId + 1,
      nombre: nombreLimpio,
      telefono: telefono
    };

    // Agregar al array
    contactos.push(nuevoContacto);

    // Guardar en JSON
    guardarContactos(contactos);

    // Responder
    res.status(201).json(nuevoContacto);

  } catch (error) {
    next(error);
  }
}

// ==================================================
// PUT: ACTUALIZAR CONTACTO COMPLETO
// ==================================================

// ==================================================
// PUT: ACTUALIZAR CONTACTO COMPLETO
// ==================================================

function actualizarContacto(req, res, next) {
  try {
    const contactos = obtenerContactos();

    const id = Number(req.params.id);

    const { nombre, telefono } = req.body;

    // ==========================================
    // VALIDAR NOMBRE
    // ==========================================

    if (!nombre) {
      return res.status(400).json({
        mensaje: "El nombre es obligatorio"
      });
    }

    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      return res.status(400).json({
        mensaje: "El nombre es obligatorio"
      });
    }

    // ==========================================
    // VALIDAR TELÉFONO
    // ==========================================

    if (!telefono) {
      return res.status(400).json({
        mensaje: "El teléfono es obligatorio"
      });
    }

    if (!/^\d{9}$/.test(telefono)) {
      return res.status(400).json({
        mensaje: "El teléfono debe tener exactamente 9 dígitos"
      });
    }

    // ==========================================
    // BUSCAR CONTACTO
    // ==========================================

    const contacto = contactos.find((contacto) => {
      return contacto.id === id;
    });

    if (!contacto) {
      return res.status(404).json({
        mensaje: "Contacto no encontrado"
      });
    }

    // ==========================================
    // COMPROBAR TELÉFONO DUPLICADO
    // ==========================================

    const telefonoExistente = contactos.find((contacto) => {
      return contacto.telefono === telefono &&
        contacto.id !== id;
    });

    if (telefonoExistente) {
      return res.status(400).json({
        mensaje: "Ese teléfono ya está registrado"
      });
    }

    // ==========================================
    // ACTUALIZAR CONTACTO
    // ==========================================

    contacto.nombre = nombreLimpio;
    contacto.telefono = telefono;

    // ==========================================
    // GUARDAR CAMBIOS
    // ==========================================

    guardarContactos(contactos);

    // ==========================================
    // RESPONDER
    // ==========================================

    res.json(contacto);

  } catch (error) {
    next(error);
  }
}

// ==================================================
// PATCH: ACTUALIZAR PARCIALMENTE
// ==================================================

function actualizarParcialmenteContacto(req, res, next) {
  try {
    const contactos = obtenerContactos();

    const id = Number(req.params.id);

    const { nombre, telefono } = req.body;

    // Buscar contacto
    const contacto = contactos.find((contacto) => {
      return contacto.id === id;
    });

    // Si no existe
    if (!contacto) {
      return res.status(404).json({
        mensaje: "Contacto no encontrado"
      });
    }

    // ==========================================
    // ACTUALIZAR NOMBRE
    // ==========================================

    if (nombre) {
      const nombreLimpio = nombre.trim();

      if (!nombreLimpio) {
        return res.status(400).json({
          mensaje: "El nombre es obligatorio"
        });
      }

      contacto.nombre = nombreLimpio;
    }

    // ==========================================
    // ACTUALIZAR TELÉFONO
    // ==========================================

    if (telefono) {

      // Validar 9 dígitos
      if (!/^\d{9}$/.test(telefono)) {
        return res.status(400).json({
          mensaje: "El teléfono debe tener exactamente 9 dígitos"
        });
      }

      // Comprobar teléfono duplicado
      const telefonoExistente = contactos.find((contacto) => {
        return contacto.telefono === telefono &&
          contacto.id !== id;
      });

      if (telefonoExistente) {
        return res.status(400).json({
          mensaje: "Ese teléfono ya está registrado"
        });
      }

      contacto.telefono = telefono;
    }

    // Guardar cambios
    guardarContactos(contactos);

    // Responder
    res.json(contacto);

  } catch (error) {
    next(error);
  }
}


// ==================================================
// DELETE: ELIMINAR CONTACTO
// ==================================================

function eliminarContacto(req, res, next) {
  try {
    const contactos = obtenerContactos();

    const id = Number(req.params.id);

    const indice = contactos.findIndex((contacto) => {
      return contacto.id === id;
    });

    if (indice === -1) {
      return res.status(404).json({
        mensaje: "Contacto no encontrado"
      });
    }

    contactos.splice(indice, 1);

    guardarContactos(contactos);

    res.json({
      mensaje: "Contacto eliminado correctamente"
    });

  } catch (error) {
    next(error);
  }
}


// ==================================================
// EXPORTAR CONTROLADORES
// ==================================================

module.exports = {
  listarContactos,
  obtenerContactoPorId,
  crearContacto,
  actualizarContacto,
  actualizarParcialmenteContacto,
  eliminarContacto
};
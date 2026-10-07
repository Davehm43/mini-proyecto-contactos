// ==================================================
// VALIDAR ACTUALIZACIÓN PARCIAL
// ==================================================

function validarActualizacionContacto(req, res, next) {

  const { nombre, telefono } = req.body;

  // ==========================================
  // VALIDAR NOMBRE SI FUE ENVIADO
  // ==========================================

  if (nombre !== undefined) {

    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      return res.status(400).json({
        mensaje: "El nombre no puede estar vacío"
      });
    }

    req.body.nombre = nombreLimpio;
  }

  // ==========================================
  // VALIDAR TELÉFONO SI FUE ENVIADO
  // ==========================================

  if (telefono !== undefined) {

    if (!/^\d{9}$/.test(telefono)) {
      return res.status(400).json({
        mensaje: "El teléfono debe tener exactamente 9 dígitos"
      });
    }
  }

  // ==========================================
  // CONTINUAR
  // ==========================================

  next();
}


// ==================================================
// EXPORTAR
// ==================================================

module.exports = validarActualizacionContacto;
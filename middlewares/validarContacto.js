function validarContacto(req, res, next) {

  const { nombre, telefono } = req.body;

  if (!nombre) {
    return res.status(400).json({
      mensaje: "El nombre es obligatorio"
    });
  }

  if (!telefono) {
    return res.status(400).json({
      mensaje: "El teléfono es obligatorio"
    });
  }

  next();
}

module.exports = validarContacto;
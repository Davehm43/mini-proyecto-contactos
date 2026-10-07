// ==================================================
// IMPORTAR EXPRESS
// ==================================================

const express = require("express");

const router = express.Router();


// ==================================================
// IMPORTAR CONTROLADORES
// ==================================================

const {
  listarContactos,
  obtenerContactoPorId,
  crearContacto,
  actualizarContacto,
  actualizarParcialmenteContacto,
  eliminarContacto
} = require("../controladores/contactosController");


// ==================================================
// IMPORTAR MIDDLEWARES
// ==================================================

const validarContacto = require("../middlewares/validarContacto");


// ==================================================
// RUTAS GET
// ==================================================

router.get("/contactos", listarContactos);

router.get("/contactos/:id", obtenerContactoPorId);


// ==================================================
// RUTA POST
// ==================================================

router.post(
  "/contactos",
  validarContacto,
  crearContacto
);


// ==================================================
// RUTA PUT
// ==================================================

router.put(
  "/contactos/:id",
  validarContacto,
  actualizarContacto
);


// ==================================================
// RUTA PATCH
// ==================================================

router.patch(
  "/contactos/:id",
  actualizarParcialmenteContacto
);


// ==================================================
// RUTA DELETE
// ==================================================

router.delete(
  "/contactos/:id",
  eliminarContacto
);


// ==================================================
// EXPORTAR ROUTER
// ==================================================

module.exports = router;
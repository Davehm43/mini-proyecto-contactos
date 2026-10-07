// ==================================================
// IMPORTAR EXPRESS
// ==================================================

const express = require("express");
const cors = require("cors");

// ==================================================
// CREAR APLICACIÓN EXPRESS
// ==================================================

const app = express();

app.use(cors());

// ==================================================
// MIDDLEWARE
// ==================================================

app.use(express.json());

// Permite que Express sirva los archivos de la carpeta public
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log("📥 Llegó una petición");
  next();
});



// ==================================================
// IMPORTAR RUTAS
// ==================================================

const contactosRouter = require("./rutas/contactos");

// ==================================================
// CONECTAR RUTAS
// ==================================================

app.use(contactosRouter);

// ==================================================
// MANEJO DE ERRORES
// ==================================================

app.use((err, req, res, next) => {

  console.log("❌ Error:", err.message);

  res.status(500).json({
    mensaje: "Error interno del servidor"
  });

});

// ==================================================
// INICIAR SERVIDOR
// ==================================================

app.listen(3000, () => {
  console.log(
    "🚀 Servidor funcionando en http://localhost:3000"
  );
});
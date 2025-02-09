import express, { Request, Response } from "express";

import { setupSwagger } from "../../config/swagger";
import { authRoutes } from "../routes";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

setupSwagger(app);

app.get("/", (_: Request, res: Response) => {
  res.send(`    
<html>
  <head>
    <title>Coordinadora API | Gestión de Envíos y Rutas Logísticas</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        margin-top: 50px;
      }
      h1 {
        color: #007bff;
      }
      p {
        color: #333;
        font-size: 18px;
      }
      a {
        color: #007bff;
        font-size: 20px;
        cursor: pointer;
        text-decoration: none;
        &:hover {
          color: #0075e3;
          font-weight: 600;
        }
      }
    </style>
  </head>
  <body>
    <h1>🚀 Bienvenido Gestión de Envíos y Rutas Logísticas API</h1>
    <p>Esta API está en funcionamiento y lista para recibir solicitudes.</p>
    <p>Revisa la documentación para conocer los endpoints disponibles.</p>
    <p><a href="./api/docs">Ver documentación</a></p>
  </body>
</html>
    `);
});

export default app;

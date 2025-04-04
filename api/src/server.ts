import express, { Application } from "express";
import cors from "cors";
import { router } from "./router";

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/", router(app));

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

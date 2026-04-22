import express from "express";
import cors from "cors";
import routers from "./routes/index.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routers);

export default app;

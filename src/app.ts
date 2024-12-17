import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("welcome to family api");
});

app.use(routes);

export default app;

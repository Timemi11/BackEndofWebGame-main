import express, { Request, Response } from "express";
import connectDB from "./config/db";
import cors from "cors";
import ProductRoute from "./route/product.route";
import SurveyRoute from "./route/survey.route";
import LineRoute from "./route/line.route";

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.use(
  cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.status(201).json({ message: "Welcome to Auth ts" });
});

app.get("/ping", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome Ping" });
});

app.use(ProductRoute);
app.use(SurveyRoute);
app.use(LineRoute);

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

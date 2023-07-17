import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import routes from "./src/routes/routes.js";
import mongoose from "mongoose";
import uri from "./src/config/connection.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: false }));
app.use(json());
app.use(cors());
app.use(cookieParser());
app.use(routes);

mongoose.set("strictQuery", true);
mongoose
  .connect(uri)
  .then(() => {
    app.listen(PORT, () => {
      console.info(`App is listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    throw error;
  });

app.get("/", (req, res) => {
  res.send("Hello World test me check connection!");
});
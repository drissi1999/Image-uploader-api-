import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import sequelize from "./database/db";
import User from "./models/User";
import imagesRoute from "./routes/image.routes";

const app = express();
// Settings
app.set("port", process.env.PORT || 3001);

// Middlewares
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

// Routes
app.use(imagesRoute);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB connected");
    app.listen(app.get("port"), () => {
      console.log("Server listening on port", app.get("port"));
    });
  })
  .catch((err) => {
    console.log(err);
  });

import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";

//db
import connectDB from "./db/connect.js";

//routers
import authRouter from "./routes/authRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";

//middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import authenticateUser from "./middleware/auth.js";

const app = express();
dotenv.config();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/project", authenticateUser, projectRouter);
app.use("/api/v1/transaction", authenticateUser, transactionRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server started on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();

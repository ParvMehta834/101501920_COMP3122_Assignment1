import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import employeeRoutes from "./routes/employee.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", employeeRoutes);

app.use((req, res) => {
  return res.status(404).json({ status: false, message: "Not Found" });
});

const PORT = process.env.PORT || 8081;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
});
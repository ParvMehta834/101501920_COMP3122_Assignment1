import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import employeeRoutes from "./routes/employee.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", employeeRoutes);

app.use((req, res) => {
  return res.status(404).json({ status: false, message: "Not Found" });
});

const PORT = process.env.PORT || 8081;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
});

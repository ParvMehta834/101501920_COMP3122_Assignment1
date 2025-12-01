import { Router } from "express";
import { body, param, query } from "express-validator";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import {
  listEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees
} from "../controllers/employee.controller.js";
import { runValidation } from "../middleware/validate.js";
import { auth } from "../middleware/auth.js";

const router = Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });


router.use(auth);


router.get("/employees", listEmployees);


router.get(
  "/employees/search",
  [
   
    query("department").optional().isString(),
    query("position").optional().isString()
  ],
  runValidation,
  searchEmployees
);

router.post(
  "/employees",
  upload.single("profile_picture"),
  [
    body("first_name").notEmpty().withMessage("First name is required"),
    body("last_name").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("position").notEmpty().withMessage("Position is required"),
    body("salary").isNumeric().withMessage("Salary must be a number"),
    body("date_of_joining").notEmpty().withMessage("Date of joining is required"),
    body("department").notEmpty().withMessage("Department is required")
  ],
  runValidation,
  createEmployee
);


router.get(
  "/employees/:eid",
  [param("eid").isMongoId().withMessage("Invalid Employee ID")],
  runValidation,
  getEmployee
);


router.put(
  "/employees/:eid",
  upload.single("profile_picture"),
  [param("eid").isMongoId().withMessage("Invalid Employee ID")],
  runValidation,
  updateEmployee
);


router.delete(
  "/employees/:eid",
  [param("eid").isMongoId().withMessage("Invalid Employee ID")],
  runValidation,
  deleteEmployee
);

export default router;

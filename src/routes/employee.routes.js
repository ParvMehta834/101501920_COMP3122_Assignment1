import { Router } from "express";
import { body, param, query } from "express-validator";
import {
  listEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee
} from "../controllers/employee.controller.js";
import { runValidation } from "../middleware/validate.js";

const router = Router();

router.get("/employees", listEmployees);

router.post(
  "/employees",
  [
    body("first_name").notEmpty(),
    body("last_name").notEmpty(),
    body("email").isEmail(),
    body("position").notEmpty(),
    body("salary").isNumeric(),
    body("date_of_joining").isISO8601(),
    body("department").notEmpty()
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
  [param("eid").isMongoId().withMessage("Invalid Employee ID")],
  runValidation,
  updateEmployee
);

router.delete(
  "/employees",
  [query("eid").isMongoId().withMessage("Employee ID required")],
  runValidation,
  deleteEmployee
);

export default router;
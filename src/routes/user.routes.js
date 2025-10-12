import { Router } from "express";
import { body } from "express-validator";
import { signup, login } from "../controllers/user.controller.js";
import { runValidation } from "../middleware/validate.js";

const router = Router();

router.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
  ],
  runValidation,
  signup
);

router.post(
  "/login",
  [
    body("email").optional().isEmail(),
    body("username").optional().isString(),
    body("password").notEmpty().withMessage("Password is required")
  ],
  runValidation,
  login
);

export default router;
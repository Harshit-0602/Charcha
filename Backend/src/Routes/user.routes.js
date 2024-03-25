import { Router } from "Express";
import { login, register } from "../Controllers/users.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login",login)

export { router };

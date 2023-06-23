import express from "express";
import authCtrl from "../controllers/authCtrl";
import { validRegister } from "../middleware/vaild";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/register", validRegister, authCtrl.register);

router.post("/company", authCtrl.company);

router.post("/active", authCtrl.activeAccount);

router.post("/login", authCtrl.login);

router.get("/logout", auth, authCtrl.logout);

router.post("/forgot_password", authCtrl.forgotPassword);

export default router;

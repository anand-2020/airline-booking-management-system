import { Router } from "express";

const router = Router();

//LOGIN
router.post("/", login);

//LOG OUT
router.post("/logout", logout);

export default router;

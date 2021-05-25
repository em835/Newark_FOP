import express from "express";
import { getDocument, postDocument } from "../controllers/mdocumentController.js";
import { isAdmin, isAuth } from "../utils/utils.js";

const router = express.Router();


router.post("/mdocument", isAuth, postDocument);

router.get("/mdocument", isAuth, isAdmin,  getDocument);

export default router


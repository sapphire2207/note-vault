import { Router } from 'express';
import {
    getAllNotes,
} from "../controllers/dashboard.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/").get(verifyJWT, getAllNotes);

export default router;
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    addNote,
    getNoteById,
    deleteNote,
    updateNote,
} from "../controllers/notes.controller.js";

const router = Router();

router.route("/").post(verifyJWT, addNote);

router
    .route("/note/:noteId")
    .get(verifyJWT, getNoteById)
    .delete(verifyJWT, deleteNote)
    .patch(verifyJWT, updateNote);

export default router;
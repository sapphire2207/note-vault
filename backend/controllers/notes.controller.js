import mongoose from "mongoose";
import {Note} from "../models/note.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getNoteById = asyncHandler(async (req, res) => {
    const { noteId } = req.params;

    if (!mongoose.isValidObjectId(noteId)) {
        throw new ApiError(400, "Invalid note id");
    }

    const note = await Note.findOne({
        _id: noteId,
        user: req.user?._id
    });

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    return res.status(200).json(
        new ApiResponse(200, note, "Note fetched successfully")
    );
});

const addNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        throw new ApiError(400, "Title and content are required");
    }

    const note = await Note.create({
        title,
        content,
        user: req.user?._id
    });

    if (!note) {
        throw new ApiError(500, "Failed to create note");
    }

    return res.status(201).json(
        new ApiResponse(201, note, "Note created successfully")
    );
});

const updateNote = asyncHandler(async (req, res) => {
    const { noteId } = req.params;
    const { title, content } = req.body;

    if (!mongoose.isValidObjectId(noteId)) {
        throw new ApiError(400, "Invalid note id");
    }

    if (!title && !content) {
        throw new ApiError(400, "At least one field is required to update");
    }

    const note = await Note.findById(noteId);

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    if (note.user.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "You are not allowed to edit this note");
    }

    const updatedNote = await Note.findByIdAndUpdate(
        noteId,
        {
            $set: {
                ...(title && { title }),
                ...(content && { content })
            }
        },
        { new: true }
    );

    return res.status(200).json(
        new ApiResponse(200, updatedNote, "Note updated successfully")
    );
});

const deleteNote = asyncHandler(async (req, res) => {
    const { noteId } = req.params;

    if (!mongoose.isValidObjectId(noteId)) {
        throw new ApiError(400, "Invalid note id");
    }

    const note = await Note.findById(noteId);

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    if (note.user.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "You are not allowed to delete this note");
    }

    await Note.findByIdAndDelete(noteId);

    return res.status(200).json(
        new ApiResponse(200, { noteId }, "Note deleted successfully")
    );
});

export {
    getNoteById,
    addNote,
    updateNote,
    deleteNote
};

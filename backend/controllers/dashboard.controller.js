import mongoose from "mongoose";
import { Note } from "../models/note.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getAllNotes = asyncHandler(async (req, res) => {
  const { page = 1, limit = 12 } = req.query;
  const userId = req.user?._id;

  const pipeline = [
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $project: {
        title: 1,
        content: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ];

  const notesAggregate = Note.aggregate(pipeline);

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  const notes = await Note.aggregatePaginate(notesAggregate, options);

  return res.status(200).json(
    new ApiResponse(200, notes, "Notes fetched successfully")
  );
});

export { getAllNotes };
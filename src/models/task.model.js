import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      // enum: ["To Do", "In Progress", "Done", "Timeout"],
    },
    deadline: {
      type: Date,
      required: true,
      min: 1, // Ensures the duration is at least 1 minute
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);

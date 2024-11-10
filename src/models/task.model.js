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
    },
    deadline: {
      type: Date,
      required: true,
      min: 1, 
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);

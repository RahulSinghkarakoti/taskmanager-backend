import mongoose, { isValidObjectId } from "mongoose";
import { Task } from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, deadline } = req.body;

  // Check for empty title or description
  if ([title, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Title or description cannot be empty");
  }

  // Check if task with the same title or description already exists
  const existTask = await Task.findOne({
    $or: [{ title }, { description }],
  });
  if (existTask) {
    throw new ApiError(
      409,
      "Task with this title or description already exists"
    );
  }

  // Ensure status is provided
  if (!status) {
    throw new ApiError(400, "Task status is required");
  }

  // Ensure deadline is provided and it's a valid date
  if (!deadline) {
    throw new ApiError(400, "Task deadline is required");
  }
  const deadlineDate = new Date(deadline);
  if (isNaN(deadlineDate)) {
    throw new ApiError(400, "Invalid date format for deadline");
  }

  // Create the task
  const taskInstance = await Task.create({
    title,
    description,
    status,
    deadline: deadlineDate, // Save the deadline as a Date
  });

  // Return the response
  if (taskInstance) {
    return res
      .status(201)
      .json(new ApiResponse(201, taskInstance, "Task created successfully"));
  } else {
    throw new ApiError(500, "Something went wrong, task creation failed");
  }
});

const getTaskById = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  console.log(taskId);
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, task, "task fetched succeswsfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong, task fetching failed");
  }
});

const getAllTasks = asyncHandler(async (req, res) => {
  console.log("in getalltasks route");
  try {
    const allTasks = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          tasks: {
            $push: {
              _id:"$_id",
              title: "$title",
              description: "$description",
              deadline: "$deadline",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Optionally sort by status alphabetically or you can customize it
      },
    ]);

    return res
      .status(200)
      .json(new ApiResponse(200, allTasks, "tasks fetched succeswsfully"));
  } catch (error) {
    throw new ApiError(500, " Failed to get all tasks ");
  }
});

const updateTask = asyncHandler(async (req, res) => {
  console.log("in update task route");
  const { id } = req.params;  
  const { title, description, status, deadline } = req.body;  

  try {
    // Create an object with the fields to be updated
    const updatedFields = {};

    if (title) {
      if (typeof title !== "string" || title.trim() === "") {
        throw new ApiError(400, "Invalid title. It must be a non-empty string.");
        
      }
      updatedFields.title = title.trim();
    }

    // Validate and handle 'description'
    if (description) {
      if (typeof description !== "string" || description.trim() === "") {
        throw new ApiError(400, "Invalid description. It must be a non-empty string.");

        
      }
      updatedFields.description = description.trim();
    }

    // Validate and handle 'status'
    if (status) {
      const validStatuses = ["To Do", "In Progress", "Done", "Timeout"];
      if (!validStatuses.includes(status)) {
        throw new ApiError(400, "Invalid status. It must be one of the following: To Do, In Progress, Done, Timeout");
        
      }
      updatedFields.status = status;
    }

    // Validate and handle 'deadline'
    if (deadline) {
      const deadlineDate = new Date(deadline);
      if (isNaN(deadlineDate)) {
        throw new ApiError(400, "Invalid deadline. It must be a valid date.");
         
      }
      updatedFields.deadline = deadlineDate;
    }

    // Ensure at least one field is provided to update
    if (Object.keys(updatedFields).length === 0) {
      throw new ApiError(400, "At least one field must be provided to update.");
     
    }

    // Find the task by ID and update it
    const updatedTask = await Task.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    // Check if the task exists
    if (!updatedTask) {
      throw new ApiError(404, "Task not found.");
    }

    // Return the updated task as a response
   
      return res
      .status(200)
      .json(new ApiResponse(200, updatedTask, "task updated succeswsfully"));
  } catch (error) {
    throw new ApiError(500, "Internal server error",error);
    
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  console.log("in delete task route")
  const {id} = req.params;
  // console.log(id)
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      throw new ApiError(404, "Task not found");
      }
      return res
      .status(200)
      .json(new ApiResponse(200, task, "task deleted successfully"));
      
  } catch (error) {
    throw new ApiError(500, "Internal server error",error);
    
  }
});


const doneTask= asyncHandler(async (req, res)=>{
  console.log("in done task route")
  const {id}= req.params;
  try {
      const task = await Task.findByIdAndUpdate(id, {status: "Done"}, {new: true});
      if (!task) {
        throw new ApiError(404, "Task not found");
        }
        return res
        .status(200)
        .json(new ApiResponse(200, task, "task done successfully"));
  } catch (error) {
    throw new ApiError(500, "Internal server error",error);
  }

})

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask,doneTask };

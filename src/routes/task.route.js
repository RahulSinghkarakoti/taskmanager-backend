import { Router } from "express";
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    doneTask
} from "../controllers/task.controller.js"

const router=Router()

router.route("/").get(getAllTasks);
router.route("/:id").get(getTaskById);
router.route("/").post(createTask);
router.route("/:id").put(updateTask);
router.route("/:id").delete(deleteTask);
router.route("/:id").patch(doneTask);
 
export default router;

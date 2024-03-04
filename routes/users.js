const express = require("express");
const { addTask, deleteTask, editTask, updateTask, userTask } = require("../controllers/userTask");
const router = express.Router();
router.post("/addTask", addTask);
router.delete("/deleteTask", deleteTask);
router.get("/editTask", editTask);
router.put("/updateTask/:id", updateTask); //issue in update.
router.get("/userTask/:id",userTask);

module.exports = router;

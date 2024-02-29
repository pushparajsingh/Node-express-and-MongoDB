const express = require("express");
const { addTask, deleteTask, editTask, updateTask } = require("../controllers/userTask");
const router = express.Router();
router.post("/addTask", addTask);
router.delete("/deleteTask", deleteTask);
router.get("/editTask", editTask);
router.put("/updateTask", updateTask);

module.exports = router;

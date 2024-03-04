const Task = require("../models/taskSchema");
const errorMiddleware = require("../middleware/error");

const addTask = async (req, res, next) => {
  try {
    const { task, description, isCompleted, user } = req.body;
    const taskObj = await Task.find({ task, description, isCompleted, user });
    if (taskObj.length) {
      errorMiddleware(
        {
          statusCode: 400,
          success: false,
          message: "Task already Exist",
        },
        res
      );
    }
    const data = await Task.create(req.body);
    data.save();
    return errorMiddleware(
      {
        statusCode: 200,
        success: true,
        message: "Task added successfully",
      },
      res
    );
  } catch (error) {
    next(error);
  }
};
const editTask = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const data = await Task.findById({ _id });
    if (!data) {
      return errorMiddleware(
        {
          statusCode: 400,
          success: false,
          message: "Task is not present...",
        },
        res
      );
    }
    return errorMiddleware(
      {
        statusCode: 200,
        success: true,
        message: "get Task successfully...",
      },
      res,
      data
    );
  } catch (error) {
    next(error);
  }
};
const deleteTask = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const task = await Task.findById({ _id });
    if (!task)
      return errorMiddleware(
        {
          statusCode: 200,
          success: true,
          message: "Task is not Exist",
        },
        res
      );
    await task.deleteOne();
    return errorMiddleware(
      {
        statusCode: 200,
        success: true,
        message: "Task is deleted successfully",
      },
      res
    );
  } catch (error) {
    next(error);
  }
};
const userTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.find({ user:id });
    if (!task)
      return errorMiddleware(
        {
          statusCode: 200,
          success: true,
          message: "Task is not Exist",
        },
        res
      );
    return errorMiddleware(
      {
        statusCode: 200,
        success: true,
        message: "Task is deleted successfully",
      },
      res,
      task
    );
  } catch (error) {
    next(error);
  }
};
const updateTask = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { task, description, isCompleted, user } = req.body;
    const singleTask = await Task.findOne({ _id });
   
    if (!singleTask) {
      return errorMiddleware(
        {
          statusCode: 404,
          success: false,
          message: "Task not found"
        },
        res
      );
    }
   
    const data = await Task.updateOne(
      { "_id": _id },
      { $set: { task, description, isCompleted, user } },
      { upsert: true }
    );
   
    return errorMiddleware(
      {
        statusCode: 200,
        success: true,
        message: "Update successful",
      },
      res,
      data
    );
  } catch (error) {
    next(error); 
  }
};

module.exports = {
  addTask,
  editTask,
  deleteTask,
  updateTask,
  userTask
};

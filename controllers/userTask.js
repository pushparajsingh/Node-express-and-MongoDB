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
    const data = await Task.find({ _id });
    if (!data) {
      return errorMiddleware(
        {
          statusCode: 400,
          success: false,
          message: "Task is not present...",
        },
        res,
        data
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
    const data = await Task.deleteOne({ _id });
    if(data)
    return errorMiddleware({
      statusCode: 200,
      success: true,
      message: "get Task successfully...",
    },
    res,data);
    
  } catch (error) {
    next(error);
  }
};
const updateTask = async (req, res, next) => {
  try {
    const { task, description, isCompleted, user } = req.body;
    const data = await Task.updateOne({ _id },{$set:{ task, description, isCompleted, user }});
    if(data){
      return errorMiddleware({
        statusCode: 200,
        success: true,
        message: "Update successfully...",
      },
      res,data);
    }
  } catch (error) {
    next()
  }
};

module.exports = {
  addTask,
  editTask,
  deleteTask,
  updateTask,
};

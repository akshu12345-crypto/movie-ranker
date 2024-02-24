const { users } = require("../models/userModel.js");
const { tasks } = require("../models/tasksModel.js");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

function login(req, res) {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors
        .array()
        .map((e) => {
          return " " + e.msg.message;
        })
        .toString(),
      data: {},
    });
  }

  const { email, password } = req.body;
  users.findOne({ email: email }, function (err, person) {
    console.log(person);
    if (person) {
      if (password === person.password) {
        return res.status(200).json({
          success: true,
          message: "loged in successfully",
          data: person,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Wong Credentials",
          data: {},
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Not Registered",
        data: {},
      });
    }
  });
}
function addTasks(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors
        .array()
        .map((e) => {
          return e.param + " " + e.msg.message + "\n";
        })
        .toString(),
      data: {},
    });
  }

  tasks
    .create({
      task_name: req.body.task_name,
      task_details: req.body.task_details,
      completed: false,
      due_date: req.body.due_date,
    })
    .then(() =>
      res.json({
        success: true,
        message: "Task added Successfully",
        data: {},
      })
    )
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Error adding task",
        data: {},
      });
    });
}

function taskListing(req, res) {
  tasks.find({}, function (err, tasks) {
    if (tasks) {
      res.json({
        success: true,
        message: "All tasks loaded Successfully",
        data: tasks,
      });
    } else {
      res.json({
        success: false,
        message: "fail to load tasks",
        data: {},
      });
    }
  });
}

function editTask(req, res) {
  const taskId = req.params.id;
  const updatedTaskData = {
    task_name: req.body.task_name,
    task_details: req.body.task_details,
    completed: req.body.completed,
    due_date: req.body.due_date,
  };
  const updatedTask = tasks.findByIdAndUpdate(taskId, updatedTaskData, {
    new: true,
  });
  if (updatedTask) {
    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: {},
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: {},
    });
  }
}

function deleteTask(req, res) {
  const taskId = req.params.id;

  tasks.findByIdAndDelete(taskId, function (err, task) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        data: {},
      });
    }
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
        data: {},
      });
    }
    res.json({
      success: true,
      message: "Task deleted successfully",
      data: {},
    });
  });
}

module.exports = {
  login,
  addTasks,
  editTask,
  deleteTask,
  taskListing,
};

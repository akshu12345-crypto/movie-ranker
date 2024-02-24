const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController.js");

const { check } = require("express-validator");

router.post(
  "/api/add-tasks",
  check("task_name").isLength({ min: 3, max: 50 }).withMessage({
    message: "required minimum: 3 characters; maximum: 50 characters",
    errorCode: 1,
  }),
  check("task_details").isLength({ min: 3, max: 500 }).withMessage({
    message: "required minimum: 3 characters; maximum: 500 characters",
    errorCode: 1,
  }),
  admin.addTasks
);

router.get("/api/taskListing", admin.taskListing);

router.post(
  "/api/login",
  check("email").notEmpty().withMessage({
    message: "Email ID required",
    errorCode: 1,
  }),
  check("password").notEmpty().withMessage({
    message: "Password required",
    errorCode: 1,
  }),
  admin.login
);

router.put(
  "/api/edit-task/:id",
  [
    check("task_name").isLength({ min: 3, max: 50 }).withMessage({
      message: "required minimum: 3 characters; maximum: 50 characters",
      errorCode: 1,
    }),
    check("task_details").isLength({ min: 3, max: 500 }).withMessage({
      message: "required minimum: 3 characters; maximum: 500 characters",
      errorCode: 1,
    }),
  ],
  admin.editTask
);

router.delete("/api/delete-task/:id", admin.deleteTask);

module.exports = router;

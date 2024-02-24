const { mongoose } = require("../config/dbConnection.js");

var Schema = mongoose.Schema;
var tasks = new Schema(
  {
    task_name: String,
    task_details: String,
    completed: { type: Boolean, default: false },
    due_date: Date,
  },
  {
    collection: "tasks",
  }
);

var tasks = mongoose.model("tasks", tasks);
module.exports.tasks = tasks;

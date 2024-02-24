import './AddTask.css';
import 'react-toastify/dist/ReactToastify.css';
import { Button, LinearProgress, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { addTask } from '../adapter/adminAdapter';
import { taskList } from '../adapter/clientAdapter';
import { baseUrl } from '../variables/variables';
import EditTaskForm from './EditTaskForm';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    setLoading(true);
    const response = taskList();
    response.then(function (result) {
      setLoading(false);
      if (result.success === true) {
        setTasks(result.data);
      } else {
        toast.error("failed to load Tasks");
      }
    });
  }, []);

const handleEdit = (taskId) => {
  const taskToEdit = tasks.find((task) => task._id === taskId);
  setTaskToEdit(taskToEdit);
};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    setLoading(true);
    const response = addTask({
      task_name: data.task_name,
      task_details: data.task_details,
      due_date: data.due_date,
    });
    response.then(function (result) {
      setLoading(false);
      if (result.success === true) {
        toast.success(result.message);
        const response = taskList();
        response.then(function (result) {
          setLoading(false);
          if (result.success === true) {
            setTasks(result.data);
          } else {
            toast.error("failed to load Tasks");
          }
        });
      } else {
        toast.error(result.message);
      }
      reset();
    });
    handleClose();
  };

  const columns = [
    {
      name: "task_name",
      label: "TASK NAME",
      width: 200,
    },
    {
      name: "task_details",
      label: "TASK DETAIL",
      width: 200,
    },
    {
      name: "due_date",
      label: "DUE DATE",
      width: 100,
    },
    {
      name: "completed",
      label: "COMPLETED",
      width: 100,
      options: {
        customBodyRender: (value) => {
          return value ? "Yes" : "No";
        },
      },
    },
    {
      name: "action",
      label: "ACTIONS",
      options: {
        customBodyRender: (value, tableMeta) => {
          const taskId = tasks[tableMeta.rowIndex]._id;
          return (
            <>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(taskId)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(taskId)}
              >
                Delete
              </Button>
            </>
          );
        },
      },
    },
  ];

  const options = {
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50],
    jumpToPage: true,
    search: true,
    selectableRows: "none",
    selectableRowsOnClick: false,
  };

 const handleDelete = (taskId) => {
  // Send a request to the backend API to delete the task
  fetch(baseUrl + `api/delete-task/${taskId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Task deleted successfully
        // Update the tasks state or re-fetch the task list
        const updatedTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(updatedTasks);
        toast.success("Task deleted successfully");
      } else {
        console.error("Error deleting task:", data.message);
        toast.error("Failed to delete task");
      }
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    });
};
const handleUpdateTask = (id,updatedTask) => {
  // Send a request to the backend API to update the task
  fetch(`http://localhost:3000/api/edit-task/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Task updated successfully
        // You can update the tasks state or re-fetch the task list if needed
        toast.success("Task updated successfully");
      } else {
        console.error("Error updating task:", data.message);
        toast.error("Failed to update task");
      }
    })
    .catch((error) => {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    });
};


  return (
    <div className="task-record">
      <p style={{ display: "none" }}>{baseUrl}</p>
      <Button
        variant="contained"
        className="rating-text"
        onClick={handleClickOpen}
        style={{ margin: "5px 0 15px 0" }}>
        Add new task
      </Button>
      <ToastContainer />

      {loading ? (
        <LinearProgress />
      ) : (
        <MUIDataTable
          data={tasks}
          columns={columns}
          options={options}
        />
      )}
      <div className="addNew">
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}>
          <DialogContent dividers>
            <form onSubmit={handleSubmit(onSubmit)} className="form-style">
              <div className="formItem">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Task Name"
                  variant="outlined"
                  type="text"
                  name="task_name"
                  {...register("task_name", {
                    required: {
                      value: true,
                      message: "Task name is required!",
                    },
                    pattern: {
                      value: /^.{3,50}$/,
                      message: "Min 3 Max 50 characters",
                    },
                  })}
                  error={Boolean(errors?.task_name ? true : false)}
                  helperText={errors?.task_name?.message}
                />
              </div>
              <div className="formItem">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Task Details"
                  variant="outlined"
                  type="text"
                  name="task_details"
                  multiline
                  rows={4}
                  {...register("task_details", {
                    required: {
                      value: true,
                      message: "Task Details required!",
                    },
                    pattern: {
                      value: /^.{3,500}$/,
                      message: "Min 3 Max 500 characters",
                    },
                  })}
                  error={Boolean(errors.task_details)}
                  helperText={errors.task_details?.message}
                />
              </div>
              <div className="formItem">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Due Date"
                  variant="outlined"
                  type="date"
                  name="due_date"
                  {...register("due_date", {
                    required: {
                      value: true,
                      message: "Due Date is required!",
                    }
                  })}
                  error={Boolean(errors.due_date)}
                  helperText={errors.due_date?.message}
                />
              </div>
              <DialogActions>
                <Button type="submit"> Add Task</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </BootstrapDialog>
      </div>
      {taskToEdit && (
  <EditTaskForm
    taskToEdit={taskToEdit}
    handleUpdateTask={handleUpdateTask}
    handleClose={handleClose}
  />
)}

    </div>
  );
}

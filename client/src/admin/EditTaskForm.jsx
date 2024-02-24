import React, { useState } from 'react';
import { Button, DialogActions, TextField } from '@mui/material';

const EditTaskForm = ({ taskToEdit, handleUpdateTask, handleClose }) => {
    
  const [updatedTask, setUpdatedTask] = useState({
    task_name: taskToEdit.task_name,
    task_details: taskToEdit.task_details,
    due_date: taskToEdit.due_date,
  });

  const formattedDueDate = new Date(updatedTask.due_date).toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
  handleUpdateTask(taskToEdit._id, updatedTask); 
};

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        id="task_name"
        label="Task Name"
        variant="outlined"
        type="text"
        name="task_name"
        value={updatedTask.task_name}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        id="task_details"
        label="Task Details"
        variant="outlined"
        type="text"
        name="task_details"
        multiline
        rows={4}
        value={updatedTask.task_details}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        id="due_date"
        label="Due Date"
        variant="outlined"
        type="date"
        name="due_date"
        value={formattedDueDate}
        onChange={handleChange}
      />
      <DialogActions>
        <Button type="submit">Update Task</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </form>
  );
};

export default EditTaskForm;

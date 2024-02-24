import { baseUrl } from "../variables/variables";

const taskList = async (id) => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  const settings = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResponse = await fetch(baseUrl + `api/taskListing`, settings);
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    //   toast.error(" " + e.message + " from Server")
    return e;
  }
};

const adminLogin = async (request) => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  };
  try {
    const fetchResponse = await fetch(baseUrl + `api/login`, settings);
    const response = await fetchResponse.json();
    if (response.success === true) {
      localStorage.setItem("userIn", JSON.stringify(response.data));
      return response;
    } else {
      return response;
    }
  } catch (e) {
    return e;
  }
};
const addTask = async (data) => {
  try {
    const response = await fetch(baseUrl + `api/add-tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_name: data.task_name,
        task_details: data.task_details,
        due_date: data.due_date,
      }),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    // Handle error
    console.error("Error adding task:", error);
    return { success: false, message: "Failed to add task" };
  }
};

export { taskList, adminLogin, addTask };

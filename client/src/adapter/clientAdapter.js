import { baseUrl } from "../variables/variables";

const taskList = async () => {
  //   var Suser = JSON.parse(localStorage.getItem("userIn"));
  const settings = {
    method: "GET",
    headers: {
      //   Authorization: "Bearer " + Suser.token + "",
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
const addReviev = async (data) => {
  //   var Suser = JSON.parse(localStorage.getItem("userIn"));
  let request = {
    task_id: data.task_id,
    user_name: data.user_name,
    user_detail_review: data.user_detail_review,
    user_rating: data.user_rating,
  };
  const settings = {
    method: "POST",
    headers: {
      //   Authorization: "Bearer " + Suser.token + "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  };
  try {
    const fetchResponse = await fetch(baseUrl + `api/add-review`, settings);

    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    //   toast.error(" " + e.message + " from Server")
    return e;
  }
};

export { taskList, addReviev };

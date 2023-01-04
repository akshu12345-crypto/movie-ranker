import { baseUrl } from '../variables/variables';

const movieList = async (id) => {
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
    const fetchResponse = await fetch(baseUrl + `api/movieListing`, settings);
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

const addMovie = async (data) => {
  //   var Suser = JSON.parse(localStorage.getItem("userIn"));

  const formData = new FormData();

  formData.append("movie_name", data.movie_name);
  formData.append("movie_details", data.movie_details);
  formData.append("movie_poster", data.movie_poster[0]);
  const settings = {
    method: "POST",
    headers: {
      //   Authorization: "Bearer " + Suser.token + "",
      // Accept: "application/json",
      // "Content-Type": "application/json",
    },
    body: formData,
  };
  try {
    const fetchResponse = await fetch(baseUrl + `api/add-movies`, settings);

    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    //   toast.error(" " + e.message + " from Server")
    return e;
  }
};
export { movieList, adminLogin, addMovie };

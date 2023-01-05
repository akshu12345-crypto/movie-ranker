import './AddMovie.css';
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

import { addMovie } from '../adapter/adminAdapter';
import { movieList } from '../adapter/clientAdapter';
import { baseUrl } from '../variables/variables';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
// or
export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const response = movieList();
    response.then(function (result) {
      setLoading(false);
      if (result.success === true) {
        setMovies(result.data);
      } else {
        toast.error("failed to load Movies");
      }
    });
  }, []);
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
    const response = addMovie({
      movie_name: data.movie_name,
      movie_details: data.movie_details,
      movie_poster: data.movie_poster,
    });
    response.then(function (result) {
      setLoading(false);
      if (result.success === true) {
        toast.success(result.message);
        const response = movieList();
        response.then(function (result) {
          setLoading(false);
          if (result.success === true) {
            setMovies(result.data);
          } else {
            toast.error("failed to load Movies");
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
      name: "movie_poster",
      label: "ID",
      width: 100,
      options: {
        filter: true,
        customBodyRender: (value) => {
          return (
            <>
              <img
                src={baseUrl + value}
                style={{ width: "85px", borderRadius: "14px" }}
                alt=""
              />
            </>
          );
        },
      },
    },
    {
      name: "movie_name",
      label: "MOVIE NAME",
      width: 400,
    },
    {
      name: "movie_details",
      label: "MOVIE DETAIL",
      width: 200,
    },
    {
      name: "movie_rating",
      label: "RATING",
      width: 200,
    },
  ];

  const options = {
    serverSide: true,
    onTableChange: (action, tableState) => {
      this.xhrRequest("my.api.com/tableData", (result) => {
        this.setState({ data: result });
      });
    },
  };

  return (
    <div className="movie-record">
      <p style={{ display: "none" }}>{baseUrl}</p>
      <Button
        variant="contained"
        className="rating-text"
        onClick={handleClickOpen}
        style={{ margin: "5px 0 15px 0" }}>
        Add new movie
      </Button>
      <ToastContainer />

      {loading ? (
        <LinearProgress />
      ) : (
        <MUIDataTable
          data={movies}
          columns={columns}
          options={{
            rowsPerPage: 10,
            rowsPerPageOptions: [10, 20, 50],
            jumpToPage: true,
            options,
            search: true,
            selectableRows: "none",
            selectableRowsOnClick: false,
          }}
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
                  label="Movie Name"
                  variant="outlined"
                  type="text"
                  name="movie_name"
                  {...register("movie_name", {
                    required: {
                      value: true,
                      message: "Movie name is required!",
                    },
                    pattern: {
                      value: /^.{3,50}$/,
                      message: "Min 3 Max 50 characters",
                    },
                  })}
                  error={Boolean(errors?.movie_name ? true : false)}
                  helperText={errors?.movie_name?.message}
                />
              </div>
              <div className="formItem">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Movie Details"
                  variant="outlined"
                  type="text"
                  name="movie_details"
                  multiline
                  rows={4}
                  {...register("movie_details", {
                    required: {
                      value: true,
                      message: "Movie Details required!",
                    },
                    pattern: {
                      value: /^.{3,500}$/,
                      message: "Min 3 Max 500 characters",
                    },
                  })}
                  error={Boolean(errors.movie_details)}
                  helperText={errors.movie_details?.message}
                />
              </div>
              Movie poster
              <br />
              <input
                lable="movie_poster"
                name="movie_poster"
                type="file"
                accept="image/png, image/jpg"
                {...register("movie_poster", {
                  required: {
                    value: true,
                    message: "Movie poster required!",
                  },
                })}
                // error={Boolean(errors.movie_poster)}
                // helpertext={errors.movie_poster?.message}
              />
              {/* <div className="formItem">
                <Typography component="legend">Rate this movie</Typography>
                <Rating
                  name="simple-controlled"
                  value={star}
                  onChange={(event, newStar) => {
                    setStar(newStar);
                  }}
                />
              </div> */}
              <DialogActions>
                <Button type="submit"> Add Movie</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </BootstrapDialog>
      </div>
    </div>
  );
}

import './Home.css';
import 'react-toastify/dist/ReactToastify.css';

import { Box, Button, LinearProgress, TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { addReviev, movieList } from '../adapter/clientAdapter';
import { baseUrl } from '../variables/variables';
import Header from './components/Header';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [movieToRate, setMovieToRate] = useState(null);
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

  var navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setMovieToRate(id);
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

  const [star, setStar] = React.useState(1);
  const onSubmit = (data) => {
    setLoading(true);
    const response = addReviev({
      movie_id: movieToRate,
      user_name: data.user_name,
      user_detail_review: data.user_detail_review,
      user_rating: star,
    });
    response.then(function (result) {
      setLoading(false);
      if (result.success === true) {
        toast.success(result.message);
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
      } else {
        toast.error(result.message);
      }
      reset();
      setStar(1);
    });
    handleClose();
  };

  return (
    <>
      <Header />

      <div className="home-container">
        <Button
          variant="contained"
          onClick={(e) => {
            navigate("/login");
          }}
          style={{
            margin: "15px auto",
            backgroundColor: "#fff",
            color: "#000",
          }}>
          LOGIN
        </Button>
        <Button
          variant="contained"
          onClick={(e) => {
            var sortedByRating = movies.sort((a, b) => {
              return b.movie_rating - a.movie_rating;
            });
            setMovies([...movies], { sortedByRating });
          }}
          style={{
            margin: "15px auto",
            backgroundColor: "#fff",
            color: "#000",
          }}>
          Sort movies by rating
        </Button>

        <ToastContainer />
        {loading ? (
          <>
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>

            <CircularProgress
              style={{
                width: "40px",
                position: "absolute",
                height: "40px",
                top: "30%",
              }}
              disableShrink
            />
          </>
        ) : (
          <div
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            className="list">
            {movies.map((movie) => {
              return (
                <div
                  className="list-item"
                  key={movie._id}
                  style={{
                    backgroundImage:
                      `linear-gradient(to bottom, rgb(0 11 75 / 57%),rgb(26 0 43 / 0%)),
                  url(` +
                      baseUrl +
                      movie.movie_poster +
                      `)`,
                  }}>
                  <img
                    className="movie-img"
                    src={baseUrl + movie.movie_poster}
                    alt=""
                  />
                  <div className="movie-info">
                    <p className="item-title">{movie.movie_name}</p>
                    <p className="item-discription">
                      {movie.movie_details.substring(0, 120)}
                    </p>
                    {/* <p className="rating-text"></p> */}

                    <Button
                      variant="contained"
                      className="rating-text"
                      onClick={(e) => {
                        handleClickOpen(movie._id);
                      }}
                      style={{ margin: "5px 0 15px 0" }}>
                      Rate this movie
                    </Button>
                    <Rating
                      name="read-only"
                      className="stars-container"
                      value={parseInt(movie.movie_rating)}
                      readOnly
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div>
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
                    label="Your Name"
                    variant="outlined"
                    type="text"
                    name="user_name"
                    {...register("user_name", {
                      required: {
                        value: true,
                        message: "users name is required!",
                      },
                      pattern: {
                        value: /^.{3,50}$/,
                        message: "Min 3 Max 50 characters",
                      },
                    })}
                    error={Boolean(errors?.user_name ? true : false)}
                    helperText={errors?.user_name?.message}
                  />
                </div>
                <div className="formItem">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Detail Review"
                    variant="outlined"
                    type="text"
                    name="user_detail_review"
                    multiline
                    rows={4}
                    {...register("user_detail_review", {
                      required: {
                        value: true,
                        message: "Detail Review is required!",
                      },
                      pattern: {
                        value: /^.{3,500}$/,
                        message: "Min 3  Max 500 characters",
                      },
                    })}
                    error={Boolean(errors.user_detail_review)}
                    helperText={errors.user_detail_review?.message}
                  />
                </div>

                <div className="formItem">
                  <Typography component="legend">Rate this movie</Typography>
                  <Rating
                    name="simple-controlled"
                    value={star}
                    onChange={(event, newStar) => {
                      setStar(newStar);
                    }}
                  />
                </div>
                <DialogActions>
                  <Button type="submit"> Submit Review</Button>
                </DialogActions>
              </form>
            </DialogContent>
          </BootstrapDialog>
        </div>
      </div>
    </>
  );
}

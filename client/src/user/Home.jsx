import './Home.css';

import { Button, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function Home() {
  let location = useLocation();
  var navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({});

  const [star, setStar] = React.useState(1);
  const onSubmit = (data) => {
    console.log(data, star);
    handleClose();
  };
  return (
    <div className="home-container">
      <div
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        className="list">
        <div className="list-item">
          <img
            className="movie-img"
            src="https://i.gadgets360cdn.com/products/large/dune-1200x1779-1633607256036.jpg"
          />
          <div className="movie-info">
            <p className="item-title">Sandra Adams</p>
            <p className="item-discription">
              Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            {/* <p className="rating-text"></p> */}

            <Button
              variant="contained"
              className="rating-text"
              onClick={handleClickOpen}
              style={{ margin: "5px 0 15px 0" }}>
              Rate this movie
            </Button>
            <Rating
              name="read-only"
              className="stars-container"
              value={4}
              readOnly
            />
          </div>
        </div>
        <div className="list-item">
          <img
            className="movie-img"
            src="https://i.gadgets360cdn.com/products/large/dune-1200x1779-1633607256036.jpg"
          />
          <div className="movie-info">
            <p className="item-title">Sandra Adams</p>
            <p className="item-discription">
              Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            {/* <p className="rating-text"></p> */}
            <Button
              variant="contained"
              className="rating-text"
              onClick={handleClickOpen}
              style={{ margin: "5px 0 15px 0" }}>
              Rate this movie
            </Button>
            <Rating
              name="read-only"
              className="stars-container"
              value={4}
              readOnly
            />
          </div>
        </div>
        <div className="list-item">
          <img
            className="movie-img"
            src="https://i.gadgets360cdn.com/products/large/dune-1200x1779-1633607256036.jpg"
          />
          <div className="movie-info">
            <p className="item-title">Sandra Adams</p>
            <p className="item-discription">
              Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            {/* <p className="rating-text"></p> */}
            <Button
              variant="contained"
              className="rating-text"
              onClick={handleClickOpen}
              style={{ margin: "5px 0 15px 0" }}>
              Rate this movie
            </Button>
            <Rating
              name="read-only"
              className="stars-container"
              value={4}
              readOnly
            />
          </div>
        </div>
      </div>
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
                  label="Name"
                  variant="outlined"
                  type="text"
                  name="Name"
                  {...register("Name", {
                    required: {
                      value: true,
                      message: "User name is required!",
                    },
                    pattern: {
                      value: /^.{1,50}$/,
                      message: "Max 50 characters",
                    },
                  })}
                  error={Boolean(errors?.Name ? true : false)}
                  helperText={errors?.Name?.message}
                />
              </div>
              <div className="formItem">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Detail Review"
                  variant="outlined"
                  type="text"
                  name="detailReview"
                  multiline
                  rows={4}
                  {...register("detailReview", {
                    required: {
                      value: true,
                      message: "Detail Review is required!",
                    },
                    pattern: {
                      value: /^.{1,500}$/,
                      message: "Max 500 characters",
                    },
                  })}
                  error={Boolean(errors.detailReview)}
                  helperText={errors.detailReview?.message}
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
  );
}

/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent, DialogTitle,
  Grid, Typography
} from '@mui/material';
import { Form } from '@unform/web';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { deleteUser } from 'src/service/api';
import theme from 'src/theme';
import TextInput from '../TextInput';

function DeleteUserComponent(props): any {
  const {
    userInfo: user, dispatch, users, setUsers,
  } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const formRef = useRef(null);

  const handleUpdate = (deletedUser) => {
    const updatedUsers = users.filter((u) => u.id !== deletedUser.id);
    setUsers(updatedUsers);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await deleteUser();

      handleUpdate(user);
      dispatch({ type: 'REMOVE', payload: user });
      dispatch({ type: 'SET_DELETE' });
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    if (!user) return;

    formRef.current.setData({
      name: user.name,
      email: user.email,
      username: user.username || '',
      city: user.city ? (user.city || user?.address.city) : '',
    });
  }, []);

  return (

    <Form onSubmit={handleSubmit} ref={formRef}>
      <DialogTitle>Delete User?</DialogTitle>
      <DialogContent style={{ padding: 20 }}>
        <Grid container spacing={2} direction="column" style={{ padding: 10 }}>
          <Grid container spacing={4} direction="row">
            <Grid item xs={12} md={6} xl={4}>
              <TextInput
                name="name"
                label="Name"
                type="text"
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <TextInput
                name="email"
                label="Email"
                type="text"
                isDisabled
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} direction="row">
            <Grid item xs={12} md={6} xl={4}>
              <TextInput
                name="username"
                label="Username"
                type="text"
                isDisabled
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <TextInput
                name="city"
                label="City"
                type="text"
                isDisabled
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center', marginBottom: 20 }}>
        <Button
          variant="contained"
          onClick={() => dispatch({ type: 'SET_DELETE' })}
          disableElevation
          style={{ width: 150 }}
        >
          <Typography variant="button" color={theme.palette.colors.white}>
            Cancel
          </Typography>
        </Button>
        <Button
          variant="contained"
          type="submit"
          disableElevation
          style={{ width: 150 }}
          color="error"
        >
          {loading
            ? <CircularProgress variant="indeterminate" size="20px" color="inherit" />
            : (
              <Typography variant="button" color={theme.palette.colors.white}>
                Confirm
              </Typography>
            )}
        </Button>
      </DialogActions>
    </Form>
  );
}

const mapStateToProps = (state) => {
  const { modalState } = state;

  return { userInfo: modalState.user };
};

export default connect(mapStateToProps)(DeleteUserComponent);

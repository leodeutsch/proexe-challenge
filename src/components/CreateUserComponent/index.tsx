/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@mui/material';
import { Form } from '@unform/web';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { UserFormType } from 'src/@types/user-form.type';
import { createUser } from 'src/service/api';
import theme from 'src/theme';
import {
  object, string, ValidationError
} from 'yup';
import TextInput from '../TextInput';

function CreateUserComponent(props): any {
  const {
    dispatch, users, setUsers, setModalState,
  } = props;
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  let lastId: number = 0;

  const getLastId = () => {
    users.map((u) => {
      u.id > lastId && (lastId = u.id);

      return u;
    });
  };

  const handleSubmit = async (data: UserFormType | any) => {
    try {
      setLoading(true);

      const schema = object().shape({
        name: string()
          .required('Name is required'),
        email: string().email('Must be a valid email')
          .required('Email is required'),
        username: string(),
        city: string(),
      });

      setNameError(null);
      setEmailError(null);
      getLastId();

      await schema.validate(data, { abortEarly: false });
      await createUser(data);
      const newUser = data;
      newUser.id = lastId + 1;

      setUsers([...users, newUser]);
      dispatch({ type: 'ADD', payload: newUser });
      setLoading(false);
      setModalState(false);
    } catch (err: any) {
      if (err instanceof ValidationError) {
        err.inner.forEach((innerError) => {
          if (innerError.message.includes('name')) {
            setNameError(innerError.message);
          }
          if (innerError.message.includes('email')) {
            setEmailError(innerError.message);
          }
        });
      }
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginBottom: 20 }}>
          Please fill the information below to create a user.
        </DialogContentText>
        <TextInput
          name="name"
          label="Name"
          type="text"
          error={nameError != null}
          hint={nameError || undefined}
        />
        <TextInput
          name="email"
          label="Email"
          type="email"
          error={emailError != null}
          hint={emailError || undefined}
        />
        <TextInput
          name="username"
          label="Username"
          type="text"
        />
        <TextInput
          name="city"
          label="City"
          type="text"
        />
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center', marginBottom: 20 }}>
        <Button
          variant="outlined"
          onClick={() => setModalState(false)}
          disableElevation
          style={{ width: 150 }}
          color="error"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          disableElevation
          style={{ width: 150 }}
        >
          {loading
            ? <CircularProgress variant="indeterminate" size="20px" color="inherit" />
            : (
              <Typography variant="button" color={theme.palette.colors.white}>
                Submit
              </Typography>
            )}
        </Button>
      </DialogActions>
    </Form>
  );
}

export default connect()(CreateUserComponent);

/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent, DialogTitle,
  Typography
} from '@mui/material';
import { Form } from '@unform/web';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { UserFormType } from 'src/@types/user-form.type';
import { updateUser } from 'src/service/api';
import theme from 'src/theme';
import {
  object, string, ValidationError
} from 'yup';
import TextInput from '../TextInput';

function EditUserComponent(props): any {
  const {
    userInfo: user, dispatch, users, setUsers,
  } = props;
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const formRef = useRef(null);

  const handleUpdate = (updatedUser) => {
    const updatedUsers = [...users];
    updatedUsers.filter((u) => u.id !== updatedUser.id).push(updatedUser);
    setUsers(updatedUsers);
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

      await schema.validate(data, { abortEarly: false });
      const updatedUser = data;
      updatedUser.id = user.id;
      await updateUser(updatedUser);
      handleUpdate(updatedUser);

      dispatch({ type: 'EDIT', payload: updatedUser });
      dispatch({ type: 'SET_EDIT' });
      setLoading(false);
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

  // eslint-disable-next-line no-console
  console.log(user);

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
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent style={{ padding: 10 }}>
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
          onClick={() => dispatch({ type: 'SET_EDIT' })}
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

const mapStateToProps = (state) => {
  const { modalState } = state;

  return { userInfo: modalState.user };
};

export default connect(mapStateToProps)(EditUserComponent);

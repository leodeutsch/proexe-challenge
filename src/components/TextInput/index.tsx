/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
import { TextField } from '@mui/material';
import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';

interface TextInputProps {
  name: string;
  type: 'text' | 'number' | 'email';
  label: string;
  error?: boolean;
  hint?: string;
  isDisabled?: boolean;
}

export default function TextInput(props: TextInputProps) {
  const {
    name, type, label, hint, error, isDisabled,
  } = props;
  const inputRef = useRef();
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => ref.current.value,
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <TextField
      variant="outlined"
      name={name}
      inputRef={inputRef}
      type={type}
      label={label}
      helperText={hint && hint}
      error={error && error}
      fullWidth
      style={{ marginBottom: 20 }}
      disabled={isDisabled || false}
    />
  );
}

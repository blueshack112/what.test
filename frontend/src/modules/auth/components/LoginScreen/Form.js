//@flow
import React from 'react';
import { useFormik } from 'formik';

type Props = {
  onLogin: (*) => void,
};

export const LoginForm = ({ onLogin }: Props) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    onSubmit: (values) => {
      onLogin(values.username, values.password);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        value={formik.values.username}
        onChange={formik.handleChange}
        id="username"
        placeholder="Email"
        name="username"
        type="text"
      />
      <input
        value={formik.values.password}
        onChange={formik.handleChange}
        id="password"
        placeholder="password"
        name="password"
        type="password"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

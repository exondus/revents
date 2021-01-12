import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

import ModalWrapper from "../../app/common/modals/ModalWraper";
import MyTextInput from "../../app/common/form/MyTextInput";
import { signInUser } from "./authActions";
import { closeModal } from '../../app/common/modals/modalReducer';
export default function LoginForm() {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size="mini" header="Sign in to Revents">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={
          Yup.object({
            email: Yup.string().required().email(),
            password: Yup.string().required()
          })
        }
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          dispatch(signInUser(values));
          setSubmitting(false);
          dispatch(closeModal());
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="ui form">
            <MyTextInput name='email' placeholder='Email Address' />
            <MyTextInput name='password' placeholder='Password' type='password' />
            <Button 
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              fluid
              size='large'
              color='teal'
              content='Login'
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}
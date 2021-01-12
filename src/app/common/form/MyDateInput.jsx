import React from 'react';
import { useField } from 'formik';
import { FormField, Label } from 'semantic-ui-react';
import { useFormikContext } from "formik";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MyDateInput({label, ...props}) {
    const { setFieldValue } = useFormikContext()
    const [field, meta] = useField(props);
    return (
        <FormField error={meta.touched && !!meta.error}>
            <label>{label}</label>
            <Datepicker 
              {...field}
              {...props}
              selected={(field.value &&new Date(field.value))}
              onChange={value => setFieldValue(field.name, value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </FormField>
    )
}
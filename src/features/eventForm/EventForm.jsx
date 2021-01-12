import React from 'react';
import { Button, Header, Segment} from 'semantic-ui-react';
import cuid from "cuid";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, } from "formik";
import * as Yup from "yup";

import { updateEvent, createEvent } from "../events/eventActions";
import MyTextInput from '../../app/common/form/MyTextInput';
import MyTextarea from '../../app/common/form/MyTextarea';
import MySelectInput from '../../app/common/form/MySelectInput';
import MyDateInput from '../../app/common/form/MyDateInput';
import { categoryData } from "../../app/api/categoryOptions";

export default function EventForm({ match, history }) {
  const selectedEvent = useSelector(state => state.event.events.find(x => x.id === match.params.id));
  const dispatch = useDispatch();

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: ""
  }

  const validationSchema = Yup.object({
    title: Yup.string().required("You must supply an event title"),
    category: Yup.string().required("You must supply an event category"),
    description: Yup.string().required("You must supply an event description"),
    city: Yup.string().required("You must supply an event city"),
    venue: Yup.string().required("You must supply an event venue"),
    date: Yup.string().required("You must supply an event date")
  })

  function handleFormSubmit(values) {
    selectedEvent ? dispatch(updateEvent({ ...selectedEvent, ...values })) :
    dispatch(createEvent({...values, id: cuid(), hostedBy: 'Junior', attendees: [], hostPhotoURL: "/assets/user.png"}));
    history.push("/events")
  }

  return (
    <Segment clearing>      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => handleFormSubmit(values)}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="ui form">
            <Header sub color="teal" content="Event Details" />
            <MyTextInput name="title" placeholder="Event title" />
            <MySelectInput name="category" placeholder="Category" options={categoryData} />
            <MyTextarea name="description" placeholder="Description" rows={3} />

            <Header sub color="teal" content="Event Location" />
            <MyTextInput name="city" placeholder="City" />
            <MyTextInput name="venue" placeholder="Venue" />
            <MyDateInput 
              name="date" 
              placeholderText="Date" 
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            />
          
            <Button 
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit" 
              floated="right" 
              positive content="Submit" 
            />
            <Button 
              type="submit" 
              floated="right" 
              content="Cancel" 
              as={Link} 
              to="/events" 
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  )
}
import React, { useState } from 'react';
import { Button, Confirm, Header, Segment} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, } from "formik";
import * as Yup from "yup";

import MyTextInput from '../../app/common/form/MyTextInput';
import MyTextarea from '../../app/common/form/MyTextarea';
import MySelectInput from '../../app/common/form/MySelectInput';
import MyDateInput from '../../app/common/form/MyDateInput';
import { categoryData } from "../../app/api/categoryOptions";
import { addEventToFirestore, cancelEventToggle, listenToEventFromFirestore, updateEventInFirestore } from '../../app/firestore/FireStoreService';
import useFireStoreDoc from '../../app/hooks/useFirestoreDoc';
import { listenToEvents } from '../events/eventActions';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';

export default function EventForm({ match, history }) {
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const selectedEvent = useSelector(state => state.event.events.find(x => x.id === match.params.id));
  const { loading, error } = useSelector(state => state.async);
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

  async function handleCancelToggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (err) {
      setLoadingCancel(true);
      toast.error(err);
    }
  }
 
  useFireStoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  });

  if (loading)
    return <LoadingComponent content='Loading event...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <Segment clearing>      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
              setSubmitting(false);
            history.push('/events');
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
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
              loading={loadingCancel}
              type="button" 
              floated="left" 
              color={selectedEvent.isCancelled ? "green" : "red"} 
              content={selectedEvent.isCancelled ? "Reactivate event" : "Cancel event"}
              onClick={() => setConfirmOpen(true)}
            />
            {
              selectedEvent && (
                <Button 
                  loading={isSubmitting}
                  disabled={!isValid || !dirty || isSubmitting}
                  type="submit" 
                  floated="right" 
                  positive 
                  content="Submit" 
                />
              )
            }
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
      <Confirm 
        content={
          selectedEvent?.isCancelled ? 
          "This will reactivate the event - are you sure?" : 
          "This will cancel the event - are you sure?"
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  )
}
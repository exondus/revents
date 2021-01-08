import React, {useState} from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import cuid from "cuid";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { updateEvent, createEvent } from "../events/eventActions";
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

  const [values, setValues] = useState(initialValues);

  function handleFormSubmit() {
    selectedEvent ? dispatch(updateEvent({ ...selectedEvent, ...values })) :
    dispatch(createEvent({...values, id: cuid(), hostedBy: 'Junior', attendees: [], hostPhotoURL: "/assets/user.png"}));
    history.push("/events")
  }

  function handleInputChange(e) {
    e.preventDefault();
    const {name, value} = e.target;
    setValues({ ...values, [name]: value })
  }

  return (
    <Segment clearing>
      <Header content={ selectedEvent ? "Edit event" : "Create new event"} />
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <input type="text" placeholder="Event title" value={values.title} name="title"
          onChange={e => handleInputChange(e)} />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Category" value={values.category} name="category"
          onChange={e => handleInputChange(e)} />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Description" value={values.description} name="description"
          onChange={e => handleInputChange(e)} />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="City" value={values.city} name="city"
          onChange={e => handleInputChange(e)} />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Venue" value={values.venue} name="venue"
          onChange={e => handleInputChange(e)} />
        </Form.Field>
        <Form.Field>
          <input type="date" placeholder="Date" value={values.date} name="date"
          onChange={e => handleInputChange(e)} />
        </Form.Field>
        <Button type="submit" floated="right" positive content="Submit" />
        <Button type="submit" floated="right" content="Cancel" as={Link} to="/events" />
      </Form>
    </Segment>
  )
}
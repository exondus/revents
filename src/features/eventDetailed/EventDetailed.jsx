import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import { listenToEventFromFirestore } from '../../app/firestore/FireStoreService';
import useFireStoreDoc from '../../app/hooks/useFirestoreDoc';
import { listenToEvents } from '../events/eventActions';

import LoadingComponent from "../../app/layout/LoadingComponent";
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';

export default function EventDetailed({ match }) {
  const event = useSelector(state => state.event.events.find(x => x.id === match.params.id));
  const { loading, error } = useSelector(state => state.async);
  const dispatch = useDispatch();

  useFireStoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: event => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch]
  })

  if (loading || (!event && !error))
    return <LoadingComponent content='Loading event...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo  event={event} />
        <EventDetailedChat event={event} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event?.attendees} />
      </Grid.Column>
    </Grid>
  )
}
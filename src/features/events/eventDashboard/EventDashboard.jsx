import React from "react";
import { Grid } from 'semantic-ui-react';
import {useDispatch, useSelector} from "react-redux";

import EventList from './EventList';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventFilters from './EventFilters';
import { listenToEventsFromFirestore } from '../../../app/firestore/FireStoreService';
import { listenToEvents } from '../eventActions';
import useFireStoreCollection from '../../../app/hooks/useFirestoreCollection';

export default function EventDashboard() {
  const dispatch = useDispatch();
  const events = useSelector(state => state.event.events);
  const { loading } = useSelector(state => state.async);

  useFireStoreCollection({ 
    query: () => listenToEventsFromFirestore(),
    data: events => dispatch(listenToEvents(events)),
    deps: [dispatch]
   })

  return (
    <Grid>
      <Grid.Column width={10}>
        {
          loading && (
            <>
              <EventListItemPlaceholder />
              <EventListItemPlaceholder />
            </>
          )
        }
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  )
}
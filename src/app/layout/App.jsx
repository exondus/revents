import React from "react";
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import EventDetailed from '../../features/eventDetailed/EventDetailed';
import EventForm from '../../features/eventForm/EventForm';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/Navbar';

function App() {
	return (
    <>
        <Route path="/" exact component={HomePage} />
        <Route path={'/(.+)'} render={() => (
          <>
          <NavBar />
            <Container className="main">
              <Route path="/events" exact component={EventDashboard} />
              <Route path="/events/:id"  component={EventDetailed} />
              <Route path={["/createEvent", "/manage/:id"]} component={EventForm} />
            </Container>
          </>
        )} />
    </>
  )
}

export default App;

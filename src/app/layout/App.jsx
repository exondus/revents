import React from "react";
import { Route, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { ToastContainer } from "react-toastify";

import EventDetailed from '../../features/eventDetailed/EventDetailed';
import EventForm from '../../features/eventForm/EventForm';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/Navbar';
import Sandbox from '../../features/sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';

function App() {
  const { key } = useLocation();

	return (
    <>
        <ModalManager />
        <ToastContainer position="bottom-right" hideProgressBar />
        <Route path="/" exact component={HomePage} />
        <Route path={'/(.+)'} render={() => (
          <>
          <NavBar />
            <Container className="main">
              <Route path="/events" exact component={EventDashboard} />
              <Route path="/sandbox" exact component={Sandbox} />
              <Route path="/events/:id"  component={EventDetailed} />
              <Route path={["/createEvent", "/manage/:id"]} component={EventForm} key={key} />
            </Container>
          </>
        )} />
    </>
  )
}

export default App;

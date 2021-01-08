import React, {useState} from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

export default function NavBar() {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);

  function handleSignOut() {
    setAuthenticated(false);
    history.push("/")
  }

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          <img src="/assets/logo.png" alt="logo" />
          Revents
        </Menu.Item>
        <Menu.Item name="Events" as={NavLink} to="/events" />
        <Menu.Item name="Sanbox" as={NavLink} to="/sandbox" />
        {
          authenticated ? 
        <Menu.Item as={NavLink} to="/createEvent">
          <Button as={NavLink} to='/createEvent' positive inverted content="Create Event" />
        </Menu.Item>
        : null }
        {
          authenticated ? <SignedInMenu signOut={handleSignOut} /> : <SignedOutMenu setAuthenticated={setAuthenticated} />
        }
      </Container>
    </Menu>
  )
}
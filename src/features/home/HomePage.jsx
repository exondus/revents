import React from "react";
import { Button, Container, Header, Icon, Image, Segment } from 'semantic-ui-react';

export default function HomePage({ history }) {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container>
        <Header as="h1" inverted>
          <Image src="/assets/logo.png" style={{ marginBottom: 12 }} />
            Revents
        </Header>
        <Button inverted size="huge" onClick={() => history.push("events")} >
          Get started
          <Icon name="right arrow" inverted />
        </Button>
      </Container>
    </Segment>
  )
}
# Locked In

Locked In is a real time room based application , where users join timed room sessions, communicate via voice and chat optionally share their screen , to build something and ship under the time constraint.

## High Level Architecture Overview

![High-level architecture](./docs/architecture.png)

The frontend runs in browser,rendering UI,media capture ,and webRTC peer connection.
The backend handles the authentication and REST API'S.
The socket.io handles the signalling for room co-ordination , persistent connection , acting as a middle man between peer to peer for webRTC negotiation.
Media flows directly between browser <-> browser , no server inbetween .


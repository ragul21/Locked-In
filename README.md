# Locked In

Locked In is a real time room based application , where users join timed room sessions, communicate via voice and chat optionally share their screen , to build something and ship under the time constraint.

## High Level Architecture Overview

![High-level architecture](./docs/architecture.png)

- The frontend runs in browser,rendering UI,media capture ,and webRTC peer connection.
- The backend handles the authentication and REST API'S.
- The socket.io handles the signalling for room co-ordination , persistent connection , acting as a middle man between peer to peer for webRTC negotiation.
- Media flows directly between browser <-> browser , no server inbetween .

## Core Features
- **Timed Rooms** : Sessions run with timed room , which enforces accountability and pressure.
- **Real time voice & chat** : Users can communicate using voice and chat at real time which improves the productivity.
- **Screen Sharing** : Users can make use of the screen sharing feature which was built using webRTC.
- **Submission-flow** : Users can submit their work once the timer ends , integerated AI will provide users with summary of what could be improved and how good their work is .

## Technical design & Decisions
### Real time room coordination
#### **Problem**
Rooms need persistent connection , bi directional communication like chat message , live member list update , REST request response wont do the job as its uni directional by nature .
#### **Approach**
Socket.io is used to establish web socket connection between the client and server , it is attached to the HTTP server to handle both standard REST request and web socket upgrade request , socket.io maintains the room membership and event broadcasting.
#### **Why this approach**
For faster development and reliability i choosed socket.io library which is built on top of raw websockets to enable real time communication , also the co existing along with the standart HTTP server is an added advantage.

### webRTC media flow (voice & screen share)
#### **Problem**
Sending media through server will increase the latency and bottleneck the bandwidth of the server. But real time communications require low latency , high bandwidth for seamless transmission.
#### **Approach**
WebRTC is used to enable peer to peer communication which provides low latency and bandwidth for streaming of audio and vedio between participants. We do use the backend server , but only for ICE candidates (for peers to find each other ) offer and answer exchange (SDP negotiation) between participants ,while actual media flows peer to peer through RTCPeerConnection.
#### **Why this approach**
P2P minimizes the latency and offloads the bandwidth from the server . Using server only for signalling keeps it lightweight so system can scale better.


### Authentication and Session management 
#### **Problem**
User authentication requires a secure communication between client and server , storing the tokens in local storage of browser is prone to XSS attack, as anyone can steal it by running a JS script .
#### **Approach**
Authentication is implemented by storing the JWT in HTTP only cookies . The backend issues a signed token after successfull login . The token is stored in HTTP only cookie (a place where JS cant reach). The browser automatically sends this cookie with the subsequent requests. Protected routes validate the JWT when it receives it .
#### **Why this approach**
Storing tokens in http cookies helps us to avoid XSS risk ,which would be possible if the tokens are stored in local storage. 




  

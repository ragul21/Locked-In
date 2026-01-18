"use client";
import { io } from "socket.io-client";
import { useParams, useSearchParams } from "next/navigation";
import { MicOff, MessageSquare, Monitor, LogOut } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import EnterNameModal from "@/components/EnterNameModal";
import { useRouter } from "next/navigation";
export default function RoomPage() {
  const router = useRouter(); // to push submission page after timer ends
  const [username, setUsername] = useState(null);
  const [members, setMember] = useState([]);
  const [endTime, setEndTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState("--:--");

  const isAdminReference = useRef(false); // to store if a user is admin or not and to survive re render of the page as its a crucial data that should not be vanished
  const [isChatOpen, setIsChatOpen] = useState(false); // to toggle chat box
  const [chatInput, setChatInput] = useState(""); // to remember what user types in the input box
  const [messages, setMessages] = useState([]); // add what user typed in the box to the list and show the updated list has history

  const [shareUrl, setShareUrl] = useState(""); // to render and show the share URL after side effect runs in browser end
  const [isMicOn, setIsMicOn] = useState(false); // for mic state

  const micStreamRef = useRef(null); // to save the stream object to pass it websockets
  const peerConnectionRef = useRef(null); // to store the reference of RTCpeerconnection object
  const socketRef = useRef(null);
  const remoteAudioRef = useRef(null); // to hear other person voice

  const searchParams = useSearchParams();
  const params = useParams();

  /* ------------------------------url data extraction -------------------*/
  const roomId = params.roomid;
  const name = searchParams.get("name");
  const description = searchParams.get("desc");
  const endTimeParam = searchParams.get("end");
  /* -----------------------------time countdown in room -------------------*/

  const endTimeFromModal = endTimeParam
    ? new Date(endTimeParam).getTime() // convert the data into milliseconds (js understands miliseconds)
    : null;

  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const diff = endTime - Date.now();

      if (diff <= 0) {
        setTimeLeft("00:00");
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor(diff / 60000); // millisecond to minutes calculation
      const seconds = Math.floor((diff % 60000) / 1000); // millisecond to minutes calculation

      setTimeLeft(
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
      );
    }, 1000); //every second update the UI countdown

    return () => clearInterval(interval);
  }, [endTime]);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");

    if (storedUsername && !username) {
      setUsername(storedUsername);
    }
  }, [username]);

  useEffect(() => {
    if (!roomId || !username) return;

    setShareUrl(
      `${window.location.origin}/room/${roomId}?name=${encodeURIComponent(
        name || "",
      )}&desc=${encodeURIComponent(description || "")}`,
    );

    const socket = io("http://localhost:4000");
    socketRef.current = socket;

    socket.on("connect", async () => {
      console.log("FRONTEND connected", socket.id);
      socket.emit("join-room", { roomId, username, endTime: endTimeFromModal });

      socket.on("room-time", ({ endTime }) => {
        setEndTime(endTime);
      });

      //  CREATE PEER CONNECTION ONCE
      if (!peerConnectionRef.current) {
        const pc = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        peerConnectionRef.current = pc;

        //  play remote audio
        pc.ontrack = (event) => {
          console.log("Remote audio received");
          remoteAudioRef.current.srcObject = event.streams[0];
        };

        pc.onicecandidate = (event) => {
          //ice candidate firing happens to help clients find each other
          if (event.candidate) {
            socket.emit("webrtc-ice-candidate", {
              roomId,
              candidate: event.candidate,
            });
          }
        };

        pc.onconnectionstatechange = () => {
          console.log("PC STATE :", pc.connectionState);
        };
      }
    });
    // after room ends push this
    socket.on("room-ended", () => {
      router.push(`/room/${roomId}/submit`);
    });

    socket.on("disconnect", () => {
      console.log("FRONTEND disconnected");
    });

    socket.on("room-members", (membersFromServer) => {
      const iam = membersFromServer.find((m) => m.id === socketRef.current?.id); // extract me from the member list
      if (iam) {
        isAdminReference.current = iam.role === "admin"; // if i am admin save the boolean for later use
      }
      setMember(membersFromServer);
    });

    socket.on("chat-history", (history) => {
      setMessages(history);
    });

    socket.on("chat-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("webrtc-offer", async ({ from, offer }) => {
      console.log("Received offer");
      const pc = peerConnectionRef.current;

      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit("webrtc-answer", {
        to: from,
        answer,
      });
    });

    socket.on("webrtc-answer", async ({ answer }) => {
      await peerConnectionRef.current.setRemoteDescription(answer);
      console.log("Answer applied");
    });

    socket.on("webrtc-ice-candidate", async ({ candidate }) => {
      await peerConnectionRef.current.addIceCandidate(candidate);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, username]);

  //-----------------------------------------mic on/off ---------------------------///
  const toggleMic = async () => {
    const pc = peerConnectionRef.current;

    // MIC OFF → ON
    if (!isMicOn) {
      // First time mic is turned ON
      if (!micStreamRef.current) {
        // get access to live mic hardware of a pc and ask permission to user
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        micStreamRef.current = stream; //save the mediastream reference we need this

        const audioTrack = stream.getAudioTracks()[0]; // this function returns an array of all audio tracks we need the first one
        pc.addTrack(audioTrack, stream); // add these to RTC peer object

        //negotiate ONLY once (track added)
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        socketRef.current.emit("webrtc-offer", {
          roomId,
          offer,
        });
      } else {
        // Mic already exists → just unmute
        micStreamRef.current.getAudioTracks()[0].enabled = true; //if we have mic already then just unmute
      }

      setIsMicOn(true);
    }

    // MIC ON → OFF (mute only)
    else {
      if (micStreamRef.current) {
        micStreamRef.current.getAudioTracks()[0].enabled = false; // just mute if toggled again
      }

      setIsMicOn(false);
    }
  };

  //----------------------------- send chat -------------------//
  const sendMessage = () => {
    if (!chatInput.trim()) return;

    socketRef.current.emit("chat-message", {
      roomId,
      username,
      text: chatInput,
    });

    setChatInput("");
  };

  if (!username) {
    return <EnterNameModal onSubmit={setUsername} />;
  }

  // -------------------------------- UI --------------------------------
  return (
    <>
      {/* way to access the audio element DOM using jsx , using this element we can listen to the track sound (for testing purpose only) */}
      <audio ref={remoteAudioRef} autoPlay />

      <nav className="border-b">
        {/*---------------------------horizontal centering so items dont stretch to extreme ends ----------------------------------*/}

        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/*---------------------------left flex item which is a flex itself to align items vertically----------------------------------*/}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{name || "untitled room"} </h1>
            <p className="text-sm text-black/60 ">
              {description || "No description provided"}
            </p>
          </div>
          {/*---------------------------Right flex item which is a flex itself to align items vertically----------------------------------*/}
          <div>
            <p className="font-semibold">{timeLeft}</p>
            <p className="text-sm text-black/60">Time Remaining</p>
          </div>
        </div>
      </nav>

      {/*----------------------Grid for the main layout the main layout which is asymmentric holding the screen share and members ----------------------------------*/}

      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT SECTION */}
          <div className="col-span-8 ">
            {/* Screen Share / Video Area */}
            <div className="mb-6">
              <div className="w-full aspect-video border rounded-lg bg-black/5 flex items-center justify-center">
                <p className="text-sm text-black/40">
                  Screen share will appear here
                </p>
              </div>
            </div>
            {/* other left section parts */}

            <div className="mb-6">
              <h2 className="text-sm font-semibold">Share Room</h2>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 border rounded px-3 py-2 text-sm bg-black/5"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(shareUrl)}
                  className="border rounded px-3 py-2 text-sm hover:bg-black/5"
                >
                  Copy
                </button>
              </div>
            </div>
            {/* controls */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-4">Controls</h3>

              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={toggleMic}
                  className={`border p-4 rounded-lg hover:bg-black/5 ${
                    isMicOn ? "bg-black text-white" : ""
                  }`}
                >
                  <MicOff size={22} />
                </button>

                <button className="border p-4 rounded-lg hover:bg-black/5">
                  <Monitor size={22} />
                </button>

                <button
                  onClick={() => setIsChatOpen(true)}
                  className="border p-4 rounded-lg hover:bg-black/5"
                >
                  <MessageSquare size={22} />
                </button>

                {/* conditional rendering of chat window if someone toggles the chat window */}

                {isChatOpen && (
                  <div className="fixed bottom-6 right-6 w-80 h-96 border rounded-lg bg-white shadow-lg flex flex-col">
                    {/* Header */}
                    <div className="border-b px-4 py-2 font-semibold flex justify-between items-center">
                      <span>Chat</span>
                      <button
                        className="text-black/60 hover:text-black"
                        onClick={() => setIsChatOpen(false)}
                      >
                        ✕
                      </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-2">
                      {messages.length === 0 && (
                        <p className="text-black/40 text-sm">No messages yet</p>
                      )}

                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className="bg-black/5 px-3 py-2 rounded text-sm"
                        >
                          <span className="font-semibold">{msg.from}: </span>
                          {msg.text}
                        </div>
                      ))}
                    </div>

                    {/* Input */}
                    <div className="border-t p-2 flex gap-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 border rounded px-3 py-2 text-sm"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                      />
                      <button
                        onClick={sendMessage}
                        className="bg-black text-white px-3 py-2 rounded text-sm"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}
                {/* conditional rendering of chat window if someone toggles the chat window */}

                <button
                  onClick={() => {
                    if (socketRef.current) {
                      socketRef.current.disconnect();
                    }
                    window.location.href = "/dashboard";
                  }}
                  className="border p-4 rounded-lg hover:bg-black/5 text-red-600"
                >
                  <LogOut size={22} />
                </button>
              </div>
            </div>

            {/* room info */}

            <div className="border rounded-lg p-4 mt-6">
              <h3 className="font-semibold mb-4">Room Info</h3>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-black/50">Room ID:</span>{" "}
                  <span className="font-medium">{roomId}</span>
                </div>

                <div>
                  <span className="text-black/50">Members:</span>{" "}
                  <span className="font-medium">5</span>
                </div>

                <div>
                  <span className="text-black/50">Status:</span>{" "}
                  <span className="font-medium text-green-600">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* VERTICAL DIVIDER */}
          <div className="col-span-1 flex justify-center">
            <div className="w-px bg-black/10 h-full" />
          </div>

          {/* RIGHT SECTION */}
          <div className="col-span-3">
            <div className="pl-6">
              <h3 className="font-semibold mb-4">Members ({members.length})</h3>

              <div className="space-y-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 border rounded-lg p-3"
                  >
                    <div className="w-9 h-9 rounded-md bg-black text-white flex items-center justify-center font-semibold">
                      {member.name[0]}
                    </div>

                    <div>
                      <p className="font-medium">{member.name}</p>
                      {member.role === "admin" && (
                        <p className="text-xs text-black/50">Admin</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

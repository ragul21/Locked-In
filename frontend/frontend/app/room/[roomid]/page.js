"use client";
import { io } from "socket.io-client";
import { useParams, useSearchParams } from "next/navigation";
import { MicOff, MessageSquare, Monitor, LogOut } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import EnterNameModal from "@/components/EnterNameModal";
export default function RoomPage() {
  const [username, setUsername] = useState(null);
  const [members, setMember] = useState([]);

  const [isChatOpen, setIsChatOpen] = useState(false); // to toggle chat box

  const [chatInput, setChatInput] = useState(""); // to remember what user types in the input box
  const [messages, setMessages] = useState([]); // add what user typed in the box to the list and show the updated list has history

  const [shareUrl, setShareUrl] = useState(""); // to render and show the share URL after side effect runs in browser end

  const searchParams = useSearchParams();
  const params = useParams();
  const socketRef = useRef(null);

  {
    /* ------------------------------url date extraction -------------------*/
  }
  const roomId = params.roomid;
  const name = searchParams.get("name");
  const description = searchParams.get("desc");
  const usernameFromUrl = searchParams.get("username");

  {
    /* ------------------------------url date extraction -------------------*/
  }

  useEffect(() => {
    if (usernameFromUrl && !username) {
      setUsername(usernameFromUrl);
    }
  }, [usernameFromUrl, username]);

  useEffect(() => {
    if (!roomId || !username) return;

    setShareUrl(
      `${window.location.origin}/room/${roomId}?name=${encodeURIComponent(
        name || ""
      )}&desc=${encodeURIComponent(description || "")}`
    ); //while running in browser build share url

    const socket = io("http://localhost:4000"); //calls the backend , creates a client socket object for itself
    socketRef.current = socket; //saving the reference to use this outside of the scope it is now
    socket.on("connect", () => {
      console.log("FRONTEND connected", socket.id);
      socket.emit("join-room", { roomId, username });
    });

    socket.on("disconnect", () => {
      // we use this socket object to emit (communicate with server ) and listen what server sends us
      console.log("FRONTEND disconnected");
    });

    socket.on("room-members", (membersFromServer) => {
      // when backend sends me the list use state to render UI
      console.log("Members update:  ", membersFromServer);
      setMember(membersFromServer);
    });

    socket.on("chat-history", (history) => {
      setMessages(history);
    });

    socket.on("chat-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect(); //gracefull termination when user exits , we are using this is as a clean up function
    };
  }, [roomId, username]); //whenever the roomID changes run this effect

  //----------------------------- when user clicks send we send this message to server using socket emit -------------------//
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
  //----------------------------- when user clicks send we update the chat history state everytime and render it -------------------//

  return (
    <>
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
            <p className="font-semibold">44:58</p>
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
                <button className="border p-4 rounded-lg hover:bg-black/5">
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

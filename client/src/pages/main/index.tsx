import { StreamVideo, Call } from "@stream-io/video-react-sdk";
import { useUser } from "../../user-context";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mic, Users, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

interface NewRoom {
  name: string;
  description: string;
}

interface Room {
  id: string;
  name: string;
  description: string;
  participantsLength: number;
  createdBy: string;
}

type CustomCallData = {
  description?: string;
  title?: string;
};

export const MainPage = () => {
  const { client, user, setCall, isLoadingClient } = useUser();
  const [newRoom, setNewRoom] = useState<NewRoom>({
    name: "",
    description: "",
  });
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingRooms, setFetchingRooms] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (client) {
      fetchListOFCalls();
    }
  }, [client]);

  const hashRoomName = (roomName: string) => {
    const hash = CryptoJS.SHA256(roomName).toString(CryptoJS.enc.Base64);
    return hash.replace(/[^a-zA-Z0-9_-]/g, "");
  };

  const createRoom = async () => {
    const { name, description } = newRoom;

    if (!client || !user || !name || !description) {
      setError("All fields are required. Please complete the form.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const roomName = hashRoomName(name);
      const call = client.call("audio_room", roomName);

      await call.join({
        create: true,
        data: {
          members: [{ user_id: user.username }],
          custom: {
            title: name,
            description,
          },
        },
      });

      setCall(call);
      navigate(`/room`);
    } catch (err: any) {
      console.error("Failed to create room:", err);
      setError("An error occurred while creating the room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchListOFCalls = async () => {
    try {
      setFetchingRooms(true);

      const callsQueryResponse = await client?.queryCalls({
        filter_conditions: { ongoing: true },
        limit: 4,
        watch: true,
      });

      if (!callsQueryResponse) {
        throw new Error("Failed to fetch calls");
      }

      const getCallInfo = async (call: Call): Promise<Room> => {
        const callInfo = await call.get();
        const customData = callInfo.call.custom as CustomCallData;
        return {
          id: callInfo.call.id || "",
          name: customData?.title || "Untitled Room",
          description: customData?.description || "No description",
          participantsLength: callInfo.members.length || 0,
          createdBy: callInfo.call.created_by.name || "Unknown",
        };
      };

      const rooms = await Promise.all(
        callsQueryResponse.calls.map((call) => getCallInfo(call))
      );
      setAvailableRooms(rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setError("Failed to load available rooms.");
    } finally {
      setFetchingRooms(false);
    }
  };

   const joinCall = async (callID:string)=>{
    const call = client?.call("audio_room", callID);
    try {
      await call?.join();
      setCall(call);
      navigate("/room")

      
    } catch (error) {
      alert("error while joining call wait for room tobo live")
    }

   }

  if (isLoadingClient) return <h1>Loading...</h1>;
  if ((isLoadingClient && !user) || (!isLoadingClient && !client))
    return <Navigate to="/sign-in" />;

  return (
    <StreamVideo client={client!}>
      <div className="min-h-screen bg-black text-white flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 p-6 flex flex-col">
          <h1 className="text-2xl font-bold mb-8">Audio Wave</h1>
          <nav className="flex-grow">
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                >
                  <Mic size={20} />
                  <span>Live Rooms</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                >
                  <Users size={20} />
                  <span>Friends</span>
                </a>
              </li>
            </ul>
          </nav>
          <div className="mt-auto pt-6 border-t border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-gray-400">Online</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-grow p-8">
          <header className="mb-8">
            <h2 className="text-3xl font-bold">Welcome, {user?.name}</h2>
            <p className="text-gray-400">
              Create or join an audio room to get started
            </p>
          </header>

          {/* Create Room Form */}
          <div className="bg-gray-900 rounded-lg p-6 max-w-md mb-8">
            <h3 className="text-xl font-semibold mb-4">Create your own room</h3>
            {error && (
              <div className="bg-red-500 text-white p-2 rounded-md mb-4">
                {error}
              </div>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createRoom();
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="roomName"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Room name
                </label>
                <input
                  id="roomName"
                  type="text"
                  placeholder="Enter room name"
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onChange={(e) =>
                    setNewRoom((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="roomDescription"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Room description
                </label>
                <input
                  id="roomDescription"
                  type="text"
                  placeholder="Enter room description"
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onChange={(e) =>
                    setNewRoom((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white rounded-md py-2 px-4 transition-colors duration-300 flex items-center justify-center ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {loading ? (
                  "Creating..."
                ) : (
                  <>
                    <Plus size={20} className="mr-2" /> Create Room
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Available Rooms */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Available Rooms</h3>
            {fetchingRooms ? (
              <p>Loading available rooms...</p>
            ) : availableRooms.length ? (
              <div className="grid gap-4">
                {availableRooms.map((room) => (
                  <div key={room.id} className="bg-gray-800 p-4 rounded-lg" onClick={()=> joinCall(room.id)}>
                    <h4 className="font-bold text-lg">{room.name}</h4>
                    <p>{room.description}</p>
                    <p>{room.participantsLength} participants</p>
                    <p className="text-sm text-gray-400">
                      Created by {room.createdBy}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No available rooms at the moment.</p>
            )}
          </section>
        </main>
      </div>
    </StreamVideo>
  );
};

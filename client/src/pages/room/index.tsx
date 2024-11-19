// import {
//   useCallStateHooks,
//   useRequestPermission,
//   OwnCapability,
// } from "@stream-io/video-react-sdk";
// import { Controls } from "./controls";
// import { Users, Music } from "lucide-react";
// import { useUser } from "../../user-context";
// import { PermissionRequestsPanel } from "./permission-request";
// import { Participants } from './participants';
// export const Room = () => {
//   const { useCallCustomData, useParticipants, useCallCreatedBy } =
//     useCallStateHooks();

//   const custom = useCallCustomData();
//   const participants = useParticipants();
//   const createdBy = useCallCreatedBy();
//   const { user } = useUser();
//   const { hasPermission, requestPermission } = useRequestPermission(
//     OwnCapability.SEND_AUDIO
//   );
//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col">
//       <header className="bg-gray-900 p-2 border-b border-gray-800">
//         <h1 className="text-2xl font-bold mb-2">
//           {custom?.title ?? "Untitled Room"}
//         </h1>
//         <p className="text-gray-400">
//           {custom?.description ?? "No description available"}
//         </p>
//       </header>

//       <main className="flex-grow flex flex-col items-center justify-center p-6">
//         <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center">
//               <Users className="text-purple-500 mr-2" />
//               <span className="text-lg font-semibold">
//                 {participants?.length ?? 0} Participant
//                 {participants?.length !== 1 ? "s" : ""}
//                 {/* <Participants /> */}
//               </span>
//             </div>
//             <div className="flex items-center">
//               <Music className="text-purple-500 mr-2" />
//               <span className="text-lg font-semibold">Live Room</span>
//             </div>
//           </div>
//           <p className="text-gray-400 text-sm">
//             Created by: {createdBy?.name ?? "Unknown"}
//           </p>
//         </div>

//         <div className="audio-wave w-full max-w-md h-32 mb-8 rounded-lg overflow-hidden"></div>
//         {user?.username === createdBy?.id && <PermissionRequestsPanel />}
//         {hasPermission ? (
//           <Controls />
//         ) : (
//           <button
//             onClick={requestPermission}
//             className="bg-purple-600 text-white p-4 rounded-lg"
//           >
//             Request Permission
//           </button>
//         )}
//       </main>

//       <style jsx>{`
//         .audio-wave {
//           background: linear-gradient(
//             90deg,
//             #8b5cf6 0%,
//             #3b82f6 10%,
//             #10b981 20%,
//             #3b82f6 30%,
//             #8b5cf6 40%,
//             #3b82f6 50%,
//             #10b981 60%,
//             #3b82f6 70%,
//             #8b5cf6 80%,
//             #3b82f6 90%,
//             #10b981 100%
//           );
//           background-size: 200% 100%;
//           animation: wave 10s linear infinite;
//           opacity: 0.6;
//         }

//         @keyframes wave {
//           0% {
//             background-position: 0% 50%;
//           }
//           100% {
//             background-position: 200% 50%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };
import {
  useCallStateHooks,
  useRequestPermission,
  OwnCapability,
} from "@stream-io/video-react-sdk";
import { Controls } from "./controls";
import { Users, Music } from "lucide-react";
import { useUser } from "../../user-context";
import { PermissionRequestsPanel } from "./permission-request";
import { Participants } from "./participants";

export const Room = () => {
  const { useCallCustomData, useParticipants, useCallCreatedBy } =
    useCallStateHooks();

  const custom = useCallCustomData();
  const participants = useParticipants();
  const createdBy = useCallCreatedBy();
  const { user } = useUser();
  const { hasPermission, requestPermission } = useRequestPermission(
    OwnCapability.SEND_AUDIO
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold">
          {custom?.title ?? "Untitled Room"}
        </h1>
        <p className="text-gray-400">
          {custom?.description ?? "No description available"}
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col lg:flex-row lg:items-start p-6 space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Participants Section */}
        <section className="bg-gray-900 rounded-lg p-4 w-full lg:w-1/3 shadow-md">
          <div className="flex items-center mb-4">
            <Users className="text-purple-500 mr-2" />
            <h2 className="text-lg font-semibold">
              Participants ({participants?.length ?? 0})
            </h2>
          </div>
          <Participants />
        </section>

        {/* Room Info Section */}
        <section className="bg-gray-900 rounded-lg p-6 w-full lg:w-2/3 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Music className="text-purple-500 mr-2" />
              <span className="text-lg font-semibold">Live Room</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Created by: {createdBy?.name ?? "Unknown"}
          </p>

          {/* Audio Wave */}
          <div className="audio-wave w-full h-32 rounded-lg overflow-hidden mb-4"></div>

          {/* Permission Request Panel */}
          {user?.username === createdBy?.id && <PermissionRequestsPanel />}

          {/* Controls */}
          {hasPermission ? (
            <Controls />
          ) : (
            <button
              onClick={requestPermission}
              className="bg-purple-600 text-white p-4 rounded-lg w-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Request Permission
            </button>
          )}
        </section>
      </main>

      {/* Animated Audio Wave */}
      <style>{`
        .audio-wave {
          background: linear-gradient(
            90deg,
            #8b5cf6 0%,
            #3b82f6 10%,
            #10b981 20%,
            #3b82f6 30%,
            #8b5cf6 40%,
            #3b82f6 50%,
            #10b981 60%,
            #3b82f6 70%,
            #8b5cf6 80%,
            #3b82f6 90%,
            #10b981 100%
          );
          background-size: 200% 100%;
          animation: wave 10s linear infinite;
          opacity: 0.6;
        }

        @keyframes wave {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </div>
  );
};

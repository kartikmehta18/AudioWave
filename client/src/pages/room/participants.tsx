import {
  
  ParticipantsAudio,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Participant } from "./participant";

export const Participants = () => {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  return (
    <div className="w-full max-w-lg mx-auto bg-gray-800 shadow-md rounded-lg p-4">
      <h4 className="text-xl font-semibold text-white mb-4">Participants</h4>
      <div className="space-y-4">
        <ParticipantsAudio participants={participants} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {participants.map((p) => (
            <Participant participant={p} key={p.sessionId} />
          ))}
        </div>
      </div>
    </div>
  );
};

import { Avatar, StreamVideoParticipant } from "@stream-io/video-react-sdk";

export const Participant = ({
  participant,
}: {
  participant: StreamVideoParticipant;
}) => {
  const { isSpeaking } = participant;

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative">
        {isSpeaking && (
          <div className="absolute inset-0 w-10 h-10 rounded-full bg-green-500 opacity-70 animate-ping mt-2 ml-[20px]"></div>
        )}
        <div className="w-16 h-16 rounded-full overflow-hidden flex justify-center items-center relative">
          <Avatar
            imageSrc={participant.image}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="text-white font-medium">{participant.name}</div>
    </div>
  );
};

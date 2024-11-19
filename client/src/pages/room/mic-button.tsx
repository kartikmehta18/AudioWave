import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { Mic, MicOff } from "lucide-react";

export const MicButton = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, isMute } = useMicrophoneState();

  const toggleMicrophone = async () => {
    try {
      if (isMute) {
        await microphone.enable();
      } else {
        await microphone.disable();
      }
    } catch (error) {
      console.error("Error toggling microphone state:", error);
    }
  };

  return (
    <button
      onClick={toggleMicrophone}
      className={`p-4 rounded-full transition-colors ${
        isMute
          ? "bg-red-600 hover:bg-red-700"
          : "bg-purple-600 hover:bg-purple-700"
      }`}
    >
      {isMute ? <MicOff size={24} /> : <Mic size={24} />}
      <span className="sr-only">{isMute ? "Unmute" : "Mute"}</span>
    </button>
  );
};

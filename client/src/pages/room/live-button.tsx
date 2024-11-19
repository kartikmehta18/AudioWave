import { useCallStateHooks, useCall } from "@stream-io/video-react-sdk"
import { Radio } from 'lucide-react'

export const LiveButton = () => {
  const { useIsCallLive } = useCallStateHooks()
  const isLive = useIsCallLive()
  const call = useCall()

  const toggleLive = async () => {
    if (isLive) {
      await call?.stopLive()
    } else {
      await call?.goLive()
    }
  }

  return (
    <button
      onClick={toggleLive}
      className={`p-4 rounded-full transition-colors flex items-center justify-center ${
        isLive ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'
      }`}
    >
      <Radio size={24} className={isLive ? 'animate-pulse' : ''} />
      <span className="sr-only">{isLive ? "Stop Live" : "Go Live"}</span>
    </button>
  )
}
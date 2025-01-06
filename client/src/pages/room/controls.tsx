import { MicButton } from './mic-button';
import { LiveButton } from './live-button';

export const Controls = () => {
  return (
    <div className="flex items-center justify-center space-x-4 p-4 bg-white/10 rounded-lg">
      <MicButton />
      <LiveButton />
    </div>
  );
};

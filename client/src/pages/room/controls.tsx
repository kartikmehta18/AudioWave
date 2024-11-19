import { MicButton } from './mic-button';
import { LiveButton } from './live-button';

export const Controls = () => {
  return (
    <div className="flex items-center justify-center space-x-4 p-4 bg-gray-900 rounded-lg">
      <MicButton />
      <LiveButton />
    </div>
  );
};

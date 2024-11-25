import { TextHoverEffect } from "./components/ui/text-hover-effect";

import { RainbowButton } from "./components/ui/rainbow-button";
import { Meteors } from "./components/ui/meteors";
// import { VelocityScroll } from "./components/ui/scroll-based-velocity";

function Home() {
  return (
    <>
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg   md:shadow-xl">
        <Meteors number={30} />

        <div className="flex sm:mt-4 justify-center mt-8 ">
          <RainbowButton>Launch 🚀 </RainbowButton>
        </div>
        <div className="h-[30rem] flex items-center justify-center cursor-custom sm:-mt-[60px] -mt-[130px]">
          <TextHoverEffect text="AudioWave" />
        </div>
        {/* <VelocityScroll
      text="AudioWave Talk Anonomusly"
      default_velocity={2}
      className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-white drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
    /> */}
      </div>
    </>
  );
}

export default Home;

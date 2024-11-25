import { TextHoverEffect } from "./components/ui/text-hover-effect";

import { RainbowButton } from "./components/ui/rainbow-button";
import { Meteors } from "./components/ui/meteors";
// import { VelocityScroll } from "./components/ui/scroll-based-velocity";
import CardComponent from "./CardComponent";
import {
  TextRevealCard,
  TextRevealCardDescription,
 
} from "./components/ui/text-reveal-card";

function Home() {
  return (
    <>
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg   md:shadow-xl">
        <Meteors number={30} />

        <div className="flex sm:mt-4 justify-center mt-8 ">
          <RainbowButton>Launch 🚀 </RainbowButton>
        </div>
        <div className="h-[30rem] flex items-center justify-center cursor-custom sm:-mt-[80px] -mt-[130px]">
          <TextHoverEffect text="AudioWave" />
        </div>
        {/* <div className="bg-gradient-to-br from-yellow-300 via-purple-500 to-purple-600 bg-clip-text text-transparent text-3xl font-bold -mt-6">
          Talk to strangers, Make friends!
        </div> */}
        <div className="flex items-center justify-center  rounded-2xl ">
          <TextRevealCard
            className=" text-center"
            text="-----Talk Anonymously----"
            revealText="Audio, Video, Chat"
          >
            <TextRevealCardDescription className="text-center -mt-4 text-sm sm:text-base md:text-lg lg:text-xl  sm:px-8">
              Experience random chat rooms, find friends,
              <br /> connect with developers, and chat with strangers <br />
              from all over the world!
            </TextRevealCardDescription>
          </TextRevealCard>
        </div>

        {/* <VelocityScroll
      text="AudioWave Talk Anonomusly"
      default_velocity={2}
      className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-white drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
    /> */}
        <CardComponent />
      </div>
    </>
  );
}

export default Home;

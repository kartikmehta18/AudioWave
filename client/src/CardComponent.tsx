import React from "react";



const CardComponent: React.FC = () => {
 

  return (
    <>
      <div className=" grid   md:grid-cols-4 grid-cols-1  -mt-4">
        <div className="flex justify-center items-center gap-6 py-10 ">
        
            <div
            
              className="bg-[#0a0a0a] text-white rounded-lg p-6 w-48 border -rotate-6  border-white/20 shadow-lg hover:rotate-0 hover:shadow-xl hover:-translate-y-20 transform transition-all duration-1000 text-center"
            >
               <img className="" src="/call.png"/>
              <div className="text-lg font-semibold mb-2">Audio Call</div>
              <div className="text-sm text-gray-400">Join  calls anonymously with other users.</div>
            </div>
        
        </div>
        <div className="flex justify-center items-center gap-6 py-10 ">
          <div className="bg-[#0a0a0a] text-white rounded-lg p-6 w-48 border rotate-6 border-white/20 shadow-lg hover:rotate-0 hover:shadow-xl hover:-translate-y-20 transform transition-all duration-1000 text-center">
            <img className="" src="/chat.png" />
            <div className="text-lg font-semibold mb-2">Anonymous Chat</div>
            <div className="text-sm text-gray-400">
              Engage in anonymous chat rooms safely.
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-6 py-10 ">
          <div className="bg-[#0a0a0a] text-white rounded-lg p-6 w-48 border -rotate-6  border-white/20 shadow-lg hover:shadow-xl hover:rotate-0 hover:-translate-y-20 transform transition-all duration-1000 text-center">
            <img className="" src="/video.png" />
            <div className="text-lg font-semibold mb-2">
            Video Chat
            </div>
            <div className="text-sm text-gray-400">
              Experience instant messaging with ease.
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-6 py-10 ">
          <div className="bg-[#0a0a0a] text-white rounded-lg p-6 w-48 border rotate-6 border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-20 transform transition-all hover:rotate-0 duration-1000 text-center">
          <img className="" src="/home.png"/>

            <div className="text-lg font-semibold mb-2">Create Rooms</div>
            <div className="text-sm text-gray-400">
              Create custom  rooms for your needs.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardComponent;

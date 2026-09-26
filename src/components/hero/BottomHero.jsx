import React from "react";
import bot from "../../assets/chatbot.png"

function BottomHero() {
  return (
    <div className="w-full h-auto  flex flex-col justify-center items-center gap-3 relative">
      <div className="text-2xl lg:text-4xl font-bold flex flex-col justify-center items-center">
        <h1 className="">Meet Ashvin - your AI teammate</h1>
        <h1>Alway stay in the loop.</h1>
      </div>
      <div className="text-sm lg:text-md flex flex-col justify-center items-center mt-2">
        <h2>Ground your answer in pinned context, summarize long threads.</h2>
        <h2>and create tasks from conversion with Ashvin.</h2>
      </div>
      <div className="w-60 h-10 bg-[#0291fA] rounded-md">
        <button type="button" disabled className="w-full h-full text-white font-semibold cursor-pointer">Invite Ashvin to your channal</button>
      </div>
      <div className="hidden  rounded-md border-2 border-zinc-300 w-56 h-20 lg:flex gap-1 absolute -bottom-5 right-5">
        <div className="h-8 w-8 mt-1">
        <img src={bot} alt="bot"/>
        </div>
        <div className="h-16 w-44 bg-zinc-300 rounded-b-md p-1.5">
          <p className="text-sm font-semibold">Ashvin</p>
          <p className="text-[9px] text-justify">Win active chat ground your summarize long treads and create tasks  from with this concept.</p>
        </div>
      </div>
    </div>
  );
}

export default BottomHero;

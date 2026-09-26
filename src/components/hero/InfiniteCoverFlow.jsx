import React, { useEffect, useRef } from "react";
import Bot from "../../assets/chatbot.png";
import botvid from "../../assets/botvid.mp4";
import LeftChat from "./LeftChat";
import LeftFeatureCard from "./LeftFeatureCard";
import AutomationCard from "./AutomationCard";
import "./InfiniteCoverFlow.css";
import RightChat from "./RightChat";
import ChromaKeyVideo from "./ChromaKeyVideo";

function InfiniteCoverFlow() {
  const trackRef = useRef(null);
  const positionRef = useRef(0);
  const isPausedRef = useRef(false);
  const speed = 40; // pixels per second - increase to go faster

  useEffect(() => {
    const track = trackRef.current;
    let frameId;
    let lastTime = performance.now();

    const step = (now) => {
      const delta = (now - lastTime) / 1000; // seconds since last frame
      lastTime = now;

      if (!isPausedRef.current && track) {
        positionRef.current -= speed * delta;

        // half the track's width is one full set of cards (since we render two copies)
        const halfWidth = track.scrollWidth / 2;

        // once we've scrolled past one full set, snap back by that width
        // this is invisible because the second set is an identical copy
        if (Math.abs(positionRef.current) >= halfWidth) {
          positionRef.current += halfWidth;
        }

        track.style.transform = `translateX(${positionRef.current}px)`;
      }

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      <div className="cover-flow-wrapper  lg:hidden">
        {/** mobile view*/}
        <div className="cover-flow-bot-row">
          <ChromaKeyVideo
            src={botvid}
            threshold={235}
            softness={20}
            className="w-52 h-60 object-contain"
          />
        </div>

        <div className="cover-flow-viewport">
          <div className="cover-flow-track" ref={trackRef}>
            <LeftChat />
            <LeftFeatureCard />
            <AutomationCard />
            <RightChat />
          </div>
        </div>
      </div>
      <div className="hidden lg:flex w-screen max-w-8xl mx-auto px-8 justify-between items-center">
        {/*Desktop view*/}

        <div className="relative flex items-center ">
          <LeftChat />
          <div className="ml-8 z-10">
            <LeftFeatureCard />
          </div>
        </div>
        <div className="cover-flow-bot-row">
          <ChromaKeyVideo
            src={botvid}
            threshold={235}
            softness={20}
            className="w-60 h-68 object-contain"
          />
        </div>
        <div className="relative flex items-center">
          <div className="mr-8 z-10">
            <AutomationCard />
          </div>
          <RightChat />
        </div>
      </div>
    </>
  );
}

export default InfiniteCoverFlow;

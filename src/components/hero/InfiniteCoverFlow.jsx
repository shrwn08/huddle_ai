import React, { useEffect, useRef } from "react";
import Bot from "../../assets/chatbot.png";
import LeftChat from "./LeftChat";
import LeftFeatureCard from "./LeftFeatureCard";
import AutomationCard from "./AutomationCard";
import "./InfiniteCoverFlow.css";

function InfiniteCoverFlow() {
  const trackRef = useRef(null);
  const positionRef = useRef(0);
  const isPausedRef = useRef(false);
  const speed = 40; // pixels per second — increase to go faster

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

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  return (
    <div className="cover-flow-wrapper">
      <div className="cover-flow-bot-row">
        <img src={Bot} alt="bot" className="cover-flow-bot" />
      </div>

      <div
        className="cover-flow-viewport"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="cover-flow-track" ref={trackRef}>
          <LeftChat />
          <LeftFeatureCard />
          <AutomationCard />
          <LeftChat />
          <LeftFeatureCard />
          <AutomationCard />
        </div>
      </div>
    </div>
  );
}

export default InfiniteCoverFlow;
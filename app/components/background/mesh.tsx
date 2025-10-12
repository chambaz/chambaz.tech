"use client";

import React from "react";
import { MeshGradient } from "@paper-design/shaders-react";

const Mesh = () => {
  const [opacity, setOpacity] = React.useState(0);
  const [dimensions, setDimensions] = React.useState({
    width: 1280,
    height: 720,
  });

  React.useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial dimensions
    updateDimensions();

    // Add resize event listener
    window.addEventListener("resize", updateDimensions);

    setTimeout(() => {
      setOpacity(0.35);
    }, 100);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-10 transition-opacity duration-3000"
      style={{ opacity }}
    >
      <MeshGradient
        width={dimensions.width}
        height={dimensions.height}
        colors={["#000000", "#555555"]}
        distortion={0.8}
        swirl={0.1}
        grainMixer={0}
        grainOverlay={0}
        speed={1}
      />
    </div>
  );
};

export { Mesh };

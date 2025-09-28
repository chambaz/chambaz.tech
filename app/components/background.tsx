"use client";

import React from "react";
import { MeshGradient } from "@paper-design/shaders-react";

const Background = () => {
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

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 opacity-50">
      <MeshGradient
        width={dimensions.width}
        height={dimensions.height}
        colors={["#ffffff", "#000000", "#00827f"]}
        distortion={0.8}
        swirl={0.1}
        grainMixer={0}
        grainOverlay={0}
        speed={1}
      />
    </div>
  );
};

export { Background };
